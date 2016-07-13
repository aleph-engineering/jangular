'use strict'

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

  do_get_success: ->

  do_get_success_with: =>

  do_get_fails_with: =>

  do_callback: =>
    @sampleHttpService.do_get().then => @do_get_success_with(1, 2, 3)

  do_failing_callback: =>
    @sampleHttpService.do_get().then (->), => @do_get_fails_with 1, 2, 3

angular.module('sample.module').controller 'SampleController', ['sampleHttpService', SampleController]

