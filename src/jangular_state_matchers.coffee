'use strict'

###########################
# jangular state matchers #
###########################

common = require './jangular_common'

validate_arguments_count = common.validate_arguments_count
assert_is_spy = common.assert_is_spy
q = common.q
spy_have_been_called = common.spy_have_been_called
spy_have_been_called_with = common.spy_have_been_called_with

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

injector = ->
  _injector = undefined
  inject ($injector) -> _injector = $injector
  _injector

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

to_have_url = ->
  compare: (actual, expected_url) ->
    validate_arguments_count arguments, 2, 'to_have_url takes only expected_url argument'

    throw new Error "the expected url: #{expected_url} seems to null or undefined" unless expected_url?

    # check if it is an state
    pass = is_an_state actual
    return is_state_result pass, actual unless pass

    st = get_state actual

    pass: st?.url is expected_url
    message: "Expected state `#{st.name}` seems to NOT have the url '#{expected_url}'. Ensure that you properly initialize the state with `url` property `$stateProvider.state('state_name', {url: '#{expected_url}'})`"

to_have_controller = ->
  compare: (actual, expected_controller) ->
    validate_arguments_count arguments, 2, 'to_have_controller takes only expected_controller argument'

    throw new Error "the expected_controller: #{expected_controller} seems to null or undefined" unless expected_controller?

    # check if it is an state
    pass = is_an_state actual
    return is_state_result pass, actual unless pass

    st = get_state actual

    pass: st?.controller is expected_controller
    message: "Expected state `#{st.name}` seems to NOT have the controller '#{expected_controller}'. Ensure that you properly initialize the state with `controller` property `$stateProvider.state('state_name', {controller: '#{expected_controller}'})`"

to_have_controller_alias = ->
  compare: (actual, expected_controller_alias) ->
    validate_arguments_count arguments, 2, 'to_have_controller_alias takes only expected_controller_alias argument'

    throw new Error "the expected_controller_alias: #{expected_controller_alias} seems to null or undefined" unless expected_controller_alias?

    # check if it is an state
    pass = is_an_state actual
    return is_state_result pass, actual unless pass

    st = get_state actual

    pass: st?.controllerAs is expected_controller_alias
    message: "Expected state `#{st.name}` seems to NOT have the controller alias '#{expected_controller_alias}'. Ensure that you properly initialize the state with `controllerAs` property `$stateProvider.state('state_name', {controllerAs: '#{expected_controller_alias}'})`"

to_have_template = ->
  compare: (actual, expected_template) ->
    validate_arguments_count arguments, 2, 'to_have_template takes only expected_template argument'

    throw new Error "the expected_template: #{expected_template} seems to null or undefined" unless expected_template?

    # check if it is an state
    pass = is_an_state actual
    return is_state_result pass, actual unless pass

    st = get_state actual

    pass: st?.template is expected_template
    message: "Expected state `#{st.name}` seems to NOT have the template '#{expected_template}'. Ensure that you properly initialize the state with `template` property `$stateProvider.state('state_name', {template: '#{expected_template}'})`"

to_have_template_url = ->
  compare: (actual, expected_template_url) ->
    validate_arguments_count arguments, 2, 'to_have_template_url takes only expected_template_url argument'

    throw new Error "the expected_template_url: #{expected_template_url} seems to null or undefined" unless expected_template_url?

    # check if it is an state
    pass = is_an_state actual
    return is_state_result pass, actual unless pass

    st = get_state actual

    pass: st?.templateUrl is expected_template_url
    message: "Expected state `#{st.name}` seems to NOT have the template URL '#{expected_template_url}'. Ensure that you properly initialize the state with `template` property `$stateProvider.state('state_name', {templateUrl: '#{expected_template_url}'})`"

to_resolve_by_calling_service = ->
  compare: (promise, service, fn_name) ->
    validate_arguments_count arguments, 3, 'to_resolve_by_calling_service takes only 2 arguments: target service and the function name to spy on'

    throw new Error 'Actual promise seems to be null or undefined, please define the promise using the syntax `resolve: { my_promise: [..., my_promise_resolution_fn] }`' unless promise?

    #TODO: validate that the supplied object is UI-Router promise definition at least

    _spy = spyOn service, fn_name
    assert_is_spy _spy

    # spy on service and return an expected value to assert with
    deferred = q().defer()
    expected = deferred.promise
    _spy.and.returnValue expected

    # make the call
    actual = injector().invoke promise

    # assert the returned value
    # TODO: improve this assertion
    expect(actual).toBe expected

    # resolve the promise
    deferred.resolve()

    # assert
    # TODO: improve this assertion
    spy_have_been_called _spy

module.exports =
  to_be_an_state: to_be_an_state
  toBeAnState: to_be_an_state
  to_be_abstract: to_be_abstract
  toBeAbstract: to_be_abstract
  to_have_url: to_have_url
  toHaveUrl: to_have_url
  to_have_controller: to_have_controller
  toHaveController: to_have_controller
  to_have_controller_alias: to_have_controller_alias
  toHaveControllerAlias: to_have_controller_alias
  to_have_controller_as: to_have_controller_alias
  toHaveControllerAs: to_have_controller_alias
  to_have_template: to_have_template
  toHaveTemplate: to_have_template
  to_have_template_url: to_have_template_url
  toHaveTemplateUrl: to_have_template_url
  to_resolve_by_calling_service: to_resolve_by_calling_service
  toResolveByCallingService: to_resolve_by_calling_service
