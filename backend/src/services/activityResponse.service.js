import Attendance from "../models/Attendance.model.js";

export const attachAttendance = async (
    activities,
    userId
) => {

    if (!activities.length) {
        return activities;
    }

    const activityIds = activities.map(
        activity => activity._id
    );

    const attendanceRecords =
        await Attendance.find({

            participant: userId,

            activity: {
                $in: activityIds,
            },

        });

    const attendanceMap = new Map();

    attendanceRecords.forEach(record => {

        attendanceMap.set(

            record.activity.toString(),

            {

                status: record.status,

                markedAt: record.markedAt,

            }

        );

    });

    return activities.map(activity => ({

        ...activity.toObject(),

        attendance:

            attendanceMap.get(
                activity._id.toString()
            ) ?? null,

    }));

};