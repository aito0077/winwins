'use strict';

angular.module('winwinsApp')
.controller('sponsor-list', ['$scope', '$state', 'SponsorPaginate', function($scope, $state, SponsorPaginate) {
   
    $scope.sponsors = new SponsorPaginate();

    $scope.view = function(id) {
        $state.go('sponsor-view', {
            sponsorId: id
        }); 
    }
 
}])
.controller('sponsor-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Sponsor', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Sponsor) {

    $scope.getSponsor = function() {
        $scope.sponsor = Sponsor.get({
            id: $stateParams.sponsorId
        }, function(data) {

        });
    }

    $scope.getSponsor();

    $scope.follow = function() {
        $http.get('/api/sponsors/follow/'+$scope.sponsor.id).success(function(data) {
            $scope.getSponsor();
            swal({
                title: "info", 
                text: 'sponsor_join', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.unfollow = function() {
        $http.get('/api/sponsors/unfollow/'+$scope.sponsor.id).success(function(data) {
            swal({
                title: "info", 
                text: 'sponsor_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getSponsor();
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


}]);

