'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('liveController', function($scope, $routeParams, $location, $route) {
    
    $http.get('live').
    success(function(data, status, headers, config) {
      $scope.liveVolume = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
 });
  	