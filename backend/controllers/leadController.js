const db = require("../config/db");

// Add Lead
exports.addLead = (req, res) => {

  const {
    name,
    email,
    source,
    status,
    notes,
  } = req.body;

  const sql =
    "INSERT INTO leads (name, email, source, status, notes) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, source, status, notes],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Lead Added",
      });

    }
  );
};

// Get Leads
exports.getLeads = (req, res) => {

  const sql = "SELECT * FROM leads";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });
};

// Delete Lead
exports.deleteLead = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM leads WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Lead Deleted",
    });

  });
};