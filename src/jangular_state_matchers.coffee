'use strict'

###########################
# jangular state matchers #
###########################

common = require './jangular_common'

state = ->
  _state = undefined
  inject ($state) -> _state = $state
  _state

to_be_an_state = ->
  compare: (actual) ->
    pass = actual?.name? || state().get(actual)?
    result =
      pass: pass
      message: "Expected state `#{actual}` to exists, but it is not defined. Ensure that you properly initialize the state using `$stateProvider.state('state_name', {...})` and don't forget to include ui.router as module dependency: `angular.module('my_module', ['ui.router'])`"
    result

module.exports =
  to_be_an_state: to_be_an_state
