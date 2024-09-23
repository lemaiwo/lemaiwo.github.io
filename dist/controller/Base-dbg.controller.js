"use strict";

sap.ui.define(["sap/ui/core/Fragment", "sap/ui/core/mvc/Controller"], function (Fragment, Controller) {
  "use strict";

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
  var _fragments = {};
  /**
   * @namespace be.wl.lemtech.wouter.controller
   */
  var Base = Controller.extend("be.wl.lemtech.wouter.controller.Base", {
    getMainView: function _getMainView() {
      return this.getView() || this.viewController.getView();
    },
    onExit: function _onExit() {
      _fragments = {};
    },
    onBook: function _onBook(topic) {
      try {
        var _this = this;
        return Promise.resolve(_this.openFragment({
          name: "be.wl.lemtech.wouter.view.dialog.Book",
          data: {
            topic: topic || ""
          }
        })).then(function (_this$openFragment) {
          var closeResult = _this$openFragment;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    openFragment: function _openFragment(config) {
      try {
        var _temp4 = function _temp4() {
          var closedPromise = new Promise(function (resolve, reject) {
            if (_fragments[id].controller && _fragments[id].controller !== _this2) {
              if ("onBeforeShow" in _fragments[id].controller) {
                _fragments[id].controller.onBeforeShow(_this2, _fragments[id], resolve, config.data, config.popoverSource);
              }
            }
          });
          if (config.popoverSource) {
            _fragments[id].fragment.openBy(config.popoverSource, false);
          } else {
            _fragments[id].fragment.open();
          }
          return closedPromise; //_fragments[id].fragment;
        };
        var _this2 = this;
        var viewName;
        if (config.name.indexOf(".") > 0) {
          //full path
          viewName = config.name.split(".");
          config.name = config.name.substr(config.name.lastIndexOf(".") + 1);
        } else {
          //current folder
          viewName = _this2.getMainView().getViewName().split(".");
        }
        viewName.pop();
        var viewPath = viewName.join(".") + ".",
          controllerPath = viewPath.replace("view", "controller"),
          id = _this2.getMainView().getId() + "--" + config.name;
        var _temp3 = function () {
          if (!_fragments[id]) {
            var _temp2 = function _temp2() {
              return Promise.resolve(Fragment.load({
                id: id,
                name: viewPath + config.name,
                controller: _newController
              })).then(function (_Fragment$load) {
                var newFragment = _Fragment$load;
                _fragments[id] = {
                  controller: _newController,
                  fragment: newFragment
                };
                _this2.getMainView().addDependent(_fragments[id].fragment);
              });
            };
            var _newController;
            var _temp = _catch(function () {
              return Promise.resolve(Controller.create({
                name: controllerPath + config.name
              })).then(function (_Controller$create) {
                _newController = _Controller$create;
              });
            }, function () {
              // console.log("Dialog without controller. Just continue with the current controller for the dialog");
              // eslint-disable-next-line
              _newController = _this2;
            });
            return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
          }
        }();
        return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  });
  return Base;
});
//# sourceMappingURL=Base-dbg.controller.js.map
