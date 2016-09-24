(function(){

    'use strict';

    function sampleHttpService($http) {
        return {
            doGet: function() {
                $http.get('/data');
            }
        };
    };

    angular.module('sample.js.module').factory('sampleHttpService', ['$http', sampleHttpService]);

})();
