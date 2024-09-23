"use strict";

sap.ui.define(["sap/m/library", "sap/ui/core/UIComponent", "sap/ui/core/mvc/Controller"], function (sap_m_library, UIComponent, Controller) {
  "use strict";

  var URLHelper = sap_m_library["URLHelper"];
  /**
   * @namespace be.wl.lemtech.wouter.controller
   */
  var AboutMe = Controller.extend("be.wl.lemtech.wouter.controller.AboutMe", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      var _this$getRouter$getRo;
      (_this$getRouter$getRo = this.getRouter().getRoute("me")) === null || _this$getRouter$getRo === void 0 || _this$getRouter$getRo.attachPatternMatched(this.onMe, this);
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
    onMe: function _onMe() {
      var _this$getView;
      var appModel = (_this$getView = this.getView()) === null || _this$getView === void 0 ? void 0 : _this$getView.getModel("app");
      appModel.setProperty("/selectedTab", "me");
      gtag('event', "page_view", {
        page_title: "aboutme",
        page_location: location.href // Full URL is required.
      });
    },
    onOpenFollowMeOn: function _onOpenFollowMeOn(url) {
      URLHelper.redirect(url, true);
    }
  });
  return AboutMe;
});
//# sourceMappingURL=AboutMe-dbg.controller.js.map
