"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "./Base.controller", "sap/ui/model/json/JSONModel"], function (UIComponent, __Controller, JSONModel) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var n = 0, F = function () {}; return { s: F, n: function () { return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] }; }, e: function (r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function () { t = t.call(r); }, n: function () { var r = t.next(); return a = r.done, r; }, e: function (r) { u = !0, o = r; }, f: function () { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
