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
            console.log('First Stage: '+$scope.first_stage);
            console.log('Second Stage: '+$scope.second_stage);
        }
    }

    $scope.doSave = function() {
        $scope.winwin.$save(function(data) {
            $state.go('winwin-first-post', {
                winwinId: $scope.winwin.id
            }); 
        });
    };

    $scope.files = [];

    $scope.$watch('files', function () {
        console.log('watch files');
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
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    console.dir(data);
                    $scope.winwin.image = data.filename;
                });
            }
        }
    };


    $scope.setVideoUrl = function() {
        console.log('set video');
        swal({
            title: "Video Link", 
            text: "Ingresa dirección de video:", 
            type: "input",
            inputType: "text",
            showCancelButton: true,
            closeOnConfirm: true 
        }, function(inputValue) {
            $scope.video = inputValue;
        });
    };

})
.controller('winwin-first-post', ['$scope', '$stateParams', 'Winwin', 'Account', function($scope, $stateParams, Winwin, Account) {
    console.dir($stateParams); 
    $scope.profile = {};
    $scope.winwin = {};
    $scope.cover_style = '';

    Account.getProfile().success(function(data) {
        if(data) {
            $scope.profile = data.profile;
        }
    });

    Winwin.get({id: $stateParams.winwinId}, function(winwin) {
        $scope.winwin = winwin;
        $scope.cover_style = "{'background-image': url(http://images.dev-winwins.net/"+winwin.image+");'background-size': 'cover';}"; 
    });

    $scope.setVideoUrl = function() {
        swal({
            title: "Video Link", 
            text: "Ingresa dirección de video:", 
            type: "input",
            inputType: "text",
            showCancelButton: true,
            closeOnConfirm: true 
        }, function(inputValue) {
            $scope.video = inputValue;
        });
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
                    url: '/api/comments/upload',
                    fields: {},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.winwin.image = data.filename;
                });
            }
        }
    };

    $scope.submitPost = function() {
        $scope.comment.$save(function(data) {
            $state.go('winwin-view', {
                winwinId: $scope.winwin.id
            }); 
        });
    };




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
.controller('winwin-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Winwin', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Winwin) {

        $scope.main_view = true;
        $scope.winwin = {};
        $scope.getWinwin = function() {
            $scope.winwin = Winwin.get({
                id: $stateParams.winwinId
            }, function(data) {
                $scope.calculate_time();
            });
        }

        $scope.duration_days = 0;
        $scope.duration_hours = 0;
        $scope.duration_minutes = 0;

        $scope.calculate_time = function() {
            var now = moment(),
                closing_date = moment($scope.winwin.closing_date);
            $scope.duration_days = closing_date.diff(now, 'days');
            console.log($scope.duration_days);
            $scope.duration_hours = closing_date.diff(now.add($scope.duration_days, 'days'), 'hours');
            console.log($scope.duration_hours);
            var duration_minutes = closing_date.diff(now.add($scope.duration_days, 'days').add($scope.duration_hours, 'hours'), 'minutes');
            $scope.duration_minutes = duration_minutes < 0 ? 0 : duration_minutes;

            console.log($scope.duration_minutes);
        };

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

        $scope.setup_components = function() {
        
            var scope = $scope;
            $timeout(function() {
                scope.view_height = $('winwin-view').height();
                $scope.height_to_change = scope.view_height * 1.5;
                scope.height_to_change = scope.view_height;

                $(window).scroll(function(){                          
                    if ($(this).scrollTop() > $scope.view_height) {
                        $('#menu-winwin').fadeIn(500);
                    } else {
                        $('#menu-winwin').fadeOut(500);
                    }
                });
            }, 1000);
        };

        $scope.setup_components();

        $scope.go_muro = function() {
            $state.go('winwin-view.muro'); 
            $location.hash('winwin-subviews');
            $anchorScroll();
        };

        $scope.go_members= function() {
            $state.go('winwin-view.members'); 
            $location.hash('winwin-subviews');
            $anchorScroll();
        };

}])
.controller('winwin-members', ['$scope','$http', function($scope, $http) {
    console.log('members');     
}])
.controller('winwin-muro', ['$scope','$http', function($scope, $http) {
    console.log('muro');     
}]);

