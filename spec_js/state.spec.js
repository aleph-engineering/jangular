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

    // toBeAbstract
    describe('stateB', function () {

        beforeEach(function () {
            subject = state.get('stateB');
        });

        it('is an state, using object variant', function () {
            expect(subject).toBeAbstract();
        });

        it('is an state, using string variant', function () {
            expect('stateB').toBeAbstract();
        });
    });

    // toHaveUrl
    describe('stateC', function () {

        beforeEach(function () {
            subject = state.get('stateC');
        });

        it('has an URL, using object variant', function () {
            expect(subject).toHaveUrl('/some_url');
        });

        it('has an URL, using string variant', function () {
            expect('stateC').toHaveUrl('/some_url');
        });
    });

});
