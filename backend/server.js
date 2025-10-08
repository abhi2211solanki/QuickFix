// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to JSON file (acts as a database)
const dataPath = path.join(__dirname, "complaints.json");

// Helper functions
function readComplaints() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Error reading complaints:", err);
    return [];
  }
}

function writeComplaints(complaints) {
  fs.writeFileSync(dataPath, JSON.stringify(complaints, null, 2));
}

// Routes
app.get("/", (req, res) => {
  res.send("✅ QuickFix JSON Backend is running...");
});

app.get("/api/complaints", (req, res) => {
  const complaints = readComplaints();
  res.json({ success: true, count: complaints.length, data: complaints });
});

app.post("/api/complaints", (req, res) => {
  const { name, room, category, details } = req.body;

  if (!name || !room || !category || !details) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const complaints = readComplaints();

  const newComplaint = {
    id: Date.now(),
    name,
    room,
    category,
    details,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  complaints.push(newComplaint);
  writeComplaints(complaints);

  res
    .status(201)
    .json({ success: true, message: "Complaint added!", data: newComplaint });
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`)
);
