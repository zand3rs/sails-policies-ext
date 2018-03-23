require("node-test-helper");

var path = require("upath");
var Self = require(path.join(process.cwd(), "lib", "policy"));

describe(TEST_NAME, function() {

  describe("constructor", function() {
    it("throws an error if file path is not provided", function() {
      expect(() => new Self()).to.throw(TypeError, /Path must be a strin/);
    });

    it("throws an error if file path is empty string", function() {
      expect(() => new Self("")).to.throw(Error, /missing path/);
    });

    it("throws an error if file cannot be loaded", function() {
      const fpath = path.join(TEST_FIXTURES_PATH, "policies", "dummy.js");
      expect(() => new Self(fpath)).to.throw(Error, /Cannot find module/);
    });

    it("loads the given file path", function() {
      const fpath = path.join(TEST_FIXTURES_PATH, "policies", "allow.js");
      expect(new Self(fpath)).to.be.an("object");
    });
  });

  describe("instance members", function() {
    const fpath = path.join(TEST_FIXTURES_PATH, "policies", "allow.js");
    const policy = new Self(fpath);

    it("#name should exist", function() {
      expect(policy).to.have.property("name", "allow");
    });

    it("#module should exist", function() {
      expect(policy).to.have.property("module").that.is.a("function").with.length(1);
    });

    it("#apply() should exist", function() {
      expect(policy).to.respondTo("apply");
    });
  });

});
