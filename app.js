
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

/*
 * api routes
 * ----------
 * url               HTTP Method  Operation
 * /api/examples      GET          Get an array of all examples
 * /api/examples/:id  GET          Get the example with id of :id
 * /api/examples      POST         Add a new example, return the example with an id attribute added
 * /api/examples/:id  PUT          Update the example with id of :id
 * /api/examples/:id  DELETE       Delete the example with id of :id
 */

app.get('/api', api.home);
app.get('/api/examples', api.examples);
app.get('/api/examples/:id', api.get_example);
app.post('/api/examples', api.create_example);
app.put('/api/examples/:id', api.update_example);
app.del('/api/examples/:id', api.delete_example);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
