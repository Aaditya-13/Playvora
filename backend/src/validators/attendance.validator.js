import { z } from "zod";
import { ATTENDANCE_STATUS } from "../constants/attendance.constants.js";

export const markAttendanceSchema = z.object({
    attendance: z.array(
        z.object({
            participantId: z.string(),

            status: z.enum(ATTENDANCE_STATUS),
        })
    ).min(1),
});