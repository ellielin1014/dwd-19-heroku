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
var post_message;
var post_message_2;
var info;
// const { Client } = require('pg');
// const client = new Client({database: 'my-first-database'});
//
// client.connect();
// client.query('SELECT message FROM posts;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     // store the data in a global variable post_message
//     console.log(res.rows);
//     post_message = JSON.stringify(row);
//   }
//   client.end();
// });


app.get('/', function(req, res) {

    res.render('index', {
      message: req.query.forum_message,
      p_message: post_message
    });
  }
)

//redirect to the index page
app.get('/post', function(req, res) {
  info = req.query.forum_message;
  console.log(info);

  //info = req.query.forum_message;
  const text1 = 'INSERT INTO posts(message) VALUES(info)';
  const text2 = 'SELECT message FROM posts';
  const { Client } = require('pg');
  const client = new Client({database: 'my-first-database'});
  client.connect();

  //client.connect();
  client.query(text2, (err, res) => {
       if (err) throw err;
       else {
            // store the data in a global variable post_message
            console.log(JSON.stringify(res.rows));
            post_message = JSON.stringify(res.rows);
          }
  //client.end();
   });

  client.query(text1, (err, res) => {
       if (err) throw err;
  client.end();
   });


  res.redirect('/');
});

app.listen(port, function () {
  console.log('Listen to port 8000')
})
