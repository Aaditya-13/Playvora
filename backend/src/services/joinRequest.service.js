import Activity from "../models/Activity.model.js";
import JoinRequest from "../models/JoinRequest.model.js";
import ApiError from "../utils/ApiError.js";


export const joinActivityService = async (
    activityId,
    userId,
    message = ""
) => {

    const activity = await Activity.findById(activityId);

    if (!activity || activity.isDeleted) {
        throw new ApiError(404, "Activity not found");
    }

    if (activity.organizer.toString() === userId.toString()) {
        throw new ApiError(
            400,
            "Organizer is already a participant."
        );
    }

    if (activity.status !== "open") {
        throw new ApiError(
            400,
            "Activity is not accepting participants."
        );
    }

    if (
        activity.participants.some(
            participant =>
                participant.toString() === userId.toString()
        )
    ) {
        throw new ApiError(
            400,
            "Already joined this activity."
        );
    }

    if (
        activity.currentPlayers >=
        activity.maxPlayers
    ) {
        throw new ApiError(
            400,
            "Activity is full."
        );
    }

    if (activity.joinPolicy === "open") {

        activity.participants.push(userId);

        activity.currentPlayers++;

        if (
            activity.currentPlayers ===
            activity.maxPlayers
        ) {
            activity.status = "full";
        }

        await activity.save();

        return {
            joined: true,
            activity,
        };
    }

    const existingRequest =
        await JoinRequest.findOne({
            activity: activityId,
            user: userId,
        });

    if (existingRequest) {
        throw new ApiError(
            400,
            "Join request already exists."
        );
    }

    const request =
        await JoinRequest.create({

            activity: activityId,

            user: userId,

            message,

        });

    return {
        joined: false,
        request,
    };
};


export const getSentRequestsService = async (userId) => {

    return await JoinRequest.find({
        user: userId,
    })
    .populate(
        "activity"
    )
    .populate(
        {
            path:"activity",
            populate:{
                path:"organizer",
                select:"username fullName avatar"
            }
        }
    );

};




export const getReceivedRequestsService = async (
    organizerId
) => {

    return await JoinRequest.find()
    .populate({
        path:"activity",
        match:{
            organizer:organizerId,
        },
    })
    .populate(
        "user",
        "username fullName avatar reliabilityScore"
    )
    .then(requests =>
        requests.filter(
            request => request.activity
        )
    );

};





export const approveRequestService = async (
    requestId,
    organizerId
) => {

    const request =
        await JoinRequest.findById(requestId)
        .populate("activity");

    if (!request) {
        throw new ApiError(
            404,
            "Request not found"
        );
    }

    if (
        request.activity.organizer.toString() !==
        organizerId.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    if (
        request.activity.currentPlayers >=
        request.activity.maxPlayers
    ) {
        throw new ApiError(
            400,
            "Activity is full"
        );
    }

    request.activity.participants.push(
        request.user
    );

    request.activity.currentPlayers++;

    if (
        request.activity.currentPlayers ===
        request.activity.maxPlayers
    ) {
        request.activity.status = "full";
    }

    await request.activity.save();

    await JoinRequest.findByIdAndDelete(requestId);

    return request.activity;
};




export const rejectRequestService = async (
    requestId,
    organizerId
) => {

    const request =
        await JoinRequest.findById(requestId)
        .populate("activity");

    if (!request) {
        throw new ApiError(
            404,
            "Request not found"
        );
    }

    if (
        request.activity.organizer.toString() !==
        organizerId.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    await JoinRequest.findByIdAndDelete(
        requestId
    );

};




export const cancelJoinRequestService = async (
    requestId,
    userId
) => {

    const request =
        await JoinRequest.findById(requestId);

    if (!request) {
        throw new ApiError(
            404,
            "Request not found"
        );
    }

    if (
        request.user.toString() !==
        userId.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    await JoinRequest.findByIdAndDelete(
        requestId
    );

};