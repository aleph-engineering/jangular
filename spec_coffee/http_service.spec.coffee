'use strict'

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

  describe 'GET', =>
    it 'GETs a given URI', =>
      expect(@subject.do_get).to_get '/data'

    it 'GET unwraps the response', =>
      expect(@subject.do_unwrap).to_unwrap_get()

    it 'GETs a given URI and unwraps the response', =>
      expect(@subject.do_get_and_unwrap).to_get_and_unwrap '/data'

  describe 'POST', =>
    it 'POSTs a given URI', =>
      expect(@subject.do_post).to_post '/post', firstname: 'Olivia', lastname: 'Lago'

    it 'POST unwraps the response', =>
      expect(@subject.do_post_and_unwrap).to_unwrap_post()

    it 'POST a given URI and unwraps the response', =>
      expect(@subject.do_post_and_unwrap).to_post_and_unwrap '/post', firstname: 'Olivia', lastname: 'Lago'

  describe 'PUT', =>
    # to_put
    it 'PUTs to a given URI', =>
      expect(@subject.do_put).to_put '/put_uri', id: 1, given_name: 'Maria', last_name: 'Juana'
