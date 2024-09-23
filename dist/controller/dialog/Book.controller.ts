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
export default class Book extends DialogController {
	private data: data;
	private resolve: (value: unknown) => void;
	public onBeforeShow(viewController: AppController, dialog: frag, resolve: (value: unknown) => void, data: data): void {
		this.dialog = dialog;
		this.viewController = viewController;
		this.data = data;
		this.resolve = resolve;
		this.dialog.fragment.setModel(new JSONModel({ topic: this.data.topic || "btp", mailValidation: "None", mailValidationMessage: "", busy: false ,captcha:""}), "book");
		(this.dialog.fragment as Dialog).attachAfterOpen((event: UI5Event) => {
			const id = (this.fragmentById(this.viewController, "Book", "captcha") as FlexBox)?.getDomRef()?.id;
			grecaptcha.ready(() => {
				grecaptcha.render(id, {
					'sitekey': '6LeAvFwpAAAAAMJF8iVpE63VLxE5sPqxv045k169',
					'callback': (response: string) => this.verifyCallback(response)
				});
			});
		});
		gtag('event', "page_view", {
            page_title: "bookme-"+this.data.topic,
            page_location: location.href  // Full URL is required.
        });
	}

	public verifyCallback(response: string) {
		const bookModel = this.dialog.fragment.getModel("book")! as JSONModel;
		bookModel.setProperty("/captcha", response);
	}
	public async onBook() {
		const bookModel = this.dialog.fragment.getModel("book")! as JSONModel;

		if (this.validateInput(this.fragmentById(this.viewController, "Book", "mail") as Input)) {
			return;
		}
		bookModel.setProperty("/busy", true);

		const mailCtx = (this.viewController.getView()?.getModel() as ODataModel)?.bindContext("/sendMail(...)");
		mailCtx.setParameter("mailFrom", bookModel.getProperty("/mail"));
		mailCtx.setParameter("topic", bookModel.getProperty("/topic"));
		mailCtx.setParameter("description", bookModel.getProperty("/description") || "");
		mailCtx.setParameter("captcha", bookModel.getProperty("/captcha") || "");
		try {
			await mailCtx.execute();
			MessageBox.success("Thank you for your intrest, I'll reach out to you as soon as possible!", { title: "Thank you!" }),
				this.onClose();
		} catch (error) {
			if ((error as { message: string }).message.indexOf("mail") > -1) {
				bookModel.setProperty("/mailValidation", "Error");
				bookModel.setProperty("/mailValidationMessage", (error as { message: string }).message);
			} else {
				MessageBox.error((error as { message: string }).message, { title: "Error" })
			}
			console.error(error);
		}
		bookModel.setProperty("/busy", false);
	}
	public onClose(event?: UI5Event): void {
		(this.dialog.fragment as Dialog).close(); //eslint-disable-line
		
		gtag('event', "page_view", {
            page_title: this.data.topic,
            page_location: location.href  // Full URL is required.
        });
		this.resolve(true);
	}
	private validateInput(input: Input) {
		let valueState: ValueState = ValueState.None;
		let validationError = false;
		const binding = input.getBinding("value") as JSONPropertyBinding;

		try {
			(binding?.getType() as SimpleType).validateValue(input.getValue());
		} catch (exception) {
			valueState = ValueState.Error;
			validationError = true;
		}

		input.setValueState(valueState);

		return validationError;
	}
	private customEMailType = SimpleType.extend("email", {
		formatValue: function (oValue) {
			return oValue;
		},

		parseValue: function (oValue) {
			//parsing step takes place before validating step, value could be altered here
			return oValue;
		},

		validateValue: function (oValue) {
			// The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
			// It's always better to validate an address by simply sending an e-mail to it.
			// var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			const rexMail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
			if (!oValue.match(rexMail)) {
				throw new ValidateException("'" + oValue + "' is not a valid e-mail address");
			}
		}
	})
}