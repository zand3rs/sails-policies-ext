/**
 * Policy
 *
 */

const _ = require("lodash");
const path = require("upath");

//==============================================================================

class Policy {

  constructor(fpath) {
    const name = path.trimExt(path.basename(fpath));
    const module = require(fpath);

    Object.defineProperties(this, {
      name: { value: name },
      module: { value: module }
    });
  }

  //----------------------------------------------------------------------------

  apply(options) {
    if (_.isFunction(this.module) && this.module.length === 1) {
      return this.module(options);
    } else {
      return this.module;
    }
  }

}

//==============================================================================
//-- export

module.exports = Policy;

//==============================================================================
