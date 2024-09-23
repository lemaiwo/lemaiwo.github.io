import { URLHelper } from "sap/m/library";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class AboutMe extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

        this.getRouter().getRoute("me")?.attachPatternMatched(this.onMe, this);
    }
    public onOpenURL(url:string){
        URLHelper.redirect(url,true);
    }
    public onNavigateTo(route:string){
        this.getRouter().navTo(route);
    }
    protected getRouter() {
        return UIComponent.getRouterFor(this);
    }
    public onMe() {
        const appModel = (this.getView()?.getModel("app") as JSONModel);
        appModel.setProperty("/selectedTab","me");
        gtag('event', "page_view", {
            page_title: "aboutme",
            page_location: location.href  // Full URL is required.
        });
    }
    public onOpenFollowMeOn(url:string){
        URLHelper.redirect(url,true);
    }
}