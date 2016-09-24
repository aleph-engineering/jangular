'use strict'

config = ($stateProvider) ->
  $stateProvider.state 'stateA', {}

  $stateProvider.state 'stateB',
    abstract: yes

  $stateProvider.state 'stateC',
    url: '/some_url'
    controller: 'SomeUserController'
    controllerAs: 'suc'

  $stateProvider.state 'stateD',
    template: '<div id="some_template"></div>'

  $stateProvider.state 'stateE',
    templateUrl: '/templates/footer.html'

  $stateProvider.state 'stateF',
    resolve:
      user_profile: ['sampleHttpService', (sampleHttpService) -> sampleHttpService.do_get()]

  $stateProvider.state 'stateG',
    resolve:
      user_history: ['sampleHttpService', (sampleHttpService) -> sampleHttpService.do_get_with 1, 'a', true]

angular.module('sample.module').config config
