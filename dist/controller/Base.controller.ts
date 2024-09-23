import Dialog from "sap/m/Dialog";
import Popover from "sap/m/Popover";
import UI5Element from "sap/ui/core/Element";
import Fragment from "sap/ui/core/Fragment";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import DialogController from "./Dialog.controller";

export type frag = {
	controller: DialogController;
	fragment: Fragment;
};
type frags = Record<string, frag>;
let _fragments: frags = {};
/**
 * @namespace be.wl.lemtech.wouter.controller
 */
export default class Base extends Controller {
	protected viewController: Controller;

	public getMainView() {
		return this.getView() || this.viewController.getView();
	}
	public onExit(): void {
		_fragments = {};
	}
	public async onBook(topic: string) {
		const closeResult = (await this.openFragment({
			name: "be.wl.lemtech.wouter.view.dialog.Book",
			data: { topic: topic || "" }
		})) as string;
	}

	public async openFragment(config: { name: string; data?: unknown; popoverSource?: Popover }): Promise<unknown> {
		let viewName: string[];
		if (config.name.indexOf(".") > 0) {
			//full path
			viewName = config.name.split(".");
			config.name = config.name.substr(config.name.lastIndexOf(".") + 1);
		} else {
			//current folder
			viewName = this.getMainView()!.getViewName().split(".");
		}
		viewName.pop();
		const viewPath = viewName.join(".") + ".",
			controllerPath = viewPath.replace("view", "controller"),
			id = this.getMainView()!.getId() + "--" + config.name;
		if (!_fragments[id]) {
			let newController: Controller;
			try {
				newController = (await Controller.create({
					name: controllerPath + config.name
				})) as Controller;
			} catch (error) {
				// console.log("Dialog without controller. Just continue with the current controller for the dialog");
				// eslint-disable-next-line
				newController = this;
			}
			const newFragment = (await Fragment.load({
				id: id,
				name: viewPath + config.name,
				controller: newController
			})) as unknown as Fragment;
			_fragments[id] = { controller: newController as DialogController, fragment: newFragment };
			this.getMainView()!.addDependent(_fragments[id].fragment as unknown as UI5Element);
		}
		const closedPromise = new Promise((resolve, reject) => {
			if (_fragments[id].controller && (_fragments[id].controller as Controller) !== this) {
				if ("onBeforeShow" in _fragments[id].controller) {
					_fragments[id].controller.onBeforeShow(this, _fragments[id], resolve, config.data, config.popoverSource);
				}
			}
		});
		if (config.popoverSource) {
			(_fragments[id].fragment as unknown as Popover).openBy(config.popoverSource, false);
		} else {
			(_fragments[id].fragment as Dialog).open();
		}
		return closedPromise; //_fragments[id].fragment;
	}
}