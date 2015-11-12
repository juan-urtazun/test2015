(function() {
  'use strict';

  angular
    .module('test2015')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {

    $log.debug('runBlock end');
    $rootScope.$state = $state;
  }

})();
