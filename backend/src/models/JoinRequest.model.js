import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
    {
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected",
            ],
            default: "pending",
        },

        message: {
            type: String,
            default: "",
            maxlength: 200,
        },
    },
    {
        timestamps: true,
    }
);

joinRequestSchema.index({
    activity: 1,
    user: 1,
}, {
    unique: true,
});

joinRequestSchema.index({
    user: 1,
});

joinRequestSchema.index({
    activity: 1,
});

const JoinRequest = mongoose.model(
    "JoinRequest",
    joinRequestSchema
);

export default JoinRequest;