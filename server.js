// Dependencies
const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

// Set an initial port
const PORT = process.env.PORT || 8080;

// Set up express and tell it where to find static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('frontend/dist'));

// Route for API call that runs Puppeteer
require("./app/routing/apiRoutes")(app);

// Catch-all route
app.get('*', (req, res) => {
  res.redirect('/');
});

// Starts server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});