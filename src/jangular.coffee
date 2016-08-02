'use strict'

jangular_matchers = angular.merge {},
  require('./jangular_controller_matchers.coffee'),
  require('./jangular_http_matchers.coffee'),
  require('./jangular_state_matchers.coffee')

window.jangular_matchers = jangular_matchers

module.exports = jangular_matchers
