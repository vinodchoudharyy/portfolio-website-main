require("dotenv").config(); // ✅ Always load env first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Set Mongo URI based on environment
const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_ATLAS_URI
    : process.env.MONGODB_URI;

// ✅ MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ API Route
app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
