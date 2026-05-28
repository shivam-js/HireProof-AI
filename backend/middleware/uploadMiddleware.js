import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const uploadDir = path.join(
  __dirname,
  "../uploads/resumes"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes =
    /pdf|doc|docx/;

  const extensionName =
    allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

  const mimeType =
    allowedFileTypes.test(file.mimetype);

  if (extensionName && mimeType) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only PDF, DOC, and DOCX files are allowed."
    )
  );
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

export default upload;