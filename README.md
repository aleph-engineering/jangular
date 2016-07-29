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

### the spec

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

  it 'POST a given URI', =>
    expect(@subject.do_post).to_post '/post', firstname: 'Olivia', lastname: 'Lago'

  it 'POST unwraps the response', =>
    expect(@subject.do_post_and_unwrap).to_unwrap_post()

  it 'POST a given URI and unwraps the response', =>
    expect(@subject.do_post_and_unwrap).to_post_and_unwrap '/post', firstname: 'Olivia', lastname: 'Lago'
```

### the implementation

``` Coffeescript
sampleHttpService = ($http) ->
  class SampleHttpService
    do_get: ->
      $http.get '/data'

    do_get_and_unwrap: ->
      $http.get('/data').then (reply) -> reply.data

    do_post: ->
      $http.post '/post', firstname: 'Olivia', lastname: 'Lago'

    do_post_and_unwrap: ->
      $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data

  new SampleHttpService

angular.module('sample.module').factory 'sampleHttpService', ['$http', sampleHttpService]
```

## Controller matchers
These matchers are not exclusively for [AngularJS](https://angularjs.org/) controllers, they may be used in other [AngularJS](https://angularjs.org/) services as well.

### the spec
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

  # to_call_service
  it 'calls a service', =>
    expect(@subject.do_service_call).to_call_service @sampleHttpService, 'do_get'

  # to_call_service_with
  it 'calls a service with parameters', =>
    expect(=> @subject.do_service_call_with_params 1, 2, 3).to_call_service_with @sampleHttpService, 'do_get_with', 1, 2, 3

  it 'calls a service with hash parameters', =>
    expect(=> @subject.do_service_call_with_hash_params a: 1, b: 2, c: 3).to_call_service_with @sampleHttpService, 'do_get_with_hash', x: 1, y: 2, z: 3

  # to_subscribe_success
  it 'subscribes to promise success', =>
    expect(@subject.do_subscribe).to_subscribe_success @sampleHttpService, 'do_get', @subject.do_get_success

  # to_subscribe_error
  it 'subscribes to promise error', =>
    expect(@subject.do_subscribe_to_error).to_subscribe_error @sampleHttpService, 'do_get', @subject.do_get_fails

  # to_subscribe
  it 'subscribes to success & error', =>
    expect(@subject.do_full_subscribe).to_subscribe @sampleHttpService, 'do_get', @subject.do_get_success, @subject.do_get_fails

  # to_callback_success_with
  it 'callbacks the function when promise success with given parameters', =>
    expect(@subject.do_callback).to_callback_success_with @sampleHttpService, 'do_get', @subject, 'do_get_success_with', 1, 2, 3

  # to_callback_error_with
  it 'callbacks the function when promise fails with given parameters', =>
    expect(@subject.do_failing_callback).to_callback_error_with @sampleHttpService, 'do_get', @subject, 'do_get_fails_with', 1, 2, 3

```

### the implementation
``` Coffeescript
class SampleController
  constructor: (@sampleHttpService) ->

  do_service_call: =>
    @sampleHttpService.do_get()

  do_service_call_with_params: (a, b, c) =>
    @sampleHttpService.do_get_with a, b, c

  do_service_call_with_hash_params: ({a, b, c}) =>
    @sampleHttpService.do_get_with_hash x: a, y: b, z: c

  do_subscribe: =>
    @sampleHttpService.do_get().then @do_get_success

  do_subscribe_to_error: =>
    @sampleHttpService.do_get().then (->), @do_get_fails

  do_full_subscribe: =>
    @sampleHttpService.do_get().then @do_get_success, @do_get_fails

  do_get_success: ->

  do_get_fails: ->

  do_get_success_with: =>

  do_get_fails_with: =>

  do_callback: =>
    @sampleHttpService.do_get().then => @do_get_success_with(1, 2, 3)

  do_failing_callback: =>
    @sampleHttpService.do_get().then (->), => @do_get_fails_with 1, 2, 3

```
then you need to append these operations to the service:

```Coffeescript
sampleHttpService = ($http) ->
  class SampleHttpService
    ...
    do_get_with: (a, b, c) ->
    do_get_with_hash: ({x, y, z}) ->
    ...
```
