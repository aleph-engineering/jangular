'use strict';

var config = function ($stateProvider) {
    $stateProvider.state('stateA', {});

    $stateProvider.state('stateB', {
        abstract: true
    });

    $stateProvider.state('stateC', {
        url: '/some_url',
        controller: 'SomeUserController',
        controllerAs: 'suc'
    });

    $stateProvider.state('stateD', {
        template: '<div id="some_template"></div>'
    });

    $stateProvider.state('stateE', {
        templateUrl: '/templates/footer.html'
    });
};

angular.module('sample.js.module').config(config);
