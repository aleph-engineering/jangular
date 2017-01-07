'use strict';

var config = function ($stateProvider) {
    $stateProvider.state('stateA', {});

    $stateProvider.state('stateB', {
        abstract: true
    });

    $stateProvider.state('stateC', {
        url: '/some_url',
        controller: 'SomeUserController'
    });

};

angular.module('sample.js.module').config(config);
