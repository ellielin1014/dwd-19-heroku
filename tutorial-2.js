// create app
var express = require('express');
var app = express();
var info;
var http = require('http');
var port = process.env.PORT || 8000;

// mustache Express
// var mustacheExpress = require('mustache-express');
// app.engine('html', mustacheExpress());
// app.set('view engine', 'html');
// app.set('views', __dirname);

//create database client
const { Client } = require('pg');
const client = new Client({database: 'my-first-database'});
client.connect();
client.query('SELECT posts,message FROM posts;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
    // store the data in a global variable
    info = JSON.stringify(row);
  }
  client.end();
});

// Make a web server and print the database
http.createServer(function (req, res) {
  console.log(req);
  res.writeHead(200);
  res.end(info, req);
}).listen(port);
