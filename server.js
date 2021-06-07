const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
// require("./routes")(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
//can not execute before here
require("./routes")(app);

app.listen(PORT, function () {
  console.log("ON PORT #: " + PORT);
});
