'use strict';

SampleController = function (sampleHttpService) {
    this.doServiceCall = function () {
        sampleHttpService.doGet();
    };

    this.doServiceCallWithParams = function (a, b, c) {
        sampleHttpService.doGetWith(a, b, c);
    };

    this.doServiceCallWithHashParams = function (h) {
        sampleHttpService.doGetWithHash({x: h.a, y: h.b, z: h.c});
    }
};

angular.module('sample.js.module').controller('SampleController', ['sampleHttpService', SampleController]);
