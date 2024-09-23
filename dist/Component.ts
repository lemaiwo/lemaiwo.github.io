import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace be.wl.lemtech.wouter
 */
export default class Component extends BaseComponent {

    public static metadata = {
        manifest: "json"
    };

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    public init() {
        // call the base component's init function
        super.init();

        // Remove the splash screen
        // document.getElementById("loader")?.remove();
        // $(".loader-icon").removeClass("spinning-cog").addClass("shrinking-cog");
        // $(".loader-background").fadeOut();
        // $(".loader-text").fadeOut();
        window.setTimeout(function () { document.getElementById("loader")?.remove(); }, 200);
        this.setModel(new JSONModel({ lightMode: true, darkMode: false, selectedTab: "home" }), "app");
        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(createDeviceModel(), "device");
    }
    
}