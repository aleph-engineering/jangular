'use strict'

config = ($stateProvider) ->
  $stateProvider.state 'stateA', {}

  $stateProvider.state 'stateB',
    abstract: yes

  $stateProvider.state 'stateC',
    url: '/some_url'

angular.module('sample.module').config config
