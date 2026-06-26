import mongoose from "mongoose";
import { ATTENDANCE_STATUS } from "../constants/attendance.constants.js";

const attendanceSchema = new mongoose.Schema(
    {
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
        },

        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ATTENDANCE_STATUS,
            required: true,
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        markedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

attendanceSchema.index(
    {
        activity: 1,
        participant: 1,
    },
    {
        unique: true,
    }
);

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

export default Attendance;