var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;

chai.use(chaiHttp);


// Chai test to assess validity of landing page
describe("DNWorld Landing Page", function() {
    it("should have a live landing page", function(done) {
      chai.request("localhost:3000")
        .get("/")
        .end(function(err, res){
          res.status.should.be.equal("200");
          done();
        });
    });
  });

describe("DNWorld New Status Creation", function() {
  it("should have many inputs for a new status", function(done) {
    chai.request("localhost:3000")
      .get("/statuses/new")
      .end(function(err, res){
        res.status.should.be.equal("200");
        done();
      })
  })
})