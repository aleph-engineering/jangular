'use strict'

################################
# jangular controller matchers #
################################

common = require './jangular_common'

expect_to_be_function = common.expect_to_be_function
is_a_function = common.is_a_function
validate_arguments_count = common.validate_arguments_count
validate_arguments_gt = common.validate_arguments_gt
throw_fn_expected = common.throw_fn_expected
assert_is_spy = common.assert_is_spy
q = common.q
spy_have_been_called = common.spy_have_been_called
spy_have_been_called_with = common.spy_have_been_called_with

rootScope = ->
  _rootScope = undefined
  inject ($rootScope) -> _rootScope = $rootScope
  _rootScope

to_call_service = ->
  compare: (fn, service, fn_name) ->

    # validations
    validate_arguments_count arguments, 3, 'to_call_service takes only 2 arguments: target service to spy on and the function name'
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn
    throw_fn_expected 'callback' unless is_a_function callback

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return fake promise
    promise =
      then: ->
    service_spy.and.returnValue promise
    _spy = spyOn promise, 'then'
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, [callback]

to_subscribe_error = ->
  compare: (fn, service, fn_name, callback) ->
    validate_arguments_count arguments, 4, 'to_subscribe_error takes 3 arguments: target service to spy on, the function name and the callback'
    throw_fn_expected 'fn' unless is_a_function fn
    throw_fn_expected 'callback' unless is_a_function callback

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return fake (rejected) promise
    promise =
      then: ->
    service_spy.and.returnValue promise
    _spy = spyOn promise, 'then'
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, [jasmine.any(Function), callback]

to_subscribe = ->
  compare: (fn, service, fn_name, callbacks...) ->
    validate_arguments_gt arguments, 3, 'to_subscribe takes at least 3 arguments: target service to spy on, the function name and at least one callback'
    throw_fn_expected 'fn' unless is_a_function fn
    for callback, index in callbacks
      throw_fn_expected "callbacks[#{index}]" unless is_a_function callback

    # spy on service
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service and return fake (rejected) promise
    promise =
      then: ->
    service_spy.and.returnValue promise
    _spy = spyOn promise, 'then'
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    # assert
    spy_have_been_called_with _spy, callbacks

to_callback_success_with = ->
  compare: (fn, service, fn_name, callback_obj, callback_fn_name, args...) ->
    validate_arguments_gt arguments, 5, 'to_callback_success_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument'
    throw_fn_expected 'fn' unless is_a_function fn

    # spy on service and return fake promise
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy
    success_callback = undefined
    promise =
      then: (_success_callback) ->
        success_callback = _success_callback
    service_spy.and.returnValue promise

    # stub on callback
    _spy = spyOn callback_obj, callback_fn_name
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    throw Error "service's #{fn_name}(...).then(callback) was never called, or was called with null/undefined `callback` value" unless success_callback?
    throw_fn_expected 'success_callback' unless is_a_function success_callback

    # success (promise resolved)
    success_callback()

    # assert
    spy_have_been_called_with _spy, args

to_callback_error_with = ->
  compare: (fn, service, fn_name, callback_obj, callback_fn_name, args...) ->
    validate_arguments_gt arguments, 5, 'to_callback_error_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument'
    throw_fn_expected 'fn' unless is_a_function fn

    # spy on service and return a fake promise
    service_spy = spyOn service, fn_name
    assert_is_spy service_spy

    # spy on service
    error_callback = undefined
    promise =
      then: (_, _error_callback) ->
        error_callback = _error_callback
    service_spy.and.returnValue promise

    # stub on callback
    _spy = spyOn callback_obj, callback_fn_name
    assert_is_spy _spy
    _spy.and.stub()

    # make the call
    fn()

    throw Error "service's #{fn_name}(...).then(_, error_callback) was never called, or was called with null/undefined `error_callback` value" unless error_callback?
    throw_fn_expected 'error_callback' unless is_a_function error_callback

    # fail (reject promise)
    error_callback()

    # assert
    spy_have_been_called_with _spy, args

module.exports =
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

