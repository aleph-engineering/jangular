'use strict'

################################
# jangular controller matchers #
################################

common = require './jangular_common'

expect_to_be_function = common.expect_to_be_function
validate_arguments_count = common.validate_arguments_count
validate_arguments_gt = common.validate_arguments_gt
throw_fn_expected = common.throw_fn_expected

assert_is_spy = (_spy) ->
  throw new Error "Expected a spy, but got #{jasmine.pp _spy}." unless jasmine.isSpy _spy

q = ->
  _q = undefined
  inject ($q) -> _q = $q
  _q

rootScope = ->
  _rootScope = undefined
  inject ($rootScope) -> _rootScope = $rootScope
  _rootScope

spy_have_been_called = (_spy) ->
  pass = _spy.calls.any()
  result =
    pass: pass
    message: pass ? "Expected spy #{_spy.and.identity()} not to have been called.": "Expected spy #{_spy.and.identity()}  to have been called.'"

spy_have_been_called_with = (_spy, args) ->
  result =
    pass: false
  pass = _spy.calls.any()
  unless pass
    result.message = ->
      "Expected spy #{_spy.and.identity()} to have been called with #{jasmine.pp(args)} but it was never called."
  else
    if jasmine.matchersUtil.contains _spy.calls.allArgs(), args, jasmine.customEqualityTesters
      result.pass = true
      result.message = ->
        "Expected spy #{_spy.and.identity()} not to have been called with #{jasmine.pp(args)} but it was."
    else
      result.message = -> "Expected spy #{_spy.and.identity()} to have been called with #{jasmine.pp(args)} but actual calls were #{jasmine.pp(_spy.calls.allArgs()).replace(/^\[ | \]$/g, '')}."
  result

to_call_service = ->
  compare: (fn, service, fn_name) ->

    # validations
    validate_arguments_count arguments, 3, 'to_call_service takes only 2 arguments: target service to spy on and the function name'
    expect_to_be_function fn || throw_fn_expected 'fn'

    # spy on service
    _spy = spyOn service, fn_name
    assert_is_spy _spy

    # spy on service and return a solved promise
    deferred = q().defer()
    deferred.resolve()
    _spy.and.returnValue deferred.promise

    # make the call
    fn()

    # assert
    spy_have_been_called _spy

to_call_service_with = ->
  compare: (fn, service, fn_name, args...) ->
    validate_arguments_gt arguments, 3, 'to_call_service_with takes 3 or more arguments: target service to spy on, the function name and the expected arguments'
    expect_to_be_function fn || throw_fn_expected 'fn'

    # spy on service
    _spy = spyOn service, fn_name
    assert_is_spy _spy

    # spy on service and return a solved promise
    deferred = q().defer()
    deferred.resolve()
    _spy.and.returnValue deferred.promise

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, args

to_subscribe_success = ->
  compare: (fn, service, fn_name, callback) ->
    validate_arguments_count arguments, 4, 'to_subscribe_success takes 3 arguments: target service to spy on, the function name and the callback'
    expect_to_be_function fn || throw_fn_expected 'fn'
    expect_to_be_function callback || throw_fn_expected 'callback'

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return a solved promise
    deferred = q().defer()
    deferred.resolve()
    service_spy.and.returnValue deferred.promise

    # spy and stub on promise
    _spy = spyOn deferred.promise, 'then'
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, [callback]

to_subscribe_error = ->
  compare: (fn, service, fn_name, callback) ->
    validate_arguments_count arguments, 4, 'to_subscribe_error takes 3 arguments: target service to spy on, the function name and the callback'
    expect_to_be_function fn || throw_fn_expected 'fn'
    expect_to_be_function callback || throw_fn_expected 'callback'

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return a solved promise
    deferred = q().defer()
    deferred.resolve()
    service_spy.and.returnValue deferred.promise

    # spy and stub on promise
    _spy = spyOn deferred.promise, 'then'
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, [jasmine.any(Function), callback]

to_subscribe = ->
  compare: (fn, service, fn_name, callbacks...) ->
    validate_arguments_gt arguments, 3, 'to_subscribe takes at least 3 arguments: target service to spy on, the function name and at least one callback'
    expect_to_be_function fn || throw_fn_expected 'fn'
    for callback, index in callbacks
      expect_to_be_function callback || throw_fn_expected "callbacks[#{index}]"

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return a solved promise
    deferred = q().defer()
    deferred.resolve()
    service_spy.and.returnValue deferred.promise

    # spy and stub on promise
    _spy = spyOn deferred.promise, 'then'
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, callbacks

to_callback_success_with = ->
  compare: (fn, service, fn_name, callback_obj, callback_fn_name, args...) ->
    validate_arguments_gt arguments, 5, 'to_callback_success_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument'
    expect_to_be_function fn || throw_fn_expected 'fn'

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return a solved promise
    deferred = q().defer()
    service_spy.and.returnValue deferred.promise

    # spy and stub on callback
    _spy = spyOn callback_obj, callback_fn_name
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # resolve promise
    deferred.resolve()
#    rootScope().$on '$locationChangeStart', (event) -> event.preventDefault()
#    rootScope().$apply()

    # assert
    spy_have_been_called_with _spy, args

to_callback_error_with = ->
  compare: (fn, service, fn_name, callback_obj, callback_fn_name, args...) ->
    validate_arguments_gt arguments, 5, 'to_callback_error_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument'
    expect_to_be_function fn || throw_fn_expected 'fn'

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return a solved promise
    deferred = q().defer()
    service_spy.and.returnValue deferred.promise

    # spy and stub on callback
    _spy = spyOn callback_obj, callback_fn_name
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # resolve promise
    deferred.reject()
#    rootScope().$on '$locationChangeStart', (event) -> event.preventDefault()
#    rootScope().$apply()

    # assert
    spy_have_been_called_with _spy, args

jangular_controller_matchers =
  to_call_service: to_call_service
  toCallService: to_call_service
  to_call_service_with: to_call_service_with
  toCallServiceWith: to_call_service_with
  to_subscribe_success: to_subscribe_success
  toSubscribeSuccess: to_subscribe_success
  to_subscribe_error: to_subscribe_error
  toSubscribeError: to_subscribe_error
  to_subscribe: to_subscribe
  toSubscribe: to_subscribe
  to_callback_success_with: to_callback_success_with
  toCallbackSuccessWith: to_callback_success_with
  to_callback_error_with: to_callback_error_with
  toCallbackErrorWith: to_callback_error_with

module.exports = jangular_controller_matchers

