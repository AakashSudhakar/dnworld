// index.js

var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/dnworld");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render
})

app.listen(3000 function() {
  console.log("Nomad draft listening on port 3000");
});
