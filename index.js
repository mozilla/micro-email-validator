/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Function to validate an email address.
// This is a transliteration of the HTML5 email-validation logic
// inside Firefox.

function checkValidEmail (value) {
  // It must be non-empty.
  // It must contain an '@' somewhere in the middle.
  // The username portion must contain only allowed characters.
  // THe domain portion can contain only allowed characters.
  var validEmailRegex = /\b([\w.%+-]+)@([\w-]+)(?:\.(\w{2,4})){1,3}\b/
  return validEmailRegex.test(value)
}

module.exports = checkValidEmail
