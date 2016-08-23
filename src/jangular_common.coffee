'use strict'

###########################
# jangular common helpers #
###########################

expect_to_be_function = (fn) ->
  expect(fn).toEqual jasmine.any Function

is_a_function = (obj) ->
  typeof obj == 'function' or obj instanceof Function

throw_fn_expected = (fn_param_name) ->
  throw new Error "#{fn_param_name} parameter was expected to be a function"

validate_arguments_count = (args, arg_count, msg) ->
  throw new Error msg unless args.length is arg_count

validate_arguments_gt = (args, arg_count, msg) ->
  throw new Error msg unless args.length > arg_count

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

module.exports =
  expect_to_be_function: expect_to_be_function
  is_a_function: is_a_function
  validate_arguments_count: validate_arguments_count
  validate_arguments_gt: validate_arguments_gt
  throw_fn_expected: throw_fn_expected
  assert_is_spy: assert_is_spy
  q: q
  spy_have_been_called: spy_have_been_called
  spy_have_been_called_with: spy_have_been_called_with
