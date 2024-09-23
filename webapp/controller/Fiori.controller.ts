import UIComponent from "sap/ui/core/UIComponent";
import Controller from "./Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class Fiori extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.getRouter().getRoute("fiori")?.attachPatternMatched(this.onMatched, this);

    }
    public getRouter() {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }
    public onMatched(){
        const appModel = (this.getView()?.getModel("app") as JSONModel);
        appModel.setProperty("/selectedTab","fiori");
        gtag('event', "page_view", {
            page_title: "fiori",
            page_location: location.href  // Full URL is required.
        });
    }
}