import UIComponent from "sap/ui/core/UIComponent";
import Controller from "./Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class BTP extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.getRouter().getRoute("btp")?.attachPatternMatched(this.onBTPMatched, this);

    }
    public getRouter() {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }
    public onBTPMatched(){
        const appModel = (this.getView()?.getModel("app") as JSONModel);
        appModel.setProperty("/selectedTab","btp");
        gtag('event', "page_view", {
            page_title: "btp",
            page_location: location.href  // Full URL is required.
        });
    }
}