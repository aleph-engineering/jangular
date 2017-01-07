# JAngular

You are here probably because you are tired of writing verbose specs for [AngularJS](https://angularjs.org/) projects. 
Or because you feel that projects using [UI-Router](https://angular-ui.github.io/ui-router/) besides of the fact of being awesome are 
also difficult to test. Or both!.

**JAngular** (alternatively `jangular-matchers`) is set of [Jasmine](http://jasmine.github.io/) matchers for [AngularJS](https://angularjs.org/) and [UI-Router](https://angular-ui.github.io/ui-router/) 
that makes developers life easier. 

Sources are completely written in **Coffeescript**, however it can be successfully used in **Javascript** and samples are 
provided as well in **Javascript**.

## Structure

* `coffee/`: sample [AngularJS](https://angularjs.org/) **Coffeescript** code, module, controller, service, [UI-Router](https://angular-ui.github.io/ui-router/) state configuration. 
* `dist/`: packaged **Javascript** code to be included in your specs (see samples and `karma.conf.js`).
* `js/`: sample [AngularJS](https://angularjs.org/) **Javascript** code, module, controller, service, [UI-Router](https://angular-ui.github.io/ui-router/) state configuration. 
* `spec_coffee`: sample **Coffeescript** specs testing code located at `coffee` directory.
* `spec_js`: sample **Javascript** specs testing code located at `js` directory.
* `src`: **Coffeescript** source code of [Jasmine](http://jasmine.github.io/) matchers.
* `coffeelint.json`: coffee lint configuration.
* `gulpfile.js`: gulp tasks for building **JAngular** if you want to contribute.
* `karma.conf.js`: configuration file [Karma](https://github.com/karma-runner/karma) test runner for **Javascript**. Users of **JAngular** should take a look to this file.
* `LICENSE`: license file
* `package.json`: npm configuration for **JAngular**
* `README.md`: this document.

## Usage

``` Bash
$ npm install jangular-matchers
```

## List of matchers

### Service

* [toGet()](#toget)
* [toUnwrapGet()](#tounwrapget)
* [toGetAndUnwrap()](#togetandunwrap)
* [toPost()](#topost)
* [toUnwrapPost()](#tounwrappost)
* [toPostAndUnwrap()](#topostandunwrap)

### Controller

* [toCall()](#tocall)
* [toCallWith()](#tocallwith)
* [toSubscribeSuccess()](#tosubscribesuccess)
* [toSubscribeError()](#tosubscribeerror)
* [toSubscribe()](#tosubscribe)
* [toCallbackSuccessWith()](#tocallbacksuccesswith)
* [toCallbackErrorWith()](#tocallbackerrorwith)

### State

* [toBeAnState()](#tobeanstate)
* [toBeAbstract()](#tobeabstract)
* [toHaveUrl()](#tohaveurl)
* [toHaveController()](#tohavecontroller)
* [toHaveControllerAlias()](#tohavecontrolleralias)
* [toHaveTemplate()](#tohavetemplate)
* [toHaveTemplateUrl()](#tohavetemplateurl)
* [to_resolve_by_calling_service()](#to_resolve_by_calling_service)
* [to_resolve_by_calling_service_with()](#to_resolve_by_calling_service_with)
* [to_have_view()](#to_have_view) *TODO*

## HTTP Service matchers
Every sample [Jasmine](http://jasmine.github.io/) matcher for [AngularJS](https://angularjs.org/) HTTP service will be enclosed in the following `describe` code section:

### Javascript
``` Javascript
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

    });
```

### Coffeescript
``` Coffeescript
describe 'sample http service matchers', ->
  
  # make the matchers available
  beforeEach ->
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach ->
    module 'sample.coffee.module'

  # inject the http service (SUT)
  beforeEach inject (sampleHttpService) =>
    @subject = sampleHttpService

  # after every test assert for no pending expectations & requests
  afterEach inject ($httpBackend) ->
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()

  # (every test will be placed here)    
  it 'example spec', =>
    expect(true).toEqual true
```

Every sample [AngularJS](https://angularjs.org/) HTTP service operation will be enclosed in the following code block:

### Javascript
``` Javascript
    function sampleHttpService($http) {
        return {
            someFunction: function() {
                $http.get('/some_url');
            }
        };
    };

    angular.module('sample.js.module').factory('sampleHttpService', ['$http', sampleHttpService]);
```

### Coffeescript

``` Coffeescript
sampleHttpService = ($http) ->
  class SampleHttpService
  
    # (operations will be listed here)
    example_operation: ->
        $http.get '/some_uri'

  new SampleHttpService

angular.module('sample.coffee.module').factory 'sampleHttpService', ['$http', sampleHttpService]
```

### `toGet()`
Ensures that the service operation issues a GET to a given URI.

#### Javascript
##### spec

``` Javascript
        it('GETs the given URI', function(){
            expect(subject.doGet).toGet('/data');
        });
```

##### impl
``` Javascript
            doGet: function() {
                $http.get('/data');
            }
```

#### Coffescript
##### spec

``` Coffeescript
  it 'GETs a given URI', =>
    expect(@subject.do_get).to_get '/data'
```

##### impl
``` Coffeescript
    do_get: ->
      $http.get '/data'
```

### `toUnwrapGet()`
Ensures that the service operation unwraps the response body on success. Expects the service operation under test to return the `GET` promise as well.  

#### Javascript

##### spec
``` Javascript
        it('GET unwraps the response', function() {
            expect(subject.doUnwrap).toUnwrapGet();
        });
```

##### impl
``` Javascript
            doUnwrap: function() {
                return $http.get('/any_path').then(function(response) {
                    return response.data;
                });
            }
```

#### Coffeescript
##### spec

``` Coffeescript
  it 'GETs unwraps the response', =>
    expect(@subject.do_get_and_unwrap).to_unwrap_get()
```

##### impl
``` Coffeescript
    do_unwrap: ->
      $http.get('/any_path').then (reply) -> reply.data
```

### `toGetAndUnwrap()`
Ensures that the service operation issues a GET to a given URI and unwraps the response body on success. Expects the service operation under test to return the `GET` promise as well. 

#### Javascript

##### spec
```Javascript
        it('GETs a given URI and unwraps the response', function(){
            expect(subject.doGetAndUnwrap).toGetAndUnwrap('/data');
        });

```

##### impl
```Javascript
            doGetAndUnwrap: function() {
                return $http.get('/data').then(function(response){
                    return response.data;
                });
            }

```

#### Coffeescript

##### spec
``` Coffeescript
  it 'GETs a given URI and unwraps the response', =>
    expect(@subject.do_get_and_unwrap).to_get_and_unwrap '/data'
```

##### impl
``` Coffeescript
    do_get_and_unwrap: ->
      $http.get('/data').then (reply) -> reply.data
```

### `toPost()`
Ensures that the service operation issues a POST to a given URI.

#### Javascript
##### spec
```Javascript
        it('POSTs a given URI', function() {
            expect(subject.doPost).toPost('/post', {
                firstname: 'Olivia',
                lastname: 'Lago'
            });
        });
```
##### impl
```Javascript
            doPost: function() {
                $http.post('/post', {
                    firstname: 'Olivia',
                    lastname: 'Lago'
                });
            }
```
#### Coffeescript
##### spec

``` Coffeescript
  it 'POSTs a given URI', =>
    expect(@subject.do_post).to_post '/post', firstname: 'Olivia', lastname: 'Lago'
```

##### impl
``` Coffeescript
    do_post: ->
      $http.post '/post', firstname: 'Olivia', lastname: 'Lago'
```

### `toUnwrapPost()`
Ensures that the service operation unwraps the response body on success. Expects the service operation under test to return the `POST` promise as well.

#### Javascript

##### spec
```Javascript
        it('POST unwraps the response', function(){
           expect(subject.doPostAndUnwrap).toUnwrapPost();
        });
```
##### impl
```Javascript
            doPostAndUnwrap: function() {
                return $http.post('/post', {}).then(function(response) {
                    return response.data;
                });
            }

```

#### Coffescript

##### spec

``` Coffeescript
  it 'POST unwraps the response', =>
    expect(@subject.do_post_and_unwrap).to_unwrap_post()
```

##### impl
``` Coffeescript
    do_post_and_unwrap: ->
      $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data
```

### `toPostAndUnwrap()`
Ensures that the service operation issues a POST to a given URI and unwraps the response body on success. Expects the service operation under test to return the `POST` promise as well.

#### Javascript

##### spec
```Javascript
        it('POST a given URI and unwraps the response', function() {
            expect(subject.doPostAndUnwrap).toPostAndUnwrap('/post', {
                firstname: 'Olivia',
                lastname: 'Lago'
            });
        });
```

##### impl
```Javascript
            doPostAndUnwrap: function () {
                var payload = {
                    firstname: 'Olivia',
                    lastname: 'Lago'
                };
                return $http.post('/post', payload).then(function (response) {
                    return response.data;
                });
            }
```

#### Coffeescript

##### spec

``` Coffeescript
  it 'POST a given URI and unwraps the response', =>
    expect(@subject.do_post_and_unwrap).to_post_and_unwrap '/post', firstname: 'Olivia', lastname: 'Lago'
```

##### impl
``` Coffeescript
    do_post_and_unwrap: ->
      $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data
```

## Controller matchers
These matchers are not exclusively for [AngularJS](https://angularjs.org/) controllers, they may be used in other [AngularJS](https://angularjs.org/) services as well. Every sample [Jasmine](http://jasmine.github.io/) matcher for [AngularJS](https://angularjs.org/) controller will be enclosed in the following `describe` code section:

### Javascript
``` Javascript

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
        
        // more specs listed here!

    })
```

### Coffeescript

``` Coffeescript
describe 'sample controller matchers', ->
  
  # make the matchers available
  beforeEach -> 
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach -> 
    module 'sample.coffee.module'

  # create controller and inject dependencies
  beforeEach inject ($controller, sampleHttpService) =>
    @subject = $controller 'SampleController'
    @sampleHttpService = sampleHttpService
    
  # (example specs listed here)
  it 'example spec', =>
    expect(true).toEqual true
```

Every sample [AngularJS](https://angularjs.org/) controller operation will be enclosed in the following block:

### Javascript

``` Javascript

    SampleController = function (sampleHttpService) {
        this.someSampleOperation = function () {
            console.log('Hello I am an AngularJS controller!');
        };
        
        // more operations listed here!
    
    };

    angular.module('sample.js.module').controller('SampleController', ['sampleHttpService', SampleController]);

```

### Coffeescript

``` Coffeescript

class SampleController
  constructor: (@sampleHttpService) ->

  # (sample operations listed here)
  some_sample_operation: =>
    console.log 'Hello I am an AngularJS controller!'
    
  # more operations listed here
    
```

### `toCall()`
Ensures that the controller operation calls the given service operation without arguments.

#### Javascript

##### spec
``` Javascript

        // toCall
        it('calls a service', function () {
            expect(subject.doServiceCall).toCall(sampleHttpService, 'doGet');
        });
    
``

##### impl

``` Javascript

    this.doServiceCall = function () {
        sampleHttpService.doGet();
    };
    
```


#### Coffeescript

##### spec

``` Coffeescript
  it 'calls a service', =>
    expect(@subject.do_service_call).to_call @sampleHttpService, 'do_get'
```

##### impl
``` Coffeescript
  do_service_call: =>
    @sampleHttpService.do_get()
```

### `toCallWith()`
Ensures that the controller operation calls the given service operation with the provided arguments.

#### Javascript

##### spec

``` Javascript

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

```

##### impl

``` Javascript

    this.doServiceCallWithParams = function (a, b, c) {
        sampleHttpService.doGetWith(a, b, c);
    };

    this.doServiceCallWithHashParams = function (h) {
        sampleHttpService.doGetWithHash({x: h.a, y: h.b, z: h.c});
    }

```

#### Coffeescript

##### spec

``` Coffeescript
  it 'calls a service with parameters', =>
    expect(=> @subject.do_service_call_with_params 1, 2, 3).to_call_with @sampleHttpService, 'do_get_with', 1, 2, 3

  it 'calls a service with hash parameters', =>
    expect(=> @subject.do_service_call_with_hash_params a: 1, b: 2, c: 3).to_call_with @sampleHttpService, 'do_get_with_hash', x: 1, y: 2, z: 3
```

##### impl
``` Coffeescript
  do_service_call_with_params: (a, b, c) =>
    @sampleHttpService.do_get_with a, b, c

  do_service_call_with_hash_params: ({a, b, c}) =>
    @sampleHttpService.do_get_with_hash x: a, y: b, z: c
```

### `toSubscribeSuccess()`
Ensures that the controller operation subscribes to promise on success (completion) with the provided operation.


#### Javascript

##### spec

``` Javascript

        // toSubscribeSuccess
        it('subscribes to promise success', function(){
            expect(subject.doSubscribe).toSubscribeSuccess(sampleHttpService, 'doGet', subject.doGetSuccess);
        });

```

##### impl

``` Javascript

    // disambiguation of context    
    var me = this;

    this.doSubscribe = function () {
        sampleHttpService.doGet().then(me.doGetSuccess);
    };

    this.doGetSuccess = function() {
        console.log('get successfully executed');
    };


```

#### Coffeescript

##### spec

``` Coffeescript
  it 'subscribes to promise success', =>
    expect(@subject.do_subscribe).to_subscribe_success @sampleHttpService, 'do_get', @subject.do_get_success
```

##### impl
``` Coffeescript
  do_subscribe: =>
    @sampleHttpService.do_get().then @do_get_success

  do_get_success: ->
```

### `toSubscribeError()`
Ensures that the controller operation subscribes to promise on failure (rejection) with the provided operation.

#### Javascript

##### spec

``` Javascript

        // toSubscribeSuccess
        it('subscribes to promise success', function () {
            expect(subject.doSubscribe).toSubscribeSuccess(sampleHttpService, 'doGet', subject.doGetSuccess);
        });

        // toSubscribeError
        it('subscribes to promise error', function () {
            expect(subject.doSubscribeToError).toSubscribeError(sampleHttpService, 'doGet', subject.doGetFails);
        });

```

##### impl

``` Javascript

    // disambiguation of context    
    var me = this;

    this.doSubscribeToError = function () {
        sampleHttpService.doGet().then(function () {
        }, me.doGetFails);
    };

    this.doGetFails = function () {
        console.log('the get that failed you!');
    }

```

#### Coffeescript

##### spec

``` Coffeescript
  it 'subscribes to promise error', =>
    expect(@subject.do_subscribe_to_error).to_subscribe_error @sampleHttpService, 'do_get', @subject.do_get_fails
```

##### impl

``` Coffeescript
  do_subscribe_to_error: =>
    @sampleHttpService.do_get().then (->), @do_get_fails

  do_get_fails: ->
```

### `toSubscribe()`
Ensures that the controller operation subscribes to promise on success (completion) and failure (rejection) at the same time with the provided operations.

#### Javascript

##### spec
``` Javascript

        // toSubscribe
        it('subscribes to success & error', function(){
            expect(subject.doFullSubscribe).toSubscribe(sampleHttpService, 'doGet', subject.doGetSuccess, subject.doGetFails);
        });

```
##### impl

``` Javascript

    var me = this;

    this.doFullSubscribe = function () {
        sampleHttpService.doGet().then(me.doGetSuccess, me.doGetFails);
    };

    this.doGetSuccess = function () {
        console.log('get successfully executed');
    };

    this.doGetFails = function () {
        console.log('the get that failed you!');
    }

```

#### Coffeescript

##### spec

``` Coffeescript
  it 'subscribes to success & error', =>
    expect(@subject.do_full_subscribe).to_subscribe @sampleHttpService, 'do_get', @subject.do_get_success, @subject.do_get_fails
```

##### impl
``` Coffeescript
  do_full_subscribe: =>
    @sampleHttpService.do_get().then @do_get_success, @do_get_fails

  do_get_success: ->

  do_get_fails: ->
```

### `toCallbackSuccessWith()`
Ensures that the controller operation callbacks the provided operation directly or indirectly when then promise success (completion). The difference between [to_subscribe_success()](#to_subscribe_success) and [to_subscribe()](#to_subscribe) with respect to [to_callback_success_with()](#to_callback_success_with) is the indirection level. [to_callback_success_with()](#to_callback_success_with) allows indirect calls, so is more flexible. The `with` suffix demands for arguments during the callback.   

#### Javascript

##### spec

``` Javascript

        // toCallbackSuccessWith
        it('callbacks the function when promise success with given parameters', function(){
            expect(subject.doCallback).toCallbackSuccessWith(sampleHttpService, 'doGet', subject, 'doGetSuccessWith', 1, 2, 3);
        });

```

##### impl

``` Javascript

    var me = this;

    this.doCallback = function () {
        sampleHttpService.doGet().then(function () {
            me.doGetSuccessWith(1, 2, 3);
        });
    };

    this.doGetSuccessWith = function (a, b, c) {
        console.log('calling back with parameters');
    };

```

#### Coffeescript

##### spec

``` Coffeescript
  it 'callbacks the function when promise success with given parameters', =>
    expect(@subject.do_callback).to_callback_success_with @sampleHttpService, 'do_get', @subject, 'do_get_success_with', 1, 2, 3
```

##### impl
Notice the indirection on the subscription using an anonymous function that calls the expected operation:

``` Coffeescript
  do_callback: =>
    @sampleHttpService.do_get().then => @do_get_success_with(1, 2, 3)

  do_get_success_with: =>
```

### `toCallbackErrorWith()`
Ensures that the controller operation callbacks the provided operation directly or indirectly when then promise fails (rejection). The difference between [to_subscribe_error()](#to_subscribe_error) and [to_subscribe()](#to_subscribe) with respect to [to_callback_error_with()](#to_callback_error_with) is the indirection level. [to_callback_error_with()](#to_callback_error_with) allows indirect calls, so is more flexible. The `with` suffix demands for arguments during the callback.   

#### Javascript
##### spec

``` Javascript

        // toCallbackErrorWith
        it('callbacks the function when promise fails with given parameters', function() {
            expect(subject.doFailingCallback).toCallbackErrorWith(sampleHttpService, 'doGet', subject, 'doGetFailsWith', 1, 2, 3);
        });

```

##### impl

``` Javascript

    var me = this;
    
    this.doFailingCallback = function () {
        sampleHttpService.doGet().then(function () {
        }, function () {
            me.doGetFailsWith(1, 2, 3);
        });
    };

    this.doGetFailsWith = function (a, b, c) {
        console.log('failing back with parameters');
    };

```

#### Coffeescript

##### spec

``` Coffeescript
  it 'callbacks the function when promise fails with given parameters', =>
    expect(@subject.do_failing_callback).to_callback_error_with @sampleHttpService, 'do_get', @subject, 'do_get_fails_with', 1, 2, 3

```

##### impl
Notice the indirection on the subscription using an anonymous function that calls the expected operation:

``` Coffeescript
  do_failing_callback: =>
    @sampleHttpService.do_get().then (->), => @do_get_fails_with 1, 2, 3

  do_get_fails_with: =>
```

## UI Router State matchers
These matchers are designed for [AngularJS](https://angularjs.org/) when it is combined with [UI-Router](https://angular-ui.github.io/ui-router/). Every sample [Jasmine](http://jasmine.github.io/) matcher for [UI-Router](https://angular-ui.github.io/ui-router/) state will be enclosed in the following `describe` code section:

### Javascript
``` Javascript

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

    // some specs listed here!

});

```

### Coffeescript

``` Coffeescript
describe 'sample ui.router state matchers', ->

  # make the matchers available
  beforeEach ->
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach ->
    module 'sample.coffee.module'

  # (example specs listed here)
  it 'example spec', =>
    expect(true).toEqual true
```

Every [UI-Router](https://angular-ui.github.io/ui-router/) state definition will be enclosed in the following `config` function:

### Javascript

``` Javascript

var config = function($stateProvider) {
  // here state configuration
};

angular.module('sample.js.module').config(config);

```

### Coffeescript

``` Coffeescript
config = ($stateProvider) ->
  # here state configuration for the module takes places, for instance:
  $stateProvider.state 'some_state', {}


angular.module('sample.coffee.module').config config
```

### `toBeAnState()`
Ensures that actual subject is an [UI-Router](https://angular-ui.github.io/ui-router/) state object or alternatively an state name.

#### Javascript

##### spec

``` Javascript

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

```

##### impl

``` Javascript

    $stateProvider.state('stateA', {});

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateA', =>

    # inject ui.router $state helper and get the state object
    beforeEach inject ($state) =>
      @subject = $state.get 'stateA'

    it 'is an state, using object variant', => expect(@subject).to_be_an_state()
    it 'is an state, using string variant', => expect('stateA').to_be_an_state()
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateA', {}
```

### `toBeAbstract()`
Ensures that actual subject is an abstract [UI-Router](https://angular-ui.github.io/ui-router/) state. It can be use in both variants: object and string with state name.

#### Javascript

##### spec

``` Javascript

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

```

##### impl

``` Javascript

    $stateProvider.state('stateB', {
        abstract: true
    });

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateB', =>

    beforeEach inject ($state) =>
      @subject = $state.get 'stateB'

    it 'is an abstract, using object variant', => expect(@subject).to_be_abstract()
    it 'is an abstract, using string variant', => expect('stateB').to_be_abstract()
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateB',
    abstract: yes
```

### `toHaveUrl()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state has an expected URL. It can be use in both variants: object and string with state name.

#### Javascript

##### spec

``` Javascript

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

```

##### impl

``` Javascript

    $stateProvider.state('stateC', {
        url: '/some_url'
    });

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateC', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateC'

    it 'has an URL, using object variant', => expect(@subject).to_have_url '/some_url'
    it 'has an URL, using string variant', => expect('stateC').to_have_url '/some_url'
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateC',
    url: '/some_url'
```

### `toHaveController()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state has an expected controller. It can be use in both variants: object and string with state name.

#### Javascript

##### spec

``` Javascript
    describe('stateC', function () {

        beforeEach(function () {
            subject = state.get('stateC');
        });

        // toHaveController
        it('has controller, using object variant', function () {
            expect(subject).toHaveController('SomeUserController');
        });

        it('has controller, using string variant', function () {
            expect('stateC').toHaveController('SomeUserController');
        });
    });

```

##### impl

``` Javascript

    $stateProvider.state('stateC', {
        url: '/some_url',
        controller: 'SomeUserController'
    });

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateC', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateC'

    it 'has controller, using object variant', => expect(@subject).to_have_controller 'SomeUserController'
    it 'has controller, using string variant', => expect('stateC').to_have_controller 'SomeUserController'
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateC',
    url: '/some_url'
    controller: 'SomeUserController'
```

### `toHaveControllerAlias()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state has an expected controller alias. It can be use in both variants: object and string with state name.

#### Javascript

##### spec

``` Javascript
    describe('stateC', function () {

        beforeEach(function () {
            subject = state.get('stateC');
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

```

##### impl

``` Javascript

    $stateProvider.state('stateC', {
        url: '/some_url',
        controller: 'SomeUserController',
        controllerAs: 'suc'
    });

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateC', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateC'

    it 'has controller alias, using object variant', => expect(@subject).to_have_controller_alias 'suc'
    it 'has controller alias, using string variant', => expect('stateC').to_have_controller_alias 'suc'
    it 'has controller alias, using object variant', => expect(@subject).to_have_controller_as 'suc'
    it 'has controller alias, using string variant', => expect('stateC').to_have_controller_as 'suc'
   
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateC',
    url: '/some_url'
    controller: 'SomeUserController'
    controllerAs: 'suc'
```

### `toHaveTemplate()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state has an expected template. It can be use in both variants: object and string with state name.

#### Javascript

##### spec

``` Javascript

    // toHaveTemplate
    describe('stateD', function () {

        beforeEach(function () {
            subject = state.get('stateD');
        });

        it('has a template, using object variant', function () {
            expect(subject).toHaveTemplate('<div id="some_template"></div>');
        });

        it('has a template, using string variant', function () {
            expect('stateD').toHaveTemplate('<div id="some_template"></div>');
        });
    });

```

##### impl

``` Javascript

    $stateProvider.state('stateD', {
        template: '<div id="some_template"></div>'
    });

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateD', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateD'

    it 'has a template, using object variant', => expect(@subject).to_have_template '<div id="some_template"></div>'
    it 'has a template, using string variant', => expect('stateD').to_have_template '<div id="some_template"></div>'
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateD',
    template: '<div id="some_template"></div>'
```

### `toHaveTemplateUrl()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state has an expected template URL. It can be use in both variants: object and string with state name.

#### Javascript

##### spec

``` Javascript

    // toHaveTemplateUrl
    describe('stateE', function () {

        beforeEach(function () {
            subject = state.get('stateE');
        });

        it('has a template, using object variant', function () {
            expect(subject).toHaveTemplateUrl('/templates/footer.html');
        });

        it('has a template, using string variant', function () {
            expect('stateE').toHaveTemplateUrl('/templates/footer.html');
        });

    });

```

##### impl

``` Javascript

    $stateProvider.state('stateE', {
        templateUrl: '/templates/footer.html'
    });

```

#### Coffeescript

##### spec

``` Coffeescript
  describe 'stateE', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateE'

    it 'has a template URL, using object variant', => expect(@subject).to_have_template_url '/templates/footer.html'
    it 'has a template URL, using string variant', => expect('stateE').to_have_template_url '/templates/footer.html'
```

##### impl
``` Coffeescript
  $stateProvider.state 'stateE',
    templateUrl: '/templates/footer.html'
```

### `to_resolve_by_calling_service()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state resolves a given promise before entering. The expected promise resolution should take place by issuing an service call without arguments.

#### spec

``` Coffeescript
  describe 'stateF', =>
    beforeEach inject ($state, @sampleHttpService) =>
      @subject = $state.get 'stateF'

    it 'resolves the promise by calling service without arguments', =>
      expect(@subject.resolve.user_profile).to_resolve_by_calling_service @sampleHttpService, 'do_get'
```

#### impl
``` Coffeescript
  $stateProvider.state 'stateF',
    resolve:
      user_profile: ['sampleHttpService', (sampleHttpService) -> sampleHttpService.do_get()]
```

### `to_resolve_by_calling_service_with()`
Ensures that [UI-Router](https://angular-ui.github.io/ui-router/) state resolves a given promise before entering. The expected promise resolution should take place by issuing an service call with the given arguments.

#### spec

``` Coffeescript
  describe 'stateG', =>
    beforeEach inject ($state, @sampleHttpService) =>
      @subject = $state.get 'stateG'

    it 'resolves the promise by calling service with arguments', =>
      expect(@subject.resolve.user_history).to_resolve_by_calling_service_with @sampleHttpService, 'do_get_with', 1, 'a', true
```

#### impl
``` Coffeescript
  $stateProvider.state 'stateG',
    resolve:
      user_history: ['sampleHttpService', (sampleHttpService) -> sampleHttpService.do_get_with 1, 'a', true]
```
