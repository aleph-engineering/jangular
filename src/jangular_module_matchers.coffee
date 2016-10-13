'use strict'

window.prevent_default = ($rootScope) =>
  $rootScope.$on '$locationChangeStart', (event) -> event.preventDefault()

module.exports = {}
