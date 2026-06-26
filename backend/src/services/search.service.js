import Activity from "../models/Activity.model.js";

export const globalSearchService =
async (query) => {

    return await Activity.find({

        isDeleted: false,

        status: "open",

        $or: [

            {
                title: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                sport: {
                    $regex: query,
                    $options: "i",
                },
            },

            {
                groundName: {
                    $regex: query,
                    $options: "i",
                },
            },

        ],

    })
    .populate(
        "organizer",
        "username fullName avatar"
    )
    .limit(20);

};