import User from "../models/User.model.js";

export const updateReliabilityScore = async (
    userId,
    status
) => {

    const user = await User.findById(userId);

    if (!user) return;

    switch (status) {

        case "present":
            user.reliabilityScore = Math.min(
                100,
                user.reliabilityScore + 1
            );
            break;

        case "late":
            user.reliabilityScore = Math.max(
                0,
                user.reliabilityScore - 2
            );
            break;

        case "absent":
            user.reliabilityScore = Math.max(
                0,
                user.reliabilityScore - 10
            );
            break;

    }

    await user.save();
};