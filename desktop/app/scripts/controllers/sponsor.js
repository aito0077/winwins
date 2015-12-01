'use strict';

angular.module('winwinsApp')
.controller('sponsor-list', ['$scope', '$state', 'SponsorPaginate', function($scope, $state, SponsorPaginate) {
   
    $scope.sponsors = new SponsorPaginate();

    $scope.view = function(id) {
        $state.go('sponsor-view', {
            sponsorId: id
        }); 
    }
 
}])
.controller('sponsor-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$anchorScroll', '$location', 'Sponsor', 'api_host', 'Upload', function($scope, $http, $state, $stateParams, $timeout, $anchorScroll, $location, Sponsor, api_host, Upload) {

    $scope.is_admin = false;

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

    $scope.edit_sponsor = {};

    $scope.getSponsor = function() {
        $scope.sponsor = Sponsor.get({
            id: $stateParams.sponsorId
        }, function(data) {
            $scope.sponsor = data;
            $scope.edit_sponsor = data;
        });
    }

    $scope.getSponsor();

    $scope.follow = function() {
        $http.get(api_host+'/api/sponsors/follow/'+$scope.sponsor.id).success(function(data) {
            $scope.getSponsor();
            swal({
                title: "info", 
                text: 'sponsor_join', 
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
        $http.get(api_host+'/api/sponsors/unfollow/'+$scope.sponsor.id).success(function(data) {
            swal({
                title: "info", 
                text: 'sponsor_left', 
                type: "info",
                showcancelbutton: false,
                closeonconfirm: true 
            });
            $scope.getSponsor();
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


    $scope.uploading = false;
    $scope.uploadFiles = function(file) {
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: api_host+'/api/sponsor/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.edit_sponsor.photo = response.data.filename;
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
                url: api_host+'/api/sponsor/upload',
                file: file
            });

            file.upload.then(function (response) {
                $scope.uploading_cover = false;

                $timeout(function () {
                    file.result = response.data;
                    $scope.edit_sponsor.cover_photo = response.data.filename;
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
        $http.post(api_host+'/api/sponsor/profile', $scope.edit_sponsor)
        .success(function(data) {
            $scope.getSponsor();
            swal({
                title: "info", 
                text: 'sponsor_updated', 
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





}]);
