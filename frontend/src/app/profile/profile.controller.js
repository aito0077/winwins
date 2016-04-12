(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(account, user) {
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
  }

})();
