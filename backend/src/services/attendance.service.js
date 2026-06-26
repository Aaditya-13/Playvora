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

    if (
        activity.scheduledAt > new Date()
    ) {
        throw new ApiError(
            400,
            "Activity has not finished yet."
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

        await Attendance.create({

            activity: activityId,

            participant: record.participantId,

            status: record.status,

            markedBy: organizerId,

        });

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

    return await Attendance.find({
        activity: activityId,
    })
    .populate(
        "participant",
        "username fullName avatar reliabilityScore"
    );

};