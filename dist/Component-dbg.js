"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "./model/models", "sap/ui/model/json/JSONModel"], function (BaseComponent, ___model_models, JSONModel) {
  "use strict";

  var createDeviceModel = ___model_models["createDeviceModel"];
  /**
   * @namespace be.wl.lemtech.wouter
   */
  var Component = BaseComponent.extend("be.wl.lemtech.wouter.Component", {
    metadata: {
      manifest: "json"
    },
    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function _init() {
      // call the base component's init function
      BaseComponent.prototype.init.call(this);

      // Remove the splash screen
      // document.getElementById("loader")?.remove();
      // $(".loader-icon").removeClass("spinning-cog").addClass("shrinking-cog");
      // $(".loader-background").fadeOut();
      // $(".loader-text").fadeOut();
      window.setTimeout(function () {
        var _document$getElementB;
        (_document$getElementB = document.getElementById("loader")) === null || _document$getElementB === void 0 || _document$getElementB.remove();
      }, 400);
      this.setModel(new JSONModel({
        lightMode: true,
        darkMode: false,
        selectedTab: "home"
      }), "app");
      // enable routing
      this.getRouter().initialize();

      // set the device model
      this.setModel(createDeviceModel(), "device");
    }
  });
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
