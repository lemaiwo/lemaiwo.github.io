import UIComponent from "sap/ui/core/UIComponent";
import Controller from "./Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class MCP extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.getRouter().getRoute("mcp")?.attachPatternMatched(this.onMCPMatched, this);

    }
    public getRouter() {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }
    public onMCPMatched(){
        const appModel = (this.getView()?.getModel("app") as JSONModel);
        appModel.setProperty("/selectedTab","mcp");
        gtag('event', "page_view", {
            page_title: "mcp",
            page_location: location.href
        });
    }
    public onOpenGitHub() {
        window.open("https://github.com/lemaiwo/btp-sap-odata-to-mcp-server", "_blank");
    }
    public onContact() {
        window.open("mailto:wouter@lem-tech.be?subject=SAP MCP Server Inquiry", "_blank");
    }
}
