import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

import {

    getCurrentUser,

    updateProfile,

    updateFavouriteSports,

} from "../controllers/user.controller.js";

import {

    updateProfileSchema,

    updateFavouriteSportsSchema,

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

    upload.single("avatar"),

    updateAvatar

);

export default router;