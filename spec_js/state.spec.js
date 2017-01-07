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

    describe('stateC', function () {

        beforeEach(function () {
            subject = state.get('stateC');
        });

        // toHaveUrl
        it('has an URL, using object variant', function () {
            expect(subject).toHaveUrl('/some_url');
        });

        it('has an URL, using string variant', function () {
            expect('stateC').toHaveUrl('/some_url');
        });

        // toHaveController
        it('has controller, using object variant', function () {
            expect(subject).toHaveController('SomeUserController');
        });

        it('has controller, using string variant', function () {
            expect('stateC').toHaveController('SomeUserController');
        });

        // toHaveControllerAlias / toHaveControllerAs
        it('has controller alias, using object variant', function(){
            expect(subject).toHaveControllerAlias('suc');
        });

        it('has controller alias, using string variant', function(){
            expect('stateC').toHaveControllerAlias('suc');
        });

        it('has controller alias, using object variant', function(){
            expect(subject).toHaveControllerAs('suc');
        });

        it('has controller alias, using string variant', function(){
            expect('stateC').toHaveControllerAs('suc');
        });
    });

});
