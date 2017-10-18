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
var methodOverride = require("method-override")
var mongoose = require("mongoose");
var $ = require("jquery");
var jade = require("jade");
var app = express();
var Status = mongoose.model("Status", {
  // either change 'subject' to 'title' here to match the hb file, or change the hb reference from title to subject -L
  subject: String, 
  // This should be any amount of keywords the user inputs
  keywords: [ String ],
  country: String,
  city: String,
  description: String
});
var Country = mongoose.model("Country", {
  country: String,
  city: String
});
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/dnworld");

// ============================================================================

// Initializing Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Additional initializations
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ==================================================================================================================================

// INDEX: Directs user to home page
app.get("/", function(req, res) {
  Status.find(function(err, statuses) {
    res.render("statuses-index", { statuses: statuses });
  });
});

// NEW: New form request (statuses)
app.get("/statuses/new", function(req, res) {
  res.render("statuses-new", { status: {} });
});

// // NEW: New form request (globe)
// app.get("/globe", function(req, res) {
//   res.render("globe-new", {});
// });

// // SHOW (globe)
// app.get("/globe/:id", function(req, res) {
//   Country.findById(req.params.id).exec(function(err, status) {
//     res.render("globe-show", {globe: globe});
//   });
// });

// SHOW (statuses)
app.get("/statuses/:id", function(req, res) {
  Status.findById(req.params.id).exec(function(err, status) {
    res.render("statuses-show", {status: status});
  });
});

// EDIT
app.get("/statuses/:id/edit", function(req, res) {
  Status.findById(req.params.id, function(err, status) {
    res.render("statuses-edit", {status: status});
  });
});

// CREATE
app.post("/statuses", function(req, res) {
  Status.create(req.body, function(err, status) {
    //console.log(req.body);

    res.redirect("/statuses/" + status._id);
  });
});

// UPDATE
app.post("/statuses/:id", function(req, res) {
  Status.findByIdAndUpdate(req.params.id, req.body, function(err, status) {
    res.redirect("/statuses/" + status._id);
  });
});

// App listening to port 3000
app.listen(3000, function() {
  console.log("Nomad draft listening on port 3000");
  console.log(Status);
});
