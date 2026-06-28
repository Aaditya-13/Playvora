import ApiError from "../utils/ApiError.js";


const validate = (schema, source = "body") => {
    return (req, res, next) => {

        const data = req[source] ?? {};

        const result = schema.safeParse(data);

        if (!result.success) {
            console.dir(result.error.issues, { depth: null });
          console.dir(error.flatten(), { depth: null });
          console.dir(error.issues, { depth: null });
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