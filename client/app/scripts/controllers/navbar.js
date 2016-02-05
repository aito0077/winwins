angular.module('winwinsApp')
.controller('NavController', function ($scope, $rootScope, $state, $location, $timeout, $auth, $window, $http, api_host, Account) {
    $scope.unreadNotifications = 0;
    $scope.profile = false;
    $scope.is_logged = false;
    $scope.isSponsor = false;
    $scope.isSponsorActive = true;
    $scope.isActive = true;
    $scope.sponsor = false;

    $scope.$on('$stateChangeStart', function(){
        if($auth.isAuthenticated()) {
            Account.getStatus().then(function(response) {
                $scope.unreadNotifications = response.data.notifications_unread;
            });
        } else {
            $scope.unreadNotifications = 0;
        }
    });

    $rootScope.$on('is_logged',function(event, logged){
        $scope.is_logged = logged;
        if(logged) {
            if(!$scope.fetching_profile && !$scope.profile) {
                $scope.fetching_profile = true;
                Account.getProfile().then(function(response) {
                    if(response.data.user) {
                        $scope.fetching_profile = false;
                        $scope.profile = response.data.profile;
                        $scope.sponsor = response.data.sponsor;
                        $scope.isSponsor = response.data.is_sponsor;
                        $scope.isSponsorActive = response.data.is_sponsor_active;
                        $scope.isActive = response.data.active;
                        $scope.email = response.data.user.email;
                        $rootScope.account = $scope.profile;
                        $rootScope.profile_photo = $scope.profile.photo;
                    } else {
                        $auth.logout().then(function() {
                            $rootScope.$broadcast('is_logged', false);
                        });
                    }
                });
            }
        } else {
            $rootScope.profile_photo = false;
            $scope.profile = false;
            $scope.is_logged = false;
            $scope.sponsor = false;
            $scope.isActive = false;
            $scope.isSponsor = false;
            $rootScope.account = {};
        }

    });


    $rootScope.$on('$stateChangeSuccess',function(data, other){
        jQuery('.button-collapse').sideNav('hide');
        jQuery("html, body").animate({ scrollTop: 1 }, 0);
    })


    $scope.isAuthenticated = function() {
        var is_authenticated = $auth.isAuthenticated();

        if(!$scope.fetching_profile && !$scope.profile && is_authenticated) {
            $scope.fetching_profile = true;
            Account.getProfile().then(function(response) {
                $scope.fetching_profile = false;
                $scope.profile = response.data.profile;
                $scope.sponsor = response.data.sponsor;
                $scope.isSponsor = response.data.is_sponsor;
                $scope.isSponsorActive = response.data.is_sponsor_active;
                $scope.isActive = response.data.active;
                $scope.email = response.data.user.email;
                $rootScope.profile_photo = $scope.profile.photo;
                $rootScope.$broadcast('is_logged', true);
            });
        }

        return is_authenticated;
    };


    $scope.fetching_profile = false;

    $scope.getProfile = function() {
        return $scope.profile;
    };

    $scope.do_back = function() {
        $window.history.back();
    };

    $scope.goProfile = function() {
        if($scope.isSponsor) {
            $state.go('sponsor-view', {
                sponsorId: $scope.sponsor.id
            });
        } else {
            $state.go('profile');
        }
    };

    $scope.goNotifications = function() {
        $state.go('profile_notificaciones');
    };

    $scope.resendActivationMail = function() {
        $http.get(api_host+'/api/users/resend/activation').success(function(data) {
            $scope.sentActivationMail = true;
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

    $timeout(function() {
        jQuery(".button-collapse").sideNav();
    });

});
