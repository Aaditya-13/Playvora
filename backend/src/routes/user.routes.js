import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { updateAvatar } from "../controllers/user.controller.js";

import ensureRegistered
from "../middleware/registered.middleware.js";

import {

    getCurrentUser,

    updateProfile,

    updateFavouriteSports,

    getUserStats,

    globalSearch,

    bootstrap,

    changePassword

} from "../controllers/user.controller.js";

import {

    updateProfileSchema,

    updateFavouriteSportsSchema,

    searchSchema,

    changePasswordSchema

} from "../validators/user.validator.js";

const router = Router();

router.get(

    "/me",

    verifyJWT,

    getCurrentUser

);

router.patch(

    "/profile",

    verifyJWT,

    ensureRegistered,

    validate(updateProfileSchema),

    updateProfile

);

router.patch(

    "/favourite-sports",

    verifyJWT,

    validate(updateFavouriteSportsSchema),

    updateFavouriteSports

);


router.patch(

    "/avatar",

    verifyJWT,

    ensureRegistered,

    upload.single("avatar"),

    updateAvatar

);


router.get(
    "/me/stats",
    verifyJWT,
    getUserStats
);


router.get(
    "/search",
    verifyJWT,
    validate(searchSchema, "query"),
    globalSearch
);

router.get(
    "/bootstrap",
    verifyJWT,
    bootstrap
);



router.patch(

    "/change-password",

    verifyJWT,

    ensureRegistered,

    validate(changePasswordSchema),

    changePassword

);

export default router;