'use strict'

###########################
# jangular common helpers #
###########################

expect_to_be_function = (fn) ->
  expect(fn).toEqual jasmine.any Function

validate_arguments_count = (args, arg_count, msg) ->
  throw new Error msg unless args.length is arg_count

validate_arguments_gt = (args, arg_count, msg) ->
  throw new Error msg unless args.length > arg_count

module.exports =
  expect_to_be_function: expect_to_be_function
  validate_arguments_count: validate_arguments_count
  validate_arguments_gt: validate_arguments_gt

