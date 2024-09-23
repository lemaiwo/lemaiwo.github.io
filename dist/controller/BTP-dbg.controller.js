"use strict";

sap.ui.define(["./Base.controller"], function (__Controller) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  var Controller = _interopRequireDefault(__Controller);
  /**
   * @namespace be.wl.lemtech.wouter.controller
   */
  var BTP = Controller.extend("be.wl.lemtech.wouter.controller.BTP", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      var _this$getRouter$getRo;
      (_this$getRouter$getRo = this.getRouter().getRoute("btp")) === null || _this$getRouter$getRo === void 0 || _this$getRouter$getRo.attachPatternMatched(this.onBTPMatched, this);
    },
    getRouter: function _getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    onBTPMatched: function _onBTPMatched() {
      var _this$getView;
      var appModel = (_this$getView = this.getView()) === null || _this$getView === void 0 ? void 0 : _this$getView.getModel("app");
      appModel.setProperty("/selectedTab", "btp");
      gtag('event', "page_view", {
        page_title: "btp",
        page_location: location.href // Full URL is required.
      });
    }
  });
  return BTP;
});
//# sourceMappingURL=BTP-dbg.controller.js.map
