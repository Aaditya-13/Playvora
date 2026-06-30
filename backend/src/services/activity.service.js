import Activity from "../models/Activity.model.js";
import ApiError from "../utils/ApiError.js";


export const createActivityService = async (
  organizerId,
  payload
) => {

  const {
    latitude,
    longitude,
    scheduledAt,
    maxPlayers,

    ...activityData
  } = payload;

  // dont allow past activites
  const scheduledDate = new Date(scheduledAt);

  if (scheduledDate <= new Date()) {
    throw new ApiError(
      400,
      "Activity must be scheduled in the future."
    );
  }


  // create GeoJSON
  const location = {
    type: "Point",
    coordinates: [
      longitude,
      latitude,
    ],
  };

  // organizer auto include
  const participants = [
    organizerId,
  ];

  // create activity
  const activity =
    await Activity.create({

      ...activityData,

      organizer: organizerId,

      participants,

      location,

      scheduledAt,

      maxPlayers,

      currentPlayers: 1,

    });

  return await Activity.findById(activity._id)
    .populate(
      "organizer",
      "username fullName avatar"
    )
    .populate(
      "participants",
      "username fullName avatar"
    );
};


export const getNearbyActivitiesService = async (queryParams) => {
  const {
    lat,
    lng,
    radius,
    sport,
    skillLevel,
    page,
    limit,
  } = queryParams;

  const query = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: radius,
      },
    },

    scheduledAt: {
      $gte: new Date(),
    },

    status: "open",

    isDeleted: false,
  };

  if (sport) {
    query.sport = sport;
  }

  if (skillLevel) {
    query.skillLevel = skillLevel;
  }

  const skip = (page - 1) * limit;

  const activities = await Activity.find(query)
    .populate(
      "organizer",
      "username fullName avatar reliabilityScore"
    )
    .skip(skip)
    .limit(limit);

  return {
    activities,
  };
};

export const getActivityByIdService = async (activityId) => {
    const activity = await Activity.findById(activityId)
        .populate(
            "organizer",
            "username fullName avatar reliabilityScore isVerified"
        )
        .populate(
            "participants",
            "username fullName avatar"
        );

    if (!activity || activity.isDeleted) {
        throw new ApiError(404, "Activity not found");
    }

    return activity;
};



export const getMyCreatedActivitiesService = async (userId) => {

    return await Activity.find({
        organizer: userId,
        isDeleted: false,
    }).sort({
        scheduledAt: 1,
    });

};


export const getMyJoinedActivitiesService = async (userId) => {

    return await Activity.find({
        participants: userId,
        isDeleted: false,
    }).sort({
        scheduledAt: 1,
    });

};


export const updateActivityService = async (
    activityId,
    userId,
    payload
) => {

    const activity = await Activity.findById(activityId);

    if (!activity || activity.isDeleted) {
        throw new ApiError(404, "Activity not found");
    }

    if (activity.organizer.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "Only organizer can update activity"
        );
    }

    Object.assign(activity, payload);

    await activity.save();

    return activity;
};


export const leaveActivityService = async (
    activityId,
    userId
) => {

    const activity = await Activity.findById(activityId);

    if (!activity || activity.isDeleted) {
        throw new ApiError(404, "Activity not found");
    }

    if (activity.organizer.toString() === userId.toString()) {
        throw new ApiError(
            400,
            "Organizer cannot leave their own activity."
        );
    }

    const participantIndex =
        activity.participants.findIndex(
            participant =>
                participant.toString() === userId.toString()
        );

    if (participantIndex === -1) {
        throw new ApiError(
            400,
            "You are not a participant."
        );
    }

    activity.participants.splice(participantIndex, 1);

    activity.currentPlayers--;

    if (
        activity.status === "full" &&
        activity.currentPlayers < activity.maxPlayers
    ) {
        activity.status = "open";
    }

    await activity.save();

    return activity;
};



export const cancelActivityService = async (
    activityId,
    organizerId
) => {

    const activity = await Activity.findById(activityId);

    if (!activity || activity.isDeleted) {
        throw new ApiError(404, "Activity not found");
    }

    if (
        activity.organizer.toString() !== organizerId.toString()
    ) {
        throw new ApiError(
            403,
            "Only organizer can cancel activity."
        );
    }

    activity.status = "cancelled";

    await activity.save();

    return activity;
};



export const deleteActivityService = async (
    activityId,
    organizerId
) => {

    const activity = await Activity.findById(activityId);

    if (!activity || activity.isDeleted) {
        throw new ApiError(404, "Activity not found");
    }

    if (
        activity.organizer.toString() !== organizerId.toString()
    ) {
        throw new ApiError(
            403,
            "Only organizer can delete activity."
        );
    }

    activity.isDeleted = true;

    await activity.save();

    return;
};



export const completeActivityService = async (
    activityId,
    organizerId
) => {

    const activity = await Activity.findById(activityId);

    if (!activity || activity.isDeleted) {
        throw new ApiError(
            404,
            "Activity not found."
        );
    }

    if (
        activity.organizer.toString() !==
        organizerId.toString()
    ) {
        throw new ApiError(
            403,
            "Only the organizer can complete this activity."
        );
    }

    if (activity.status === "cancelled") {
        throw new ApiError(
            400,
            "Cancelled activities cannot be completed."
        );
    }

    if (activity.status === "completed") {
        throw new ApiError(
            400,
            "Activity is already completed."
        );
    }

    if (new Date() < activity.scheduledAt) {
        throw new ApiError(
            400,
            "Activity has not started yet."
        );
    }

    activity.status = "completed";

    await activity.save();

    return;
};