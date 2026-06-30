import Attendance from "../models/Attendance.model.js";
import User from "../models/User.model.js";

export const updateReliabilityScore = async (
    userId
) => {

    const user = await User.findById(userId);

    if (!user) return;

    const attendanceRecords = await Attendance.find({
        participant: userId,
    });

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

    const totalActivities =
        present + late + absent;

    if (totalActivities === 0) {

        user.reliabilityScore = 100;

    } else {

        const earnedPoints =
            present + (late * 0.75);

        user.reliabilityScore = Math.round(
            (earnedPoints / totalActivities) * 100
        );

    }

    await user.save();

};