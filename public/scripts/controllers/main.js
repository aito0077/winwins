'use strict';

angular.module('winwinsApp')

.controller('MainCtrl', ['$scope','$auth', '$http', '$state', '$timeout', 'Winwin', 'api_host', 'es_client', '$uibModal', function($scope, $auth, $http, $state, $timeout, Winwin, api_host, es_client, $uibModal) {
    $scope.winwins = [];
    $scope.all_winwins = [];

    Winwin.query(function(data) {
        $scope.all_winwins = data;
        $scope.winwins = $scope.all_winwins;
    });

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.goControlPanel = function() {
        $state.go('account'); 
    };

    $scope.join = function(winwin_id) {
        if($auth.isAuthenticated()) {
            $http.get(api_host+'/api/winwins/join/'+winwin_id).success(function(data) {
                swal({
                    title: "info", 
                    text: 'winwin_join', 
                    type: "info",
                    showcancelbutton: false,
                    closeonconfirm: true,
                }, function() {
                    $scope.view(winwin_id);
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
        } else {
            $state.go('signIn');
        }
    };

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

    $scope.openSocialModal = function(winwin) {
        $scope.toShare = winwin;
        var modalInstance = $uibModal.open({
            animation: false,
            windowTopClass: 'modal-background',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                toShare: function () {
                    return $scope.toShare;
                }
            }
        });
    };

    $scope.filter = function(filter) {
        $scope.is_filtered = (filter !== 'all');
        console.log(filter);
        if($scope.is_filtered) {
            console.log('filter');
            $scope.winwins = _.filter($scope.all_winwins, function(item) {
                return item.mark == filter;
            });
        } else {
            $scope.winwins = $scope.all_winwins;
        }
    };

    $scope.setup_components = function() {
        $timeout(function() {
            jQuery(window).scroll(function() {  

                if(jQuery(document).scrollTop() > 100) {    
                    jQuery('#footer').addClass("show");
                } else {
                    jQuery('#footer').removeClass("show");
                }

                var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                    shrinkOn = 50,
                    header = document.querySelector("header");
                if (distanceY > shrinkOn) {
                    classie.add(header,"smaller");
                    //classie.add(document.querySelector(".pseudo-header"),"smaller");
                } else {
                    if (classie.has(header,"smaller")) {
                        classie.remove(header,"smaller");
                        //classie.remove(document.querySelector(".pseudo-header"),"smaller");
                    }
                }

                if (document.body.scrollTop > 50 || $scope.visible_search) {
                    jQuery('#slider').stop().animate({"margin-top": '0'}) > 10;
                } else {
                    jQuery('#slider').stop().animate({"margin-top": '-100'}) > 10;
                }

            });
            jQuery("#flip").click(function(){
                jQuery("#panel").slideDown("slow");
            });

        });
    };

    $scope.setup_components();

    $scope.visible_search = false;
    $scope.showSearch = function() {
        $scope.visible_search = true;
        jQuery('#slider').stop().animate({"margin-top": '0'}) > 10;
        console.log('visible search');
    };

}])
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, toShare) {

  $scope.toShare = toShare;

})
.controller('main-search-controller', ['$scope','$state', function($scope, $state) {


    $scope.search = function() {

        console.log('query: '+$scope.term);

        $state.go('search-list', {
            query: $scope.term,
            winwin: true,
            user: true,
            group: true,
            sponsor: true
        }); 
    };

}])
.controller('contact-controller', ['$scope','$auth', '$http', '$state', 'api_host', function($scope, $auth, $http, $state, api_host) {

}]);
