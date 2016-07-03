'use strict'

describe 'sample controller matchers', ->
  # make the matchers available
  beforeEach -> jasmine.addMatchers jangular_controller_matchers

  # initialize module
  beforeEach -> module 'sample.module'

  # create controller and inject dependencies
  beforeEach inject ($controller, sampleHttpService) =>
    @subject = $controller 'SampleController'
    @service = sampleHttpService

  it 'is defined', => expect(@subject).toBeDefined()

  it 'calls a service', => expect(@subject.do_service_call).to_call_service @service, 'do_get'
