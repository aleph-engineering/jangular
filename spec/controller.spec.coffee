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

  # to_call_service
  it 'calls a service', =>
    expect(@subject.do_service_call).to_call_service @service, 'do_get'

  # to_call_service_with
  it 'calls a service with parameters', =>
    expect(=> @subject.do_service_call_with_params 1, 2, 3).to_call_service_with @service, 'do_get_with', 1, 2, 3

  it 'calls a service with hash parameters', =>
    expect(=> @subject.do_service_call_with_hash_params a: 1, b: 2, c: 3).to_call_service_with @service, 'do_get_with_hash', x: 1, y: 2, z: 3

  # to_subscribe_success
  it 'subscribes to promise success', =>
    expect(@subject.do_subscribe).to_subscribe_success @service, 'do_get', @subject.do_get_success

  # to_callback_success_with
  it 'callbacks the function when promise success with given parameters', =>
    expect(@subject.do_callback).to_callback_success_with @service, 'do_get', @subject, 'do_get_success_with', 1, 2, 3

  # to_callback_error_with
  it 'callbacks the function when promise fails with given parameters', =>
    expect(@subject.do_failing_callback).to_callback_error_with @service, 'do_get', @subject, 'do_get_fails_with', 1, 2, 3

