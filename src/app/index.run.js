(function() {
  'use strict';

  angular
    .module('test2015')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
