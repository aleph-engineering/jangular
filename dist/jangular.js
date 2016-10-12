(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var jangular_matchers;

jangular_matchers = angular.merge({}, require('./jangular_controller_matchers.coffee'), require('./jangular_http_matchers.coffee'), require('./jangular_state_matchers.coffee'));

window.jangular_matchers = jangular_matchers;

module.exports = jangular_matchers;

},{"./jangular_controller_matchers.coffee":3,"./jangular_http_matchers.coffee":4,"./jangular_state_matchers.coffee":5}],2:[function(require,module,exports){
'use strict';
var assert_is_spy, expect_to_be_function, is_a_function, q, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

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

spy_have_been_called = function(_spy) {
  var obj1, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj1 = {},
      obj1["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj1
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

module.exports = {
  expect_to_be_function: expect_to_be_function,
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected,
  assert_is_spy: assert_is_spy,
  q: q,
  spy_have_been_called: spy_have_been_called,
  spy_have_been_called_with: spy_have_been_called_with
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

assert_is_spy = common.assert_is_spy;

q = common.q;

spy_have_been_called = common.spy_have_been_called;

spy_have_been_called_with = common.spy_have_been_called_with;

rootScope = function() {
  var _rootScope;
  _rootScope = void 0;
  inject(function($rootScope) {
    return _rootScope = $rootScope;
  });
  return _rootScope;
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
var assert_is_spy, common, get_state, injector, is_an_state, is_not_an_state, is_state_result, q, spy_have_been_called, spy_have_been_called_with, state, to_be_abstract, to_be_an_state, to_have_controller, to_have_controller_alias, to_have_template, to_have_template_url, to_have_url, to_resolve_by_calling_service, to_resolve_by_calling_service_with, validate_arguments_count, validate_arguments_gt,
  slice = [].slice;

common = require('./jangular_common');

validate_arguments_count = common.validate_arguments_count;

validate_arguments_gt = common.validate_arguments_gt;

assert_is_spy = common.assert_is_spy;

q = common.q;

spy_have_been_called = common.spy_have_been_called;

spy_have_been_called_with = common.spy_have_been_called_with;

state = function() {
  var _state;
  _state = void 0;
  inject(function($state) {
    return _state = $state;
  });
  return _state;
};

is_not_an_state = function(actual) {
  return actual == null;
};

is_an_state = function(actual) {
  return ((actual != null ? actual.name : void 0) != null) || (state().get(actual) != null);
};

get_state = function(actual) {
  var error, st;
  if ((actual != null ? actual.name : void 0) != null) {
    return actual;
  }
  try {
    st = state().get(actual);
    if (st != null) {
      return st;
    }
    if (actual != null) {
      return actual;
    }
    return {};
  } catch (error) {
    if (actual != null) {
      return actual;
    }
    return {};
  }
};

is_state_result = function(pass, actual) {
  return {
    pass: pass,
    message: "Expected state/view `" + actual + "` to exists, but it is not defined. Ensure that you properly initialize the state using `$stateProvider.state('state_name', {...})` and don't forget to include ui.router as module dependency: `angular.module('my_module', ['ui.router'])`"
  };
};

injector = function() {
  var _injector;
  _injector = void 0;
  inject(function($injector) {
    return _injector = $injector;
  });
  return _injector;
};

to_be_an_state = function() {
  return {
    compare: function(actual) {
      validate_arguments_count(arguments, 1, 'to_be_an_state does not take arguments');
      return is_state_result(is_an_state(actual), actual);
    }
  };
};

to_be_abstract = function() {
  return {
    compare: function(actual) {
      var pass, st;
      validate_arguments_count(arguments, 1, 'to_be_abstract does not take arguments');
      pass = is_an_state(actual);
      if (!pass) {
        return is_state_result(pass, actual);
      }
      st = get_state(actual);
      return {
        pass: st.abstract != null,
        message: "Expected state `" + st.name + "` seems to NOT be abstract. Ensure that you properly initialize the state with `abstract` flag using `$stateProvider.state('state_name', {abstract: true})`"
      };
    }
  };
};

to_have_url = function() {
  return {
    compare: function(actual, expected_url) {
      var pass, st;
      validate_arguments_count(arguments, 2, 'to_have_url takes only expected_url argument');
      if (expected_url == null) {
        throw new Error("the expected url: " + expected_url + " seems to null or undefined");
      }
      pass = is_an_state(actual);
      if (!pass) {
        return is_state_result(pass, actual);
      }
      st = get_state(actual);
      return {
        pass: (st != null ? st.url : void 0) === expected_url,
        message: "Expected state `" + st.name + "` seems to NOT have the url '" + expected_url + "'. Ensure that you properly initialize the state with `url` property `$stateProvider.state('state_name', {url: '" + expected_url + "'})`"
      };
    }
  };
};

to_have_controller = function() {
  return {
    compare: function(actual, expected_controller) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_controller takes only expected_controller argument');
      if (expected_controller == null) {
        throw new Error("the expected_controller: " + expected_controller + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.controller : void 0) === expected_controller,
        message: "Expected state `" + display_name + "` seems to NOT have the controller '" + expected_controller + "'. Ensure that you properly initialize the state with `controller` property `$stateProvider.state('state_name', {controller: '" + expected_controller + "'})`"
      };
    }
  };
};

to_have_controller_alias = function() {
  return {
    compare: function(actual, expected_controller_alias) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_controller_alias takes only expected_controller_alias argument');
      if (expected_controller_alias == null) {
        throw new Error("the expected_controller_alias: " + expected_controller_alias + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.controllerAs : void 0) === expected_controller_alias,
        message: "Expected state `" + display_name + "` seems to NOT have the controller alias '" + expected_controller_alias + "'. Ensure that you properly initialize the state with `controllerAs` property `$stateProvider.state('state_name', {controllerAs: '" + expected_controller_alias + "'})`"
      };
    }
  };
};

to_have_template = function() {
  return {
    compare: function(actual, expected_template) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_template takes only expected_template argument');
      if (expected_template == null) {
        throw new Error("the expected_template: " + expected_template + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.template : void 0) === expected_template,
        message: "Expected state `" + display_name + "` seems to NOT have the template '" + expected_template + "'. Ensure that you properly initialize the state with `template` property `$stateProvider.state('state_name', {template: '" + expected_template + "'})`"
      };
    }
  };
};

to_have_template_url = function() {
  return {
    compare: function(actual, expected_template_url) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_template_url takes only expected_template_url argument');
      if (expected_template_url == null) {
        throw new Error("the expected_template_url: " + expected_template_url + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.templateUrl : void 0) === expected_template_url,
        message: "Expected state/view `" + display_name + "` seems to NOT have the template URL '" + expected_template_url + "'. Ensure that you properly initialize the state with `template` property `$stateProvider.state('state_name', {templateUrl: '" + expected_template_url + "'})` or alternatively you defined a view"
      };
    }
  };
};

to_resolve_by_calling_service = function() {
  return {
    compare: function(promise, service, fn_name) {
      var _spy, actual, deferred, expected;
      validate_arguments_count(arguments, 3, 'to_resolve_by_calling_service takes only 2 arguments: target service and the function name to spy on');
      if (promise == null) {
        throw new Error('Actual promise seems to be null or undefined, please define the promise using the syntax `resolve: { my_promise: [..., my_promise_resolution_fn] }`');
      }
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      expected = deferred.promise;
      _spy.and.returnValue(expected);
      actual = injector().invoke(promise);
      expect(actual).toBe(expected);
      deferred.resolve();
      return spy_have_been_called(_spy);
    }
  };
};

to_resolve_by_calling_service_with = function() {
  return {
    compare: function() {
      var _spy, actual, args, deferred, expected, fn_name, promise, service;
      promise = arguments[0], service = arguments[1], fn_name = arguments[2], args = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(args, 0, 'to_resolve_by_calling_service_with takes 3 or more arguments: target service, the function name to spy on and the expected arguments');
      if (promise == null) {
        throw new Error('Actual promise seems to be null or undefined, please define the promise using the syntax `resolve: { my_promise: [..., my_promise_resolution_fn] }`');
      }
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      expected = deferred.promise;
      _spy.and.returnValue(expected);
      actual = injector().invoke(promise);
      expect(actual).toBe(expected);
      deferred.resolve();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

module.exports = {
  to_be_an_state: to_be_an_state,
  toBeAnState: to_be_an_state,
  to_be_abstract: to_be_abstract,
  toBeAbstract: to_be_abstract,
  to_have_url: to_have_url,
  toHaveUrl: to_have_url,
  to_have_controller: to_have_controller,
  toHaveController: to_have_controller,
  to_have_controller_alias: to_have_controller_alias,
  toHaveControllerAlias: to_have_controller_alias,
  to_have_controller_as: to_have_controller_alias,
  toHaveControllerAs: to_have_controller_alias,
  to_have_template: to_have_template,
  toHaveTemplate: to_have_template,
  to_have_template_url: to_have_template_url,
  toHaveTemplateUrl: to_have_template_url,
  to_resolve_by_calling_service: to_resolve_by_calling_service,
  toResolveByCallingService: to_resolve_by_calling_service,
  to_resolve_by_calling_service_with: to_resolve_by_calling_service_with,
  toResolveByCallingServiceWith: to_resolve_by_calling_service_with
};

},{"./jangular_common":2}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var assert_is_spy, expect_to_be_function, is_a_function, q, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

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

spy_have_been_called = function(_spy) {
  var obj1, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj1 = {},
      obj1["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj1
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

module.exports = {
  expect_to_be_function: expect_to_be_function,
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected,
  assert_is_spy: assert_is_spy,
  q: q,
  spy_have_been_called: spy_have_been_called,
  spy_have_been_called_with: spy_have_been_called_with
};

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var assert_is_spy, expect_to_be_function, is_a_function, q, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

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

spy_have_been_called = function(_spy) {
  var obj1, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj1 = {},
      obj1["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj1
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

module.exports = {
  expect_to_be_function: expect_to_be_function,
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected,
  assert_is_spy: assert_is_spy,
  q: q,
  spy_have_been_called: spy_have_been_called,
  spy_have_been_called_with: spy_have_been_called_with
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

assert_is_spy = common.assert_is_spy;

q = common.q;

spy_have_been_called = common.spy_have_been_called;

spy_have_been_called_with = common.spy_have_been_called_with;

rootScope = function() {
  var _rootScope;
  _rootScope = void 0;
  inject(function($rootScope) {
    return _rootScope = $rootScope;
  });
  return _rootScope;
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
var assert_is_spy, expect_to_be_function, is_a_function, q, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

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

spy_have_been_called = function(_spy) {
  var obj1, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj1 = {},
      obj1["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj1
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

module.exports = {
  expect_to_be_function: expect_to_be_function,
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected,
  assert_is_spy: assert_is_spy,
  q: q,
  spy_have_been_called: spy_have_been_called,
  spy_have_been_called_with: spy_have_been_called_with
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
var assert_is_spy, expect_to_be_function, is_a_function, q, spy_have_been_called, spy_have_been_called_with, throw_fn_expected, validate_arguments_count, validate_arguments_gt;

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

spy_have_been_called = function(_spy) {
  var obj1, pass, result;
  pass = _spy.calls.any();
  return result = {
    pass: pass,
    message: pass != null ? pass : (
      obj1 = {},
      obj1["Expected spy " + (_spy.and.identity()) + " not to have been called."] = "Expected spy " + (_spy.and.identity()) + "  to have been called.'",
      obj1
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

module.exports = {
  expect_to_be_function: expect_to_be_function,
  is_a_function: is_a_function,
  validate_arguments_count: validate_arguments_count,
  validate_arguments_gt: validate_arguments_gt,
  throw_fn_expected: throw_fn_expected,
  assert_is_spy: assert_is_spy,
  q: q,
  spy_have_been_called: spy_have_been_called,
  spy_have_been_called_with: spy_have_been_called_with
};

},{}],2:[function(require,module,exports){
'use strict';
var assert_is_spy, common, get_state, injector, is_an_state, is_not_an_state, is_state_result, q, spy_have_been_called, spy_have_been_called_with, state, to_be_abstract, to_be_an_state, to_have_controller, to_have_controller_alias, to_have_template, to_have_template_url, to_have_url, to_resolve_by_calling_service, to_resolve_by_calling_service_with, validate_arguments_count, validate_arguments_gt,
  slice = [].slice;

common = require('./jangular_common');

validate_arguments_count = common.validate_arguments_count;

validate_arguments_gt = common.validate_arguments_gt;

assert_is_spy = common.assert_is_spy;

q = common.q;

spy_have_been_called = common.spy_have_been_called;

spy_have_been_called_with = common.spy_have_been_called_with;

state = function() {
  var _state;
  _state = void 0;
  inject(function($state) {
    return _state = $state;
  });
  return _state;
};

is_not_an_state = function(actual) {
  return actual == null;
};

is_an_state = function(actual) {
  return ((actual != null ? actual.name : void 0) != null) || (state().get(actual) != null);
};

get_state = function(actual) {
  var error, st;
  if ((actual != null ? actual.name : void 0) != null) {
    return actual;
  }
  try {
    st = state().get(actual);
    if (st != null) {
      return st;
    }
    if (actual != null) {
      return actual;
    }
    return {};
  } catch (error) {
    if (actual != null) {
      return actual;
    }
    return {};
  }
};

is_state_result = function(pass, actual) {
  return {
    pass: pass,
    message: "Expected state/view `" + actual + "` to exists, but it is not defined. Ensure that you properly initialize the state using `$stateProvider.state('state_name', {...})` and don't forget to include ui.router as module dependency: `angular.module('my_module', ['ui.router'])`"
  };
};

injector = function() {
  var _injector;
  _injector = void 0;
  inject(function($injector) {
    return _injector = $injector;
  });
  return _injector;
};

to_be_an_state = function() {
  return {
    compare: function(actual) {
      validate_arguments_count(arguments, 1, 'to_be_an_state does not take arguments');
      return is_state_result(is_an_state(actual), actual);
    }
  };
};

to_be_abstract = function() {
  return {
    compare: function(actual) {
      var pass, st;
      validate_arguments_count(arguments, 1, 'to_be_abstract does not take arguments');
      pass = is_an_state(actual);
      if (!pass) {
        return is_state_result(pass, actual);
      }
      st = get_state(actual);
      return {
        pass: st.abstract != null,
        message: "Expected state `" + st.name + "` seems to NOT be abstract. Ensure that you properly initialize the state with `abstract` flag using `$stateProvider.state('state_name', {abstract: true})`"
      };
    }
  };
};

to_have_url = function() {
  return {
    compare: function(actual, expected_url) {
      var pass, st;
      validate_arguments_count(arguments, 2, 'to_have_url takes only expected_url argument');
      if (expected_url == null) {
        throw new Error("the expected url: " + expected_url + " seems to null or undefined");
      }
      pass = is_an_state(actual);
      if (!pass) {
        return is_state_result(pass, actual);
      }
      st = get_state(actual);
      return {
        pass: (st != null ? st.url : void 0) === expected_url,
        message: "Expected state `" + st.name + "` seems to NOT have the url '" + expected_url + "'. Ensure that you properly initialize the state with `url` property `$stateProvider.state('state_name', {url: '" + expected_url + "'})`"
      };
    }
  };
};

to_have_controller = function() {
  return {
    compare: function(actual, expected_controller) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_controller takes only expected_controller argument');
      if (expected_controller == null) {
        throw new Error("the expected_controller: " + expected_controller + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.controller : void 0) === expected_controller,
        message: "Expected state `" + display_name + "` seems to NOT have the controller '" + expected_controller + "'. Ensure that you properly initialize the state with `controller` property `$stateProvider.state('state_name', {controller: '" + expected_controller + "'})`"
      };
    }
  };
};

to_have_controller_alias = function() {
  return {
    compare: function(actual, expected_controller_alias) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_controller_alias takes only expected_controller_alias argument');
      if (expected_controller_alias == null) {
        throw new Error("the expected_controller_alias: " + expected_controller_alias + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.controllerAs : void 0) === expected_controller_alias,
        message: "Expected state `" + display_name + "` seems to NOT have the controller alias '" + expected_controller_alias + "'. Ensure that you properly initialize the state with `controllerAs` property `$stateProvider.state('state_name', {controllerAs: '" + expected_controller_alias + "'})`"
      };
    }
  };
};

to_have_template = function() {
  return {
    compare: function(actual, expected_template) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_template takes only expected_template argument');
      if (expected_template == null) {
        throw new Error("the expected_template: " + expected_template + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.template : void 0) === expected_template,
        message: "Expected state `" + display_name + "` seems to NOT have the template '" + expected_template + "'. Ensure that you properly initialize the state with `template` property `$stateProvider.state('state_name', {template: '" + expected_template + "'})`"
      };
    }
  };
};

to_have_template_url = function() {
  return {
    compare: function(actual, expected_template_url) {
      var display_name, st;
      validate_arguments_count(arguments, 2, 'to_have_template_url takes only expected_template_url argument');
      if (expected_template_url == null) {
        throw new Error("the expected_template_url: " + expected_template_url + " seems to null or undefined");
      }
      if (is_not_an_state(actual)) {
        return is_state_result(false, actual);
      }
      st = get_state(actual);
      display_name = (st != null ? st.name : void 0) != null ? st.name : JSON.stringify(st);
      return {
        pass: (st != null ? st.templateUrl : void 0) === expected_template_url,
        message: "Expected state/view `" + display_name + "` seems to NOT have the template URL '" + expected_template_url + "'. Ensure that you properly initialize the state with `template` property `$stateProvider.state('state_name', {templateUrl: '" + expected_template_url + "'})` or alternatively you defined a view"
      };
    }
  };
};

to_resolve_by_calling_service = function() {
  return {
    compare: function(promise, service, fn_name) {
      var _spy, actual, deferred, expected;
      validate_arguments_count(arguments, 3, 'to_resolve_by_calling_service takes only 2 arguments: target service and the function name to spy on');
      if (promise == null) {
        throw new Error('Actual promise seems to be null or undefined, please define the promise using the syntax `resolve: { my_promise: [..., my_promise_resolution_fn] }`');
      }
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      expected = deferred.promise;
      _spy.and.returnValue(expected);
      actual = injector().invoke(promise);
      expect(actual).toBe(expected);
      deferred.resolve();
      return spy_have_been_called(_spy);
    }
  };
};

to_resolve_by_calling_service_with = function() {
  return {
    compare: function() {
      var _spy, actual, args, deferred, expected, fn_name, promise, service;
      promise = arguments[0], service = arguments[1], fn_name = arguments[2], args = 4 <= arguments.length ? slice.call(arguments, 3) : [];
      validate_arguments_gt(args, 0, 'to_resolve_by_calling_service_with takes 3 or more arguments: target service, the function name to spy on and the expected arguments');
      if (promise == null) {
        throw new Error('Actual promise seems to be null or undefined, please define the promise using the syntax `resolve: { my_promise: [..., my_promise_resolution_fn] }`');
      }
      _spy = spyOn(service, fn_name);
      assert_is_spy(_spy);
      deferred = q().defer();
      expected = deferred.promise;
      _spy.and.returnValue(expected);
      actual = injector().invoke(promise);
      expect(actual).toBe(expected);
      deferred.resolve();
      return spy_have_been_called_with(_spy, args);
    }
  };
};

module.exports = {
  to_be_an_state: to_be_an_state,
  toBeAnState: to_be_an_state,
  to_be_abstract: to_be_abstract,
  toBeAbstract: to_be_abstract,
  to_have_url: to_have_url,
  toHaveUrl: to_have_url,
  to_have_controller: to_have_controller,
  toHaveController: to_have_controller,
  to_have_controller_alias: to_have_controller_alias,
  toHaveControllerAlias: to_have_controller_alias,
  to_have_controller_as: to_have_controller_alias,
  toHaveControllerAs: to_have_controller_alias,
  to_have_template: to_have_template,
  toHaveTemplate: to_have_template,
  to_have_template_url: to_have_template_url,
  toHaveTemplateUrl: to_have_template_url,
  to_resolve_by_calling_service: to_resolve_by_calling_service,
  toResolveByCallingService: to_resolve_by_calling_service,
  to_resolve_by_calling_service_with: to_resolve_by_calling_service_with,
  toResolveByCallingServiceWith: to_resolve_by_calling_service_with
};

},{"./jangular_common":1}]},{},[2]);
