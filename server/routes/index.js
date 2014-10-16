var express = require('express'),
    messure = require('../models/messure'),
    configuration = require('../config');
  
module.exports.init = function (app) {

  // Routes
  var Routes = {
    api: {}
  };

  
  Routes.home = require('./app/home');
  app.get('/', Routes.home);
  app.get('/live', function(req, res) {
    messure.aggregate().sort('created').group({ _id: "$city" , averageVolume: { $last: "$volume" }}).exec( function(err, doc) {
     res.send(doc, 200);
    });
  });
  // API Prefix
  
};