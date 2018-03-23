/**
 * SailsPoliciesExt
 *
 */

const _ = require("lodash");
const fs = require("fs");
const path = require("upath");
const Policy = require("./lib/policy");

//==============================================================================

class Policies {

  constructor(folder = "") {
    const middlewares = getMiddlewares(folder);

    Object.defineProperties(this, {
      folder: { value: folder },
      middlewares: { value: middlewares }
    });

    _.forEach(middlewares, (middleware) => {
      Object.defineProperty(this, middleware.name, {
        value: middleware.apply.bind(middleware)
      });
    });
  }

}

//==============================================================================

class SailsPoliciesExt {

  static get Policies() {
    return Policies;
  }

  //----------------------------------------------------------------------------

  static load(folder = "api/policies") {
    return new this.Policies(folder);
  }

}

//==============================================================================
//-- helper

function getMiddlewares(folder) {
  const policies = [];

  if (!_.isString(folder) || _.isEmpty(folder)) {
    return policies;
  }

  const dir = path.resolve(folder);
  try {
    if (!fs.statSync(dir).isDirectory()) {
      return policies;
    }
  } catch (e) {
    return policies;
  }

  const files = fs.readdirSync(dir);
  _.forEach(files, (fname) => {
    const fpath = path.join(dir, fname);
    if (/^[^.].*\.js$/.test(fname) && fs.statSync(fpath).isFile()) {
      policies.push(new Policy(fpath));
    }
  });

  return policies;
}

//==============================================================================
//-- export

module.exports = SailsPoliciesExt;

//==============================================================================
