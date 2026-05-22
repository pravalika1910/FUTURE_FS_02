const express = require("express");

const router = express.Router();

const {
  addLead,
  getLeads,
  deleteLead,
} = require("../controllers/leadController");

// Add Lead
router.post("/", addLead);

// Get Leads
router.get("/", getLeads);

// Delete Lead
router.delete("/:id", deleteLead);

module.exports = router;