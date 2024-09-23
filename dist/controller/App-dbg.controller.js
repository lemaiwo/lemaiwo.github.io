"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "./Base.controller", "sap/ui/model/json/JSONModel"], function (UIComponent, __Controller, JSONModel) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var Controller = _interopRequireDefault(__Controller);
  /**
   * @namespace be.wl.lemtech.wouter.controller
   */
  var App = Controller.extend("be.wl.lemtech.wouter.controller.App", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      try {
        var _this$getView;
        var _this = this;
        var darkMode = (_this.getCookieValue("mode") || "sap_horizon") === "sap_horizon_dark" ? true : false;
        (_this$getView = _this.getView()) === null || _this$getView === void 0 || _this$getView.setModel(new JSONModel({
          lightMode: !darkMode,
          darkMode: darkMode,
          selectedTab: "home"
        }), "app");
        var _temp = function () {
          if (_this.getCookieValue("approval_requested") !== "1") {
            return Promise.resolve(_this.openFragment({
              name: "be.wl.lemtech.wouter.view.dialog.CookieSettings",
              data: {}
            })).then(function (_this$openFragment) {
              var cookieResult = _this$openFragment;
              _this.setCookie("allow_required_cookies", cookieResult);
            });
          }
        }();
        return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onInfo: function _onInfo(topic) {
      try {
        var _this2 = this;
        return Promise.resolve(_this2.openFragment({
          name: "be.wl.lemtech.wouter.view.dialog.Info"
        })).then(function (_this2$openFragment) {
          var closeResult = _this2$openFragment;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    navigateToSection: function _navigateToSection(event) {
      var key = event.getParameter("key");
      if (key === "help") {
        var _event$getParameter;
        event === null || event === void 0 || (_event$getParameter = event.getParameter("item")) === null || _event$getParameter === void 0 || _event$getParameter._expandButtonPress();
      } else {
        this.getRouter().navTo(key);
      }
    },
    getRouter: function _getRouter() {
      return UIComponent.getRouterFor(this);
    },
    onSwitchTheme: function _onSwitchTheme() {
      var _this$getView2;
      var appModel = (_this$getView2 = this.getView()) === null || _this$getView2 === void 0 ? void 0 : _this$getView2.getModel("app");
      var ligthMode = appModel.getProperty("/lightMode");
      var darkMode = appModel.getProperty("/darkMode");
      if (ligthMode) {
        ligthMode = false;
        darkMode = true;
        sap.ui.getCore().applyTheme("sap_horizon_dark");
        this.setCookie("mode", "sap_horizon_dark");
      } else {
        ligthMode = true;
        darkMode = false;
        sap.ui.getCore().applyTheme("sap_horizon");
        this.setCookie("mode", "sap_horizon");
      }
      appModel.setProperty("/lightMode", ligthMode);
      appModel.setProperty("/darkMode", darkMode);
    },
    setCookie: function _setCookie(cookieName, value) {
      var expiresDate,
        date = new Date();
      date.setTime(date.getTime() + 356 * 24 * 60 * 60 * 1000); // one year
      expiresDate = "expires=" + date.toUTCString();
      document.cookie = cookieName + "=" + value + ";" + expiresDate + ";path=/";
    },
    getCookieValue: function _getCookieValue(cookieName) {
      var cookies = document.cookie.split(";");

      // eslint-disable-next-line no-param-reassign
      cookieName = cookieName + "=";
      var _iterator = _createForOfIteratorHelper(cookies),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cookie = _step.value;
          cookie = cookie.trim();
          if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    }
  });
  return App;
});
//# sourceMappingURL=App-dbg.controller.js.map
