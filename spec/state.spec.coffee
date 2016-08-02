'use strict'

describe 'sample ui.router state matchers', ->

  # make the matchers available
  beforeEach ->
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach ->
    module 'sample.module'

  describe 'stateA', =>

    # inject ui.router $state helper and get the state object
    beforeEach inject ($state) =>
      @subject = $state.get 'stateA'

    it 'is an state, using object variant', => expect(@subject).to_be_an_state()
    it 'is an state, using string variant', => expect('stateA').to_be_an_state()


