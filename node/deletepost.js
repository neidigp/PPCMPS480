var http = require("http");
var fs = require("fs");
var mysql = require("mysql");
var credentials = require("./credentials");
var qs = require("querystring");

  //deletes the last post made
function deleteLP(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  // connect to database
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect: " + err);
      return;
    }
    // query the database
    conn.query("DELETE * FROM MESSAGE WHERE MessageID = (Select Max(MessageID) FROM MESSAGE) ", function(err, rows, fields) {
      // build json result object
      var outjson = {};
      if (err) {
        // query failed
        outjson.success = false;
        outjson.message = "Query failed: " + err;
      }
      else {
        // query successful
        outjson.success = true;
        outjson.message = "Query execution successful!";
      }
      // return json object that contains the result of the query
      sendResponse(req, res, outjson);
    });
    conn.end();
  });
}
