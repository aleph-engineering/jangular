'use strict'

##################
# common helpers #
##################

ok = 200
err = 500

expect_to_be_function = (fn) ->
  expect(fn).toEqual jasmine.any Function

expect_to_be_promise = (obj) ->
  expect(obj).toBeDefined()
  expect_to_be_function obj.then

validate_arguments_count = (args, arg_count, msg) ->
  throw new Error msg unless args.length is arg_count

pass = -> {pass: true}

################
# http helpers #
################

http_backend = ->
  _http_backend = undefined
  inject ($httpBackend) -> _http_backend = $httpBackend
  _http_backend

expect_get = (uri, response) ->
  if response?
    http_backend().expectGET(uri).respond ok, response
  else
    http_backend().expectGET(uri).respond ok

allow_get = (response) ->
  if response?
    http_backend().expectGET().respond ok, response
  else
    http_backend().expectGET().respond ok

fail_get = ->
  http_backend().expectGET().respond err

expect_post = (uri, body, response) ->
  if response?
    http_backend().expectPOST(uri, body).respond ok, response
  else
    http_backend().expectPOST(uri, body).respond ok

allow_post = (response) ->
  if response?
    http_backend().expectPOST().respond ok, response
  else
    http_backend().expectPOST().respond ok

fail_post = ->
  http_backend().expectPOST().respond err

flush = ->
  http_backend().flush()

assert_unwrapped_data = (actual_data, expected_data) ->
  result =
    pass: actual_data is expected_data
    message: ->
      "Expected response data `#{actual_data}` to equal to `#{expected_data}`. Seems that response was not properly unwrapped."

############
# matchers #
############

to_get = ->
  compare: (fn, uri) ->
# validations
    validate_arguments_count arguments, 2, 'to_get takes a single uri argument.'
    expect_to_be_function fn

    # expect http call
    expect_get uri

    # make the call
    fn()

    # flush & assert
    flush()

    pass()

to_unwrap_get = ->
  compare: (fn) ->
# validations
    validate_arguments_count arguments, 1, 'to_unwrap_get takes no arguments.'
    expect_to_be_function fn

    # allow http call & reply a random number
    expected_data = Math.random()
    allow_get expected_data

    # make the call & grab the returned value
    promise = fn()
    expect_to_be_promise promise

    actual_data = undefined
    promise.then (data) -> actual_data = data

    # flush the call & assert
    flush()

    assert_unwrapped_data actual_data, expected_data

to_get_and_unwrap = ->
  compare: (fn, uri) ->
# validations
    validate_arguments_count arguments, 2, 'to_get_and_unwrap takes a single uri argument.'
    expect_to_be_function fn

    # expect http call & reply a random number
    expected_data = Math.random()
    expect_get uri, expected_data

    # make the call & grab the returned value
    promise = fn()
    expect_to_be_promise promise
    actual_data = undefined
    promise.then (data) -> actual_data = data

    # flush the call & assert
    flush()

    assert_unwrapped_data actual_data, expected_data

to_post = ->
  compare: (fn, uri, body) ->
# validations
    validate_arguments_count arguments, 3, 'to_post takes a uri and post body arguments.'
    expect_to_be_function fn

    # expect http call
    expect_post uri, body

    # make the call
    fn()

    # flush the call & assert
    flush()

    pass()

to_unwrap_post = ->
  compare: (fn) ->
# validations
    validate_arguments_count arguments, 1, 'to_unwrap_post takes no arguments.'
    expect_to_be_function fn

    # allow http call & reply a random number
    expected_data = Math.random()
    allow_post expected_data

    # make the call & grab the returned value
    promise = fn()
    expect_to_be_promise promise
    actual_data = undefined
    promise.then (data) -> actual_data = data

    # flush the call & assert
    flush()

    assert_unwrapped_data actual_data, expected_data

to_post_and_unwrap = ->
  compare: (fn, uri, body) ->
# validations
    validate_arguments_count arguments, 3, 'to_post takes a uri and post body arguments.'
    expect_to_be_function fn

    # expect http call
    expected_data = Math.random()
    expect_post uri, body, expected_data

    # make the call & grab the returned value
    promise = fn()
    expect_to_be_promise promise
    actual_data = undefined
    promise.then (data) -> actual_data = data

    # flush the call & assert
    flush()

    assert_unwrapped_data actual_data, expected_data

jangular_http_matchers =
  to_get: to_get
  toGet: to_get
  to_unwrap_get: to_unwrap_get
  toUnwrapGet: to_unwrap_get
  to_get_and_unwrap: to_get_and_unwrap
  toGetAndUnwrap: to_get_and_unwrap
  to_post: to_post
  toPost: to_post
  to_unwrap_post: to_unwrap_post
  toUnwrapPost: to_unwrap_post
  to_post_and_unwrap: to_post_and_unwrap
  toPostAndUnwrap: to_post_and_unwrap

window.jangular_http_matchers = jangular_http_matchers

################################
# jangular controller matchers #
################################

assert_is_spy = (_spy) ->
  throw new Error "Expected a spy, but got #{jasmine.pp _spy}." unless jasmine.isSpy _spy

q = ->
  _q = undefined
  inject ($q) -> _q = $q
  _q

spy_have_been_called = (_spy) ->
  pass = _spy.calls.any()
  result =
    pass: pass
    message: pass ? "Expected spy #{_spy.and.identity()} not to have been called.": "Expected spy #{_spy.and.identity()}  to have been called.'"

to_call_service = ->
  compare: (fn, service, fn_name) ->

    # validations
    validate_arguments_count arguments, 3, 'to_call_service takes only 2 arguments: target service to spy on and the function name'
    expect_to_be_function fn

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

jangular_controller_matchers =
  to_call_service: to_call_service
  toCallService: to_call_service

window.jangular_controller_matchers = jangular_controller_matchers

jangular_matchers = angular.merge {}, jangular_controller_matchers, jangular_http_matchers
window.jangular_matchers = jangular_matchers

module.exports = jangular_matchers

