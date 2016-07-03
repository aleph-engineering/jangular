http_service = ($http) ->
  class HttpService
    do_get: -> $http.get '/data'
    do_get_and_unwrap: -> $http.get('/data').then (reply) -> reply.data
    do_post: -> $http.post '/post', firstname: 'Olivia', lastname: 'Lago'
    do_post_and_unwrap: -> $http.post('/post', firstname: 'Olivia', lastname: 'Lago').then (reply) -> reply.data

  new HttpService


angular.module('jangular.spec.module', []).factory 'http_service', ['$http', http_service]
