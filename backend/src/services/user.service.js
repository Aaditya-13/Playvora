import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";

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



export const updateAvatarService =
async (
    userId,
    file
) => {

    if (!file) {

        throw new ApiError(
            400,
            "Avatar file is required."
        );

    }

    const user =
        await User.findById(userId);

    if (!user) {

        throw new ApiError(
            404,
            "User not found."
        );

    }

    if (
        user.avatar.publicId
    ) {

        await deleteFromCloudinary(
            user.avatar.publicId
        );

    }

    const uploaded =
        await uploadOnCloudinary(

            file.path,

            "playvora/avatars"

        );

    user.avatar = {

        url: uploaded.secure_url,

        publicId:
            uploaded.public_id,

    };

    await user.save();

    return await User.findById(userId)
        .select(
            "-password -refreshToken"
        );

};


export const changePasswordService = async (
    userId,
    oldPassword,
    newPassword
) => {

    const user = await User.findById(userId)
        .select("+password");

    if (!user) {
        throw new ApiError(
            404,
            "User not found."
        );
    }

    const isPasswordCorrect =
        await user.isPasswordCorrect(
            oldPassword
        );

    if (!isPasswordCorrect) {
        throw new ApiError(
            400,
            "Old password is incorrect."
        );
    }

    if (oldPassword === newPassword) {
        throw new ApiError(
            400,
            "New password cannot be the same as old password."
        );
    }

    user.password = newPassword;

    user.refreshToken = undefined;

    await user.save({
        validateBeforeSave: false,
    });

    return;
};