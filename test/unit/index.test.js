require("node-test-helper");

var path = require("upath");
var Self = require(process.cwd());

describe(TEST_NAME, function() {

  describe("static members", function() {
    it(".Policies() should exist", function() {
      expect(Self).itself.to.respondTo("Policies");
    });

    it(".load() should exist", function() {
      expect(Self).itself.to.respondTo("load");
    });
  });

  describe(".load()", function() {
    it("should return instance of Policies", function() {
      expect(Self.load()).to.be.instanceof(Self.Policies);
    });

    it("should load policies from default folder", function() {
      const policies = Self.load();

      expect(policies).to.have.property("folder").that.equals("api/policies");
      expect(policies).to.have.property("middlewares").with.length(0);
    });

    it("should load policies from the given folder", function() {
      const folder = path.join(TEST_FIXTURES_PATH, "policies");
      const policies = Self.load(folder);

      expect(policies).to.be.instanceof(Self.Policies);
      expect(policies).to.have.property("folder").that.equals(folder);
      expect(policies).to.have.property("middlewares").with.length(2);
    });

    it("returns an object with methods for the loaded policies", function() {
      const folder = path.join(TEST_FIXTURES_PATH, "policies");
      const policies = Self.load(folder);

      expect(policies).to.be.instanceof(Self.Policies);
      expect(policies).to.respondTo("allow");
      expect(policies).to.respondTo("isLoggedIn");
    });
  });

});
