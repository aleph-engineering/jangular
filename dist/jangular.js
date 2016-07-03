(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var allow_get, allow_post, assert_unwrapped_data, err, expect_get, expect_post, expect_to_be_function, expect_to_be_promise, fail_get, fail_post, flush, grab_data, http_backend, jangular_http_matchers, jangular_matchers, ok, pass, to_get, to_get_and_unwrap, to_post, to_post_and_unwrap, to_unwrap_get, to_unwrap_post, validate_arguments_count;

ok = 200;

err = 500;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

expect_to_be_promise = function(obj) {
  expect(obj).toBeDefined();
  return expect_to_be_function(obj.then);
};

validate_arguments_count = function(args, arg_count, msg) {
  if (args.length !== arg_count) {
    throw new Error(msg);
  }
};

pass = function() {
  return {
    pass: true
  };
};

http_backend = function() {
  var _http_backend;
  _http_backend = void 0;
  inject(function($httpBackend) {
    return _http_backend = $httpBackend;
  });
  return _http_backend;
};

expect_get = function(uri, response) {
  if (response != null) {
    return http_backend().expectGET(uri).respond(ok, response);
  } else {
    return http_backend().expectGET(uri).respond(ok);
  }
};

allow_get = function(response) {
  if (response != null) {
    return http_backend().expectGET().respond(ok, response);
  } else {
    return http_backend().expectGET().respond(ok);
  }
};

fail_get = function() {
  return http_backend().expectGET().respond(err);
};

expect_post = function(uri, body, response) {
  if (response != null) {
    return http_backend().expectPOST(uri, body).respond(ok, response);
  } else {
    return http_backend().expectPOST(uri, body).respond(ok);
  }
};

allow_post = function(response) {
  if (response != null) {
    return http_backend().expectPOST().respond(ok, response);
  } else {
    return http_backend().expectPOST().respond(ok);
  }
};

fail_post = function() {
  return http_backend().expectPOST().respond(err);
};

flush = function() {
  return http_backend().flush();
};

grab_data = function(promise) {
  var _actual_data;
  _actual_data = void 0;
  promise.then(function(data) {
    return _actual_data = data;
  });
  return _actual_data;
};

assert_unwrapped_data = function(actual_data, expected_data) {
  var result;
  return result = {
    pass: actual_data === expected_data,
    message: function() {
      return "Expected response data `" + actual_data + "` to equal to `" + expected_data + "`. Seems that response was not properly unwrapped.";
    }
  };
};

to_get = function() {
  return {
    compare: function(fn, uri) {
      validate_arguments_count(arguments, 2, 'to_get takes a single uri argument.');
      expect_to_be_function(fn);
      expect_get(uri);
      fn();
      flush();
      return pass();
    }
  };
};

to_unwrap_get = function() {
  return {
    compare: function(fn) {
      var actual_data, expected_data, promise;
      validate_arguments_count(arguments, 1, 'to_unwrap_get takes no arguments.');
      expect_to_be_function(fn);
      expected_data = Math.random();
      allow_get(expected_data);
      promise = fn();
      expect_to_be_promise(promise);
      actual_data = void 0;
      promise.then(function(data) {
        return actual_data = data;
      });
      flush();
      return assert_unwrapped_data(actual_data, expected_data);
    }
  };
};

to_get_and_unwrap = function() {
  return {
    compare: function(fn, uri) {
      var actual_data, expected_data, promise;
      validate_arguments_count(arguments, 2, 'to_get_and_unwrap takes a single uri argument.');
      expect_to_be_function(fn);
      expected_data = Math.random();
      expect_get(uri, expected_data);
      promise = fn();
      expect_to_be_promise(promise);
      actual_data = void 0;
      promise.then(function(data) {
        return actual_data = data;
      });
      flush();
      return assert_unwrapped_data(actual_data, expected_data);
    }
  };
};

to_post = function() {
  return {
    compare: function(fn, uri, body) {
      validate_arguments_count(arguments, 3, 'to_post takes a uri and post body arguments.');
      expect_to_be_function(fn);
      expect_post(uri, body);
      fn();
      flush();
      return pass();
    }
  };
};

to_unwrap_post = function() {
  return {
    compare: function(fn) {
      var actual_data, expected_data, promise;
      validate_arguments_count(arguments, 1, 'to_unwrap_post takes no arguments.');
      expect_to_be_function(fn);
      expected_data = Math.random();
      allow_post(expected_data);
      promise = fn();
      expect_to_be_promise(promise);
      actual_data = void 0;
      promise.then(function(data) {
        return actual_data = data;
      });
      flush();
      return assert_unwrapped_data(actual_data, expected_data);
    }
  };
};

to_post_and_unwrap = function() {
  return {
    compare: function(fn, uri, body) {
      var actual_data, expected_data, promise;
      validate_arguments_count(arguments, 3, 'to_post takes a uri and post body arguments.');
      expect_to_be_function(fn);
      expected_data = Math.random();
      expect_post(uri, body, expected_data);
      promise = fn();
      expect_to_be_promise(promise);
      actual_data = void 0;
      promise.then(function(data) {
        return actual_data = data;
      });
      flush();
      return assert_unwrapped_data(actual_data, expected_data);
    }
  };
};

jangular_http_matchers = {
  to_get: to_get,
  toGet: to_get,
  to_unwrap_get: to_unwrap_get,
  toUnwrapGet: to_unwrap_get,
  to_get_and_unwrap: to_get_and_unwrap,
  toGetAndUnwrap: to_get_and_unwrap,
  to_post: to_post,
  toPost: to_post,
  to_unwrap_post: to_unwrap_post,
  toUnwrapPost: to_unwrap_post,
  to_post_and_unwrap: to_post_and_unwrap,
  toPostAndUnwrap: to_post_and_unwrap
};

window.jangular_http_matchers = jangular_http_matchers;

jangular_matchers = angular.merge({}, jangular_http_matchers);

window.jangular_matchers = jangular_matchers;

module.exports = jangular_matchers;

},{}]},{},[1]);
