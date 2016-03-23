(function() {
  'use strict';

  angular
      .module('winwins')
      .service('partner', partner);

  /** @ngInject */
  function partner($log, Restangular, $q) {

    var _partner = {};

    var testData = [
      { id: 1, nombre: 'Partner1' , imagen: 'partner1.jpg', link: 'http://www.partnet1.com' },
      { id: 2, nombre: 'Partner2' , imagen: 'partner2.jpg', link: 'http://www.partnet2.com' },
      { id: 3, nombre: 'Partner3' , imagen: 'partner3.jpg', link: 'http://www.partnet3.com' },
      { id: 4, nombre: 'Partner4' , imagen: 'partner4.jpg', link: 'http://www.partnet4.com' },
      { id: 5, nombre: 'Partner5' , imagen: 'partner5.jpg', link: 'http://www.partnet5.com' },
      { id: 6, nombre: 'Partner6' , imagen: 'partner6.jpg', link: 'http://www.partnet6.com' },
      { id: 7, nombre: 'Partner7' , imagen: 'partner7.jpg', link: 'http://www.partnet7.com' },
      { id: 8, nombre: 'Partner8' , imagen: 'partner8.jpg', link: 'http://www.partnet8.com' }
    ];

    _partner.getList = function() {
      var dfd = $q.defer();
      dfd.resolve(testData);
      return dfd.promise;
    };

    return _partner;
  }

})();
