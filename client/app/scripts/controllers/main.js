'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$auth', '$http', '$state', 'Winwin', function($scope, $auth, $http, $state, Winwin) {
    $scope.winwins = [];

    Winwin.query(function(data) {
        $scope.winwins = data;
    });

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.goControlPanel = function() {
        $state.go('account'); 
    };

    $scope.join = function(winwin_id) {
        if($auth.isAuthenticated()) {
            $http.get('/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
                    type: "info",
                    showcancelbutton: false,
                    closeonconfirm: true 
                });
                $scope.view(winwin_id);

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
        } else {
            $state.go('signIn');
        }
    };

    $scope.view = function(id) {
        console.log('view '+id);
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };


    $scope.openShare = function (winwin_id) {
        $('#socialModal').modal('show');
        console.log('winwin_id: '+winwin_id);
    };

}]);
