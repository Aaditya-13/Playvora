import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import ensureRegistered
from "../middleware/registered.middleware.js";

import {
    getSentRequests,
    getReceivedRequests,
    approveRequest,
    rejectRequest,
    cancelJoinRequest,
} from "../controllers/joinRequest.controller.js";

const router = Router();


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
    ensureRegistered,
    approveRequest
);

router.patch(
    "/:id/reject",
    verifyJWT,
    ensureRegistered,
    rejectRequest
);

router.delete(
    "/:id",
    verifyJWT,
    ensureRegistered,
    cancelJoinRequest
);

export default router;