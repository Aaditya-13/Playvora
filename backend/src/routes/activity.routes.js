import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createActivity,
    getNearbyActivities,
    getMyCreatedActivities,
    getMyJoinedActivities,
    getActivityById,
    updateActivity,
    leaveActivity,
    cancelActivity,
    deleteActivity
} from "../controllers/activity.controller.js";

import { joinActivity } from "../controllers/joinRequest.controller.js";

import {
    createActivitySchema,
    updateActivitySchema
} from "../validators/activity.validator.js";

import {
  nearbyActivitiesSchema
} from "../validators/activity-query.validator.js"

import { 
  joinActivitySchema 
} from "../validators/join.validator.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    validate(createActivitySchema),
    createActivity
);

router.get(
    "/nearby",
    verifyJWT,
    validate(nearbyActivitiesSchema, "query"),
    getNearbyActivities
);


router.get(
    "/my-created",
    verifyJWT,
    getMyCreatedActivities
);

router.get(
    "/my-joined",
    verifyJWT,
    getMyJoinedActivities
);

router.get(
    "/:id",
    verifyJWT,
    getActivityById
);

router.patch(
    "/:id",
    verifyJWT,
    validate(updateActivitySchema),
    updateActivity
);

router.post(
    "/:id/join",
    verifyJWT,
    validate(joinActivitySchema),
    joinActivity
);


router.post(
    "/:id/leave",
    verifyJWT,
    leaveActivity
);

router.patch(
    "/:id/cancel",
    verifyJWT,
    cancelActivity
);

router.delete(
    "/:id",
    verifyJWT,
    deleteActivity
);

export default router;