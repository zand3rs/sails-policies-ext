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
      return (req, res, next) => {
        this.module(options)(req, res, next);
      }
    } else {
      return this.module;
    }
  }

}

//==============================================================================
//-- export

module.exports = Policy;

//==============================================================================
