"use strict";sap.ui.define(["sap/m/library","sap/ui/core/UIComponent","./Base.controller"],function(e,t,o){"use strict";function n(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}var r=e["URLHelper"];var i=n(o);var u=i.extend("be.wl.lemtech.wouter.controller.Home",{onInit:function e(){var t;(t=this.getRouter().getRoute("home"))===null||t===void 0||t.attachPatternMatched(this.onHome,this)},onOpenURL:function e(t){r.redirect(t,true)},onNavigateTo:function e(t){this.getRouter().navTo(t)},getRouter:function e(){return t.getRouterFor(this)},onHome:function e(){gtag("event","page_view",{page_title:"home",page_location:location.href})}});return u});
//# sourceMappingURL=Home.controller.js.map