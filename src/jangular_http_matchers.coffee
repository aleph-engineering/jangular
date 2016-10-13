'use strict'

#########################
# jangular http helpers #
#########################

common = require './jangular_common'

expect_to_be_function = common.expect_to_be_function
is_a_function = common.is_a_function
validate_arguments_count = common.validate_arguments_count
throw_fn_expected = common.throw_fn_expected

ok = 200
err = 500

# TODO: requires improvement!
expect_to_be_promise = (obj) ->
  expect(obj).toBeDefined()
  expect_to_be_function obj.then

pass = -> {pass: true}

http_backend = ->
  _http_backend = undefined
  inject ($httpBackend) -> _http_backend = $httpBackend
  _http_backend

flush = ->
  http_backend().flush()

assert_unwrapped_data = (actual_data, expected_data) ->
  result =
    pass: actual_data is expected_data
    message: ->
      "Expected response data `#{actual_data}` to equal to `#{expected_data}`. Seems that response was not properly unwrapped."

################
# http helpers #
################

expect_get = (uri, response) ->
  get = http_backend().expectGET uri
  if response?
    get.respond ok, response
  else
    get.respond ok

allow_get = (response) ->
  get = http_backend().expectGET()
  if response?
    get.respond ok, response
  else
    get.respond ok

fail_get = ->
  http_backend().expectGET().respond err

expect_post = (uri, body, response) ->
  post = http_backend().expectPOST uri, body
  if response?
    post.respond ok, response
  else
    post.respond ok

allow_post = (response) ->
  post = http_backend().expectPOST()
  if response?
    post.respond ok, response
  else
    post.respond ok

fail_post = ->
  http_backend().expectPOST().respond err

[window.expect_get, window.expectGet] = [expect_get, expect_get]
[window.allow_get, window.allowGet] = [allow_get, allow_get]
[window.fail_get, window.failGet] = [fail_get, fail_get]
[window.expect_post, window.expectPost] = [expect_post, expect_post]
[window.allow_post, window.allowPost] = [allow_post, allow_post]
[window.fail_post, window.failPost] = [fail_post, fail_post]

############
# matchers #
############

to_get = ->
  compare: (fn, uri) ->
# validations
    validate_arguments_count arguments, 2, 'to_get takes a single uri argument.'
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn

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
    throw_fn_expected 'fn' unless is_a_function fn

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

module.exports =
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


