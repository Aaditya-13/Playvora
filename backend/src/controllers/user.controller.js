import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {

    getCurrentUserService,

    updateProfileService,

    updateFavouriteSportsService,

} from "../services/user.service.js";

export const getCurrentUser =
asyncHandler(async (req, res) => {

    const user =
        await getCurrentUserService(
            req.user._id
        );

    return res.status(200).json(

        new ApiResponse(
            200,
            user,
            "Profile fetched successfully."
        )

    );

});

export const updateProfile =
asyncHandler(async (req, res) => {

    const user =
        await updateProfileService(

            req.user._id,

            req.validated.body,

        );

    return res.status(200).json(

        new ApiResponse(
            200,
            user,
            "Profile updated successfully."
        )

    );

});

export const updateFavouriteSports =
asyncHandler(async (req, res) => {

    const user =
        await updateFavouriteSportsService(

            req.user._id,

            req.validated.body.favouriteSports,

        );

    return res.status(200).json(

        new ApiResponse(
            200,
            user,
            "Favourite sports updated."
        )

    );

});