angular.module('wwApp')
.controller('group-edit', function($scope, $alert, $auth, Group, Interest) {
    $scope.group = new Group({});

    $scope.doSave = function() {
        $scope.group.photo = ($scope.group.photo || '');
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
.controller('group-view', ['$scope','$http', '$state', '$stateParams', '$alert', 'Group', 'Winwin', function($scope, $http, $state, $stateParams, $alert, Group, Winwin) {

    var winwins = Winwin.query(function(data) {
        $scope.winwins = data;
    });

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

    $scope.addToGroup = function(winwinId) {
        $http.get('/api/groups/'+$scope.group.id+'/add_winwin/'+winwinId).success(function(data) {
            $alert({
                content: 'Winwin added to Group!',
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

    $scope.removeFromGroup = function(winwinId) {
        $http.get('/api/groups/'+$scope.group.id+'/remove_winwin/'+winwinId).success(function(data) {
            $alert({
                content: 'Winwin removed from Group!',
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
