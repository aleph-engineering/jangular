'use strict'

class SampleController
  constructor: (@sampleHttpService) ->

  do_service_call: =>
    @sampleHttpService.do_get()

  do_service_call_with_params: (a, b, c) =>
    @sampleHttpService.do_get_with a, b, c

  do_service_call_with_hash_params: ({a, b, c}) =>
    @sampleHttpService.do_get_with_hash x: a, y: b, z: c

angular.module('sample.module').controller 'SampleController', ['sampleHttpService', SampleController]

