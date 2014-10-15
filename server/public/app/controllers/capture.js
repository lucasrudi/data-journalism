'use strict';

/* Controllers */
angular.module('ssApp.controllers')
  .controller('captureController', function($scope, $routeParams, $location, $route) {
  	$scope.city = $routeParams.city;
  	var socket = io('http://localhost:3000');
  	

  	socket.emit('some-noise', 
  		{ 
  			city:$routeParams.city, 
  			value : 3
  		});

	navigator.getUserMedia = (navigator.getUserMedia ||
	                          navigator.webkitGetUserMedia ||
	                          navigator.mozGetUserMedia ||
	                          navigator.msGetUserMedia);

	 	
	var onStream =function(stream) {
		console.log('streaming!');
	};

	var onStreamError = function(e) {
	  console.error('Error getting microphone', e);
	};

	navigator.getUserMedia({audio: true, video:false}, 
		function(mediaStream) {
   			console.log('yes');
	}, function (e){
		console.log('there was an error: ',e);
	});


});
  	