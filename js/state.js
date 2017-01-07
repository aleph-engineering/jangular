'use strict';

var config = function($stateProvider) {
    $stateProvider.state('stateA', {});

    $stateProvider.state('stateB', {
        abstract: true
    });
};

angular.module('sample.js.module').config(config);
