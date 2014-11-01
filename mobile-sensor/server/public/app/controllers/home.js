'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('homeController', function($scope, $routeParams, $location, $route) {
    $scope.cities = [
        {'class': 'la', 'name': 'Periodistas', 'endpoint' :'la'},
        {'class': 'ba', 'name': 'Developers', 'endpoint' :'ba'},
        {'class': 'ny', 'name': 'Izquierda', 'endpoint' :'nyc'},
        {'class': 'au', 'name': 'Derecha', 'endpoint' :'atx' }
      ];
 });
