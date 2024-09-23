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
import VersionInfo from "sap/ui/VersionInfo";
type data = {
	topic: string;
};
type notificationEntity = {
	ID: string;
	fromMail: string;
	subject: string;
	body: string;
}
/**
 * @namespace be.wl.lemtech.wouter.controller.dialog
 */
export default class Info extends DialogController {
	private data: data;
	private resolve: (value: unknown) => void;
	public async onBeforeShow(viewController: AppController, dialog: frag, resolve: (value: unknown) => void, data: data) {
		this.dialog = dialog;
		this.viewController = viewController;
		this.data = data;
		this.resolve = resolve;
		const version = (await VersionInfo?.load());
		this.dialog.fragment.setModel(new JSONModel({ uiversion:(version as {version:string}).version }), "info");
	}
	public onClose(event?: UI5Event): void {
		(this.dialog.fragment as Dialog).close(); //eslint-disable-line
		this.resolve(true);
	}
}