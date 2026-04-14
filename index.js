const express = require("express");
const path = require("path");

const app = express();

// Serve static files (your HTML, CSS, images)
app.use(express.static(__dirname));

// Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
