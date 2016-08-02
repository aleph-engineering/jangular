'use strict'

config = ($stateProvider) ->
  $stateProvider.state 'stateA', {}

angular.module('sample.module').config config
