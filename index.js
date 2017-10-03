// index.js

var request = require("request");
var exphbs = require("express-handlebars");
var express = require("express");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/dnworld");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("public"));

//
app.get("/", function(req, res) {
  res.render("home", {});

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
  });

})

// App listening
app.listen(3000, function() {
  console.log("Nomad draft listening on port 3000");
});
