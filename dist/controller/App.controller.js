"use strict";sap.ui.define(["sap/ui/core/UIComponent","./Base.controller","sap/ui/model/json/JSONModel"],function(e,t,r){"use strict";function o(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}function n(e,t){var r=typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=i(e))||t&&e&&typeof e.length==="number"){if(r)e=r;var o=0;var n=function(){};return{s:n,n:function(){if(o>=e.length)return{done:true};return{done:false,value:e[o++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a=true,u=false,l;return{s:function(){r=r.call(e)},n:function(){var e=r.next();a=e.done;return e},e:function(e){u=true;l=e},f:function(){try{if(!a&&r.return!=null)r.return()}finally{if(u)throw l}}}}function i(e,t){if(!e)return;if(typeof e==="string")return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}function a(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var u=o(t);var l=u.extend("be.wl.lemtech.wouter.controller.App",{onInit:function e(){try{var t;var o=this;var n=(o.getCookieValue("mode")||"sap_horizon")==="sap_horizon_dark"?true:false;(t=o.getView())===null||t===void 0||t.setModel(new r({lightMode:!n,darkMode:n,selectedTab:"home"}),"app");var i=function(){if(o.getCookieValue("approval_requested")!=="1"){return Promise.resolve(o.openFragment({name:"be.wl.lemtech.wouter.view.dialog.CookieSettings",data:{}})).then(function(e){var t=e;o.setCookie("allow_required_cookies",t)})}}();return Promise.resolve(i&&i.then?i.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},onInfo:function e(t){try{var r=this;return Promise.resolve(r.openFragment({name:"be.wl.lemtech.wouter.view.dialog.Info"})).then(function(e){var t=e})}catch(e){return Promise.reject(e)}},navigateToSection:function e(t){var r=t.getParameter("key");if(r==="help"){var o;t===null||t===void 0||(o=t.getParameter("item"))===null||o===void 0||o._expandButtonPress()}else{this.getRouter().navTo(r)}},getRouter:function t(){return e.getRouterFor(this)},onSwitchTheme:function e(){var t;var r=(t=this.getView())===null||t===void 0?void 0:t.getModel("app");var o=r.getProperty("/lightMode");var n=r.getProperty("/darkMode");if(o){o=false;n=true;sap.ui.getCore().applyTheme("sap_horizon_dark");this.setCookie("mode","sap_horizon_dark")}else{o=true;n=false;sap.ui.getCore().applyTheme("sap_horizon");this.setCookie("mode","sap_horizon")}r.setProperty("/lightMode",o);r.setProperty("/darkMode",n)},setCookie:function e(t,r){var o,n=new Date;n.setTime(n.getTime()+356*24*60*60*1e3);o="expires="+n.toUTCString();document.cookie=t+"="+r+";"+o+";path=/"},getCookieValue:function e(t){var r=document.cookie.split(";");t=t+"=";var o=n(r),i;try{for(o.s();!(i=o.n()).done;){var a=i.value;a=a.trim();if(a.indexOf(t)===0){return a.substring(t.length,a.length)}}}catch(e){o.e(e)}finally{o.f()}return false}});return l});
//# sourceMappingURL=App.controller.js.map