"use strict";sap.ui.define(["sap/ui/core/Fragment","sap/ui/core/mvc/Controller"],function(e,n){"use strict";function r(e,n){try{var r=e()}catch(e){return n(e)}if(r&&r.then){return r.then(void 0,n)}return r}var t={};var o=n.extend("be.wl.lemtech.wouter.controller.Base",{getMainView:function e(){return this.getView()||this.viewController.getView()},onExit:function e(){t={}},onBook:function e(n){try{var r=this;return Promise.resolve(r.openFragment({name:"be.wl.lemtech.wouter.view.dialog.Book",data:{topic:n||""}})).then(function(e){var n=e})}catch(e){return Promise.reject(e)}},openFragment:function o(i){try{var a=function e(){var n=new Promise(function(e,n){if(t[s].controller&&t[s].controller!==c){if("onBeforeShow"in t[s].controller){t[s].controller.onBeforeShow(c,t[s],e,i.data,i.popoverSource)}}});if(i.popoverSource){t[s].fragment.openBy(i.popoverSource,false)}else{t[s].fragment.open()}return n};var c=this;var u;if(i.name.indexOf(".")>0){u=i.name.split(".");i.name=i.name.substr(i.name.lastIndexOf(".")+1)}else{u=c.getMainView().getViewName().split(".")}u.pop();var l=u.join(".")+".",f=l.replace("view","controller"),s=c.getMainView().getId()+"--"+i.name;var m=function(){if(!t[s]){var o=function n(){return Promise.resolve(e.load({id:s,name:l+i.name,controller:a})).then(function(e){var n=e;t[s]={controller:a,fragment:n};c.getMainView().addDependent(t[s].fragment)})};var a;var u=r(function(){return Promise.resolve(n.create({name:f+i.name})).then(function(e){a=e})},function(){a=c});return u&&u.then?u.then(o):o(u)}}();return Promise.resolve(m&&m.then?m.then(a):a(m))}catch(e){return Promise.reject(e)}}});return o});
//# sourceMappingURL=Base.controller.js.map