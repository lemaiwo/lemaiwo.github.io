"use strict";

sap.ui.define(["sap/ui/core/Fragment", "./Base.controller"], function (Fragment, __BaseController) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  var BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace be.wl.lemtech.wouter.controller
   */
  var Dialog = BaseController.extend("be.wl.lemtech.wouter.controller.Dialog", {
    fragmentById: function _fragmentById(viewController, fragment, id) {
      return sap.ui.getCore().byId(viewController.createId(Fragment.createId(fragment, id)));
    }
  });
  return Dialog;
});
//# sourceMappingURL=Dialog-dbg.controller.js.map
