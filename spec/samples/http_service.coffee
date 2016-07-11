'use strict'

sampleHttpService = ($http) ->
  class SampleHttpService
    do_get: -> $http.get '/data'
    do_get_and_unwrap: -> $http.get('/data').then (reply) -> reply.data

    do_post: -> $http.post '/post', firstname: 'Olivia', lastname: 'Lago'
    do_post_and_unwrap: -> $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data

    do_get_with: (a, b, c) ->
    do_get_with_hash: ({x, y, z}) ->

  new SampleHttpService


angular.module('sample.module').factory 'sampleHttpService', ['$http', sampleHttpService]
