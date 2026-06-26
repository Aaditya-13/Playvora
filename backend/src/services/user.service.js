import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";

export const getCurrentUserService = async (
    userId
) => {

    return await User.findById(userId)
        .select("-password -refreshToken");

};

export const updateProfileService = async (
    userId,
    payload
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    Object.assign(user, payload);

    await user.save();

    return await User.findById(userId)
        .select("-password -refreshToken");

};


export const updateFavouriteSportsService =
async (
    userId,
    favouriteSports
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    user.favouriteSports = favouriteSports;

    await user.save();

    return await User.findById(userId)
        .select("-password -refreshToken");

};