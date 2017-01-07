(function () {
    'use strict';

    describe('sample Javascript controller matchers', function () {

        var subject;
        var sampleHttpService;

        beforeEach(function () {
            // make matchers available
            jasmine.addMatchers(jangular_matchers);

            // initialize module
            module('sample.js.module');
        });

        // create controller an inject dependencies
        beforeEach(inject(function ($controller, _sampleHttpService_) {
            subject = $controller('SampleController');
            sampleHttpService = _sampleHttpService_
        }));

        it('is defined', function () {
            expect(subject).toBeDefined();
        });

        // toCall
        it('calls a service', function () {
            expect(subject.doServiceCall).toCall(sampleHttpService, 'doGet');
        });

        // toCallWith
        it('calls a service with parameters', function () {
            expect(function () {
                subject.doServiceCallWithParams(1, 2, 3)
            }).toCallWith(sampleHttpService, 'doGetWith', 1, 2, 3);
        });

        it('calls a service with hash parameters', function () {
            expect(function () {
                subject.doServiceCallWithHashParams({a: 1, b: 2, c: 3})
            }).toCallWith(sampleHttpService, 'doGetWithHash', {x: 1, y: 2, z: 3});
        });

        // toSubscribeSuccess
        it('subscribes to promise success', function () {
            expect(subject.doSubscribe).toSubscribeSuccess(sampleHttpService, 'doGet', subject.doGetSuccess);
        });

        // toSubscribeError
        it('subscribes to promise error', function () {
            expect(subject.doSubscribeToError).toSubscribeError(sampleHttpService, 'doGet', subject.doGetFails);
        });
    });
})();
