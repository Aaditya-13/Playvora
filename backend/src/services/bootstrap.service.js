import {

    getDashboardService,

} from "./dashboard.service.js";

import {

    getUserStatsService,

} from "./statistics.service.js";

import User from "../models/User.model.js";

export const bootstrapService =
async (userId) => {

    const [

        user,

        dashboard,

        stats,

    ] = await Promise.all([

        User.findById(userId)
            .select("-password -refreshToken"),

        getDashboardService(userId),

        getUserStatsService(userId),

    ]);

    return {

        user,

        dashboard,

        stats,

        featureFlags: {

            chat: false,

            notifications: false,

            tournaments: false,

        },

        config: {

            maxSearchRadius: 50000,

            appVersion: "1.0.0",

        },

    };

};