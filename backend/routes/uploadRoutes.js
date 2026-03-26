import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Logic check: Add this to see if the key is actually reaching this file
// console.log("Debug Key:", process.env.CLOUDINARY_API_KEY);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // We configure it right here to be 100% sure it has the keys
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return {
      folder: "MarketBaseX_Products",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage });

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (req.file) {
      res.status(200).send({
        message: "Image uploaded to Cloudinary",
        image: req.file.path,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
