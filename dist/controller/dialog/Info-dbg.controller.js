"use strict";

sap.ui.define(["../Dialog.controller", "sap/ui/model/json/JSONModel", "sap/ui/VersionInfo"], function (__DialogController, JSONModel, VersionInfo) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  var DialogController = _interopRequireDefault(__DialogController);
  /**
   * @namespace be.wl.lemtech.wouter.controller.dialog
   */
  var Info = DialogController.extend("be.wl.lemtech.wouter.controller.dialog.Info", {
    onBeforeShow: function _onBeforeShow(viewController, dialog, resolve, data) {
      try {
        var _this = this;
        _this.dialog = dialog;
        _this.viewController = viewController;
        _this.data = data;
        _this.resolve = resolve;
        return Promise.resolve(VersionInfo === null || VersionInfo === void 0 ? void 0 : VersionInfo.load()).then(function (version) {
          _this.dialog.fragment.setModel(new JSONModel({
            uiversion: version.version
          }), "info");
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onClose: function _onClose(event) {
      this.dialog.fragment.close(); //eslint-disable-line
      this.resolve(true);
    }
  });
  return Info;
});
//# sourceMappingURL=Info-dbg.controller.js.map
