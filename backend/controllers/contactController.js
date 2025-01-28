const Contact = require("../models/contactModel");

// Get all contacts for the logged-in user (including shared ones)
const getAllContactsForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Extract from token

    // Fetch contacts owned by the user or shared with them
    const contacts = await Contact.find({
      userId,
    });
    const sharedContacts = await Contact.find({
      sharedWith: userId,
    });
    res.status(200).json({ contacts, sharedContacts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contacts", error: error.message });
  }
};

// Get a single contact (if user owns it or it's shared)
const getSingleContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const contact = await Contact.findOne({
      _id: id,
      $or: [{ userId }, { sharedWith: userId }],
    });

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contact", error: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, email } = req.body;
    const userId = req.user._id;
    const contact = new Contact({
      userId: userId,
      firstName,
      lastName,
      contactNumber,
      email,
      profilePhoto: req.file ? req.file.filename : null,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating contact", error: error.message });
  }
};

// Update contact (only if user owns it)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const contact = await Contact.findOne({ _id: id, userId });
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    Object.assign(contact, req.body);
    if (req.file) contact.profilePhoto = req.file.filename;

    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating contact", error: error.message });
  }
};

// Delete contact (only if user owns it)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const contact = await Contact.findOneAndDelete({ _id: id, userId });
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
};

const shareContact = async (req, res) => {
  try {
    const { id } = req.params; // Contact ID
    const { userId: targetUserId } = req.body; // User to share with
    const userId = req.user?._id; // Current user (check if exists)

    console.log("Contact ID:", id);
    console.log("Target User ID:", targetUserId);
    console.log("Logged-in User ID:", userId);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const contact = await Contact.findOne({ _id: id, userId });
    console.log("Found Contact:", contact);

    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found or unauthorized" });
    }

    if (!contact.sharedWith.includes(targetUserId)) {
      contact.sharedWith.push(targetUserId);
      await contact.save();
    }

    res.status(200).json({ message: "Contact shared successfully", contact });
  } catch (error) {
    console.error("Error in shareContact:", error);
    res
      .status(500)
      .json({ message: "Error sharing contact", error: error.message });
  }
};

module.exports = {
  getAllContactsForUser,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
  shareContact,
};
