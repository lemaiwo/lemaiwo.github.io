"use strict";

sap.ui.define(["sap/m/library", "sap/ui/core/UIComponent", "./Base.controller"], function (sap_m_library, UIComponent, __Controller) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  var URLHelper = sap_m_library["URLHelper"];
  var Controller = _interopRequireDefault(__Controller);
  /**
   * @namespace be.wl.lemtech.wouter.controller
   */
  var Home = Controller.extend("be.wl.lemtech.wouter.controller.Home", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      var _this$getRouter$getRo;
      (_this$getRouter$getRo = this.getRouter().getRoute("home")) === null || _this$getRouter$getRo === void 0 || _this$getRouter$getRo.attachPatternMatched(this.onHome, this);
    },
    onOpenURL: function _onOpenURL(url) {
      URLHelper.redirect(url, true);
    },
    onNavigateTo: function _onNavigateTo(route) {
      this.getRouter().navTo(route);
    },
    getRouter: function _getRouter() {
      return UIComponent.getRouterFor(this);
    },
    onHome: function _onHome() {
      gtag('event', "page_view", {
        page_title: "home",
        page_location: location.href // Full URL is required.
      });
    }
  });
  return Home;
});
//# sourceMappingURL=Home-dbg.controller.js.map
