'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('liveController', function($scope, $http, $routeParams, $location, $route, $interval) {
    
    $interval(function(){
      $http.get('live').
      success(function(data, status, headers, config) {
        $scope.liveVolume = data;
        if(!$scope.$$phase) {
          $scope.$apply();
        }
        
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    },1500);
 });
  	