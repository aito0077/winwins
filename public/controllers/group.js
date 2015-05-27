angular.module('wwApp')
.controller('group-edit', function($scope, $alert, $auth, Group, Interest) {
    $scope.group = new Group({});
    $scope.interests = [];
    $scope.scopes = [ 'GLOBAL','REGION','COUNTRY','STATE','CITY' ];

    $scope.group.closing_date = new Date();
    $scope.closingdatechange = function(data){ };

    Interest.query(function(data) {
        $scope.interests = data;
    });


    $scope.doSave = function() {
        $scope.group.$save(function() {
            $alert({
                content: 'Success saving!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
        });
    };


})
.controller('group-list', ['$scope','$http', 'Group', function($scope, $http, Group) {

    $scope.groups = [];

    var groups = Group.query(function(data) {
        $scope.groups = data;
    });
    
}])
.controller('group-view', ['$scope','$http', '$state', '$stateParams', '$alert', 'Group', function($scope, $http, $state, $stateParams, $alert, Group) {

    $scope.getGroup = function() {
        $scope.group = Group.get({
            id: $stateParams.groupId
        }, function(data) {

        });
    }

    $scope.getGroup();

    $scope.join = function() {
        $http.get('/api/groups/join/'+$scope.group.id).success(function(data) {
            $alert({
                content: 'Success Joined!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
            $scope.getGroup();
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
        $state.go('group-list'); 
    };

    $scope.left = function() {
        $http.get('/api/groups/left/'+$scope.group.id).success(function(data) {
            $alert({
                content: 'You have left this Group!',
                animation: 'fadeZoomFadeDown',
                type: 'material',
                duration: 3
            });
            $scope.getGroup();
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
