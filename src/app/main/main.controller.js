(function() {
  'use strict';

  angular
    .module('test2015')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, $rootScope, lodash, webDevTec, toastr, apiService, $stateParams ) {
    var vm = this;
    vm.$state = $rootScope.$state;
    vm.btnClass = 'glyphicon glyphicon-eye-open';



    vm.awesomeThings = [];

    apiService.getQuestion().then(function( question ){
        vm.question = question;
    });

    apiService.getUserTags().then(function( userTags ){
        vm.userTags = userTags;
    });

    apiService.getPropsForChart($stateParams.type).then(function( chartProps ){
        vm.chartType = "chart chart-" + $stateParams.type;
        vm.chartProps = chartProps;
    });

    vm.onClick = function (points, evt) {
        console.log(points, evt);
    };

    vm.toggleFilterBtn = function(){
      vm.showFilters = !vm.showFilters;
      vm.btnClass = vm.showFilters ? 'glyphicon glyphicon-eye-close' : 'glyphicon glyphicon-eye-open';
      vm.filters = ($rootScope.$state.current.params) ? $rootScope.$state.current.params.filters : undefined;
      if(!vm.showFilters){
         $rootScope.$state.go('home.chart',$rootScope.$state.current.params);
      }else{
          $rootScope.$state.go('home.chart.advance', $rootScope.$state.current.params);
      }
    }
    getWebDevTec();



    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();
      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();

