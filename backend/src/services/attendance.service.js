import Activity from "../models/Activity.model.js";
import Attendance from "../models/Attendance.model.js";
import ApiError from "../utils/ApiError.js";

import { updateReliabilityScore } from "./reliability.service.js";

export const markAttendanceService = async (
  activityId,
  organizerId,
  attendanceList
) => {

  const activity = await Activity.findById(activityId);

  if (!activity || activity.isDeleted) {
    throw new ApiError(404, "Activity not found");
  }

  if (
    activity.organizer.toString() !==
    organizerId.toString()
  ) {
    throw new ApiError(
      403,
      "Only organizer can mark attendance."
    );
  }

  // if (new Date() < activity.scheduledAt) {
  //   throw new ApiError(
  //     400,
  //     "Attendance can only be marked after the activity starts."
  //   );
  // }

  if (
    activity.status !== "completed"
  ) {
    throw new ApiError(
      400,
      "Attendance can only be marked after the activity is completed."
    );
  }

  for (const record of attendanceList) {

    if (
      !activity.participants.some(
        participant =>
          participant.toString() ===
          record.participantId
      )
    ) {
      throw new ApiError(
        400,
        "Participant not found in activity."
      );
    }

    await Attendance.findOneAndUpdate(
      {
        activity: activityId,
        participant: record.participantId,
      },
      {
        status: record.status,
        markedBy: organizerId,
        markedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    await updateReliabilityScore(
      record.participantId,
      record.status
    );
  }

  return;
};

export const getAttendanceService = async (
  activityId
) => {

  const activity = await Activity.findById(activityId)
    .populate(
      "participants",
      "username fullName avatar reliabilityScore"
    );

  if (!activity || activity.isDeleted) {
    throw new ApiError(
      404,
      "Activity not found."
    );
  }

  const attendanceRecords = await Attendance.find({
    activity: activityId,
  });

  const attendanceMap = new Map();

  attendanceRecords.forEach(record => {
    attendanceMap.set(
      record.participant.toString(),
      {
        status: record.status,
        markedAt: record.markedAt,
      }
    );
  });

  const participants = activity.participants.map(participant => {

    const attendance =
      attendanceMap.get(
        participant._id.toString()
      );

    return {

      participant,

      status: attendance?.status ?? null,

      markedAt: attendance?.markedAt ?? null,

    };

  });

  return {

    activity: {

      _id: activity._id,

      title: activity.title,

      scheduledAt: activity.scheduledAt,

    },

    totalParticipants: participants.length,

    participants,

  };

};