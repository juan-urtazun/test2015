(function() {
  'use strict';

  angular
    .module('test2015')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
        .state('depExamples', {
          url: '/depExamples',
          templateUrl: 'app/mock/depsExamples.html',
          controller: 'MainController',
          controllerAs: 'main'
        });

      $urlRouterProvider.otherwise('/');
  }

})();
