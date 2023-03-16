const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  CLOUD_NAME: "wows",
  CLOUDINARY_API_KEY: 785164241988465,
  CLOUDINARY_API_SECRET: "Bnz02Q1rQ_lVEJ6DsBvclpP9avw",
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.UploadStream.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
