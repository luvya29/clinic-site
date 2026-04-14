const express = require("express");
const path = require("path");

const app = express();

// Serve static files (your HTML, CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Example API route
