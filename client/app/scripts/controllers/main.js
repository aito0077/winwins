'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$auth', '$http', 'Winwin', function($scope, $auth, $http, Winwin) {
    $scope.winwins = [];

    if($auth.isAuthenticated()) {
        Winwin.query(function(data) {
            $scope.winwins = data;
        });
    }

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.newWinwin = function() {
        $state.go('winwin-new'); 
    };

    $scope.join = function(winwin_id) {
        $http.get('/api/winwins/join/'+winwin_id).success(function(data) {
            $scope.getWinwin();
            swal({
                title: "info", 
                text: 'winwin_join', 
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


}]);
