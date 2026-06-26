import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    joinActivityService,
    getSentRequestsService,
    getReceivedRequestsService,
    approveRequestService,
    rejectRequestService,
    cancelJoinRequestService,
} from "../services/joinRequest.service.js";


export const joinActivity = asyncHandler(async (req, res) => {

    const result = await joinActivityService(
        req.params.id,
        req.user._id,
        req.validated.body?.message
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            result.joined
                ? "Joined activity successfully."
                : "Join request sent successfully."
        )
    );
});


export const getSentRequests = asyncHandler(async (req, res) => {

    const requests = await getSentRequestsService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            requests,
            "Sent requests fetched successfully."
        )
    );
});


export const getReceivedRequests = asyncHandler(async (req, res) => {

    const requests = await getReceivedRequestsService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            requests,
            "Received requests fetched successfully."
        )
    );
});


export const approveRequest = asyncHandler(async (req, res) => {

    const activity = await approveRequestService(
        req.params.id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            activity,
            "Request approved successfully."
        )
    );
});


export const rejectRequest = asyncHandler(async (req, res) => {

    await rejectRequestService(
        req.params.id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Request rejected successfully."
        )
    );
});


export const cancelJoinRequest = asyncHandler(async (req, res) => {

    await cancelJoinRequestService(
        req.params.id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Join request cancelled successfully."
        )
    );
});