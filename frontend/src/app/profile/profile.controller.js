(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(account, user, $mdDialog) {
    var vm = this;

    account.getProfile()
    .then(function(data) {
      user.getUser(data.user.id)
      .then(function(user_data) {
        vm.user = user_data;
        if (vm.user.birthdate) {
          vm.user.birthdate = new Date(vm.user.birthdate);
        }
      });
    });

    vm.saveProfile = function() {
      user.saveProfile(vm.user);
    };

    vm.showCropAvatarDialog = function(ev) {
      $mdDialog.show({
        controller: CropAvatarController,
        templateUrl: 'app/profile/avatar_crop.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(image) {
        vm.avatar_image = image;

      });
    };

    vm.showCropCoverDialog = function(ev) {
      $mdDialog.show({
        controller: CropCoverController,
        templateUrl: 'app/profile/cover_crop.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(image) {
        vm.cover_image = image;

      });
    };
  }

  function CropAvatarController($scope, $mdDialog) {
    $scope.myImage='';
    $scope.myCroppedImage='';

    $scope.handleFileSelect = function(evt) {
      var file=evt.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.cropImage = function() {
      $mdDialog.hide($scope.myCroppedImage);
    }
  }

  function CropCoverController($scope, $mdDialog) {
    $scope.myImage='';
    $scope.myCroppedImage='';

    $scope.handleFileSelect = function(evt) {
      var file=evt.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.cropImage = function() {
      $mdDialog.hide($scope.myCroppedImage);
    }
  }

})();
