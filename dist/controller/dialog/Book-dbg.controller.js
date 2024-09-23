"use strict";

sap.ui.define(["../Dialog.controller", "sap/ui/model/json/JSONModel", "sap/ui/model/SimpleType", "sap/ui/model/ValidateException", "sap/ui/core/library", "sap/m/MessageBox"], function (__DialogController, JSONModel, SimpleType, ValidateException, sap_ui_core_library, MessageBox) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  function _catch(body, recover) {
    try {
      var result = body();
    } catch (e) {
      return recover(e);
    }
    if (result && result.then) {
      return result.then(void 0, recover);
    }
    return result;
  }
  var DialogController = _interopRequireDefault(__DialogController);
  var ValueState = sap_ui_core_library["ValueState"];
  /**
   * @namespace be.wl.lemtech.wouter.controller.dialog
   */
  var Book = DialogController.extend("be.wl.lemtech.wouter.controller.dialog.Book", {
    constructor: function constructor() {
      DialogController.prototype.constructor.apply(this, arguments);
      this.customEMailType = SimpleType.extend("email", {
        formatValue: function formatValue(oValue) {
          return oValue;
        },
        parseValue: function parseValue(oValue) {
          //parsing step takes place before validating step, value could be altered here
          return oValue;
        },
        validateValue: function validateValue(oValue) {
          // The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
          // It's always better to validate an address by simply sending an e-mail to it.
          // var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
          var rexMail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          if (!oValue.match(rexMail)) {
            throw new ValidateException("'" + oValue + "' is not a valid e-mail address");
          }
        }
      });
    },
    onBeforeShow: function _onBeforeShow(viewController, dialog, resolve, data) {
      var _this = this;
      this.dialog = dialog;
      this.viewController = viewController;
      this.data = data;
      this.resolve = resolve;
      this.dialog.fragment.setModel(new JSONModel({
        topic: this.data.topic || "btp",
        mailValidation: "None",
        mailValidationMessage: "",
        busy: false,
        captcha: ""
      }), "book");
      this.dialog.fragment.attachAfterOpen(function (event) {
        var _this$fragmentById;
        var id = (_this$fragmentById = _this.fragmentById(_this.viewController, "Book", "captcha")) === null || _this$fragmentById === void 0 || (_this$fragmentById = _this$fragmentById.getDomRef()) === null || _this$fragmentById === void 0 ? void 0 : _this$fragmentById.id;
        grecaptcha.ready(function () {
          grecaptcha.render(id, {
            'sitekey': '6LeAvFwpAAAAAMJF8iVpE63VLxE5sPqxv045k169',
            'callback': function callback(response) {
              return _this.verifyCallback(response);
            }
          });
        });
      });
      gtag('event', "page_view", {
        page_title: "bookme-" + this.data.topic,
        page_location: location.href // Full URL is required.
      });
    },
    verifyCallback: function _verifyCallback(response) {
      var bookModel = this.dialog.fragment.getModel("book");
      bookModel.setProperty("/captcha", response);
    },
    onBook: function _onBook() {
      try {
        var _this2$viewController;
        var _temp2 = function _temp2() {
          bookModel.setProperty("/busy", false);
        };
        var _this2 = this;
        var bookModel = _this2.dialog.fragment.getModel("book");
        if (_this2.validateInput(_this2.fragmentById(_this2.viewController, "Book", "mail"))) {
          return Promise.resolve();
        }
        bookModel.setProperty("/busy", true);
        var mailCtx = (_this2$viewController = _this2.viewController.getView()) === null || _this2$viewController === void 0 || (_this2$viewController = _this2$viewController.getModel()) === null || _this2$viewController === void 0 ? void 0 : _this2$viewController.bindContext("/sendMail(...)");
        mailCtx.setParameter("mailFrom", bookModel.getProperty("/mail"));
        mailCtx.setParameter("topic", bookModel.getProperty("/topic"));
        mailCtx.setParameter("description", bookModel.getProperty("/description") || "");
        mailCtx.setParameter("captcha", bookModel.getProperty("/captcha") || "");
        var _temp = _catch(function () {
          return Promise.resolve(mailCtx.execute()).then(function () {
            MessageBox.success("Thank you for your intrest, I'll reach out to you as soon as possible!", {
              title: "Thank you!"
            }), _this2.onClose();
          });
        }, function (error) {
          if (error.message.indexOf("mail") > -1) {
            bookModel.setProperty("/mailValidation", "Error");
            bookModel.setProperty("/mailValidationMessage", error.message);
          } else {
            MessageBox.error(error.message, {
              title: "Error"
            });
          }
        });
        return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onClose: function _onClose(event) {
      this.dialog.fragment.close(); //eslint-disable-line

      gtag('event', "page_view", {
        page_title: this.data.topic,
        page_location: location.href // Full URL is required.
      });
      this.resolve(true);
    },
    validateInput: function _validateInput(input) {
      var valueState = ValueState.None;
      var validationError = false;
      var binding = input.getBinding("value");
      try {
        (binding === null || binding === void 0 ? void 0 : binding.getType()).validateValue(input.getValue());
      } catch (exception) {
        valueState = ValueState.Error;
        validationError = true;
      }
      input.setValueState(valueState);
      return validationError;
    }
  });
  return Book;
});
//# sourceMappingURL=Book-dbg.controller.js.map
