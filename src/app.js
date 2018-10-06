const
    express = require('express'),
    app = express(),
    expressLogging = require('express-logging'),
    logger = require('logops'),
    bodyParser = require('body-parser'),

    port = process.env.PORT || 3000;

app.use(expressLogging(logger));
app.use(bodyParser.json()); // for parsing application/json

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Content-Type','application/json');
  next();
});

app.get('/', function (request, response) {
  return response.json('');
});

app.listen(port, () => console.log(`Listening on port ${port}!`)); // eslint-disable-line no-console

module.exports = app;
