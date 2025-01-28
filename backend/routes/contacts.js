const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // Import your auth middleware
const {
  getAllContactsForUser,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
  shareContact,
} = require("../controllers/contactController");

const router = express.Router();

router.use(protect); // Apply protect middleware to all routes

router.get("/", getAllContactsForUser);
router.get("/:id", getSingleContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.post("/:id/share", shareContact);

module.exports = router;
