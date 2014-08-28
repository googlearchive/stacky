'use strict';

var _     = require('lodash');
var chalk = require('chalk');

var parse = require('./parsing').parse;

var DEFAULT_OPTIONS = {
  // Methods are aligned up to this much padding.
  maxMethodPadding: 40,
  // A string to prefix each line with.
  indent: '',
  // A list of Strings/RegExps that will be stripped from `location` values on
  // each line (via `String#replace`).
  locationStrip: [],
  // A list of Strings/RegExps that indicate that a line is *not* important, and
  // should be styled as such.
  unimportantLocation: [],
  // styles are functions that take a string and return that string when styled.
  styles: {
    method:      chalk.magenta,
    location:    chalk.blue,
    line:        chalk.cyan,
    column:      chalk.cyan,
    unimportant: chalk.dim,
  },
};

function pretty(stackOrParsed, options) {
  options = _.defaults(options || {}, DEFAULT_OPTIONS);
  var lines = _.isArray(stackOrParsed) ? stackOrParsed : parse(stackOrParsed);
  clean(lines, options);

  var padSize = methodPadding(lines, options);
  var parts = lines.map(function(line) {
    var pad      = options.indent + padding(padSize - line.method.length);
    var location = [
      options.styles.location(line.location),
      options.styles.line(line.line),
      options.styles.column(line.column),
    ].join(':');

    var text = pad + options.styles.method(line.method) + ' at ' + location;
    if (!line.important) {
      text = options.styles.unimportant(text);
    }
    return text;
  });

  return parts.join('\n');
}

function clean(lines, options) {
  for (var i = 0, line; line = lines[i]; i++) {
    line.location  = cleanLocation(line.location, options);
    line.important = isImportant(line, options);
  }

  return lines;
}

// Utility

function methodPadding(lines, options) {
  var size = 0;
  for (var i = 0, line; line = lines[i]; i++) {
    size = Math.min(options.maxMethodPadding, Math.max(size, line.method.length));
  }
  return size;
}

function padding(length) {
  var result = '';
  for (var i = 0; i < length; i++) {
    result = result + ' ';
  }
  return result;
}

function cleanLocation(location, options) {
  if (options.locationStrip) {
    for (var i = 0, matcher; matcher = options.locationStrip[i]; i++) {
      location = location.replace(matcher, '');
    }
  }

  return location;
}

function isImportant(line, options) {
  if (options.unimportantLocation) {
    for (var i = 0, matcher; matcher = options.unimportantLocation[i]; i++) {
      if (line.location.match(matcher)) return false;
    }
  }

  return true;
}

module.exports = {
  clean:  clean,
  pretty: pretty,
};
