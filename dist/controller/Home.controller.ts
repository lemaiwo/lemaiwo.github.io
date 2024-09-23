import { URLHelper } from "sap/m/library";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "./Base.controller";

/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class Home extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.getRouter().getRoute("home")?.attachPatternMatched(this.onHome, this);
    }
    public onOpenURL(url: string) {
        URLHelper.redirect(url, true);
    }
    public onNavigateTo(route: string) {
        this.getRouter().navTo(route);
    }
    protected getRouter() {
        return UIComponent.getRouterFor(this);
    }
    public onHome() {
        gtag('event', "page_view", {
            page_title: "home",
            page_location: location.href  // Full URL is required.
        });
    }
}