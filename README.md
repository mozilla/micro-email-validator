# micro-email-validator
Transliteration of html5 email validator in Firefox

## What is it?

From teh codez:

```js
// Function to validate an email address.
// This is a transliteration of the HTML5 email-validation logic
// inside Firefox.  It splits the username and domain portions,
// translates them into IDN punycode syntax, then does some very
// basic sanity-checking.
```

## How to use it?

```js
var validate = require('micro-email-validator');

validate('user@example.com'); // returns true

validate('foo@foo@foo'); // returns false

validate('例子@example.com'); // returns true, yay
```

Please note, however, that these rules are more liberal than you might think:

```js
validate('wow_such@unsatisfy'); // returns true

validate('wat@'); // returns true
```

Have fun!

## License

MPL 2.0

## Brought to you by

The [fine minds](https://github.com/mozilla/fxa-auth-server/graphs/contributors)
behind Firefox Accounts, and [your humble narrator](https://github.com/6a68).
