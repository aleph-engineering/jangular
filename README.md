# JAngular

[Jasmine](http://jasmine.github.io/) matchers for [AngularJS](https://angularjs.org/) and [UI-Router](https://angular-ui.github.io/ui-router/)

Examples are written in Coffeescript.

## HTTP Services matchers

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

  it 'GETs a given URI', =>
    expect(@subject.do_get).to_get '/data'

  it 'GETs unwraps the response', =>
    expect(@subject.do_get_and_unwrap).to_unwrap_get()

  it 'GETs a given URI and unwraps the response', =>
    expect(@subject.do_get_and_unwrap).to_get_and_unwrap '/data'

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
