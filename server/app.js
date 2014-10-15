  /**
   * Module dependencies.
   */

  var express = require('express'),
      router = require('./routes'),
      http = require('http'),
      mongo = require('./models/mongo-core'),
      path = require('path'),
      messure = require('./models/messure');
  var io = require('socket.io')(http);

  var app = express();
  
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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

  //API 
   var ApiPrefix = '/api/v1/';
   var lastMeasure = {
    value: 0,
    created: Date.now() 
   };
   var homeAPI =  function (req, res) {

       res.send(lastMeasure, 200);
   };
   app.get(ApiPrefix, homeAPI);
  
  


  
  var receivedData = '';
  io.on("open", function() {
      console.log('Arudino online!');
      io.on('data', function(data) {
          

          receivedData += data.toString();
          console.log(receivedData);
          if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
           // save the data between 'B' and 'E'
            sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
            receivedData = '';
            var obj = {};
            obj.value = sendData;
            console.log("sendData: " + sendData);
            messureModel.value = sendData;
            console.log('sending', sendData);
            lastMeasure = {
              value: sendData,
              created: Date.now() 
            };
            var messureModel = new messure(obj);
            messureModel.save();
          }

      });

  });
    
    
    
  process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close(function () {
      // Disconnect from cluster master
      process.disconnect && process.disconnect();
    });
});