import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js";
import env from "./config/env.js";

const app = express();

app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(express.static("public"));


app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Playvora Backend Running",
    });
});

//import routes
import authRoutes from "./routes/auth.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import joinRequestRoutes from "./routes/joinRequest.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/join-requests",joinRequestRoutes);
app.use("/api/v1/attendance",attendanceRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);



app.use(errorHandler);
export default app;