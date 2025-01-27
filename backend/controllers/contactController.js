const Contact = require("../models/contactModel");

// GET all Contacts regardless
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    // Find the contact
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res
      .status(500)
      .json({ message: "Error fetching contact", error: error.message });
  }
};

// Get all contacts for a user
const getAllContactforAUser = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.userId });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  const { firstName, lastName, contactNumber, email, userId } = req.body;

  try {
    const contact = new Contact({
      firstName,
      lastName,
      contactNumber,
      email,
      userId,
      profilePhoto: req.file ? req.file.filename : null,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    Object.assign(contact, req.body);
    if (req.file) contact.profilePhoto = req.file.filename;

    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Share a contact with another user
const shareContact = async (req, res) => {
  try {
    const { id } = req.params; // Contact ID
    const { userId } = req.body; // User ID to share with

    // Validate IDs
    if (!id || !userId) {
      return res
        .status(400)
        .json({ message: "Contact ID and User ID are required" });
    }

    // Find the contact
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // // Authorization check (assuming req.user is populated)
    // if (!req.user || !contact.userId.equals(req.user.id)) {
    //   return res
    //     .status(403)
    //     .json({ message: "Not authorized to share this contact" });
    // }

    // Check if the user is already in the sharedWith array
    if (!contact.sharedWith.includes(userId)) {
      contact.sharedWith.push(userId);
      await contact.save();
    }

    res.status(200).json({ message: "Contact shared successfully", contact });
  } catch (error) {
    console.error("Error sharing contact:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error sharing contact", error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  getAllContactforAUser,
  createContact,
  deleteContact,
  updateContact,
  shareContact,
};
