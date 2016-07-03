'use strict'

class SampleController
  constructor: (@sampleHttpService) ->

  do_service_call: =>
    @sampleHttpService.do_get()

angular.module('sample.module').controller 'SampleController', ['sampleHttpService', SampleController]

