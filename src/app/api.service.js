(function() {
  'use strict';

  angular
    .module('test2015')
    .factory('apiService', apiService);

  /** @ngInject */
  function apiService($log, $q, $timeout, mockDataService) {
    var mockData = {};
    var dataPromise = mockDataService.getMock();

    dataPromise.then( _setData, _handleError );




    var service = {
      data: undefined,
      getQuestion: getQuestion,
      getTotalAnswers: getTotalAnswers
     };



    return service;

    function _getData( getterCb ){
      var deferred = $q.defer();
      var promise = deferred.promise;
      if(!service.data){
        dataPromise.then(function( result ){
          $timeout(function() {
            deferred.resolve( getterCb() );
         }, 500);
        });
      }else{
        deferred.resolve( getterCb() );
      }
      return promise;
    }

    function _setData( results ){
      service.data = results;
    }

    function _handleError( e ){
      $log.error("Fail: ", e, e.stack );
    }

    function _getQuestion(){
      return service.data.question;
    }

    function getQuestion() {
       return _getData( _getQuestion );
    }

    function _getTotalAnswers(){
      return service.data.answers;
    }

    function getTotalAnswers(){
      return _getData( _getTotalAnswers );
    }

  }
})();
