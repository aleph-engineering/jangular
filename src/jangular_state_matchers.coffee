'use strict'

###########################
# jangular state matchers #
###########################

common = require './jangular_common'

validate_arguments_count = common.validate_arguments_count

###########
# helpers #
###########

state = ->
  _state = undefined
  inject ($state) -> _state = $state
  _state

is_an_state = (actual) ->
  actual?.name? || state().get(actual)?

get_state = (actual) ->
  return actual if actual?.name?
  state().get(actual)

is_state_result = (pass, actual) ->
  pass: pass
  message: "Expected state `#{actual}` to exists, but it is not defined. Ensure that you properly initialize the state using `$stateProvider.state('state_name', {...})` and don't forget to include ui.router as module dependency: `angular.module('my_module', ['ui.router'])`"

############
# matchers #
############

to_be_an_state = ->
  compare: (actual) ->
    validate_arguments_count arguments, 1, 'to_be_an_state does not take arguments'
    is_state_result is_an_state(actual), actual

to_be_abstract =->
  compare: (actual) ->
    validate_arguments_count arguments, 1, 'to_be_abstract does not take arguments'

    # check if it is an state
    pass = is_an_state actual
    return is_state_result pass, actual unless pass

    st = get_state actual

    pass: st.abstract?
    message: "Expected state `#{st.name}` seems to NOT be abstract. Ensure that you properly initialize the state with `abstract` flag using `$stateProvider.state('state_name', {abstract: true})`"

module.exports =
  to_be_an_state: to_be_an_state
  to_be_abstract: to_be_abstract
