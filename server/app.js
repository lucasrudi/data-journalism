/**
 * Module dependencies.
 */

var express = require('express'),
    router = require('./routes'),
    http = require('http'),
    path = require('path');
var io = require('socket.io')(http);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

router.init(app);
var server =http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
io.on('connection', function (socket) {
  console.log('new connection');
  socket.on('some-noise', function (data) {
      io.emit('new-noise', data);
  }); 
    
});


