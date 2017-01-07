'use strict'

describe 'sample ui.router state matchers', ->

  # make the matchers available
  beforeEach ->
    jasmine.addMatchers jangular_matchers

  # initialize module
  beforeEach ->
    module 'sample.coffee.module'

  # to_be_an_state
  describe 'stateA', =>

    # inject ui.router $state helper and get the state object
    beforeEach inject ($state) =>
      @subject = $state.get 'stateA'

    it 'is an state, using object variant', => expect(@subject).to_be_an_state()
    it 'is an state, using string variant', => expect('stateA').to_be_an_state()

  # to_be_abstract
  describe 'stateB', =>

    beforeEach inject ($state) =>
      @subject = $state.get 'stateB'

    it 'is an abstract, using object variant', => expect(@subject).to_be_abstract()
    it 'is an abstract, using string variant', => expect('stateB').to_be_abstract()


  describe 'stateC', =>
    beforeEach inject ($state) =>
      @subject = $state.get 'stateC'

    # to_have_url
    it 'has an URL, using object variant', => expect(@subject).to_have_url '/some_url'
    it 'has an URL, using string variant', => expect('stateC').to_have_url '/some_url'

    # to_have_controller
    it 'has controller, using object variant', => expect(@subject).to_have_controller 'SomeUserController'
    it 'has controller, using string variant', => expect('stateC').to_have_controller 'SomeUserController'

    # to_have_controller_alias / to_have_controller_as
    it 'has controller alias, using object variant', => expect(@subject).to_have_controller_alias 'suc'
    it 'has controller alias, using string variant', => expect('stateC').to_have_controller_alias 'suc'
    it 'has controller alias, using object variant', => expect(@subject).to_have_controller_as 'suc'
    it 'has controller alias, using string variant', => expect('stateC').to_have_controller_as 'suc'

  # to_have_template
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

    describe 'some nested view', =>
      beforeEach inject ($state) =>
        @subject = $state.get('stateE').views['nested_view']

      it 'view has a template URL', =>
        expect(@subject).to_have_template_url '/templates/views/nested.html'

  describe 'stateX', =>
    beforeEach inject ($state) =>
      @subject = $state.get('stateX')

    it 'as a template URL, using object variant', =>
      expect(@subject).to_have_template_url '/xurl'

    describe 'a nested view', =>
      it 'view has a template URL', inject ($state) =>
        expect($state.get('stateX').views['my_view']).to_have_template_url '/view_url'

  describe 'stateF', =>
    beforeEach inject ($state, @sampleHttpService) =>
      @subject = $state.get 'stateF'

    it 'resolves the promise by calling service without arguments', =>
      expect(@subject.resolve.user_profile).to_resolve_by_calling_service @sampleHttpService, 'do_get'

  describe 'stateG', =>
    beforeEach inject ($state, @sampleHttpService) =>
      @subject = $state.get 'stateG'

    it 'resolves the promise by calling service with arguments', =>
      expect(@subject.resolve.user_history).to_resolve_by_calling_service_with @sampleHttpService, 'do_get_with', 1, 'a', true
