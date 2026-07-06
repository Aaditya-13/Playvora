import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import crypto from "crypto"

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId).select("+refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken,
        refreshToken,
    };
};


export const registerUserService = async (payload) => {
    const { username, fullName, email, password } = payload;

    const existingUser = await User.findOne({
        $or: [
            { username },
            { email },
        ],
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "Username or email already exists"
        );
    }

    const user = await User.create({
        username,
        fullName,
        email,
        password,
    });

    return await User.findById(user._id).select("-password -refreshToken");
};


export const loginUserService = async (payload) => {
    const { email, password } = payload;

    const user = await User.findOne({ email })
        .select("+password +refreshToken");

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const isPasswordCorrect =
        await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const {
        accessToken,
        refreshToken,
    } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

    return {
        user: loggedInUser,
        accessToken,
        refreshToken,
    };
};


export const logoutUserService = async (userId) => {
    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );
};


export const refreshAccessTokenService = async (incomingRefreshToken) => {
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id).select("+refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token expired or reused");
    }

    const {
        accessToken,
        refreshToken,
    } = await generateAccessAndRefreshTokens(user._id);

    return {
        accessToken,
        refreshToken,
    };
};


export const deleteAccountService = async (userId, password) => {
    const user = await User.findById(userId)
        .select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect =
        await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }

    await User.findByIdAndDelete(userId);
};


export const guestLoginService = async () => {

    const random = crypto.randomBytes(4).toString("hex");

    const username = `guest_${random}`;

    const email = `${username}@playvora.local`;

    const password = crypto
      .randomBytes(16)
      .toString("hex")
      .slice(0, 28);

    const expireAt = new Date();

    expireAt.setDate(expireAt.getDate() + 7);

    const user = await User.create({

        username,

        fullName: "Guest",

        email,

        password,

        isGuest: true,

        authProvider: "guest",

        expireAt,

    });

    const {

        accessToken,

        refreshToken,

    } = await generateAccessAndRefreshTokens(
        user._id
    );

    const guestUser =
        await User.findById(user._id)
            .select("-password -refreshToken");

    return {

        user: guestUser,

        accessToken,

        refreshToken,

    };

};