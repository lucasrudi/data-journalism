'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('liveController', function($scope, $http, $routeParams, $location, $route, $interval) {
    
    $interval(function(){
      $scope.liveVolume = [];
      
      $http.get('live').
      success(function(data, status, headers, config) {
        $scope.liveVolume = data;
        
        
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    },1500);
 });
  	