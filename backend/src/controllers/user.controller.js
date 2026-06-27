import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    getUserStatsService,
} from "../services/statistics.service.js";

import {
  globalSearchService
} from "../services/search.service.js"

import { 
  bootstrapService 
} from "../services/bootstrap.service.js";

import {

    getCurrentUserService,

    updateProfileService,

    updateFavouriteSportsService,

    updateAvatarService,

    changePasswordService

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





export const updateAvatar =
asyncHandler(async (req, res) => {

    const user =
        await updateAvatarService(

            req.user._id,

            req.file,

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            user,

            "Avatar updated successfully."

        )

    );

});



export const getUserStats =
asyncHandler(async (req, res) => {

    const stats =
        await getUserStatsService(
            req.user._id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            stats,

            "Statistics fetched successfully."

        )

    );

});




export const globalSearch =
asyncHandler(async (req, res) => {

    const activities =
        await globalSearchService(

            req.validated.query.q

        );

    return res.status(200).json(

        new ApiResponse(

            200,

            activities,

            "Search completed."

        )

    );

});



export const bootstrap =
asyncHandler(async (req, res) => {

    const data =
        await bootstrapService(
            req.user._id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            data,

            "Bootstrap loaded."

        )

    );

});



export const changePassword =
asyncHandler(async (req, res) => {

    const {
        oldPassword,
        newPassword,
    } = req.validated.body;

    await changePasswordService(
        req.user._id,
        oldPassword,
        newPassword
    );

    return res.status(200).json(

        new ApiResponse(
            200,
            null,
            "Password changed successfully."
        )

    );

});