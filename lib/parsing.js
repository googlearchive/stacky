// Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
//
// This code may only be used under the BSD style license found at polymer.github.io/LICENSE.txt
// The complete set of authors may be found at polymer.github.io/AUTHORS.txt
// The complete set of contributors may be found at polymer.github.io/CONTRIBUTORS.txt
// Code distributed by Google as part of the polymer project is also subject to
// an additional IP rights grant found at polymer.github.io/PATENTS.txt
'use strict';

var _    = require('lodash');
var util = require('util');

function parse(stack) {
  var rawLines = stack.split('\n');

  var v8Lines = _.compact(rawLines.map(parseV8Line));
  if (v8Lines.length > 0) return v8Lines;

  var geckoLines = _.compact(rawLines.map(parseGeckoLine));
  if (geckoLines.length > 0) return geckoLines;

  throw new Error('Unknown stack format: ' + util.inspect(stack));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
var GECKO_LINE = /^(?:([^@]*)@)?(.*?):(\d+)(?::(\d+))?$/;

function parseGeckoLine(line) {
  var match = line.match(GECKO_LINE);
  if (!match) return null;
  return {
    method:   match[1] || '',
    location: match[2] || '',
    line:     parseInt(match[3]) || 0,
    column:   parseInt(match[4]) || 0,
  };
}

// https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
var V8_OUTER = /^\s*(eval )?at (.*) \((.*)\)$/;
var V8_INNER = /^\(?([^\(]+):(\d+):(\d+)\)?$/;

function parseV8Line(line) {
  var outer = line.match(V8_OUTER);
  if (!outer) return null;
  var inner = outer[3].match(V8_INNER);
  if (!inner) return null;

  var method = outer[2] || '';
  if (outer[1]) method = 'eval at ' + method;
  return {
    method:   method,
    location: inner[1] || '',
    line:     parseInt(inner[2]) || 0,
    column:   parseInt(inner[3]) || 0,
  };
}

module.exports = {
  parse:          parse,
  parseGeckoLine: parseGeckoLine,
  parseV8Line:    parseV8Line,
};
