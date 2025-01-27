const express = require("express");
const multer = require("multer");
const {
  getAllContacts,
  getSingleContact,
  getAllContactforAUser,
  createContact,
  deleteContact,
  updateContact,
  shareContact,
} = require("../controllers/contactController");

const router = express.Router();

// Multer setup for profile photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, process.env.UPLOADS_DIR || "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
    cb(null, true);
  },
});

// GET all contacts regardless
router.get("/", getAllContacts);

// GET a single contact by ID
router.get("/:id", getSingleContact);

// GET all contacts for a specific user
router.get("/:userId", getAllContactforAUser);

// POST a contact
router.post("/", upload.single("profilePhoto"), createContact);

// DELETE a contact
router.delete("/:id", deleteContact);

// Share a contact
router.post("/share/:id", shareContact);

// UPDATE a contact
router.patch("/:id", upload.single("profilePhoto"), updateContact);

module.exports = router;
