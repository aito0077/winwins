'use strict';

angular.module('winwinsApp')
.controller('user-list', ['$scope', '$state', '$http', '$auth', 'UserPaginate', function($scope, $state, $http, $auth, UserPaginate) {
   
    $scope.users = new UserPaginate();

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.view = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };


    $scope.follow = function(id) {
        $http.get('/api/users/follow/'+id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_join', 
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


 
}])
.controller('user-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$rootScope', 'User', 'Post', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $rootScope, User, Post) {

    $scope.comments = [];
    $scope.followers = [];
    $scope.following = [];

    $scope.getUser = function() {
        console.log('User id profile: '+$stateParams.userId);
        $scope.user = User.get({
            id: $stateParams.userId
        }, function(data) {
            $scope.user_detail = data;
            $scope.comments = data.comments;
            $scope.followers = data.followers;
            $scope.following = data.following;
        });
    }

    $scope.getUser();

    $scope.follow = function() {
        $http.get('/api/users/follow/'+$scope.user.id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_join', 
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
        $http.get('/api/users/unfollow/'+$scope.user.id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getUser();
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


    $scope.comment = new Post({});
    $scope.submitComment = function() {
        console.log('submit');
        $http.post('/api/users/'+$scope.user.id+'/comment',{
            content: $scope.comment.content
        }).success(function(data) {
            $scope.comments = data;
            $scope.comment = new Post({});
        })
        .error(function(error) {
            swal({
                title: "Error", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };

    $scope.filter = function(filter_by) {
        $scope.current = filter_by;
        $('.grid-participantes').isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
    };

    $timeout(function () {
        $('.grid-participantes').isotope({
            itemSelector: '.participante-item',
            masonry: {
                columnWidth: 380
            }
        });
    });


    $scope.view = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewWinwin = function(id) {
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };

    $scope.viewUser = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewGroup = function(id) {
        $state.go('group-view', {
            groupId: id
        }); 
    };



}])
.controller('ProfileCtrl', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Upload', 'User', 'Account', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Upload, User, Account) {

    $scope.followers = [];
    $scope.following = [];
    $scope.comments = [];

    $scope.edit_user = {};

    $scope.getUser = function() {
        Account.getProfile().then(function(response) {
            $scope.account = response.data;

            User.get({
                id: $scope.account.user.id
            }, function(user_data) {
                $scope.user_detail = user_data;
                $scope.followers = user_data.followers;
                $scope.following = user_data.following;
                $scope.comments = user_data.comments;
                $scope.edit_user = user_data;
                $scope.setup_components();

            });

        });

    };

    $scope.getUser();

    $scope.follow = function(id) {
        $http.get('/api/users/follow/'+id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_join', 
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

    $scope.unfollow = function(user_id) {
        $http.get('/api/users/unfollow/'+user_id).success(function(data) {
            swal({
                title: "info", 
                text: 'user_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getUser();
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

    $scope.filter = function(filter_by) {
        $scope.current = filter_by;
        $scope.isot.isotope({ filter: filter_by == 'all' ? '*' : '.'+filter_by });
    };

    $scope.view = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewWinwin = function(id) {
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };

    $scope.viewUser = function(id) {
        console.log('view user: '+id);
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewGroup = function(id) {
        $state.go('group-view', {
            groupId: id
        }); 
    };


    $scope.$watch('following', function() {
        if($scope.following.length > 0) {
            $timeout(function() {
                $scope.isot = angular.element('.grid-participantes');
                $scope.isot.isotope({
                    itemSelector: '.participante-item',
                    masonry: {
                        columnWidth: 380
                    }
                });
            });
        }
    });



    $scope.$watch('followers', function() {
        if($scope.followers.length > 0) {
            $timeout(function() {
                $scope.isot = angular.element('.grid-participantes');
                $scope.isot.isotope({
                    itemSelector: '.participante-item',
                    masonry: {
                        columnWidth: 380
                    }
                });
            });
        }
    });


    $scope.setup_components = function() {
        /*
        $('.grid-participantes').isotope({
            itemSelector: '.participante-item',
            masonry: {
                columnWidth: 380
            }
        });
        */
        $('#datetimepicker1').datetimepicker({
            maxDate: new Date(),
            format: 'DD - MM - YYYY'
        });
        console.log($scope.edit_user.birthdate);
        $('#datetimepicker1').data("DateTimePicker").date(new moment($scope.edit_user.birthdate));

    };


    $scope.uploading = false;
    $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/api/me/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.edit_user.photo = response.data.filename;
                });
            }, function (response) {
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };

    $scope.uploading_cover = false;
    $scope.uploadFilesCover = function(file) {
        $scope.fc = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/api/me/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading_cover = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.edit_user.cover_photo = response.data.filename;
                });
            }, function (response) {
                $scope.uploading_cover = false;
                if (response.status > 0) {
                    $scope.errorMsgCover = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading_cover = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };

    $scope.saveProfile = function() {
        $scope.edit_user.birthdate = $('#datetimepicker1').data("DateTimePicker").date();

        $http.post('/api/profile', $scope.edit_user)
        .success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'user_updated', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });

        })
        .error(function(error) {
            swal({
                title: "Error", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true 
            });
        });
    };


    $scope.setOption = function(key, value) {
    
        $scope.edit_user[key] = value;
        console.log('Key: '+key+' - value: '+value);
        console.log('user_edit: '+$scope.edit_user[key]);
    };

}])
.controller('ProfileNotificaciones', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'User', 'Account', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, User, Account) {



    $scope.getUser = function() {
        Account.getProfile().then(function(response) {
            $scope.account = response.data;

            User.get({
                id: $scope.account.user.id
            }, function(user_data) {
                $scope.user_detail = user_data;
            });

        });

        $http.get('/api/me/notificactions/read').success(function(data) {

        });

    };

    $scope.getUser();

}]);
