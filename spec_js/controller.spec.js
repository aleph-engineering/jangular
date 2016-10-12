(function(){
    'use strict';

    describe('sample Javascript controller matchers', function(){

        beforeEach(function(){
            // make matchers available
            jasmine.addMatchers(jangular_matchers);

            // initialize module
            module('sample.js.module');
        });

        // create controller an inject dependencies
        beforeEach(inject(function($controller, sampleHttpService){
            
        }));
    });
})();
