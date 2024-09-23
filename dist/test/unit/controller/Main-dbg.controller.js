"use strict";

sap.ui.define(["be/wl/lemtech/controller/Home.controller"], function (__Controller) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  /*global QUnit*/
  var Controller = _interopRequireDefault(__Controller);
  QUnit.module("Main Controller");
  QUnit.test("I should test the Main controller", function (assert) {
    var oAppController = new Controller("Main");
    oAppController.onInit();
    assert.ok(oAppController);
  });
});
//# sourceMappingURL=Main-dbg.controller.js.map
