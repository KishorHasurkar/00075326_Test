﻿var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,f,b){a instanceof String&&(a=String(a));for(var c=a.length,d=0;d<c;d++){var e=a[d];if(f.call(b,e,d,a))return{i:d,v:e}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,f,b){a!=Array.prototype&&a!=Object.prototype&&(a[f]=b.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,f,b,c){if(f){b=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var d=a[c];d in b||(b[d]={});b=b[d]}a=a[a.length-1];c=b[a];f=f(c);f!=c&&null!=f&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:f})}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,b){return $jscomp.findInternal(this,a,b).v}},"es6","es3");
(function(a){var f=function(e){a('[data-type="lp-item"] [data-type="clock"], [data-type="first-item-clock"]').on("clock-render",function(e,b,f,c,d){e=a("#product-countdown-clock-template").render({hours:f,min:c,sec:d});b.html(e);b.css({opacity:1})})},b=function(e,b,f){var c=b.find('[data-type="clock"]');0<b.length&&((b=f?a('[data-type="lp-item"]').eq(0).attr("data-sale-end-date"):b.attr("data-sale-end-date"))?(b=new Date(b),c.countdownClock({date:b,localTime:e.localTime,command:"update"})):c.countdownClock({command:"stop",
localTime:e.localTime}))},c=function(e){var c=a('[data-type="first-item-clock"]'),d=a('[data-type="lp-item"]');f(e);d.each(function(){var c=a(this);if(g=c.attr("data-sale-end-date"))h=new Date(g),c.find('[data-type="clock"]').countdownClock({date:h,localTime:e.localTime,command:"initAndStart"}),b(e,c,!1)});if(0<c.length&&0<d.length){var g=d.eq(0).attr("data-sale-end-date");var h=new Date(g);c.countdownClock({date:h,localTime:e.localTime,command:"initAndStart"});b(e,c,!0)}},d=function(e){var b;a.ajax({url:"/2code/handlers/products/ad-hoc-product-list-handler.ashx",
type:"POST",dataType:"json",data:JSON.stringify({order:e.orderField,productAttributeType:e.productAttributeType}),cache:!1}).done(function(d){null!==d&&(b=d.items,e.placeholder.html(a.render["landing-page-template"](b)),a("img.lazy").lazyload({skip_invisible:!1}),c(e));a(document).trigger("landing-page-list-rendered",d)})};a(document).ready(function(){var b={landingPageTemplate:a("#landing-page-template"),placeholder:a("#placeholder"),template:null,orderField:null,productAttributeType:null,localTime:new Date};
b.orderField=a.trim(a('[data-type="url-data"]').text());b.template=a("#landing-page-template");b.productAttributeType=2;b.orderField||(b.productAttributeType=1,b.orderField=a.trim(a('[data-type="sku-data"]').text()));a.templates({"landing-page-template":b.landingPageTemplate.get(0)});d(b)})})(jQuery);
