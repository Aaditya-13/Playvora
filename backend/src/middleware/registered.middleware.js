import ApiError from "../utils/ApiError.js";

const ensureRegistered = (
    req,
    res,
    next
) => {

    if (req.user.isGuest) {

        return next(

            new ApiError(

                403,

                "Please register to continue."

            )

        );

    }

    next();

};

export default ensureRegistered;