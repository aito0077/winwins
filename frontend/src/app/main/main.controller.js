(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, sponsors, winwins, miembros, partners, gettextCatalog, gettext) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1458584706984;
    vm.sponsors = sponsors;
    vm.winwins = winwins;
    vm.miembros = miembros;
    vm.partners = partners;
    vm.title = gettextCatalog.getString(gettext('Winwins Destacados'));

    vm.destacados = [
      {
        id: 11,
        members: 12,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },{
        id: 11,
        members: 12,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },{
        id: 11,
        members: 12,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      },
      {
        id: 11,
        members: 4,
        img: "assets/images/fondo.png",
        title: "Intercambio de novelas policiales",
        user: { logo: "assets/images/logo.png", thumb: "assets/images/thumb.png" }
      }
    ];

  }
})();
