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

        it('GETs the given URI', function () {
            expect(subject.doGet).toBareGet('/data');
        });

        it('GET unwraps the response', function () {
            expect(subject.doUnwrap).toUnwrapGet();
        });

        it('GETs a given URI and unwraps the response', function () {
            expect(subject.doGetAndUnwrap).toGet('/data');
        });

        it('POSTs a given URI', function () {
            expect(subject.doPost).toBarePost('/post', {
                firstname: 'Olivia',
                lastname: 'Lago'
            });
        });

        it('POST unwraps the response', function () {
            expect(subject.doPostAndUnwrap).toUnwrapPost();
        });

        it('POST a given URI and unwraps the response', function () {
            expect(subject.doPostAndUnwrap).toPost('/post', {
                firstname: 'Olivia',
                lastname: 'Lago'
            });
        });

        describe('PUT', function () {
            // doPut
            it('PUTs to a given URI', function () {
                expect(subject.doPut).to_put('/put_uri', {id: 1, given_name: 'Maria', last_name: 'Juana'});
            });
        });

    });
})();
