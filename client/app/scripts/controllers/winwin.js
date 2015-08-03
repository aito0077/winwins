'use strict';

angular.module('winwinsApp')
.controller('winwin-edit', function($scope, $state, $auth, Upload, Winwin, Interest) {
    $scope.winwin = new Winwin({});
    $scope.interests = [];
    $scope.scopes = [ 'GLOBAL','REGION','COUNTRY','STATE','CITY' ];

    $scope.first_stage = true;
    $scope.second_stage = false;

    $scope.winwin.closing_date = new Date();
    $scope.closingdatechange = function(data){ };

    Interest.query(function(data) {
        $scope.interests = data;
    });


    $scope.doValidateBasic = function() {
        return true;
    };

    $scope.persistBasic = function() {
        console.log('persist basic');
        if($scope.doValidateBasic()) {
            $scope.first_stage = false;
            $scope.second_stage = true;
        }
    }

    $scope.doSave = function() {
        $scope.winwin.$save(function(data) {
            $state.go('winwin-first-post', {
                winwin_id: $scope.winwin.id
            }); 
        });
    };

    $scope.$watch('files', function () {
        console.log('uploading');
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/winwins/upload',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };

})
.controller('winwin-first-post', ['$scope', '$stateParams', 'Winwin', function($scope, $stateParams, Winwin) {
    console.dir($stateParams); 
    Winwin.get({id: $stateParams.winwin_id}, function(winwin) {
      $scope.winwin = winwin;
    });

}])
.controller('winwin-list', ['$scope', 'WinwinPaginate', function($scope, WinwinPaginate) {
   
    $scope.winwins = new WinwinPaginate();

}])
.controller('winwin-search', ['$scope','$http', function($scope, $http) {

        $scope.winwins = [];

        $scope.do_search = function() {
            $http.get('/api/winwins/search/', {
                    params: {
                        q: $scope.query
                    }
                })
                .success(function(data) {
                    $scope.winwins = data;
                })
                .error(function(error) {
                    //ToDo: error
                });
        };

        
    }])

    .controller('winwin-view', ['$scope','$http', '$state', '$stateParams', 'Winwin', function($scope, $http, $state, $stateParams, Winwin) {

        $scope.getWinwin = function() {
            $scope.winwin = Winwin.get({
                id: $stateParams.winwinId
            }, function(data) {

            });
        }

        $scope.getWinwin();

        $scope.join = function() {
            $http.get('/api/winwins/join/'+$scope.winwin.id).success(function(data) {
                //ToDo: Te uniste
                $scope.getWinwin();
            })
            .error(function(error) {
                //ToDo: Error al unirse
            });
        };

        $scope.pass = function() {
            $state.go('winwin-list'); 
        };

    $scope.left = function() {
        $http.get('/api/winwins/left/'+$scope.winwin.id).success(function(data) {
            //ToDo: dejaste el ww
            $scope.getWinwin();
        })
        .error(function(error) {
            //ToDo: error al dejar
        });
    };




}])
