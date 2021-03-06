/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('1f93d62c876eba420ae38c797327fa65'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('scope', 'rs9939609%20basic%20names');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(res, req) {
    routes.index(res, req, app.get('scope'));
});
app.get('/receive_code/', function(res, req) {
    routes.receive_code(res, req, app.get('scope'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
