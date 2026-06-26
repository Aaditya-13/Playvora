import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    markAttendanceService,
    getAttendanceService,
} from "../services/attendance.service.js";

export const markAttendance = asyncHandler(async (req, res) => {

    await markAttendanceService(
        req.params.id,
        req.user._id,
        req.validated.body.attendance
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Attendance marked successfully."
        )
    );
});

export const getAttendance = asyncHandler(async (req, res) => {

    const attendance =
        await getAttendanceService(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            attendance,
            "Attendance fetched successfully."
        )
    );
});