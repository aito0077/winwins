'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:WinwinCtrl
 * @description
 * # WinwinCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
  .controller('WinwinCtrl', function ($scope) {
  	var d = new Date();
  	$scope.mock = {
  		days: d.getDate(),
  		hours: d.getHours(),
  		minutes: d.getMinutes(),
  		suscribed: Math.floor( 100*Math.random() ),
  		missing: Math.floor( 100*Math.random() )
  	};

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
