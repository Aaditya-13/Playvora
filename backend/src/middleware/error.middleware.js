import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        error = new ApiError(
            error.statusCode || 500,
            error.message || "Internal Server Error"
        );
    }

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        stack:
            process.env.NODE_ENV === "development"
                ? error.stack
                : undefined,
    });
};

export default errorHandler;