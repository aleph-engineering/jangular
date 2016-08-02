'use strict'

config = ($stateProvider) ->
  $stateProvider.state 'stateA', {}

  $stateProvider.state 'stateB',
    abstract: yes

angular.module('sample.module').config config
