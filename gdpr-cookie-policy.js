﻿!function(t){"use strict";!function(t){var u,e=Object.prototype,s=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",r=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag",a="object"==typeof module,c=t.regeneratorRuntime;if(c)a&&(module.exports=c);else{(c=t.regeneratorRuntime=a?module.exports:{}).wrap=w;var l="suspendedStart",h="suspendedYield",f="executing",p="completed",y={},d={};d[o]=function(){return this};var g=Object.getPrototypeOf,v=g&&g(g(T([])));v&&v!==e&&s.call(v,o)&&(d=v);var m=L.prototype=k.prototype=Object.create(d);x.prototype=m.constructor=L,L.constructor=x,L[i]=x.displayName="GeneratorFunction",c.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},c.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(m),t},c.awrap=function(t){return{__await:t}},_(P.prototype),P.prototype[r]=function(){return this},c.AsyncIterator=P,c.async=function(t,e,n,r){var o=new P(w(t,e,n,r));return c.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(m),m[i]="Generator",m[o]=function(){return this},m.toString=function(){return"[object Generator]"},c.keys=function(n){var r=[];for(var t in n)r.push(t);return r.reverse(),function t(){for(;r.length;){var e=r.pop();if(e in n)return t.value=e,t.done=!1,t}return t.done=!0,t}},c.values=T,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=u,this.done=!1,this.delegate=null,this.method="next",this.arg=u,this.tryEntries.forEach(G),!t)for(var e in this)"t"===e.charAt(0)&&s.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=u)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(n){if(this.done)throw n;var r=this;function t(t,e){return i.type="throw",i.arg=n,r.next=t,e&&(r.method="next",r.arg=u),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=s.call(o,"catchLoc"),c=s.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;0<=n;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&s.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),G(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;G(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:T(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=u),y}}}function w(t,e,n,r){var o=e&&e.prototype instanceof k?e:k,i=Object.create(o.prototype),a=new I(r||[]);return i._invoke=function(i,a,c){var u=l;return function(t,e){if(u===f)throw new Error("Generator is already running");if(u===p){if("throw"===t)throw e;return C()}for(c.method=t,c.arg=e;;){var n=c.delegate;if(n){var r=E(n,c);if(r){if(r===y)continue;return r}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if(u===l)throw u=p,c.arg;c.dispatchException(c.arg)}else"return"===c.method&&c.abrupt("return",c.arg);u=f;var o=b(i,a,c);if("normal"===o.type){if(u=c.done?p:h,o.arg===y)continue;return{value:o.arg,done:c.done}}"throw"===o.type&&(u=p,c.method="throw",c.arg=o.arg)}}}(t,n,a),i}function b(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function k(){}function x(){}function L(){}function _(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function P(u){var e;this._invoke=function(n,r){function t(){return new Promise(function(t,e){!function e(t,n,r,o){var i=b(u[t],u,n);if("throw"!==i.type){var a=i.arg,c=a.value;return c&&"object"==typeof c&&s.call(c,"__await")?Promise.resolve(c.__await).then(function(t){e("next",t,r,o)},function(t){e("throw",t,r,o)}):Promise.resolve(c).then(function(t){a.value=t,r(a)},o)}o(i.arg)}(n,r,t,e)})}return e=e?e.then(t,t):t()}}function E(t,e){var n=t.iterator[e.method];if(n===u){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=u,E(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var r=b(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,y;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=u),e.delegate=null,y):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function G(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function T(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(s.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=u,t.done=!0,t};return r.next=r}}return{next:C}}function C(){return{value:u,done:!0}}}(function(){return this}()||Function("return this")());var e;"function"==typeof Symbol&&Symbol.iterator,e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(t){return this._invoke("next",t)},n.prototype.throw=function(t){return this._invoke("throw",t)},n.prototype.return=function(t){return this._invoke("return",t)};function s(t){this.value=t}function n(o){var i,a;function c(t,e){try{var n=o[t](e),r=n.value;r instanceof s?Promise.resolve(r.value).then(function(t){c("next",t)},function(t){c("throw",t)}):u(n.done?"return":"normal",n.value)}catch(t){u("throw",t)}}function u(t,e){switch(t){case"return":i.resolve({value:e,done:!0});break;case"throw":i.reject(e);break;default:i.resolve({value:e,done:!1})}(i=i.next)?c(i.key,i.arg):a=null}this._invoke=function(r,o){return new Promise(function(t,e){var n={key:r,arg:o,resolve:t,reject:e,next:null};a?a=a.next=n:(i=a=n,c(r,o))})},"function"!=typeof o.return&&(this.return=void 0)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}Object.assign,"undefined"==typeof global?self:global;function u(){r(this,u)}var l,h=new(o(u,[{key:"updateGDPR",value:function(){var t=new Headers;t.append("pragma","no-cache"),t.append("cache-control","no-cache"),fetch("/2code/handlers/gdpr.ashx",{method:"GET",headers:t,credentials:"same-origin"})}}]),u),f=(l=React.Component,a(p,l),o(p,[{key:"updateCookieAndDB",value:function(){var t=this,e={IsMarketing:this.state.isMarketing,IsPerformance:this.state.isPerformance,ItemModifiedWhen:Date.today().toString("MM/dd/yyyy HH:mm:ss")};global.dal.cookies.saveCookie("gdpr",JSON.stringify(e),-1),h.updateGDPR(),this.setState({mode:"saved"},function(){setTimeout(function(){t.setState({mode:""})},3e3)})}},{key:"sendDataToGA",value:function(t){window.dataLayer&&window.dataLayer.push({GA_event_action:"Cookie Policy",GA_event_category:document.location.pathname,GA_event_label:t,event:"GTM event To GA"})}},{key:"sendDataToKM",value:function(t){window._kmq&&window._kmq.push(["record",t,{}])}},{key:"agree",value:function(){var t=this;this.setState({IsMarketing:!0,isPerformance:!0},function(){t.updateCookieAndDB()}),this.sendDataToGA("I Agree"),this.sendDataToKM("Cookie Policy I Agree")}},{key:"render",value:function(){var e=this;return t.h("div",{class:"box"},!this.state.isUserLoggedIn&&t.h("div",null,t.h("a",{href:"#",class:"blue-button",style:{marginRight:"10px"},onClick:function(t){t.preventDefault(),e.agree()}},"I Agree"),t.h("a",{href:"/login?returnurl="+window.location.pathname,onClick:function(){e.sendDataToGA("Go to Login"),e.sendDataToKM("Cookie Policy Go to Login")}},"Log in for more cookie options")),this.state.isUserLoggedIn&&"u"===this.state.country&&t.h("div",null,t.h("a",{href:"#",class:"blue-button",style:{marginRight:"10px"},onClick:function(t){t.preventDefault(),e.agree()}},"I Agree"),t.h("a",{href:"/account/edit-personal-details",onClick:function(){e.sendDataToGA("Go to Personal Details"),e.sendDataToKM("Cookie Policy Go to Personal Details")}},"Please update your country")),this.state.isUserLoggedIn&&"n"===this.state.country&&t.h("div",null,t.h("a",{href:"#",class:"blue-button",style:{marginRight:"10px"},onClick:function(t){t.preventDefault(),e.agree()}},"I Agree")),this.state.isUserLoggedIn&&"y"===this.state.country&&t.h("div",null,t.h("p",{style:"margin-bottom: 10px"},t.h("label",null,t.h("input",{style:"margin-right: 5px;",type:"checkbox",checked:this.state.isPerformance,onChange:function(t){e.setState({isPerformance:t.target.checked},function(){})}}),t.h("b",null,"Allow Performance and Functional Cookies"),t.h("br",null),"This will enable you to watch videos and users’ product reviews on Waves.com")),t.h("p",null,t.h("label",null,t.h("input",{style:"margin-right: 5px;",type:"checkbox",checked:this.state.isMarketing,onChange:function(t){e.setState({isMarketing:t.target.checked},function(){})}}),t.h("b",null,"Allow Marketing Cookies"),t.h("br",null),"This will enable you to receive the best product offers and discounts relevant to you")),t.h("p",{style:"margin-top: 10px"},t.h("a",{href:"#",class:"blue-button",onClick:function(t){t.preventDefault(),e.updateCookieAndDB(),e.sendDataToGA("Save Settings"),e.sendDataToKM("Cookie Policy Save Settings")}},"Save"))),"saved"===this.state.mode&&t.h("div",{class:"ok-box",style:{marginTop:"10px"}},"Thank you. Your data was saved."))}}]),p);function p(t){r(this,p);var e=c(this,(p.__proto__||Object.getPrototypeOf(p)).call(this,t)),n=document.getElementById("gdpr-macro").textContent;if(n)try{n=JSON.parse(n)}catch(t){}return e.state={isUserLoggedIn:!!document.getElementById("waves-user-email").textContent,country:document.getElementById("gdpr-country").textContent||"u",isMarketing:!n||n.IsMarketing,isPerformance:!n||n.IsPerformance,gdprMacro:n,mode:""},e}var y=document.getElementById("app");y&&ReactDOM.render(t.h(f,null),y)}(preact);
//# sourceMappingURL=gdpr-cookie-policy.js.map
