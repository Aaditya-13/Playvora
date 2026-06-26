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
        message: "PlayNear Backend Running",
    });
});

//import routes
import authRoutes from "./routes/auth.routes.js";
import activityRoutes from "./routes/activity.routes.js";

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/activities", activityRoutes);




app.use(errorHandler);
export default app;