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
  var Fiori = Controller.extend("be.wl.lemtech.wouter.controller.Fiori", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      var _this$getRouter$getRo;
      (_this$getRouter$getRo = this.getRouter().getRoute("fiori")) === null || _this$getRouter$getRo === void 0 || _this$getRouter$getRo.attachPatternMatched(this.onMatched, this);
    },
    getRouter: function _getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    onMatched: function _onMatched() {
      var _this$getView;
      var appModel = (_this$getView = this.getView()) === null || _this$getView === void 0 ? void 0 : _this$getView.getModel("app");
      appModel.setProperty("/selectedTab", "fiori");
      gtag('event', "page_view", {
        page_title: "fiori",
        page_location: location.href // Full URL is required.
      });
    }
  });
  return Fiori;
});
//# sourceMappingURL=Fiori-dbg.controller.js.map