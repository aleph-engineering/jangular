'use strict'

describe 'sample controller matchers', ->
  # make the matchers available
  beforeEach -> jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach -> module 'sample.module'

  # create controller and inject dependencies
  beforeEach inject ($controller, sampleHttpService) =>
    @subject = $controller 'SampleController'
    @service = sampleHttpService

  it 'is defined', => expect(@subject).toBeDefined()

  it 'calls a service', => expect(@subject.do_service_call).to_call_service @service, 'do_get'
  it 'calls a service with parameters', => expect(=> @subject.do_service_call_with_params 1, 2, 3).to_call_service_with @service, 'do_get_with', 1, 2, 3
  it 'calls a service with hash parameters', => expect(=> @subject.do_service_call_with_hash_params a: 1, b: 2, c: 3).to_call_service_with @service, 'do_get_with_hash', x: 1, y: 2, z: 3
