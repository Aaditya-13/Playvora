import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {

    getDashboardService,

} from "../services/dashboard.service.js";

export const getDashboard =
asyncHandler(async (req, res) => {

    const dashboard =
        await getDashboardService(
            req.user._id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            dashboard,

            "Dashboard fetched successfully."

        )

    );

});