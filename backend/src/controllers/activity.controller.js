import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createActivityService,
    getNearbyActivitiesService,
    getActivityByIdService,
    getMyCreatedActivitiesService,
    getMyJoinedActivitiesService,
    updateActivityService,
    leaveActivityService,
    cancelActivityService,
    deleteActivityService,
} from "../services/activity.service.js";

export const createActivity = asyncHandler(async (req, res) => {

    const activity = await createActivityService(
        req.user._id,
        req.validated.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            activity,
            "Activity created successfully."
        )
    );
});

export const getNearbyActivities = asyncHandler(async (req, res) => {

    const result = await getNearbyActivitiesService(req.validated.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Nearby activities fetched successfully."
        )
    );
});


export const getActivityById = asyncHandler(async (req, res) => {

    const activity = await getActivityByIdService(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            activity,
            "Activity fetched successfully."
        )
    );
});



export const getMyCreatedActivities = asyncHandler(async (req, res) => {

    const activities =
        await getMyCreatedActivitiesService(
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            activities,
            "Created activities fetched successfully."
        )
    );
});




export const getMyJoinedActivities = asyncHandler(async (req, res) => {

    const activities =
        await getMyJoinedActivitiesService(
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            activities,
            "Joined activities fetched successfully."
        )
    );
});




export const updateActivity = asyncHandler(async (req, res) => {

    const activity =
        await updateActivityService(
            req.params.id,
            req.user._id,
            req.validated.body
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            activity,
            "Activity updated successfully."
        )
    );
});




export const leaveActivity = asyncHandler(async (req, res) => {

    const activity =
        await leaveActivityService(
            req.params.id,
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            activity,
            "Left activity successfully."
        )
    );
});




export const cancelActivity = asyncHandler(async (req, res) => {

    const activity =
        await cancelActivityService(
            req.params.id,
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            activity,
            "Activity cancelled successfully."
        )
    );
});




export const deleteActivity = asyncHandler(async (req, res) => {

    await deleteActivityService(
        req.params.id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Activity deleted successfully."
        )
    );
});