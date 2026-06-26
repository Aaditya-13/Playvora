import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    joinActivitySchema,
} from "../validators/join.validator.js";

import {
    joinActivity,
    getSentRequests,
    getReceivedRequests,
    approveRequest,
    rejectRequest,
    cancelJoinRequest,
} from "../controllers/joinRequest.controller.js";

const router = Router();

// router.post(
//     "/activities/:id/join",
//     verifyJWT,
//     validate(joinActivitySchema),
//     joinActivity
// );

router.get(
    "/sent",
    verifyJWT,
    getSentRequests
);

router.get(
    "/received",
    verifyJWT,
    getReceivedRequests
);

router.patch(
    "/:id/approve",
    verifyJWT,
    approveRequest
);

router.patch(
    "/:id/reject",
    verifyJWT,
    rejectRequest
);

router.delete(
    "/:id",
    verifyJWT,
    cancelJoinRequest
);

export default router;