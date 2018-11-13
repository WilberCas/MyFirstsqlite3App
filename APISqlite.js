const express = require('express');
const app = express();
const port = 3001;
const action = require('./DbMethods');
// Required to make API calls locally
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


// GET Method
// Retrives the playlist selected
app.get('/id/:reqIds', function (req, response) {
  action('SELECT', req.params.reqIds).then((data) => {
    response.send(data);
  });
})

  // GET Method
// Retrives the playlist selected
app.get('/id/', function (req, response) {
  action('SELECT').then((data) => {
    response.send(data);
  });
})

app.listen(port, () => console.log(`App listening on port ${port}!` ));
