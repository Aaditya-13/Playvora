import Activity from "../models/Activity.model.js";
import JoinRequest from "../models/JoinRequest.model.js";
import User from "../models/User.model.js";


export const getDashboardService = async (
    userId
) => {

    const [

        user,

        createdActivities,

        joinedActivities,

        pendingRequests,

        upcomingCreated,

        upcomingJoined,

    ] = await Promise.all([

        User.findById(userId)
            .select("-password -refreshToken"),

        Activity.countDocuments({

            organizer: userId,

            isDeleted: false,

        }),

        Activity.countDocuments({

            participants: userId,

            isDeleted: false,

        }),

        JoinRequest.countDocuments({

            user: userId,

        }),

        Activity.find({

            organizer: userId,

            scheduledAt: {
                $gte: new Date(),
            },

            isDeleted: false,

        })
        .sort({
            scheduledAt: 1,
        })
        .limit(5),

        Activity.find({

            participants: userId,

            scheduledAt: {
                $gte: new Date(),
            },

            isDeleted: false,

        })
        .sort({
            scheduledAt: 1,
        })
        .limit(5),

    ]);

    return {

        user,

        stats: {

            activitiesCreated:
                createdActivities,

            activitiesJoined:
                joinedActivities,

            reliabilityScore:
                user.reliabilityScore,

        },

        pendingRequests,

        upcomingCreated,

        upcomingJoined,

    };

};