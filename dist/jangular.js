(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var jangular_matchers;

jangular_matchers = angular.merge({}, require('./jangular_controller_matchers.coffee'), require('./jangular_http_matchers.coffee'));

window.jangular_matchers = jangular_matchers;

module.exports = jangular_matchers;

},{"./jangular_controller_matchers.coffee":3,"./jangular_http_matchers.coffee":4}],2:[function(require,module,exports){
'use strict';
var expect_to_be_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

throw_fn_expected = function(fn_param_name) {
  throw new Error(fn_param_name + " parameter was expected to be a function");
};

validate_arguments_count = function(args, arg_count, msg) {
  if (args.length !== arg_count) {
    throw new Error(msg);
  }
};

validate_arguments_gt = function(args, arg_count, msg) {
  if (!(args.length > arg_count)) {
    throw new Error(msg);
  }
};

module.exports = {
  expect_to_be_function: expect_to_be_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],3:[function(require,module,exports){
'use strict';
var assert_is_spy, common, expect_to_be_function, jangular_controller_matchers, q, rootScope, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, to_call_service, to_call_service_with, to_callback_error_with, to_callback_success_with, to_subscribe, to_subscribe_error, to_subscribe_success, validate_arguments_count, validate_arguments_gt,
  slice = [].slice;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

validate_arguments_count = common.validate_arguments_count;

validate_arguments_gt = common.validate_arguments_gt;

throw_fn_expected = common.throw_fn_expected;

assert_is_spy = function(_spy) {
  if (!jasmine.isSpy(_spy)) {
    throw new Error("Expected a spy, but got " + (jasmine.pp(_spy)) + ".");
  }
};

q = function() {
  var _q;
  _q = void 0;
  inject(function($q) {
    return _q = $q;
  });
  return _q;
};

rootScope = function() {
  var _rootScope;
  _rootScope = void 0;
  inject(function($rootScope) {
    return _rootScope = $rootScope;
  });
  return _rootScope;
};

spy_have_been_called = function(_spy) {
  var obj, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj = {},
      obj["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj
    )
  };
};

spy_have_been_called_with = function(_spy, args) {
  var pass, result;
  result = {
    pass: false
  };
  pass = _spy.calls.any();
  if (!pass) {
    result.message = function() {
      return "Expected spy " + (_spy.and.identity()) + " to have been called with " + (jasmine.pp(args)) + " but it was never called.";
    };
  } else {
    if (jasmine.matchersUtil.contains(_spy.calls.allArgs(), args, jasmine.customEqualityTesters)) {
      result.pass = true;
      result.message = function() {
        return "Expected spy " + (_spy.and.identity()) + " not to have been called with " + (jasmine.pp(args)) + " but it was.";
      };
    } else {
      result.message = function() {
        return "Expected spy " + (_spy.and.identity()) + " to have been called with " + (jasmine.pp(args)) + " but actual calls were " + (jasmine.pp(_spy.calls.allArgs()).replace(/^\[ | \]$/g, '')) + ".";
      };
    }
  }
  return result;
};

to_call_service = function() {
  return {
    compare: function(fn, service, fn_name) {
      var _spy, deferred;
      validate_arguments_count(arguments, 3, 'to_call_service takes only 2 arguments: target service to spy on and the function name');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      deferred.resolve();
      _spy.and.returnValue(deferred.promise);
      fn();
      return spy_have_been_called(_spy);
    }
  };
};

to_call_service_with = function() {
  return {
    compare: function() {
      var _spy, args, deferred, fn, fn_name, service;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], args = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(arguments, 3, 'to_call_service_with takes 3 or more arguments: target service to spy on, the function name and the expected arguments');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      deferred.resolve();
      _spy.and.returnValue(deferred.promise);
      fn();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

to_subscribe_success = function() {
  return {
    compare: function(fn, service, fn_name, callback) {
      var _spy, deferred, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_success takes 3 arguments: target service to spy on, the function name and the callback');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      expect_to_be_function(callback || throw_fn_expected('callback'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      deferred.resolve();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(deferred.promise, 'then');
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      return spy_have_been_called_with(_spy, [callback]);
    }
  };
};

to_subscribe_error = function() {
  return {
    compare: function(fn, service, fn_name, callback) {
      var _spy, deferred, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_error takes 3 arguments: target service to spy on, the function name and the callback');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      expect_to_be_function(callback || throw_fn_expected('callback'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      deferred.resolve();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(deferred.promise, 'then');
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      return spy_have_been_called_with(_spy, [jasmine.any(Function), callback]);
    }
  };
};

to_subscribe = function() {
  return {
    compare: function() {
      var _spy, callback, callbacks, deferred, fn, fn_name, i, index, len, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callbacks = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(arguments, 3, 'to_subscribe takes at least 3 arguments: target service to spy on, the function name and at least one callback');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      for (index = i = 0, len = callbacks.length; i < len; index = ++i) {
        callback = callbacks[index];
        expect_to_be_function(callback || throw_fn_expected("callbacks[" + index + "]"));
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      deferred.resolve();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(deferred.promise, 'then');
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      return spy_have_been_called_with(_spy, callbacks);
    }
  };
};

to_callback_success_with = function() {
  return {
    compare: function() {
      var _spy, args, callback_fn_name, callback_obj, deferred, fn, fn_name, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_success_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      deferred.resolve();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

to_callback_error_with = function() {
  return {
    compare: function() {
      var _spy, args, callback_fn_name, callback_obj, deferred, fn, fn_name, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_error_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      deferred.reject();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

jangular_controller_matchers = {
  to_call_service: to_call_service,
  toCallService: to_call_service,
  to_call_service_with: to_call_service_with,
  toCallServiceWith: to_call_service_with,
  to_subscribe_success: to_subscribe_success,
  toSubscribeSuccess: to_subscribe_success,
  to_subscribe_error: to_subscribe_error,
  toSubscribeError: to_subscribe_error,
  to_subscribe: to_subscribe,
  toSubscribe: to_subscribe,
  to_callback_success_with: to_callback_success_with,
  toCallbackSuccessWith: to_callback_success_with,
  to_callback_error_with: to_callback_error_with,
  toCallbackErrorWith: to_callback_error_with
};

module.exports = jangular_controller_matchers;

},{"./jangular_common":2}],4:[function(require,module,exports){
'use strict';
var allow_get, allow_post, assert_unwrapped_data, common, err, expect_get, expect_post, expect_to_be_function, expect_to_be_promise, fail_get, fail_post, flush, http_backend, jangular_http_matchers, ok, pass, throw_fn_expected, to_get, to_get_and_unwrap, to_post, to_post_and_unwrap, to_unwrap_get, to_unwrap_post, validate_arguments_count;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

validate_arguments_count = common.validate_arguments_count;

throw_fn_expected = common.throw_fn_expected;

ok = 200;

err = 500;

expect_to_be_promise = function(obj) {
  expect(obj).toBeDefined();
  return expect_to_be_function(obj.then);
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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

module.exports = jangular_http_matchers;

},{"./jangular_common":2}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

throw_fn_expected = function(fn_param_name) {
  throw new Error(fn_param_name + " parameter was expected to be a function");
};

validate_arguments_count = function(args, arg_count, msg) {
  if (args.length !== arg_count) {
    throw new Error(msg);
  }
};

validate_arguments_gt = function(args, arg_count, msg) {
  if (!(args.length > arg_count)) {
    throw new Error(msg);
  }
};

module.exports = {
  expect_to_be_function: expect_to_be_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

throw_fn_expected = function(fn_param_name) {
  throw new Error(fn_param_name + " parameter was expected to be a function");
};

validate_arguments_count = function(args, arg_count, msg) {
  if (args.length !== arg_count) {
    throw new Error(msg);
  }
};

validate_arguments_gt = function(args, arg_count, msg) {
  if (!(args.length > arg_count)) {
    throw new Error(msg);
  }
};

module.exports = {
  expect_to_be_function: expect_to_be_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],2:[function(require,module,exports){
'use strict';
var assert_is_spy, common, expect_to_be_function, jangular_controller_matchers, q, rootScope, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, to_call_service, to_call_service_with, to_callback_error_with, to_callback_success_with, to_subscribe, to_subscribe_error, to_subscribe_success, validate_arguments_count, validate_arguments_gt,
  slice = [].slice;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

validate_arguments_count = common.validate_arguments_count;

validate_arguments_gt = common.validate_arguments_gt;

throw_fn_expected = common.throw_fn_expected;

assert_is_spy = function(_spy) {
  if (!jasmine.isSpy(_spy)) {
    throw new Error("Expected a spy, but got " + (jasmine.pp(_spy)) + ".");
  }
};

q = function() {
  var _q;
  _q = void 0;
  inject(function($q) {
    return _q = $q;
  });
  return _q;
};

rootScope = function() {
  var _rootScope;
  _rootScope = void 0;
  inject(function($rootScope) {
    return _rootScope = $rootScope;
  });
  return _rootScope;
};

spy_have_been_called = function(_spy) {
  var obj, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj = {},
      obj["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj
    )
  };
};

spy_have_been_called_with = function(_spy, args) {
  var pass, result;
  result = {
    pass: false
  };
  pass = _spy.calls.any();
  if (!pass) {
    result.message = function() {
      return "Expected spy " + (_spy.and.identity()) + " to have been called with " + (jasmine.pp(args)) + " but it was never called.";
    };
  } else {
    if (jasmine.matchersUtil.contains(_spy.calls.allArgs(), args, jasmine.customEqualityTesters)) {
      result.pass = true;
      result.message = function() {
        return "Expected spy " + (_spy.and.identity()) + " not to have been called with " + (jasmine.pp(args)) + " but it was.";
      };
    } else {
      result.message = function() {
        return "Expected spy " + (_spy.and.identity()) + " to have been called with " + (jasmine.pp(args)) + " but actual calls were " + (jasmine.pp(_spy.calls.allArgs()).replace(/^\[ | \]$/g, '')) + ".";
      };
    }
  }
  return result;
};

to_call_service = function() {
  return {
    compare: function(fn, service, fn_name) {
      var _spy, deferred;
      validate_arguments_count(arguments, 3, 'to_call_service takes only 2 arguments: target service to spy on and the function name');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      deferred.resolve();
      _spy.and.returnValue(deferred.promise);
      fn();
      return spy_have_been_called(_spy);
    }
  };
};

to_call_service_with = function() {
  return {
    compare: function() {
      var _spy, args, deferred, fn, fn_name, service;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], args = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(arguments, 3, 'to_call_service_with takes 3 or more arguments: target service to spy on, the function name and the expected arguments');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      deferred.resolve();
      _spy.and.returnValue(deferred.promise);
      fn();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

to_subscribe_success = function() {
  return {
    compare: function(fn, service, fn_name, callback) {
      var _spy, deferred, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_success takes 3 arguments: target service to spy on, the function name and the callback');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      expect_to_be_function(callback || throw_fn_expected('callback'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      deferred.resolve();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(deferred.promise, 'then');
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      return spy_have_been_called_with(_spy, [callback]);
    }
  };
};

to_subscribe_error = function() {
  return {
    compare: function(fn, service, fn_name, callback) {
      var _spy, deferred, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_error takes 3 arguments: target service to spy on, the function name and the callback');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      expect_to_be_function(callback || throw_fn_expected('callback'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      deferred.resolve();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(deferred.promise, 'then');
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      return spy_have_been_called_with(_spy, [jasmine.any(Function), callback]);
    }
  };
};

to_subscribe = function() {
  return {
    compare: function() {
      var _spy, callback, callbacks, deferred, fn, fn_name, i, index, len, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callbacks = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(arguments, 3, 'to_subscribe takes at least 3 arguments: target service to spy on, the function name and at least one callback');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      for (index = i = 0, len = callbacks.length; i < len; index = ++i) {
        callback = callbacks[index];
        expect_to_be_function(callback || throw_fn_expected("callbacks[" + index + "]"));
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      deferred.resolve();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(deferred.promise, 'then');
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      return spy_have_been_called_with(_spy, callbacks);
    }
  };
};

to_callback_success_with = function() {
  return {
    compare: function() {
      var _spy, args, callback_fn_name, callback_obj, deferred, fn, fn_name, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_success_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      deferred.resolve();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

to_callback_error_with = function() {
  return {
    compare: function() {
      var _spy, args, callback_fn_name, callback_obj, deferred, fn, fn_name, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_error_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      expect_to_be_function(fn || throw_fn_expected('fn'));
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      deferred = q().defer();
      service_spy.and.returnValue(deferred.promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      deferred.reject();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

jangular_controller_matchers = {
  to_call_service: to_call_service,
  toCallService: to_call_service,
  to_call_service_with: to_call_service_with,
  toCallServiceWith: to_call_service_with,
  to_subscribe_success: to_subscribe_success,
  toSubscribeSuccess: to_subscribe_success,
  to_subscribe_error: to_subscribe_error,
  toSubscribeError: to_subscribe_error,
  to_subscribe: to_subscribe,
  toSubscribe: to_subscribe,
  to_callback_success_with: to_callback_success_with,
  toCallbackSuccessWith: to_callback_success_with,
  to_callback_error_with: to_callback_error_with,
  toCallbackErrorWith: to_callback_error_with
};

module.exports = jangular_controller_matchers;

},{"./jangular_common":1}]},{},[2]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

throw_fn_expected = function(fn_param_name) {
  throw new Error(fn_param_name + " parameter was expected to be a function");
};

validate_arguments_count = function(args, arg_count, msg) {
  if (args.length !== arg_count) {
    throw new Error(msg);
  }
};

validate_arguments_gt = function(args, arg_count, msg) {
  if (!(args.length > arg_count)) {
    throw new Error(msg);
  }
};

module.exports = {
  expect_to_be_function: expect_to_be_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],2:[function(require,module,exports){
'use strict';
var allow_get, allow_post, assert_unwrapped_data, common, err, expect_get, expect_post, expect_to_be_function, expect_to_be_promise, fail_get, fail_post, flush, http_backend, jangular_http_matchers, ok, pass, throw_fn_expected, to_get, to_get_and_unwrap, to_post, to_post_and_unwrap, to_unwrap_get, to_unwrap_post, validate_arguments_count;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

validate_arguments_count = common.validate_arguments_count;

throw_fn_expected = common.throw_fn_expected;

ok = 200;

err = 500;

expect_to_be_promise = function(obj) {
  expect(obj).toBeDefined();
  return expect_to_be_function(obj.then);
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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
      expect_to_be_function(fn || throw_fn_expected('fn'));
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

module.exports = jangular_http_matchers;

},{"./jangular_common":1}]},{},[2]);
