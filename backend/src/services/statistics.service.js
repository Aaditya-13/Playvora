import Activity from "../models/Activity.model.js";
import Attendance from "../models/Attendance.model.js";
import JoinRequest from "../models/JoinRequest.model.js";
import User from "../models/User.model.js";

export const getUserStatsService = async (userId) => {

  const [
    user,
    hosted,
    joined,
    attendanceRecords,
    upcomingActivities,
    pendingRequests,
  ] = await Promise.all([

    User.findById(userId),

    Activity.countDocuments({
      organizer: userId,
      isDeleted: false,
    }),

    Activity.countDocuments({
      participants: userId,

      organizer: {
        $ne: userId,
      },

      isDeleted: false,
    }),

    Attendance.find({
      participant: userId,
    }),

    Activity.countDocuments({
      participants: userId,
      status: {
        $in: ["open", "full"],
      },
      scheduledAt: {
        $gte: new Date(),
      },
      isDeleted: false,
    }),

    JoinRequest.countDocuments({
      requester: userId,
      status: "pending",
    }),

  ]);

  const present =
    attendanceRecords.filter(
      record => record.status === "present"
    ).length;

  const late =
    attendanceRecords.filter(
      record => record.status === "late"
    ).length;

  const absent =
    attendanceRecords.filter(
      record => record.status === "absent"
    ).length;

  const matchesAttended =
    present + late;

  const attendanceRate =
    attendanceRecords.length === 0
      ? 0
      : Math.round(
        (matchesAttended / attendanceRecords.length) * 100
      );

  return {

    reliabilityScore:
      user.reliabilityScore,

    matchesHosted:
      hosted,

    matchesJoined:
      joined,

    matchesAttended,

    attendanceRate,

    attendance: {

      present,

      late,

      absent,

    },

    upcomingActivities,

    pendingRequests,

    favouriteSports:
      user.favouriteSports,

  };

};