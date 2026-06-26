// import ApiError from "../utils/ApiError.js";

// const errorHandler = (req, res, next, err) => {
//     let error = err;

//     if (!(error instanceof ApiError)) {
//         error = new ApiError(
//             error.statusCode || 500,
//             error.message || "Internal Server Error"
//         );
//     }

//     return res.status(error.statusCode).json({
//         success: false,
//         message: error.message,
//         errors: error.errors,
//         stack:
//             process.env.NODE_ENV === "development"
//                 ? error.stack
//                 : undefined,
//     });
// };

// export default errorHandler;



const errorHandler = (err, req, res, next) => {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);
    console.error("===========================");

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        errors: err.errors || [],
    });
};

export default errorHandler;