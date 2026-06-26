import ApiError from "../utils/ApiError.js";


const validate = (schema, source = "body") => {
    return (req, res, next) => {

        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return next(
                new ApiError(
                    400,
                    "Validation failed",
                    result.error.issues
                )
            );
        }

        req.validated = req.validated || {};
        req.validated[source] = result.data;

        next();
    };
};

export default validate;