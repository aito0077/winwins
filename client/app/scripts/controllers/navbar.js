angular.module('winwinsApp')
.controller('NavController', function ($scope, $rootScope, $state, $location, $timeout, $auth, $window, Account) {
    $scope.isCollapsed = true;
    $scope.unreadNotifications = 0;
    $scope.profile = false;
    $scope.is_logged = false;
    $scope.isSponsor = false;
    $scope.sponsor = false;

    $scope.profile_image = 0;

    $scope.isOpen = false;
    $scope.menuStatus = {
        isAnimating: false
    };


    $scope.$on('$routeChangeSuccess', function () {

    });
    $scope.$on('$stateChangeStart', function(){
        $scope.isCollapsed = true;
        if($auth.isAuthenticated()) {
            Account.getStatus().then(function(response) {
                console.log('get status');
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
                    $scope.fetching_profile = false;
                    $scope.profile = response.data.profile;
                    $scope.sponsor = response.sponsor;
                    $scope.isSponsor = response.is_sponsor;
                    $rootScope.account = $scope.profile;
                });
            }
        } else {
            $scope.profile = false;
            $scope.is_logged = false;
            $scope.profile_image = 0;
            $scope.sponsor = false;
            $scope.isSponsor = false;
            $rootScope.account = {};
        }

    });


    $rootScope.$on('$stateChangeSuccess',function(data, other){

        console.log('Menu abierto? '+$scope.isOpen);
        if($scope.isOpen) { 
            $scope.toggleMenu();
        }

        if(other.name.lastIndexOf('winwin-view.', 0) === 0) {
            $("html, body").animate({ scrollTop: 430 }, 0);
        } else {
            console.log('scroll to top');
            $("html, body").animate({ scrollTop: 1 }, 0);

        }

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
                $rootScope.$broadcast('is_logged', true);
            });
        }

        return is_authenticated;
    };


    $scope.fetching_profile = false;

    $scope.getProfile = function() {
        var is_authenticated = $auth.isAuthenticated();
        return $scope.profile;
    };

    $scope.do_back = function() {
        $window.history.back();
    };

    $scope.goProfile = function() {
        console.log('go profile');
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

    $scope.closeMenu = function() {
        console.log('close menu');
    }

    $scope.toggleMenu = function() {
        console.log('toggle menu');
    }

    $scope.setupComponents = function() {
    };

    $timeout(function() {
        $scope.setupComponents();
    });

});
