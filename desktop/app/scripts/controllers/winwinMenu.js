'use strict';

/**
 * @ngdoc function
 * @name winwinsApp.controller:WinwinMenuCtrl
 * @description
 * # WinwinMenuCtrl
 * Controller of the winwinsApp
 */
angular.module('winwinsApp')
  .controller('WinwinMenuCtrl', ['$scope', '$state', '$stateParams', '$window', function ($scope, $state, $stateParams, $window) {


    $(window).unbind('scroll');
    $(window).bind('scroll', function(){
      console.log($(window).scrollTop());
    });

    $scope.submenu = {
      members: false,
      sponsors: false,
      comments: true,
      config: false
    };

    /*$scope.$watch('wpTop.name.up', function() {
      if ($scope.wpPreview !== undefined || $scope.wpPreview.name.up == true){
        $state.go('winwin');
      }
    });*/



    $scope.subMenuClick = function(menuEntry){
      //set all to false
      $.each($scope.submenu, function(i,v){
        $scope.submenu[i] = false;
      });

      //set clicked to true
      $scope.submenu[menuEntry] = true;

      //go to state
      $state.go('winwin.'+menuEntry);
    }
   
  }]);
