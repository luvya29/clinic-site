
const express = require("express");
const { Pool } = require("pg");
const app = express();

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Add patient
app.post("/add-patient", async (req, res) => {
  const { name, treatment, total_amount } = req.body;
  const balance = total_amount;

  const result = await pool.query(
    "INSERT INTO patients (name, treatment, total_amount, balance) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, treatment, total_amount, balance]
  );

  res.json(result.rows[0]);
});

// Update payment
app.post("/pay", async (req, res) => {
  const { id, amount } = req.body;

  await pool.query(
    "UPDATE patients SET paid_amount = paid_amount + $1, balance = balance - $1 WHERE id=$2",
    [amount, id]
  );

  await pool.query(
    "INSERT INTO logs (patient_id, action, amount) VALUES ($1,$2,$3)",
    [id, "payment", amount]
  );

  res.send("Updated");
});

// Get all patients
app.get("/patients", async (req, res) => {
  const result = await pool.query("SELECT * FROM patients");
  res.json(result.rows);
});

// Get logs
app.get("/logs/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM logs WHERE patient_id=$1",
    [req.params.id]
  );
  res.json(result.rows);
});

app.listen(3000, () => console.log("Server running"));




// Serve static files
app.use(express.static(__dirname));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ VERY IMPORTANT LINE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
