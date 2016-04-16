(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, sponsor, winwin, miembro, gettextCatalog, gettext, $auth, $mdDialog, $window, $document) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';

    var w = angular.element($window);

    sponsor.getList(0, (w.width()<481) ? 3 : 6).then(function(data) {
      vm.sponsors = data;
    });
    sponsor.getMainList().then(function(data) {
      vm.partners = data;
    });
    winwin.getList(0, 'last', (w.width()<481) ? 2 : 6).then(function(data) {
      vm.recientes = data;
    });
    winwin.getList(0, 'select', (w.width()<481) ? 4 : 6).then(function(data) {
      vm.destacados = data;
    });
    miembro.getList(0, (w.width()<481) ? 6 : 12).then(function(data) {
      vm.miembros = data;
    });
    winwin.getInterests().then(function(data) {
      vm.interests = data;
    });

    vm.tdestacados = gettextCatalog.getString(gettext('Winwins Destacados'));
    vm.tpopulares = gettextCatalog.getString(gettext('Winwins Populares'));
    vm.trecientes = gettextCatalog.getString(gettext('Winwins Recientes'));
    vm.tterminar = gettextCatalog.getString(gettext('Winwins por terminar'));
    vm.tconcretados = gettextCatalog.getString(gettext('Winwins concretados'));

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    vm.doFilter = function(filter) {
      winwin.getList(0, filter, 6).then(function(data) {
        vm.destacados = data;
      });
    };

    vm.doCategories = function($index) {
      var _categories = vm.interests[$index]["id"];
      winwin.getListByCategory(0, _categories, 6).then(function(data) {
        vm.destacados = data;
      });
    };

    vm.showLoginDialog = function(ev) {
      $mdDialog.show({
        controller: 'LoginController',
        templateUrl: 'app/login/login.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    vm.showVideoDialog = function(ev) {
      $mdDialog.show({
        controller: VideoController,
        templateUrl: 'app/main/video.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

  }

  function VideoController(){}

})();
