(function () {

    'use strict';

    function sampleHttpService($http) {
        return {
            doGet: function () {
                $http.get('/data');
            },
            doGetWith: function (a, b, c) {

            },
            doGetWithHash: function () {
            },
            doUnwrap: function () {
                return $http.get('/any_path').then(function (response) {
                    return response.data;
                });
            },
            doGetAndUnwrap: function () {
                return $http.get('/data').then(function (response) {
                    return response.data;
                });
            },
            doPost: function () {
                $http.post('/post', {
                    firstname: 'Olivia',
                    lastname: 'Lago'
                });
            },
            doPostAndUnwrap: function () {
                var payload = {
                    firstname: 'Olivia',
                    lastname: 'Lago'
                };
                return $http.post('/post', payload).then(function (response) {
                    return response.data;
                });
            }
        };
    };

    angular.module('sample.js.module').factory('sampleHttpService', ['$http', sampleHttpService]);

})();
