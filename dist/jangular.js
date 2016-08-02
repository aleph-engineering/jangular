(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var jangular_matchers;

jangular_matchers = angular.merge({}, require('./jangular_controller_matchers.coffee'), require('./jangular_http_matchers.coffee'), require('./jangular_state_matchers.coffee'));

window.jangular_matchers = jangular_matchers;

module.exports = jangular_matchers;

},{"./jangular_controller_matchers.coffee":3,"./jangular_http_matchers.coffee":4,"./jangular_state_matchers.coffee":5}],2:[function(require,module,exports){
'use strict';
var expect_to_be_function, is_a_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

is_a_function = function(obj) {
  return typeof obj === 'function' || obj instanceof Function;
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
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],3:[function(require,module,exports){
'use strict';
var assert_is_spy, common, expect_to_be_function, is_a_function, q, rootScope, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, to_call_service, to_call_service_with, to_callback_error_with, to_callback_success_with, to_subscribe, to_subscribe_error, to_subscribe_success, validate_arguments_count, validate_arguments_gt,
  slice = [].slice;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

is_a_function = common.is_a_function;

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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      var _spy, promise, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_success takes 3 arguments: target service to spy on, the function name and the callback');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      if (!is_a_function(callback)) {
        throw_fn_expected('callback');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      promise = {
        then: function() {}
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(promise, 'then');
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
      var _spy, promise, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_error takes 3 arguments: target service to spy on, the function name and the callback');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      if (!is_a_function(callback)) {
        throw_fn_expected('callback');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      promise = {
        then: function() {}
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(promise, 'then');
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
      var _spy, callback, callbacks, fn, fn_name, i, index, len, promise, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callbacks = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(arguments, 3, 'to_subscribe takes at least 3 arguments: target service to spy on, the function name and at least one callback');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      for (index = i = 0, len = callbacks.length; i < len; index = ++i) {
        callback = callbacks[index];
        if (!is_a_function(callback)) {
          throw_fn_expected("callbacks[" + index + "]");
        }
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      promise = {
        then: function() {}
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(promise, 'then');
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
      var _spy, args, callback_fn_name, callback_obj, fn, fn_name, promise, service, service_spy, success_callback;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_success_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      success_callback = void 0;
      promise = {
        then: function(_success_callback) {
          return success_callback = _success_callback;
        }
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      if (success_callback == null) {
        throw Error("service's " + fn_name + "(...).then(callback) was never called, or was called with null/undefined `callback` value");
      }
      if (!is_a_function(success_callback)) {
        throw_fn_expected('success_callback');
      }
      success_callback();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

to_callback_error_with = function() {
  return {
    compare: function() {
      var _spy, args, callback_fn_name, callback_obj, error_callback, fn, fn_name, promise, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_error_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      error_callback = void 0;
      promise = {
        then: function(_, _error_callback) {
          return error_callback = _error_callback;
        }
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      if (error_callback == null) {
        throw Error("service's " + fn_name + "(...).then(_, error_callback) was never called, or was called with null/undefined `error_callback` value");
      }
      if (!is_a_function(error_callback)) {
        throw_fn_expected('error_callback');
      }
      error_callback();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

module.exports = {
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

},{"./jangular_common":2}],4:[function(require,module,exports){
'use strict';
var allow_get, allow_post, assert_unwrapped_data, common, err, expect_get, expect_post, expect_to_be_function, expect_to_be_promise, fail_get, fail_post, flush, http_backend, is_a_function, ok, pass, throw_fn_expected, to_get, to_get_and_unwrap, to_post, to_post_and_unwrap, to_unwrap_get, to_unwrap_post, validate_arguments_count;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

is_a_function = common.is_a_function;

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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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

module.exports = {
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

},{"./jangular_common":2}],5:[function(require,module,exports){
'use strict';
var common, state, to_be_an_state;

common = require('./jangular_common');

state = function() {
  var _state;
  _state = void 0;
  inject(function($state) {
    return _state = $state;
  });
  return _state;
};

to_be_an_state = function() {
  return {
    compare: function(actual) {
      var pass, result;
      pass = ((actual != null ? actual.name : void 0) != null) || (state().get(actual) != null);
      result = {
        pass: pass,
        message: "Expected state `" + actual + "` to exists, but it is not defined. Ensure that you properly initialize the state using `$stateProvider.state('state_name', {...})` and don't forget to include ui.router as module dependency: `angular.module('my_module', ['ui.router'])`"
      };
      return result;
    }
  };
};

module.exports = {
  to_be_an_state: to_be_an_state
};

},{"./jangular_common":2}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, is_a_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

is_a_function = function(obj) {
  return typeof obj === 'function' || obj instanceof Function;
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
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, is_a_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

is_a_function = function(obj) {
  return typeof obj === 'function' || obj instanceof Function;
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
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],2:[function(require,module,exports){
'use strict';
var assert_is_spy, common, expect_to_be_function, is_a_function, q, rootScope, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, to_call_service, to_call_service_with, to_callback_error_with, to_callback_success_with, to_subscribe, to_subscribe_error, to_subscribe_success, validate_arguments_count, validate_arguments_gt,
  slice = [].slice;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

is_a_function = common.is_a_function;

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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      var _spy, promise, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_success takes 3 arguments: target service to spy on, the function name and the callback');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      if (!is_a_function(callback)) {
        throw_fn_expected('callback');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      promise = {
        then: function() {}
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(promise, 'then');
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
      var _spy, promise, service_spy;
      validate_arguments_count(arguments, 4, 'to_subscribe_error takes 3 arguments: target service to spy on, the function name and the callback');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      if (!is_a_function(callback)) {
        throw_fn_expected('callback');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      promise = {
        then: function() {}
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(promise, 'then');
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
      var _spy, callback, callbacks, fn, fn_name, i, index, len, promise, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callbacks = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(arguments, 3, 'to_subscribe takes at least 3 arguments: target service to spy on, the function name and at least one callback');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      for (index = i = 0, len = callbacks.length; i < len; index = ++i) {
        callback = callbacks[index];
        if (!is_a_function(callback)) {
          throw_fn_expected("callbacks[" + index + "]");
        }
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      promise = {
        then: function() {}
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(promise, 'then');
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
      var _spy, args, callback_fn_name, callback_obj, fn, fn_name, promise, service, service_spy, success_callback;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_success_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      success_callback = void 0;
      promise = {
        then: function(_success_callback) {
          return success_callback = _success_callback;
        }
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      if (success_callback == null) {
        throw Error("service's " + fn_name + "(...).then(callback) was never called, or was called with null/undefined `callback` value");
      }
      if (!is_a_function(success_callback)) {
        throw_fn_expected('success_callback');
      }
      success_callback();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

to_callback_error_with = function() {
  return {
    compare: function() {
      var _spy, args, callback_fn_name, callback_obj, error_callback, fn, fn_name, promise, service, service_spy;
      fn = arguments[0], service = arguments[1], fn_name = arguments[2], callback_obj = arguments[3], callback_fn_name = arguments[4], args = 6 <= arguments.length ? slice.call(arguments, 5) : [];
      validate_arguments_gt(arguments, 5, 'to_callback_error_with takes at least 5 arguments: target service to spy on, the function name, the callback object, the callback function name and at least one argument');
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
      service_spy = spyOn(service, fn_name);
      assert_is_spy(service_spy);
      error_callback = void 0;
      promise = {
        then: function(_, _error_callback) {
          return error_callback = _error_callback;
        }
      };
      service_spy.and.returnValue(promise);
      _spy = spyOn(callback_obj, callback_fn_name);
      assert_is_spy(_spy);
      _spy.and.stub();
      fn();
      if (error_callback == null) {
        throw Error("service's " + fn_name + "(...).then(_, error_callback) was never called, or was called with null/undefined `error_callback` value");
      }
      if (!is_a_function(error_callback)) {
        throw_fn_expected('error_callback');
      }
      error_callback();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

module.exports = {
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

},{"./jangular_common":1}]},{},[2]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, is_a_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

is_a_function = function(obj) {
  return typeof obj === 'function' || obj instanceof Function;
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
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],2:[function(require,module,exports){
'use strict';
var allow_get, allow_post, assert_unwrapped_data, common, err, expect_get, expect_post, expect_to_be_function, expect_to_be_promise, fail_get, fail_post, flush, http_backend, is_a_function, ok, pass, throw_fn_expected, to_get, to_get_and_unwrap, to_post, to_post_and_unwrap, to_unwrap_get, to_unwrap_post, validate_arguments_count;

common = require('./jangular_common');

expect_to_be_function = common.expect_to_be_function;

is_a_function = common.is_a_function;

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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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
      if (!is_a_function(fn)) {
        throw_fn_expected('fn');
      }
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

module.exports = {
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

},{"./jangular_common":1}]},{},[2]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var expect_to_be_function, is_a_function, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

expect_to_be_function = function(fn) {
  return expect(fn).toEqual(jasmine.any(Function));
};

is_a_function = function(obj) {
  return typeof obj === 'function' || obj instanceof Function;
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
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected
};

},{}],2:[function(require,module,exports){
'use strict';
var common, state, to_be_an_state;

common = require('./jangular_common');

state = function() {
  var _state;
  _state = void 0;
  inject(function($state) {
    return _state = $state;
  });
  return _state;
};

to_be_an_state = function() {
  return {
    compare: function(actual) {
      var pass, result;
      pass = ((actual != null ? actual.name : void 0) != null) || (state().get(actual) != null);
      result = {
        pass: pass,
        message: "Expected state `" + actual + "` to exists, but it is not defined. Ensure that you properly initialize the state using `$stateProvider.state('state_name', {...})` and don't forget to include ui.router as module dependency: `angular.module('my_module', ['ui.router'])`"
      };
      return result;
    }
  };
};

module.exports = {
  to_be_an_state: to_be_an_state
};

},{"./jangular_common":1}]},{},[2]);
