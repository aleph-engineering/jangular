(function () {
    'use strict';

    describe('sample http service', function () {

        var subject;

        beforeEach(function () {
            // make the matchers available
            jasmine.addMatchers(jangular_matchers);

            // initialize module
            module('sample.js.module');
        });

        beforeEach(inject(function (sampleHttpService) {
            subject = sampleHttpService;
        }));

        afterEach(inject(function ($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));

        it('GETs the given URI', function(){
            expect(subject.doGet).toGet('/data');
        });

        it('GET unwraps the response', function() {
            expect(subject.doUnwrap).toUnwrapGet();
        });

        it('GETs a given URI and unwraps the response', function(){
            expect(subject.doGetAndUnwrap).toGetAndUnwrap('/data');
        });

    });
})();
