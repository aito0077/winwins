'use strict';

angular.module('winwinsApp')
.controller('group-edit', function($scope, $state, $auth, Upload, Group, Interest) {
    $scope.group = new Group({});

    $scope.doValidate = function() {
        return true;
    };

    $scope.doSave = function() {
        if($scope.doValidate()) {
            $scope.group.$save(function(data) {
                $state.go('group-view', {
                    groupId: $scope.group.id
                }); 
            });
        }
    };

    $scope.files = [];

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
         if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/winwins/upload',
                    fields: {},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.group.photo = data.filename;
                });
            }
        }
    };

})
.controller('group-list', ['$scope', 'GroupPaginate', function($scope, GroupPaginate) {
   
    $scope.groups = new GroupPaginate();

    /*
    $scope.groups = [];

    var groups = Group.query(function(data) {
        $scope.groups = data;
    });
    */
 
}])
.controller('group-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Group', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Group) {

    $scope.getGroup = function() {
        $scope.group = Group.get({
            id: $stateParams.groupId
        }, function(data) {

        });
    }

    $scope.getGroup();

    $scope.join = function() {
        $http.get('/api/groups/join/'+$scope.group.id).success(function(data) {
            $scope.getGroup();
            swal({
                title: "info", 
                text: 'group_join', 
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

    $scope.left = function() {
        $http.get('/api/groups/left/'+$scope.group.id).success(function(data) {
            swal({
                title: "info", 
                text: 'group_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getGroup();
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

    $scope.addToGroup = function(winwinId) {
        $http.get('/api/groups/'+$scope.group.id+'/add_winwin/'+winwinId).success(function(data) {
            swal({
                title: "info", 
                text: 'winwin_added_to_group', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getGroup();
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

    $scope.removeFromGroup = function(winwinId) {
        $http.get('/api/groups/'+$scope.group.id+'/remove_winwin/'+winwinId).success(function(data) {
            swal({
                title: "info", 
                text: 'winwin_removed_from_group', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getGroup();
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
