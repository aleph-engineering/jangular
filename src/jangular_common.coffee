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

module.exports =
  expect_to_be_function: expect_to_be_function
  is_a_function: is_a_function
  validate_arguments_count: validate_arguments_count
  validate_arguments_gt: validate_arguments_gt
  throw_fn_expected: throw_fn_expected

