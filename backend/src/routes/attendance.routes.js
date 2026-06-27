import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import ensureRegistered
from "../middleware/registered.middleware.js";

import {
    markAttendance,
    getAttendance,
} from "../controllers/attendance.controller.js";

import {
    markAttendanceSchema,
} from "../validators/attendance.validator.js";

const router = Router();

router.post(
    "/:id",
    verifyJWT,
    ensureRegistered,
    validate(markAttendanceSchema),
    markAttendance
);

router.get(
    "/:id",
    verifyJWT,
    getAttendance
);

export default router;