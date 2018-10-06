const
    express = require('express'),
    app = express(),
    expressLogging = require('express-logging'),
    logger = require('logops'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

const
    Emailer  = require('./emailer'),
    Compiler = require('./compiler');

app.use(expressLogging(logger));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-
app.set('port', port);

// CORS
app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  response.header('Content-Type','application/json');
  next();
});

app.get('/hello', function (request, response) {
  response.status(200).send(JSON.stringify({message: 'all users sent'}));
});

app.put('/send-mail', function (request, response) {
  const
      template = request.body.template,
      data     = request.body.data,
      to       = request.body.to,
      subject  = request.body.subject,
      html     = Compiler.compile(template ,data);

  try{
    Emailer.send({
      to,
      subject,
      html,
      onError   : error  => response.status(500).send({success: false , error, html}),
      onSuccess : info   => response.status(200).send({success: true  , info , html})
    });
  } catch(e){
    response.status(500).send({success: false , error: e.message, stack: e.stack});
  }

});

app.put('/compile', function (request, response) {
  const
      template = request.body.template,
      data     = request.body.data;

  response.set('Content-Type', 'text/html').status(200).send(Compiler.compile(template ,data));
});

app.put('/compile2', function (request, response) {
  const
      definition = request.body.data,
      template = request.body.template,
      data     = eval(`(() => {return ${definition};})()`);

  response.set('Content-Type', 'text/html').status(200).send(Compiler.compile(template ,data));
});

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port')); // eslint-disable-line no-console
});

module.exports = app;
