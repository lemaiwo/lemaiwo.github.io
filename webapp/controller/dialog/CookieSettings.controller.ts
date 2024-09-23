import DialogController from "../Dialog.controller";
import { frag } from "../Base.controller";
import Popover from "sap/m/Popover";
import UI5Event from "sap/ui/base/Event";
import Dialog from "sap/m/Dialog";
import AppController from "../App.controller";
import Text from "sap/m/Text";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import MessageToast from "sap/m/MessageToast";
import SimpleType from "sap/ui/model/SimpleType";
import ValidateException from "sap/ui/model/ValidateException";
import Input from "sap/m/Input";
import PropertyBinding from "sap/ui/model/PropertyBinding";
import JSONPropertyBinding from "sap/ui/model/json/JSONPropertyBinding";
import { ValueState } from "sap/ui/core/library";
import Value from "sap/makit/Value";
import MessageBox from "sap/m/MessageBox";
import Icon from "sap/ui/core/Icon";
import FlexBox from "sap/m/FlexBox";
import App from "../App.controller";
type data = {
};
/**
 * @namespace be.wl.lemtech.wouter.controller.dialog
 */
export default class CookieSettings extends DialogController {
	private data: data;
	private resolve: (value: unknown) => void;
	public onBeforeShow(viewController: AppController, dialog: frag, resolve: (value: unknown) => void, data: data): void {
		this.dialog = dialog;
		this.viewController = viewController;
		this.data = data;
		this.resolve = resolve;		
		this.dialog.fragment.attachEventOnce("afterClose", ()=>(this.viewController as App).setCookie("approval_requested","1"));
	}

	public onAccept(event?: UI5Event): void {
		(this.dialog.fragment as Dialog).close();
		gtag('consent', 'update', {
			'ad_storage': 'granted',
			'ad_user_data': 'granted',
			'ad_personalization': 'granted',
			'analytics_storage': 'granted'
		  });
		this.resolve(true);
	}

	public onReject(event?: UI5Event): void {
		(this.dialog.fragment as Dialog).close();
		
		this.resolve(false);
	}
}