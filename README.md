# JAngular

[Jasmine](http://jasmine.github.io/) matchers for [AngularJS](https://angularjs.org/) and [UI-Router](https://angular-ui.github.io/ui-router/)

Examples are written in Coffeescript.

## List of matchers

### Service

* [to_get()](#to_get)
* [to_unwrap_get()](#to_unwrap_get)
* [to_get_and_unwrap()](#to_get_and_unwrap)
* [to_post()](#to_post)
* [to_unwrap_post()](#to_unwrap_post)
* [to_post_and_unwrap()](#to_post_and_unwrap)

### Controller

* [to_call_service()](#to_call_service)
* [to_call_service_with()](#to_call_service_with)
* [to_subscribe_success()](#to_subscribe_success)
* [to_subscribe_error()](#to_subscribe_error)
* [to_subscribe()](#to_subscribe)
* [to_callback_success_with()](#to_callback_success_with)
* [to_callback_error_with()](#to_callback_error_with)

### Controllers

## HTTP Service matchers
Every sample [Jasmine](http://jasmine.github.io/) matcher for [AngularJS](https://angularjs.org/) HTTP service will be enclosed in the following `describe` code section:

``` Coffeescript
describe 'sample http service matchers', ->
  
  # make the matchers available
  beforeEach ->
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach ->
    module 'sample.module'

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

Every sample [AngularJS](https://angularjs.org/) HTTP service operation will be enclosed in the following Coffeescript `class`:

``` Coffeescript
sampleHttpService = ($http) ->
  class SampleHttpService
  
    # (operations will be listed here)
    example_operation: ->
        $http.get '/some_uri'

  new SampleHttpService

angular.module('sample.module').factory 'sampleHttpService', ['$http', sampleHttpService]
```

### `to_get()`
Ensures that the service operation issues a GET to a given URI.

#### spec

``` Coffeescript
  it 'GETs a given URI', =>
    expect(@subject.do_get).to_get '/data'
```

#### impl
``` Coffeescript
    do_get: ->
      $http.get '/data'
```

### `to_unwrap_get()`
Ensures that the service operation unwraps the response body on success.

#### spec

``` Coffeescript
  it 'GETs unwraps the response', =>
    expect(@subject.do_get_and_unwrap).to_unwrap_get()
```

#### impl
``` Coffeescript
    do_unwrap: ->
      $http.get('/any_path').then (reply) -> reply.data
```

### `to_get_and_unwrap()`
Ensures that the service operation issues a GET to a given URI and unwraps the response body on success.

#### spec

``` Coffeescript
  it 'GETs a given URI and unwraps the response', =>
    expect(@subject.do_get_and_unwrap).to_get_and_unwrap '/data'
```

#### impl
``` Coffeescript
    do_get_and_unwrap: ->
      $http.get('/data').then (reply) -> reply.data
```

### `to_post()`
Ensures that the service operation issues a POST to a given URI.

#### spec

``` Coffeescript
  it 'POSTs a given URI', =>
    expect(@subject.do_post).to_post '/post', firstname: 'Olivia', lastname: 'Lago'
```

#### impl
``` Coffeescript
    do_post: ->
      $http.post '/post', firstname: 'Olivia', lastname: 'Lago'
```

### `to_unwrap_post()`
Ensures that the service operation unwraps the response body on success.

#### spec

``` Coffeescript
  it 'POST unwraps the response', =>
    expect(@subject.do_post_and_unwrap).to_unwrap_post()
```

#### impl
``` Coffeescript
    do_post_and_unwrap: ->
      $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data
```

### `to_post_and_unwrap()`
Ensures that the service operation issues a POST to a given URI and unwraps the response body on success.

#### spec

``` Coffeescript
  it 'POST a given URI and unwraps the response', =>
    expect(@subject.do_post_and_unwrap).to_post_and_unwrap '/post', firstname: 'Olivia', lastname: 'Lago'
```

#### impl
``` Coffeescript
    do_post_and_unwrap: ->
      $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data
```

## Controller matchers
These matchers are not exclusively for [AngularJS](https://angularjs.org/) controllers, they may be used in other [AngularJS](https://angularjs.org/) services as well. Every sample [Jasmine](http://jasmine.github.io/) matcher for [AngularJS](https://angularjs.org/) controller will be enclosed in the following `describe` code section:

``` Coffeescript
describe 'sample controller matchers', ->
  
  # make the matchers available
  beforeEach -> 
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach -> 
    module 'sample.module'

  # create controller and inject dependencies
  beforeEach inject ($controller, sampleHttpService) =>
    @subject = $controller 'SampleController'
    @sampleHttpService = sampleHttpService
    
  # (example specs listed here)
  it 'example spec', =>
    expect(true).toEqual true
```

Every sample [AngularJS](https://angularjs.org/) controller operation will be enclosed in the following Coffeescript `class`:

``` Coffeescript
class SampleController
  constructor: (@sampleHttpService) ->

  # (sample operations listed here)
  some_sample_operation: =>
    console.log 'Hello I am an AngularJS controller!'
```

### `to_call_service()`
Ensures that the controller operation calls the given service operation without arguments.

#### spec

``` Coffeescript
  it 'calls a service', =>
    expect(@subject.do_service_call).to_call_service @sampleHttpService, 'do_get'
```

#### impl
``` Coffeescript
  do_service_call: =>
    @sampleHttpService.do_get()
```

### `to_call_service_with()`
Ensures that the controller operation calls the given service operation with the provided arguments.

#### spec

``` Coffeescript
  it 'calls a service with parameters', =>
    expect(=> @subject.do_service_call_with_params 1, 2, 3).to_call_service_with @sampleHttpService, 'do_get_with', 1, 2, 3

  it 'calls a service with hash parameters', =>
    expect(=> @subject.do_service_call_with_hash_params a: 1, b: 2, c: 3).to_call_service_with @sampleHttpService, 'do_get_with_hash', x: 1, y: 2, z: 3
```

#### impl
``` Coffeescript
  do_service_call_with_params: (a, b, c) =>
    @sampleHttpService.do_get_with a, b, c

  do_service_call_with_hash_params: ({a, b, c}) =>
    @sampleHttpService.do_get_with_hash x: a, y: b, z: c
```

### `to_subscribe_success()`
Ensures that the controller operation subscribes to promise on success (completion) with the provided operation.

#### spec

``` Coffeescript
  it 'subscribes to promise success', =>
    expect(@subject.do_subscribe).to_subscribe_success @sampleHttpService, 'do_get', @subject.do_get_success
```

#### impl
``` Coffeescript
  do_subscribe: =>
    @sampleHttpService.do_get().then @do_get_success

  do_get_success: ->
```

### `to_subscribe_error()`
Ensures that the controller operation subscribes to promise on failure (rejection) with the provided operation.

#### spec

``` Coffeescript
  it 'subscribes to promise error', =>
    expect(@subject.do_subscribe_to_error).to_subscribe_error @sampleHttpService, 'do_get', @subject.do_get_fails
```

#### impl
``` Coffeescript
  do_subscribe_to_error: =>
    @sampleHttpService.do_get().then (->), @do_get_fails

  do_get_fails: ->
```

