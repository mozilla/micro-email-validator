/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Function to validate an email address.
// This is a transliteration of the HTML5 email-validation logic
// inside Firefox.  It splits the username and domain portions,
// translates tham into IDN punycode syntax, then does some very
// basic sanity-checking.

var punycode = require('punycode');

module.exports = function(value) {
  // It cant be empty or end with strange chars.
  if (!value) {
    return false
  }
  if (value[value.length - 1] === '.' || value[value.length - 1] === '-') {
    return false
  }
  // It must contain an '@' somewhere in the middle.
  var atPos = value.indexOf('@')
  if (atPos === -1 || atPos === 0 || atPos === value.length) {
    return false
  }
  var username = value.substring(0, atPos)
  var domain = value.substring(atPos + 1)
  // Unicode is hard, let's work with ascii only.
  username = punycode.toASCII(username)
  domain = punycode.toASCII(domain)
  // The username portion must contain only allowed characters.
  for (var i = 0; i < username.length; i++) {
    if (!username[i].match(/[a-zA-Z0-9.!#$%&'*+-\/=?^_`{|}~]/)) {
      return false
    }
  }
  // The domain portion can't begin with a dot or a dash.
  if (domain[0] === '.' || domain[0] === '-') {
    return false
  }
  // The domain portion must be a valid punycode domain.
  for (i = 0; i < domain.length; i++) {
    if (domain[i] === '.') {
      // A dot can't follow a dot or a dash.
      if (domain[i - 1] === '.' || domain[i - 1] === '-') {
        return false
      }
    }
    else if (domain[i] === '-') {
      // A dash can't follow a dot.
      if (domain[i - 1] === '.') {
        return false
      }
    } else if (!domain[i].match(/[a-zA-Z0-9-]/)) {
      // The domain characters must be alphanumeric.
      return false
    }
  }
  return true
};
