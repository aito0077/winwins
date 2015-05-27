angular.module('wwApp')
.controller('winwin-edit', function($scope, $alert, $auth, Winwin, Interest) {
    $scope.winwin = new Winwin({});
    $scope.interests = [];
    $scope.scopes = [ 'GLOBAL','REGION','COUNTRY','STATE','CITY' ];

    $scope.winwin.closing_date = new Date();
    $scope.closingdatechange = function(data){ };

    Interest.query(function(data) {
        $scope.interests = data;
    });


    $scope.doSave = function() {
        $scope.winwin.$save(function() {
            $alert({
                content: 'Success saving!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
        });
    };


})
.controller('winwin-list', ['$scope','$http', 'Winwin', function($scope, $http, Winwin) {

    $scope.winwins = [];

    var winwins = Winwin.query(function(data) {
        $scope.winwins = data;
    });
    
}])
.controller('winwin-view', ['$scope','$http', '$state', '$stateParams', '$alert', 'Winwin', function($scope, $http, $state, $stateParams, $alert, Winwin) {

    $scope.getWinwin = function() {
        $scope.winwin = Winwin.get({
            id: $stateParams.winwinId
        }, function(data) {

        });
    }

    $scope.getWinwin();

    $scope.join = function() {
        $http.get('/api/winwins/join/'+$scope.winwin.id).success(function(data) {
            $alert({
                content: 'Success Joined!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
            $scope.getWinwin();
        })
        .error(function(error) {
            $alert({
                content: error.message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
        });
    };

    $scope.pass = function() {
        $state.go('winwin-list'); 
    };

    $scope.left = function() {
        $http.get('/api/winwins/left/'+$scope.winwin.id).success(function(data) {
            $alert({
                content: 'You have left this Winwin!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
            $scope.getWinwin();
        })
        .error(function(error) {
            $alert({
                content: error.message,
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
        });
    };




}]);
