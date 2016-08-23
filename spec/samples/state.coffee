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

angular.module('sample.module').config config
