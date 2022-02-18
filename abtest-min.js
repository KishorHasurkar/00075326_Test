﻿var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,c,f){if(null==a)throw new TypeError("The 'this' value for String.prototype."+f+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+f+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,f){a!=Array.prototype&&a!=Object.prototype&&(a[c]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,f,l){if(c){f=$jscomp.global;a=a.split(".");for(l=0;l<a.length-1;l++){var m=a[l];m in f||(f[m]={});f=f[m]}a=a[a.length-1];l=f[a];c=c(l);c!=l&&null!=c&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:c})}};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,f){var c=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var m=c.length,n=a.length;f=Math.max(0,Math.min(f|0,c.length));for(var u=0;u<n&&f<m;)if(c[f++]!=a[u++])return!1;return u>=n}},"es6","es3");$jscomp.findInternal=function(a,c,f){a instanceof String&&(a=String(a));for(var l=a.length,m=0;m<l;m++){var n=a[m];if(c.call(f,n,m,a))return{i:m,v:n}}return{i:-1,v:void 0}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,f){return $jscomp.findInternal(this,a,f).v}},"es6","es3");
(function(a){a.wavesABTests=a.wavesABTests||{};a.wavesABTests.$eventsBus=a({});var c=function(g,e){g=a.map(g.variations,function(a){return a.percent});g.sort(function(a,e){return a-e});e=a.map(e.variations,function(a){return a.percent});e.sort(function(a,e){return a-e});return g.join(" ")===e.join(" ")},f=function(a){var e=[];if(a&&a.variations){for(var b=0;b<a.variations.length;b++){var h=a.variations[b];for(var k=0;k<100*h.percent;k++)e.push(h.name)}h=Math.floor(Math.random()*e.length);a.selected=
e[h]}},l=function(g,e){g=null;var b=a("#abtest-data"),h=[];if(0<b.length)try{g=a.parseJSON(b.text())}catch(k){}g&&a.each(g,function(k,d){d.testType=Number(d.testType)||0;if(e&&1===d.testType||!e&&1!==d.testType){d.isActive="true"===d.isActive.toLowerCase();var b=a.trim(d.variations);k=[];if(b){b=b.split(",");for(var g=0;g<b.length;g++){var c=a.trim(b[g]);c=c.split(":");2===c.length&&k.push({name:a.trim(c[0]),percent:Number(c[1])/100||0})}}d.variations=k;h.push(d)}});return h},m=function(g,e,b){var h=
!1;if(e&&a.isArray(e)&&0<e.length){for(var k=0;k<e.length;k++){var d=e[k];var c=Number(d.testType)||0;d.codeName&&a.wavesABTests[d.codeName]&&a.isFunction(a.wavesABTests[d.codeName])&&d.isActive&&(1===c&&d.started||0===c)&&(a.wavesABTests[d.codeName](a.extend(!0,{},d,{allTests:e})),1!==c&&(h=d.started=!0))}h&&(b?window.localStorage.setItem(g.localStorageName,window.encodeURIComponent(JSON.stringify(e))):jQuery.cookies.setCookie(g.cookieName,JSON.stringify(e),g.expiration))}},n=function(c,e){var b=
-1;if(window.dataLayer&&a.isArray(window.dataLayer))for(var h=0;h<window.dataLayer.length;h++)if(c=window.dataLayer[h],c.testName&&c.testName===e.codeName){b=h;break}return b},u=function(g){if(a.wavesABTests.$eventsBus&&0<a.wavesABTests.$eventsBus.length)a.wavesABTests.$eventsBus.off("sendTodataLayer").on("sendTodataLayer",function(e,b){if(b&&window.dataLayer&&-1===n(g,b)){window.dataLayer.push({testName:b.codeName,testVariation:b.selected,testSlot:b.slot,event:"user entered test"});var h=Number(b.masterSlotID)||
0;0!==h&&b.allTests&&(e=a.grep(b.allTests,function(a){return h===(Number(a.slot)||0)}))&&0<e.length&&(e=e[0],c(b,e)&&window.dataLayer.push({testName:e.codeName,testVariation:e.selected,testSlot:e.slot,event:"user entered test"}))}})},x=function(){var g={newTests:[],savedTests:[],updatedTests:[],urlTests:[],localStorageName:"waves_abtest"},e=[];if(window.location.search&&-1!==window.location.search.indexOf("abtest")){var b=[];var h=window.location.search.replace("?","").split("&");for(var k=0;k<h.length;k++){var d=
h[k].split("=");2===d.length&&(b.push(d[0]),b[d[0]]=d[1])}if(b=b.abtest)for(b=b.split("_"),d=0;d<b.length;d++)h=b[d],h=h.split("-"),2===h.length&&e.push({codeName:h[0],selected:h[1],isActive:!0})}g.urlTests=e;if(g.urlTests&&0<g.urlTests.length)m(g,g.urlTests);else{u(g);g.newTests=l(g,!1);g.savedTests=window.localStorage.getItem(g.localStorageName)||[];try{g.savedTests=a.parseJSON(window.decodeURIComponent(g.savedTests)),"string"===typeof g.savedTests&&(g.savedTests=a.parseJSON(window.decodeURIComponent(g.savedTests)))}catch(z){g.savedTests=
null}d=g.savedTests;b=g.newTests;e=[];d&&a.isArray(d)||(d=[]);b&&a.isArray(b)||(b=[]);h=e;k=d;for(var p=b,q,t,r=0;r<k.length;r++){q=k[r];for(var w=0;w<p.length;w++)if(t=p[w],a.trim(t.codeName)===a.trim(q.codeName)&&!0===t.isActive){h.push(q);break}}h=e;for(t=0;t<b.length;t++){k=b[t];q=!1;for(r=0;r<d.length;r++)if(p=d[r],a.trim(k.codeName)===a.trim(p.codeName)){q=!0;break}q||!0!==k.isActive||h.push(k)}b={};k=[];for(h=0;h<e.length;h++){d=e[h];var n=Number(d.masterSlotID)||0;0!==n?(p=b[n]||{list:[]},
p.list.push(d),b[n]=p):k.push(d)}for(h=0;h<k.length;h++)d=k[h],void 0===d.selected&&f(d),p=Number(d.slot)||0,void 0!==b[p]&&(b[p].test=d);for(n in b)if((k=b[n])&&k.list&&k.test)for(h=0;h<k.list.length;h++)if(d=k.list[h],void 0===d.selected)if(c(d,k.test))d.selected=k.test.selected;else{if("off"===k.test.selected&&(t=d,t.variations)){r=0;p=[];for(q=0;q<t.variations.length;q++)w=t.variations[q],"on"===w.name||w.name.startsWith("on-")?w.percent=0:(r+=w.percent,p.push(w));t=0<r?100/r:0;for(q=0;q<p.length;q++)r=
p[q],r.percent=Math.round(t*r.percent)}f(d)}g.updatedTests=e;n=[];for(e=0;e<g.updatedTests.length;e++)b=g.updatedTests[e],b.isActive&&n.push(b);window.localStorage.setItem(g.localStorageName,window.encodeURIComponent(JSON.stringify(n)));m(g,g.updatedTests)}},y=function(){var c={savedTests:[],expiration:2E9,cookieName:"waves_abtest_server"};u(c);c.savedTests=jQuery.cookies.getCookie(c.cookieName)||[];try{c.savedTests=a.parseJSON(c.savedTests)}catch(e){c.savedTests=null}c.savedTests&&m(c,c.savedTests)},
v=function(){if(window.Sys&&window.Sys.WebForms&&window.Sys.WebForms.PageRequestManager&&window.Sys.WebForms.PageRequestManager.getInstance){var a=Sys.WebForms.PageRequestManager.getInstance();a.add_endRequest(function(){x();y()})}};a(document).ready(function(){x();y();v()})})(jQuery);(function(){jQuery.cookies=jQuery.cookies||{};jQuery.cookies={};jQuery.cookies.setCookie=function(a,c,f){c=escape(c);var l=new Date;f=Number(f);-1==f||isNaN(f)?document.cookie=a+"="+c+";path=/;":(l.setMinutes(l.getMinutes()+f),document.cookie=a+"="+c+";path=/; expires="+l.toUTCString())};jQuery.cookies.getCookie=function(a){var c=null;var f=document.cookie.split(";");for(var l=0;l<f.length;l++){var m=f[l].substr(0,f[l].indexOf("="));var n=f[l].substr(f[l].indexOf("=")+1);m=m.replace(/^\s+|\s+$/g,
"");if(m==a){c=unescape(n);break}}return c}})();(function(a){function c(e,b){a("#preloader-box").addClass("hidden");b&&(e.selected=b);a.wavesABTests.$eventsBus.trigger("sendTodataLayer",[e])}a.wavesABTests=a.wavesABTests||{};var f=function(){a(".pdl-item").each(function(){var e=a(this),b=e.find(".star-rating");if(0<b.length){b.attr("data-total");var c=Number(b.attr("data-rating"))||0;c=100*c/5-2;b.find(".star-rating-color").css("width",c+"%");b.find('[data-type="star-rating-percent"]').text(c);0<c&&b.removeClass("hidden");var k=e.find('[data-type="reviews-number"]');
(c=Number(k.text()))?e.find(".reviews").removeClass("hidden"):k.text("0");e=b.parent("a");0<e.length&&(e.attr("data-gaevent","Click"),e.attr("data-gavalue","Reviews"))}})},l=new Date,m=function(){a("[data-sale-end-date]").on("clock-render",function(e,b,c,k,d){e=a('[data-type="clock-ph"]');0<e.length&&(c=a("#pdl-page-clock-template").render({hours:c,min:k,sec:d}),e.html(c),e.css({opacity:1}))})},n=function(){var e=!1;a(".pdl-item").each(function(){a(this).hasClass("status-0")&&(e=!0)});e&&a(".email-link-par").removeClass("hidden")},
u=function(){var e="",b=0;a(".pdl-item").each(function(c){a(this).hasClass("status-0")&&(0!==b&&(e+="_"),e+=a(this).attr("data-pdl"),b++)});return e},x=function(e,b){var h=null,k="GET";null!=b&&(h={order:b.join(" "),test:1},h=JSON.stringify(h),k="POST");a.ajax({url:"/2code/Handlers/products/pdl/pdl-neowize-get-offers.ashx",type:k,dataType:"json",data:h,cache:!1}).done(function(d){if(null!==d&&null!==d.pdl_items&&0<d.pdl_items.length){c(e);0<(Number(a("#site-wide-couponid").text())||0)?a("#pdl-results-box .pdl-items").html(a("#pdl-offers-template-with-coupon").render(d)):
a("#pdl-results-box .pdl-items").html(a("#pdl-offers-template").render(d));a("#pdl-results-box").removeClass("hidden");a("#top-content-box").removeClass("hidden");a("#bottom-content-box").removeClass("hidden");f();var b=a("[data-sale-end-date]:first");0<b.length&&(d=b.attr("data-sale-end-date"))&&(m(),b.countdownClock({date:new Date(d),localTime:l,command:"initAndStart"}),d=b.find('[data-type="clock"]'),0<b.length&&((b=b.attr("data-sale-end-date"))?(b=new Date(b),d.countdownClock({date:b,localTime:l,
command:"update"})):d.countdownClock({command:"stop",localTime:l})));n();d=a("#view-online-link");b=d.attr("href");d.attr("href",b+u())}else a("#pdl-no-results-box").removeClass("hidden"),c(e,"waves load from server fail")})},y=function(a,b){window.Neowize&&window.Neowize.Events?b(!0):0<a?window.setTimeout(function(){y(a-1,b)},global.domain.marketing.NeoWizeSettings.loadAttemptDelay):b(!1)},v=function(a){window.Neowize.Server.api("personal_deals",{results_count:30,force_into_experiment:!0},function(b){b&&
!b.is_error&&b.data&&b.data.ids&&0<b.data.ids.length?x(a,b.data.ids.reverse()):(b&&!b.is_error?c(a,"response.data empty"):c(a,"unavailable ajax error: "+b.msg),x(a,null))})},g=function(e){y(global.domain.marketing.NeoWizeSettings.maxLoadAttempts,function(b){b?window.Neowize.Events.register("neowize_ready",function(){v(e)}):(a("#pdl-no-results-box").removeClass("hidden"),c(e,"unavailable object"))})};a.wavesABTests.NeoWizePersonalDeals9505m=a.wavesABTests.neowizepersonaldeals9505m=function(e){var b=
""!==a.trim(a("#waves-user-email").text().toLowerCase()),f="true"===a.trim(a("#is-china-enabled").text().toLowerCase()),k="true"===a.trim(a("#neowize-enabled").text()).toLowerCase(),d="false"!==a.trim(a("#IsPDLEnabled").text()).toLowerCase(),p=0<a("#pdl-items").length;if("/specials/daily-deals"===window.location.pathname&&b)if(d&&k&&!0!==p&&!0!==f)switch(a("#preloader-box").removeClass("hidden"),a("#pdl-no-results-box").addClass("hidden"),e.selected){case "on":g(e);break;case "off":x(e,null);break;
default:c(e),a("#pdl-no-results-box").removeClass("hidden")}else c(e)}})(jQuery);(function(a){a.wavesABTests=a.wavesABTests||{};a.wavesABTests.HomepageAB2=a.wavesABTests.homepageab2=function(c){if("/"===window.location.pathname||"/ab"===window.location.pathname){var f=a('#hpab [data-hpab="'+c.selected+'"]');0<f.length&&(f.removeClass("hidden"),a.wavesABTests.$eventsBus.trigger("sendTodataLayer",[c]));window.CustomEvent&&document.dispatchEvent(new window.CustomEvent("abtest-value-changed",{detail:c.selected}))}}})(jQuery);(function(a){a.wavesABTests=a.wavesABTests||{};a.wavesABTests.ProductPageSelectedVideo=a.wavesABTests.productpageselectedvideo=function(c){if(0<a('meta[name=video-abtest][content="selected"]').length){var f=a(".media-gallery .product-gallery-content .list-li"),l=0<a("#iphone-top-icons").length,m=""!==window.location.hash;l||m||(a.wavesABTests.$eventsBus.trigger("sendTodataLayer",[c]),1<f.length&&"two"===c.selected&&(c=f.eq(0),f=f.eq(1),c.before(f),f.find(".data-index").text("1"),c.find(".data-index").text("2")));
a("#product-tabs-preloader").addClass("hidden");a("#product-tabs").removeClass("hidden");a("#wrapper").productPage()}}})(jQuery);(function(a){a.wavesABTests=a.wavesABTests||{};a.wavesABTests.TopMenuAB50=a.wavesABTests.topmenuab50=function(c){if("true"!==a("#ismobile").text().toLowerCase()&&!(1E3>=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0))){a("body").addClass("topmenu-ab-"+c.selected);if("new"===c.selected){var f=a("#top-menu-plugins-li"),l=a("#top-menu-bundles-li"),m=a("#top-menu-all-products-li"),n=a("#top-menu-products-li");f.removeClass("hidden");l.removeClass("hidden");m.removeClass("hidden");
n.addClass("hidden")}a.wavesABTests.$eventsBus.trigger("sendTodataLayer",[c])}}})(jQuery);(function(a){a.wavesABTests=a.wavesABTests||{};var c=!1,f="/lpn/black-friday-2020/free-plugin"===window.location.pathname?"bf20-email":"cm20-email",l=function(){return 7===(Number(a("[data-pdl-type]").attr("data-pdl-type"))||0)?"/specials?bf2020=free":"/specials?cm2020=free"},m=function(a,d){window.Neowize&&window.Neowize.Events?d(!0):0<a?window.setTimeout(function(){m(a-1,d)},global.domain.marketing.NeoWizeSettings.loadAttemptDelay):d(!1)},n=function(a,d){window.setTimeout(function(){c||v(a,[])},
global.domain.marketing.NeoWizeSettings.maxWaitTime)},u=function(b){"true"!==a.trim(a("#is-china-enabled").text().toLowerCase())?window.grecaptcha&&window.grecaptcha.reset():a("#china-captcha-img").attr("src","/2code/handlers/captcha.aspx?d="+(new Date).getTime());var d=a('#email-form [data-type="server-error"]');d.find("p").html(b);d.removeClass("hidden")},x=function(){a(".pdl-item").each(function(){var b=a(this),d=b.find(".star-rating");if(0<d.length){d.attr("data-total");var c=Number(d.attr("data-rating"))||
0;c=100*c/5-2;d.find(".star-rating-color").css("width",c+"%");d.find('[data-type="star-rating-percent"]').text(c);0<c&&d.removeClass("hidden");var e=b.find('[data-type="reviews-number"]');(c=Number(e.text()))?b.find(".reviews").removeClass("hidden"):e.text("0");b=d.parent("a");0<b.length&&(b.attr("data-gaevent","Click"),b.attr("data-gavalue","Reviews"))}})},y=function(){var b=!1;a(".pdl-item").each(function(){a(this).hasClass("status-0")&&(b=!0)});b&&a(".email-link-par").removeClass("hidden")},v=
function(b,d,g){c=!0;var k="";g||(g="full");d||(d=[]);20<d.length&&(d=d.splice(0,20));var m=new global.app.security.TokenModel;k="partial"===g?a.trim(window.localStorage.getItem(f)):a.trim(a('[data-type="campaign-email"]').val());window.fbq&&window.dataLayer&&window.dataLayer.push({GA_event_action:"Free plugin signup box completed",GA_event_category:"BF 2020",GA_event_label:"BF 2020 Free plugin",event:"GTM event To GA"});var n="";try{n=window.grecaptcha&&window.grecaptcha.getResponse?window.grecaptcha.getResponse():
a.trim(a("#china-captcha-tb").val())}catch(w){}a.ajax({url:"/2code/handlers/marketingcampaigns/bf2017.ashx",type:"POST",dataType:"json",data:{email:k,items:JSON.stringify(d),token:m.get("token"),label:m.get("label"),type:a("#email-form").attr("data-campaign"),campaignid:a("#email-form").attr("data-campaignid"),pdltype:Number(a("[data-pdl-type]").attr("data-pdl-type"))||0,command:g,recaptcha:n},cache:!1}).done(function(d){if(d&&d.IsValid)if(h(b),window.localStorage.setItem(f,k),d.RelatedData){a("#pdl-ph").html(a("#pdl-bf2017-template").render(d));
a("#email-form").addClass("hidden");"true"!==a.trim(a("#is-china-enabled").text().toLowerCase())&&x();d=a("#view-online-link");var c=d.attr("href");d.attr("href",c+e());y()}else window.location.href=l();else u(d&&d.ErrorMessage?d.ErrorMessage:"An error has occurred.")}).fail(function(){u("An error has occurred.")}).always(function(){a('#email-form [data-type="preloader"]').addClass("hidden");a('#email-form [data-type="form"]').removeClass("hidden");a("#main-preloader").addClass("hidden")})},g=function(b){var d=
"true"===a.trim(a("#is-china-enabled").text().toLowerCase()),e="true"===a.trim(a("#neowize-enabled").text()).toLowerCase();!d&&e?m(global.domain.marketing.NeoWizeSettings.maxLoadAttempts,function(a){a?(window.Neowize.Events.register("neowize_ready",function(){c||(window.Neowize.Server.api("personal_deals",{results_count:30,force_into_experiment:!0},function(a){a&&!a.is_error&&a.data&&a.data.ids&&v(b,a.data.ids);c||v(b,[])}),n(b,"unavailable ajax timeout"))}),n(b,"unavailable ready event")):v(b,[])}):
v(b,[])},e=function(){var b="",d=0;a(".pdl-item").each(function(c){a(this).hasClass("status-0")&&(0!==d&&(b+="_"),b+=a(this).attr("data-pdl"),d++)});return b},b=function(b){a('#email-form [data-validation-group="true"]').on("waves.validation.ok",function(){a('#email-form [data-type="preloader"]').removeClass("hidden");a('#email-form [data-type="form"]').addClass("hidden");c=!1;"off"===b.selected?v(b,[],"specials"):g(b)});a('[data-type="campaign-email"]').on("click",function(){a('#email-form [data-type="server-error"]').addClass("hidden")});
a(document).on("click","#send-email-link",function(b){b.preventDefault();a(".pdl-email-box").removeClass("hidden");a("#email-sent-box").addClass("hidden");global.domain.validation.init()});a(document).on("waves.validation.ok",".pdl-email-cont",function(){var b=a('[data-type="send-pdl-emal"]').attr("data-user-id"),c=a.trim(a("#email-tb").val());b&&c&&a.ajax({url:"/2code/handlers/cart/send-pdl-emal.ashx?email="+c+"&og="+e()+"&ot=B3982A75-1E63-4FD1-ABDD-DF709ECB1336&it=3AD3D448-8BCB-44EF-8393-D01EF3293CD7"}).always(function(){a("#user-email-span").text(c);
a("#email-sent-box").removeClass("hidden");a(".pdl-email-box").addClass("hidden")})});a(document).on("keypress",'#email-form [data-validation-type="email"]',function(b){if(b.keyCode==global.enums.keyCodes.ENTER||b.keyCode==global.enums.keyCodes.RETURN)b.preventDefault(),b.stopPropagation(),a('#email-form [data-validation-btn="true"]').trigger("click")})},h=function(b){a.wavesABTests.$eventsBus.trigger("sendTodataLayer",[b])};a.wavesABTests.BFPostFree20=a.wavesABTests.bfpostfree20=function(c){"/tests/miriam/miriam-test-2"===
window.location.pathname&&(-1!==window.location.href.indexOf("clear=1")&&(window.localStorage.setItem(f,""),window.history.replaceState({},document.title,window.location.pathname)),b(c),window.localStorage.getItem(f)?"off"===c.selected?(h(c),window.location.href=l()):v(c,[],"partial"):(a("#main-preloader").addClass("hidden"),a("#email-form").removeClass("hidden"),(c=a.trim(a("#waves-user-email").text()))&&a('[data-type="campaign-email"]').val(c),(c=global.dal.url.getQueryString().email)&&a('[data-type="campaign-email"]').val(c),
"true"!==a.trim(a("#is-china-enabled").text().toLowerCase())?(window.onloadCallback=function(){window.grecaptcha.render("captcha",{sitekey:global.domain.captcha.getSiteKey()})},a.getScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",function(a,b,c){})):a("#china-captcha").removeClass("hidden")))}})(jQuery);
/////////////////////////
