'use strict';

angular.module('winwinsApp')
.controller('user-list', ['$scope', '$state', '$http', '$auth', 'UserPaginate', 'api_host', function($scope, $state, $http, $auth, UserPaginate, api_host) {
   
    $scope.users = new UserPaginate();

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.view = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };


    $scope.follow = function(member) {
        $http.get(api_host+'/api/users/follow/'+member.id).success(function(data) {
            swal({
                title: "info", 
                text: 'Siguiendo!', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            member.following = true;
            member.followers_count = member.followers_count + 1;
        })
        .error(function(error) {
            swal({
                title: "ADVERTENCIA", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                        animation: false, 
                closeOnConfirm: true 
            });
        });
    };


 
}])
.controller('user-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$rootScope', 'User', 'Post', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $rootScope, User, Post, api_host) {

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
            $scope.notifications = data.notifications;
            $scope.followers = data.followers;
            $scope.following = data.following;
        });
    }

    $scope.getUser();

    $scope.follow = function() {
        $http.get(api_host+'/api/users/follow/'+$scope.user.id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'Siguiendo!', 
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
                        animation: false, 
                closeOnConfirm: true 
            });
        });
    };

    $scope.unfollow = function() {
        $http.get(api_host+'/api/users/unfollow/'+$scope.user.id).success(function(data) {
            swal({
                title: "info", 
                text: 'Dejaste de seguir al usuario', 
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
                        animation: false, 
                closeOnConfirm: true 
            });
        });
    };


    $scope.comment = new Post({});
    $scope.submitComment = function() {
        console.log('submit');
        $http.post(api_host+'/api/users/'+$scope.user.id+'/comment',{
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
                        animation: false, 
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
.controller('ProfileCtrl', ['$rootScope', '$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', '$auth', '$uibModal', 'Upload', 'User', 'Account', 'api_host', function($rootScope, $scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, $auth, $uibModal, Upload, User, Account, api_host) {

    $scope.followers = [];
    $scope.following = [];
    $scope.comments = [];
    $scope.notifications = [];

    $scope.is_admin = false;

    $scope.edit_user = {};
    $scope.current_view = 'home';

    $scope.setCurrentView = function(view) {
        $scope.current_view = view;
        $scope.is_admin = view == 'admin';
    };

    $scope.setNormal = function() {
        $scope.is_admin = false;
    };

    $scope.setAdmin = function() {
        if($scope.user_detail.myself) {
            $scope.is_admin = true;
        }
    };

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
                $scope.notifications = user_data.notifications;
                $scope.edit_user = user_data;
                $scope.setup_components();

            });

        });

    };

    $scope.getUser();

    $scope.follow = function(id) {
        $http.get(api_host+'/api/users/follow/'+id).success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'Siguiendo!', 
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
                        animation: false, 
                closeOnConfirm: true 
            });
        });
    };

    $scope.unfollow = function(user_id) {
        $http.get(api_host+'/api/users/unfollow/'+user_id).success(function(data) {
            swal({
                title: "info", 
                text: 'Dejaste de seguir al usuario', 
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
                        animation: false, 
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
        //$('#datetimepicker1').data("DateTimePicker").date(new moment($scope.edit_user.birthdate));

    };


    $scope.uploading = false;
    $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
            $scope.uploading = true;
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

    $scope.uploadFilesCover = function(file) {
        $scope.fc = file;
        if (file && !file.$error) {
            $scope.uploading = true;
            file.upload = Upload.upload({
                url: '/api/me/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.edit_user.cover_photo = response.data.filename;
                });
            }, function (response) {
                $scope.uploading = false;
                if (response.status > 0) {
                    $scope.errorMsgCover = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function (evt) {
                $scope.uploading = true;
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }   
    };

    $scope.saveProfile = function() {
        //$scope.edit_user.birthdate = $('#datetimepicker1').data("DateTimePicker").date();

        $http.post(api_host+'/api/profile', $scope.edit_user)
        .success(function(data) {
            $scope.getUser();
            swal({
                title: "info", 
                text: 'Datos actualizados!', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $rootScope.profile_photo = $scope.edit_user.photo;

        })
        .error(function(error) {
            swal({
                title: "Error", 
                text: error.message, 
                type: "warning",
                showCancelButton: false,
                        animation: false, 
                closeOnConfirm: true 
            });
        });
    };


    $scope.setOption = function(key, value) {
    
        $scope.edit_user[key] = value;
        console.log('Key: '+key+' - value: '+value);
        console.log('user_edit: '+$scope.edit_user[key]);
    };


    $scope.cancelAccount = function() {
        swal({
            title: "Cancelar Mi Cuenta",
            text: "Contanos tus motivos",
            type: "input",
            showCancelButton: true,
                        animation: false, 
            closeOnConfirm: true,
            inputPlaceholder: "Mensaje de solicitud" 
        },
        function(inputValue){   
            $http.post('/api/me/cancel', {
                body: inputValue
            })
            .success(function(data) {
                $state.go('cancel-account');
            })
            .error(function(error) {
                swal({
                    title: "Error", 
                    text: error.message, 
                    type: "warning",
                    showCancelButton: false,
                        animation: false, 
                    closeOnConfirm: true 
                });
            });
            return true;

        });
    };


    $scope.openSocialModal = function(winwin) {
        $scope.toShare = winwin;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'winwinShareModal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                toShare: function () {
                    return $scope.toShare;
                }
            }
        });
    };



}])
.controller('cancel-account', ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', '$auth', function($scope, $rootScope, $state, $stateParams, $timeout, $auth) {

    $timeout(function() {
        $auth.logout().then(function() {
            $rootScope.$broadcast('is_logged', false);
        });
    }, 1000);

}])
.controller('ProfileNotificaciones', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'User', 'Account', 'api_host', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, User, Account, api_host) {

    $scope.viewProfile = function(id) {
        $state.go('user-view', {
            userId: id
        }); 
    };

    $scope.viewSponsor = function(id) {
        $state.go('sponsor-view', {
            sponsorId: id
        }); 
    };


    $scope.viewWinwin = function(id) {
        $state.go('winwin-view', {
            winwinId: id
        }); 
    };




    $scope.getUser = function() {
        Account.getProfile().then(function(response) {
            $scope.account = response.data;

            User.get({
                id: $scope.account.user.id
            }, function(user_data) {
                $scope.user_detail = user_data;
            });

        });

        $http.get(api_host+'/api/me/notificactions/read').success(function(data) {

        });

    };

    $scope.getUser();

}]);
