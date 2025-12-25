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
  var MCP = Controller.extend("be.wl.lemtech.wouter.controller.MCP", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      var _this$getRouter$getRo;
      (_this$getRouter$getRo = this.getRouter().getRoute("mcp")) === null || _this$getRouter$getRo === void 0 || _this$getRouter$getRo.attachPatternMatched(this.onMCPMatched, this);
    },
    getRouter: function _getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    onMCPMatched: function _onMCPMatched() {
      var _this$getView;
      var appModel = (_this$getView = this.getView()) === null || _this$getView === void 0 ? void 0 : _this$getView.getModel("app");
      appModel.setProperty("/selectedTab", "mcp");
      gtag('event', "page_view", {
        page_title: "mcp",
        page_location: location.href
      });
    },
    onOpenGitHub: function _onOpenGitHub() {
      window.open("https://github.com/lemaiwo/btp-sap-odata-to-mcp-server", "_blank");
    },
    onContact: function _onContact() {
      window.open("mailto:wouter@lem-tech.be?subject=SAP MCP Server Inquiry", "_blank");
    }
  });
  return MCP;
});
//# sourceMappingURL=MCP-dbg.controller.js.map
