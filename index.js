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
*/
// ============================================================================

// var request = require("request");
var exphbs = require("express-handlebars");
var express = require("express");
var methodOverride = require("method-override")
var mongoose = require("mongoose");
var $ = require("jquery");
var app = express();
var Status = mongoose.model("Status", {
  subject: String,
  // This should be any amount of keywords the user inputs
  keywords: [ String ],
  country: String,
  city: String,
  description: String
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
    // console.log("Hello world!");
    // res.send("Hello world!");
    res.render("statuses-index", { statuses: statuses });
  });
});

// NEW: New form request
app.get("/statuses/new", function(req, res) {
  res.render("statuses-new", {});
});

// SHOW
app.get("/statuses/:id", function(req, res) {
  Status.findById(req.params.id).exec(function(err, status) {
    res.render("statuses-show", {status: status});
  });
});

// EDIT
app.get("/statuses/:id/edit", function(req, res) {
  Status.findById(reqs.params.id, function(err, status) {
    res.render("statuses-edit", {status: status});
  });
});

// CREATE
app.post("/statuses", function(req, res) {
  Status.create(req.body, function(err, status) {
    // console.log(Status);

    res.redirect("/statuses/" + status._id);
  });
});
/*
// UPDATE
app.put("/statuses/:id", function(req, res) {
  Status.findByIdAndUpdate(req.params.id, req.body, function(err, review) {
    res.redirect("statuses/" + status._id);
  });
});

  /* $(document).ready(function() {
      var arr = {
         "unitedStatesOfAmerica":{
             "Population": 300000000,
             "GDP":123456789,
             "Capital": "Washington, D.C."
         },
         "india":{
             "Population":1300000000,
             "GDP":55555555,
             "Capital":"New Delhi"
         },
          "china":{
              "Population":1400000000,
              "GDP":121212121,
              "Capital":"Beijing"
         }
       };

       console.log(arr[0][1]); */

      /*for (var key in json) {
        if (json.hasOwnProperty(key) {
          var reclaimer = json[key];
          arr.push({
            population: reclaimer.Population,
            gdp: reclaimer.GDP,
            capital: reclaimer.Capital
          });
        });
      }
      console.log(arr); */

    // Attempting to access World Bank API data
  /*  $(function() {
      $.ajax({
        contentType: "/application/json",
        dataType: "json",
        crossDomain: true,
        url: "http://api.worldbank.org/countries?format=json",
        success: function() {
          console.log("SUCCESS");
        },
        error: function() {
          console.log("ERROR");
        }
      });
    }); */

// App listening
app.listen(3000, function() {
  console.log("Nomad draft listening on port 3000");
});
