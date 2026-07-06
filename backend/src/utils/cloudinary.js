import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadOnCloudinary = async (
    localFilePath,
    folder = "playvora"
) => {

    try {

        if (!localFilePath) return null;

        const response =
            await cloudinary.uploader.upload(

                localFilePath,

                {

                    folder,

                    resource_type: "auto",

                }

            );

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {

        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath);
        }

        throw error;

    }

};

export const deleteFromCloudinary =
async (publicId) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(
        publicId
    );

};