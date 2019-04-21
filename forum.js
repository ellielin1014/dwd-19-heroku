// create app and express
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

// mustache express
var mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

// database:
var post_message = [];
var info;

const text1 = 'INSERT INTO forum(message) VALUES($1) RETURNING *';
const text2 = 'SELECT message FROM forum';

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();


app.get('/post', function(req, res) {
  info = [req.query.forum_message];
  console.log(info);

  client.query(text1, info, (err, res) => {
       if (err) throw err;
   });
   res.redirect('/');
});


// render the index page
app.get('/', function(req, res) {

  client.query(text2, (err, res) => {
    if (err) throw err;
    for(var i = 0 ; i < res.rows.length; i++){
      console.log(res.rows[i].message);
      post_message[i] = res.rows[i].message + '\r\n';}
  });

    res.render('index', {
      message: req.query.forum_message,
      p_message: post_message
    });
  }
)


app.listen(port, function () {
  console.log('Listen to port: ' + port)
})
