const
    express = require('express'),
    app = express(),
    expressLogging = require('express-logging'),
    logger = require('logops'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

app.use(expressLogging(logger));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-
app.set('port', port);

// CORS
app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.header('Content-Type','application/json');
  next();
});

app.get('/hello', function (request, response) {
  response.status(200).send(JSON.stringify({message: 'all users sent'}));
});

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port')); // eslint-disable-line no-console
});

module.exports = app;
