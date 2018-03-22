# sails-policies-ext

This is a simple `Sails.js` policy extension that enables a policy middleware to accept an optional parameter.

## Installation

```sh
$ npm install sails-policies-ext
```

## Usage

Just require the module in `config/policies.js`. You can mix it up with the default policy definition.

```javascript
//-- config/policies.js

var policies = require("sails-policies-ext");

module.exports.policies = {

  ProfileController: {
    "*": "isLoggedIn",
    "update": ["isLoggedIn", policies.allow({ role: "admin", permission: [ "owner", "master" ] })],
    "delete": [policies.isLoggedIn(), policies.allow({ role: "admin", permission: [ "owner" ] })]
  }

};
```

Create a middleware in `api/policies` folder in the following format.

```javascript
//-- api/policies/allow.js

module.exports = function(options) {

  return function(req, res, next) {
    console.log("allow options:", options);
    next();
  };

};
```

Default format still works as expected.

```javascript
//-- api/policies/isLoggedIn.js

module.exports = function(req, res, next) {

  console.log("Typical middleware");
  next();

};
```
