const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    //notes page route
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });
    app.post("/api/notes", function (req, res) {
      //add new note
      let New = req.body;
      notes.push(New);
      update();
      return console.log("Added Note: " + New.title);
    });
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });

    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "./notes.html"));
    });
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "./index.html"));
    });
    //delete note
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      update();
      console.log("Deleted Note:" + req.params.id);
    });

    function update() {
      fs.writeFile("db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
