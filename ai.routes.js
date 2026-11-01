import { Router } from "express";
import multer from "multer";
import { analyzePrescription } from "./ai.service.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (allowed.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Unsupported file type. Upload JPG, PNG, WEBP, or PDF."));
    }
  },
});

router.post(
  "/analyze-prescription",
  upload.single("prescription"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Attach a file in the multipart field named 'prescription'.",
        });
      }

      const data = await analyzePrescription(req.file);
      return res.json({
        success: true,
        message: "Prescription analyzed successfully.",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
