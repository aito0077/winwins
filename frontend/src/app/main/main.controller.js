(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, sponsors, winwins, miembros, partners, gettextCatalog, gettext, $auth) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1458584706984;
    vm.sponsors = sponsors;
    vm.winwins = winwins;
    vm.miembros = miembros;
    vm.partners = partners;
    vm.tdestacados = gettextCatalog.getString(gettext('Winwins Destacados'));
    vm.tpopulares = gettextCatalog.getString(gettext('Winwins Populares'));
    vm.trecientes = gettextCatalog.getString(gettext('Winwins Recientes'));
    vm.tterminar = gettextCatalog.getString(gettext('Winwins por terminar'));
    vm.tconcretados = gettextCatalog.getString(gettext('Winwins concretados'));

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    vm.destacados = [
      {
        id: 11,
        members: 12,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },{
        id: 11,
        members: 12,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.jpg",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      }
    ];

  }
})();
