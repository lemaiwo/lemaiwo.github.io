"use strict";

sap.ui.define(["../Dialog.controller"], function (__DialogController) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  var DialogController = _interopRequireDefault(__DialogController);
  /**
   * @namespace be.wl.lemtech.wouter.controller.dialog
   */
  var CookieSettings = DialogController.extend("be.wl.lemtech.wouter.controller.dialog.CookieSettings", {
    onBeforeShow: function _onBeforeShow(viewController, dialog, resolve, data) {
      var _this = this;
      this.dialog = dialog;
      this.viewController = viewController;
      this.data = data;
      this.resolve = resolve;
      this.dialog.fragment.attachEventOnce("afterClose", function () {
        return _this.viewController.setCookie("approval_requested", "1");
      });
    },
    onAccept: function _onAccept(event) {
      this.dialog.fragment.close();
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
      this.resolve(true);
    },
    onReject: function _onReject(event) {
      this.dialog.fragment.close();
      this.resolve(false);
    }
  });
  return CookieSettings;
});
//# sourceMappingURL=CookieSettings-dbg.controller.js.map
