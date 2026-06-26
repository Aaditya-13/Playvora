import Activity from "../models/Activity.model.js";
import Attendance from "../models/Attendance.model.js";
import User from "../models/User.model.js";

export const getUserStatsService = async (userId) => {

    const [
        user,
        hosted,
        joined,
        attendance,
    ] = await Promise.all([

        User.findById(userId),

        Activity.countDocuments({
            organizer: userId,
            isDeleted: false,
        }),

        Activity.countDocuments({
            participants: userId,
            isDeleted: false,
        }),

        Attendance.find({
            participant: userId,
        }),

    ]);

    const present =
        attendance.filter(
            a => a.status === "present"
        ).length;

    const attendanceRate =
        attendance.length === 0
            ? 0
            : Math.round(
                (present / attendance.length) * 100
            );

    return {

        reliabilityScore:
            user.reliabilityScore,

        matchesHosted:
            hosted,

        matchesJoined:
            joined,

        attendanceRate,

        favouriteSports:
            user.favouriteSports,

    };

};