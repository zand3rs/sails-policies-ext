/**
 * PolicyExt
 *
 */

const _ = require("lodash");
const fs = require("fs");
const path = require("upath");
const Policy = require("./lib/policy");

//==============================================================================

class PolicyExt {

  constructor() {
    _.forEach(PolicyExt.policies, (policy) => {
      Object.defineProperty(this, policy.name, {
        value: policy.apply.bind(policy) 
      });
    });
  }

  //----------------------------------------------------------------------------

  static get defaultFolder() {
    return "api/policies";
  }

  //----------------------------------------------------------------------------

  static get policies() {
    return this._getPolicies();
  }

  //----------------------------------------------------------------------------

  static _getPolicies() {
    if (!this._policies) {
      const dir = path.resolve(this.defaultFolder);
      const files = fs.readdirSync(dir);
      const policies = [];

      _.forEach(files, (fname) => {
        const fpath = path.join(dir, fname);
        if (/^[^.].*\.js$/.test(fname) && fs.statSync(fpath).isFile()) {
          policies.push(new Policy(fpath));
        }
      });
      this._policies = policies;
    }

    return this._policies;
  }

}

//==============================================================================
//-- export

module.exports = new PolicyExt();

//==============================================================================
