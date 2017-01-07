'use strict';

describe('sample ui.router state matchers', function () {

    var subject;
    var state;

    beforeEach(function () {
        // make matchers available
        jasmine.addMatchers(jangular_matchers);

        // initialize module
        module('sample.js.module');
    });

    beforeEach(inject(function ($state) {
        state = $state;
    }));

    // toBeAnState
    describe('stateA', function () {

        // inject ui.router $state helper and get the state object
        beforeEach(function () {
            subject = state.get('stateA');
        });

        it('is an state, using object variant', function () {
            expect(subject).toBeAnState();
        });

        it('is an state, using string variant', function () {
            expect('stateA').toBeAnState();
        });
    });

});
