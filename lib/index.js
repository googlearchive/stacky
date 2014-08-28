'use strict';

var formatting = require('./formatting');
var parsing    = require('./parsing');

module.exports = {
  // Shorthands for your convenience.
  parse:  parsing.parse,
  pretty: formatting.pretty,
  // Or the full modules.
  parsing:    parsing,
  formatting: formatting,
};
