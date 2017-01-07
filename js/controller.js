'use strict';

SampleController = function (sampleHttpService) {
    var me = this;

    this.doServiceCall = function () {
        sampleHttpService.doGet();
    };

    this.doServiceCallWithParams = function (a, b, c) {
        sampleHttpService.doGetWith(a, b, c);
    };

    this.doServiceCallWithHashParams = function (h) {
        sampleHttpService.doGetWithHash({x: h.a, y: h.b, z: h.c});
    };

    this.doSubscribe = function () {
        sampleHttpService.doGet().then(me.doGetSuccess);
    };

    this.doGetSuccess = function () {
        console.log('get successfully executed');
    };

    this.doSubscribeToError = function () {
        sampleHttpService.doGet().then(function () {
        }, me.doGetFails);
    };

    this.doGetFails = function () {
        console.log('the get that failed you!');
    }

    this.doFullSubscribe = function () {
        sampleHttpService.doGet().then(me.doGetSuccess, me.doGetFails);
    };
};

angular.module('sample.js.module').controller('SampleController', ['sampleHttpService', SampleController]);
