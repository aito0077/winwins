(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(account, user, $mdDialog, $q, ENV, $state, $auth, $rootScope, $scope, $document) {
    var vm = this;

    if (!$auth.isAuthenticated()) {
      $state.go('home');
    }

    vm.imageServer = ENV.imageServer;

    account.getProfile()
    .then(function(data) {
      vm.isActive = data.active;
      user.getUser(data.user.id)
      .then(function(user_data) {
        vm.user = user_data;
        vm.is_complete = (user_data.name && user_data.lastname && user_data.email && user_data.birthdate);
        if (vm.user.birthdate) {
          vm.user.birthdate = new Date(vm.user.birthdate);
        }
      });
    });

    vm.saveProfile = function() {
      vm.processing = true;
      vm.current_password_wrong_message = '';

      var promises = [];

      if (vm.avatar_image) {
        promises.push(account.uploadImage(dataURItoBlob(vm.avatar_image.file), vm.avatar_image.name));
      }
      if (vm.cover_image) {
        promises.push(account.uploadImage(dataURItoBlob(vm.cover_image.file), vm.cover_image.name));
      }

      $q.all(promises).then(function(data) {
        var indexAvatar = 0;
        var indexCover = 1;
        if (!vm.avatar_image) {
          indexCover = 0;
        }

        if (vm.avatar_image) {
          vm.user.photo = data[indexAvatar].filename;
        }
        if (vm.cover_image) {
          vm.user.cover_photo = data[indexCover].filename;
        }

        user.saveProfile(vm.user)
        .then(function(){
          $rootScope.$broadcast('account_change');

          $mdDialog.show({
            controller: CropAvatarController,
            templateUrl: 'app/profile/modal_success.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true
          });
        })
        .catch(function(response) {
          if(response.data) {
            if(response.data.message == 'user_current_password_wrong') {
              $scope.profileForm.current_password.$setValidity("currentPasswordWrong", false);
            }
          }
        });


        vm.processing = false;
      });
    };

    var dataURItoBlob = function(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
    };

    vm.showCropAvatarDialog = function(ev) {
      $mdDialog.show({
        controller: CropAvatarController,
        templateUrl: 'app/profile/avatar_crop.tmpl.html',
        parent: angular.element($document.body),
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
        parent: angular.element($document.body),
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
    $scope.fileName='';

    $scope.handleFileSelect = function(evt) {
      var file=evt.files[0];
      $scope.fileName = file.name;
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.cropImage = function() {
      $mdDialog.hide({file:$scope.myCroppedImage, name:$scope.fileName});
    }
  }

  function CropCoverController($scope, $mdDialog) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.fileName='';

    $scope.handleFileSelect = function(evt) {
      var file=evt.files[0];
      $scope.fileName = file.name;
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.cropImage = function() {
      $mdDialog.hide({file:$scope.myCroppedImage, name:$scope.fileName});
    }
  }

})();
