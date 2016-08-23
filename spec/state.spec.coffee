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

  describe 'stateB', =>

    beforeEach inject ($state) =>
      @subject = $state.get 'stateB'

    it 'is an abstract, using object variant', => expect(@subject).to_be_abstract()
    it 'is an abstract, using string variant', => expect('stateB').to_be_abstract()

  describe 'stateC', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateC'

    it 'has an URL, using object variant', => expect(@subject).to_have_url '/some_url'
    it 'has an URL, using string variant', => expect('stateC').to_have_url '/some_url'

    it 'has controller, using object variant', => expect(@subject).to_have_controller 'SomeUserController'
    it 'has controller, using string variant', => expect('stateC').to_have_controller 'SomeUserController'

    it 'has controller alias, using object variant', => expect(@subject).to_have_controller_alias 'suc'
    it 'has controller alias, using string variant', => expect('stateC').to_have_controller_alias 'suc'
    it 'has controller alias, using object variant', => expect(@subject).to_have_controller_as 'suc'
    it 'has controller alias, using string variant', => expect('stateC').to_have_controller_as 'suc'

  describe 'stateD', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateD'

    it 'has a template, using object variant', => expect(@subject).to_have_template '<div id="some_template"></div>'
    it 'has a template, using string variant', => expect('stateD').to_have_template '<div id="some_template"></div>'

  describe 'stateE', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateE'

    it 'has a template URL, using object variant', => expect(@subject).to_have_template_url '/templates/footer.html'
    it 'has a template URL, using string variant', => expect('stateE').to_have_template_url '/templates/footer.html'
