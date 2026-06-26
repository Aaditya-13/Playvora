import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PlayNear Backend Running 🚀",
    });
});

export default app;