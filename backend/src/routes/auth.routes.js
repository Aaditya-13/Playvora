import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    deleteAccount,
    guestLogin
} from "../controllers/auth.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    registerSchema,
    loginSchema,
    deleteAccountSchema
} from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    registerUser
);


router.post(
    "/login",
    validate(loginSchema),
    loginUser
);

router.post(
    "/guest",
    guestLogin
);

router.post(
    "/logout",
    verifyJWT,
    logoutUser
);


router.post(
    "/refresh-token",
    refreshAccessToken
);


router.get(
    "/me",
    verifyJWT,
    getCurrentUser
);

router.delete(
    "/delete-account",
    verifyJWT,
    validate(deleteAccountSchema),
    deleteAccount
);

export default router;