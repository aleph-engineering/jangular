'use strict'

describe 'sample ng module matchers', ->
  # make the matchers available
  beforeEach -> jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach -> module 'sample.module'


