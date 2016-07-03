'use strict'

describe 'http service matchers', ->
  # make the matchers available
  beforeEach -> jasmine.addMatchers jangular_http_matchers

  # initialize module
  beforeEach -> module 'jangular.spec.module'

  # inject the http service (SUT)
  beforeEach inject (http_service) => @subject = http_service

  # after every test assert for no pending expectation & request
  afterEach inject ($httpBackend) ->
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()

  it 'GETs a given URI', => expect(@subject.do_get).to_get '/data'
  it 'GETs unwraps the response', => expect(@subject.do_get_and_unwrap).to_unwrap_get()
  it 'GETs a given URI and unwraps the response', => expect(@subject.do_get_and_unwrap).to_get_and_unwrap '/data'

  it 'POST a given URI', => expect(@subject.do_post).to_post '/post', firstname: 'Olivia', lastname: 'Lago'
  it 'POST unwraps the response', => expect(@subject.do_post_and_unwrap).to_unwrap_post()
  it 'POST a given URI and unwraps the response', => expect(@subject.do_post_and_unwrap).to_post_and_unwrap '/post', firstname: 'Olivia', lastname: 'Lago'
