(function() {
  'use strict';

  angular
    .module('test2015')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/:type',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });


    $stateProvider
      .state('home.chart', {
        url: '/:type',
        templateUrl: function($stateParams){
          console.log("$stateParams", $stateParams);
          var c_type = $stateParams.type || 'line';
          return 'app/main/main.chart.' + c_type + '.html'
        },
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

    $stateProvider
        .state('error', {
          url: '/error',
          templateUrl: 'app/main/error.html'
        });


     $urlRouterProvider.otherwise('/chart/line');
  }

})();
