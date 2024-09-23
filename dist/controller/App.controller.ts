import { IconTabHeader$SelectEvent } from "sap/m/IconTabHeader";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "./Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class App extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public async onInit() {
        const darkMode = (this.getCookieValue("mode") || "sap_horizon") === "sap_horizon_dark"?true:false;
        this.getView()?.setModel(new JSONModel({ lightMode: !darkMode, darkMode: darkMode, selectedTab: "home" }), "app");
        
        if (this.getCookieValue("approval_requested") !== "1") {
            const cookieResult = (await this.openFragment({
                name: "be.wl.lemtech.wouter.view.dialog.CookieSettings",
                data: {}
            })) as string;
            this.setCookie("allow_required_cookies",cookieResult);
        }
    }
	public async onInfo(topic: string) {
		const closeResult = (await this.openFragment({
			name: "be.wl.lemtech.wouter.view.dialog.Info"
		})) as string;
	}
    public navigateToSection(event: IconTabHeader$SelectEvent) {
        const key = event.getParameter("key");
        if (key === "help") {
            event?.getParameter("item")?._expandButtonPress()
        } else {
            this.getRouter().navTo(key!);
        }
    }
    protected getRouter() {
        return UIComponent.getRouterFor(this);
    }
    private onSwitchTheme() {
        const appModel = (this.getView()?.getModel("app") as JSONModel);
        let ligthMode = appModel.getProperty("/lightMode");
        let darkMode = appModel.getProperty("/darkMode");

        if (ligthMode) {
            ligthMode = false;
            darkMode = true;
            sap.ui.getCore().applyTheme("sap_horizon_dark");
            this.setCookie("mode","sap_horizon_dark");
        } else {
            ligthMode = true;
            darkMode = false;
            sap.ui.getCore().applyTheme("sap_horizon");
            this.setCookie("mode","sap_horizon");
        }
        appModel.setProperty("/lightMode", ligthMode);
        appModel.setProperty("/darkMode", darkMode);
    }
    public setCookie(cookieName: string, value: string) {
        let expiresDate,
            date = new Date();

        date.setTime(date.getTime() + (356 * 24 * 60 * 60 * 1000)); // one year
        expiresDate = "expires=" + date.toUTCString();

        document.cookie = cookieName + "=" + value + ";" + expiresDate + ";path=/";
    }
    private getCookieValue(cookieName: string) {
        const cookies = document.cookie.split(";");

        // eslint-disable-next-line no-param-reassign
        cookieName = cookieName + "=";
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return false;
    }
}