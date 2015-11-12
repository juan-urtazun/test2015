(function() {
  'use strict';

  angular
    .module('test2015')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, $state, lodash, webDevTec, toastr, apiService ) {
    var vm = this;
    vm.$state = $state;
    vm.changeOptions = function(){
      $log.info("new state", vm.state);
    }
/*
    vm.states = [{id:1, label:"ana maria"},
    {id:2, label:"celina"},
     {id:3, label:"otra"}]*/

    vm.awesomeThings = [];



    apiService.getQuestion().then(function( question ){
        vm.question = question;
        $log.info( "getQuestion", question );
    });


    apiService.getTotalAnswers().then( function(anwsers ){
      vm.labels = lodash.pluck(anwsers,  'text');
      vm.series = ["Porcentaje", "Respuestas"];
      vm.data = [ lodash.pluck(anwsers,  'percentage'), lodash.pluck(anwsers,  'count') ];
    });

    vm.onClick = function (points, evt) {
        console.log(points, evt);
    };

      getWebDevTec();



    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();
      console.log("awesomeThings", vm.awesomeThings);

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();

