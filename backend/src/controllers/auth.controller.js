import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { deleteAccountService } from "../services/auth.service.js";

import {
    registerUserService,
    loginUserService,
    logoutUserService,
    refreshAccessTokenService,
    guestLoginService
} from "../services/auth.service.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
};

export const registerUser = asyncHandler(async (req, res) => {
    const user = await registerUserService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User registered successfully. Please login."
        )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
    const {
        user,
        accessToken,
        refreshToken,
    } = await loginUserService(req.body);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user,
                    accessToken,
                },
                "Login successful"
            )
        );
});

export const logoutUser = asyncHandler(async (req, res) => {
    await logoutUserService(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                null,
                "Logout successful"
            )
        );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken =
        req.cookies.refreshToken ||
        req.body.refreshToken;

    const {
        accessToken,
        refreshToken,
    } = await refreshAccessTokenService(
        incomingRefreshToken
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                },
                "Access token refreshed successfully"
            )
        );
});

export const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully"
        )
    );
});


export const deleteAccount = asyncHandler(async (req, res) => {

    await deleteAccountService(
        req.user._id,
        req.body.password
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                null,
                "Account deleted successfully"
            )
        );
});




export const guestLogin =
asyncHandler(async (req, res) => {

    const {

        user,

        accessToken,

        refreshToken,

    } = await guestLoginService();

    return res

        .status(200)

        .cookie(
            "accessToken",
            accessToken,
            cookieOptions
        )

        .cookie(
            "refreshToken",
            refreshToken,
            cookieOptions
        )

        .json(

            new ApiResponse(

                200,

                {

                    user,

                    accessToken,

                },

                "Guest login successful."

            )

        );

});