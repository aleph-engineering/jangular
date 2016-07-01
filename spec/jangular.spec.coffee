'use strict'

describe 'jangular', ->
  beforeEach ->
    jasmine.addMatchers jangular_matchers

  it 'works', -> expect().demo_matcher()
