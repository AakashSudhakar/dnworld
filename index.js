// index.js (DNWorld)

/*
PRODUCT WRITE-UP: 500-1500 words (2-6 pages) on MEDIUM BLOG
PITCH: Problem, Current Solutions, My Solution, Benefits, Demo
POST DETAILS: What I learned, Steps that I took, Challenges, Reversals of
Expectations/Reality
>> Try to INFORM, PERSUADE, and ENTERTAIN in terms of NARRATIVE STRUCTURE (STORY)
LINK the actual project (I know you'll probably forget this)
*/

/*
v0: CRUDful resourcing (Being RESTful)
v1: Implementing 2nd resource (API, feature)
v2: Implementing 3rd resource (API, feature)
v3: Implementing 4th resource (API, feature)
*/

// ============================================================================

// var request = require("request");
var exphbs = require("express-handlebars");
var express = require("express");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var $ = require("jquery");
var jade = require("jade");
var app = express();
var Status = mongoose.model("Status", {
  subject: String, 
  // This should be any amount of keywords the user inputs
  keywords: [ String ],
  country: String,
  city: String,
  description: String
});
var Address = mongoose.model("Address", {
  country: String,
  city: String
});
var bodyParser = require("body-parser");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;

chai.use(chaiHttp);

mongoose.connect("mongodb://localhost/dnworld");

// ============================================================================

// Initializing Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Additional initializations
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ============================================================================

// INDEX: Directs user to home page
app.get("/", function(req, res) {
  Status.find(function(err, statuses) {
    res.render("statuses-index", { statuses: statuses });
  });
});

// INDEX: Directs user to globe page
app.get("/globe/", function(req, res) {
  Address.find(function(err, globe) {
    res.render("globe-index", { globe: globe });
  });
});

// NEW: New form request (statuses)
app.get("/statuses/new", function(req, res) {
  res.render("statuses-new", { status: {} });
});

// SHOW (statuses)
app.get("/statuses/:id", function(req, res) {
  Status.findById(req.params.id).exec(function(err, status) {
    res.render("statuses-show", {status: status});
  });
});

// SHOW (globe)
app.get("/globe/:id", function(req, res) {
  Address.findById(req.params.id).exec(function(err, globe) {
    res.render("globe-show", { globe: globe });
  });
});

// EDIT (statuses) (BROKEN: Creates new status but doesn't edit current one)
app.get("/statuses/:id/edit", function(req, res) {
  Status.findById(req.params.id, function(err, status) {
    res.render("statuses-edit", {status: status});
  });
});

// CREATE (statuses)
app.post("/statuses", function(req, res) {
  Status.create(req.body, function(err, status) {
    //console.log(req.body);

    res.redirect("/statuses/" + status._id);
  });
});

// UPDATE (statuses)
app.put("/statuses/:id", function(req, res) {
  Status.findByIdAndUpdate(req.params.id, req.body, function(err, status) {
    res.redirect("/statuses/" + status._id);
  });
});

// DELETE (statuses)
app.delete("/statuses/:id", function(req, res) {
  Status.findByIdAndRemove(req.params.id, function(err) {
    res.redirect("/");
  });
});

// ============================================================================

// API Call Request
app.get("api/posts", function(req, res) { // edit
  if (req.header("Content-Type") == "application/json") {
    return res.send({ }); // returns JSON // edit
  } else {
    return res.render("", {}); // edit
  }
});

// ============================================================================

// App listening to port 3000
app.listen(3000, function() {
  console.log("Nomad draft listening on port 3000");
  // console.log(Status);
});

