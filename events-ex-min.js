﻿(function(a){function g(a){var b=new Date(a);a=(10>b.getHours()?"0":"")+b.getHours();b=(10>b.getMinutes()?"0":"")+b.getMinutes();return"{h}:{m} {amPM}".format({h:a,m:b,amPM:11<a?"pm":"am"})}String.prototype.format=function(a){var b=this,c;for(c in a)b=b.replace("{"+c+"}",a[c]);return b};Array.prototype.GetItemByProperty=function(d,b){var c=null;a.grep(this,function(a){a[d]===b&&(c=a)});return c};var f=function(a){a.$errorMess.empty();a.$errorMess.removeClass("ok-box").removeClass("error-box").removeClass("hidden").addClass("hidden")},
e=function(a,b){!0===b?a.$dvSaveBtn.removeClass("hidden"):a.$dvSaveBtn.removeClass("hidden").addClass("hidden")},h=function(a,b){if(null!==b.Message&&""!==b.Message){var c=[b.Message];a.$errorMess.removeClass("hidden").removeClass("ok-box").removeClass("error-box").removeClass("info-box").removeClass("msg-box");switch(b.Result){case 4:a.$errorMess.addClass("info-box");break;case 1:a.$errorMess.addClass("ok-box");break;case 3:a.$errorMess.addClass("msg-box");break;case 2:case 5:a.$errorMess.addClass("error-box")}a.$errorMess.empty();
for(b=0;b<c.length;b++)a.$errorMess.append(c[b]).append("<br>")}},k=function(d){f(d);a.ajax({type:"PUT",url:"/2code/Handlers/event/event-handler.ashx",data:JSON.stringify({eventRSVP:{IsCancelRSVP:!0,RSVP_GUID:d.$eventGUID},action:"check-cancel"}),success:function(a){d.$preloaderLarge.hide(0);a=JSON.parse(a);"CANCELRSVP"==a.ResultEXType&&e(d,!0);null!=a.Result&&""!=a.Message&&h(d,a)}})},l=function(d){k(d);d.$saveBtn.click({pSelf:d},function(b){d.$preloader.show(0);f(d);a.ajax({type:"PUT",url:"/2code/Handlers/event/event-handler.ashx",
data:JSON.stringify({eventRSVP:{IsCancelRSVP:!0,RSVP_GUID:d.$eventGUID},action:"cancel"}),success:function(a){d.$preloader.hide(0);a=JSON.parse(a);e(d,!1);"REDIRECT"===a.ResultEXType?window.location=a.ResultEX:null!=a.Result&&""!=a.Message&&h(d,a)}})})};a("document").ready(function(){if(0===window.location.pathname.indexOf("/events/cancel")){if(0!=a("#event-start").length){var d=a("#event-start").html(),b=a("#event-end").html();d="{startDate}&ndash;{endDate} in your current time zone".format({startDate:g(d),
endDate:g(b)});a("#event-local-time").html(d)}d={$saveBtn:a("#event-cancel-btn"),$dvSaveBtn:a(".dv-button"),$preloader:a(".button-preloader"),$preloaderLarge:a(".button-preloader-large"),$eventResult:a("#dv-event"),$errorMess:a(".result-msg-box"),$eventShare:a(".event-share"),$eventGUID:window.location.pathname.split("/").splice(-1,1)[0]};l(d)}})})(jQuery);(function(a){function g(a){return!isNaN(parseFloat(a))&&isFinite(a)}String.prototype.format=function(a){var b=this,d;for(d in a)b=b.replace("{"+d+"}",a[d]);return b};Array.prototype.GetItemByProperty=function(b,c){var d=null;a.grep(this,function(a){a[b]===c&&(d=a)});return d};var f=function(a){a.$errorMess.empty();a.$errorMess.removeClass("ok-box").removeClass("error-box").removeClass("hidden").addClass("hidden")},e=function(a,c){!0===c?a.$dvSaveBtn.removeClass("hidden"):a.$dvSaveBtn.removeClass("hidden").addClass("hidden")},
h=function(a,c){!0===c?a.$eventForm.removeClass("hidden"):a.$eventForm.removeClass("hidden").addClass("hidden")},k=function(a,c){if(null!==c.Message&&""!==c.Message){var b=[c.Message];a.$errorMess.removeClass("hidden").removeClass("ok-box").removeClass("error-box");switch(c.Result){case 4:a.$errorMess.addClass("info-box");break;case 1:a.$errorMess.addClass("ok-box");break;case 3:a.$errorMess.addClass("msg-box");break;case 2:case 5:a.$errorMess.addClass("error-box")}a.$errorMess.empty();for(c=0;c<
b.length;c++)a.$errorMess.append(b[c]).append("<br>")}},l=function(b){f(b);a.ajax({type:"PUT",url:"/2code/Handlers/event/event-handler.ashx",data:JSON.stringify({eventRSVP:{EventID:b.$eventId,RSVP_GUID:b.$eventGUID},action:"check-contact"}),success:function(c){b.$preloaderLarge.hide(0);c=JSON.parse(c);1===c.Result?(h(b,!0),e(b,!0),"SINGLEEVENTRSVPLOAD"==c.ResultEXType||"USERDATALOAD"==c.ResultEXType?(a(".firstname").val(c.ResultEX.FirstName),a(".lastname").val(c.ResultEX.LastName),a(".email").val(c.ResultEX.EmailAddress),
a(".subject").html(c.ResultEX.EventName)):a(".subject").html(c.ResultEX.EventName)):null!=c.Result&&""!=c.Message&&k(b,c)}})},d=function(b){l(b);a('[data-validation-group="true"]').on("waves.validation.ok",function(){b.$preloader.show(0);f(b);var c={eventRSVP:{EventID:b.$eventId,RSVP_GUID:b.$eventGUID,FirstName:a.trim(a(".firstname").val()),LastName:a.trim(a(".lastname").val()),EmailAddress:a.trim(a(".email").val()),EventName:a.trim(a(".subject").html())},action:"send-contact",contactQuestion:a.trim(a(".question").val()),
recaptcha:window.grecaptcha?window.grecaptcha.getResponse():a.trim(a("#china-captcha-tb").val())};c.contactQuestion=c.contactQuestion.replace(/=/g,"&equals;");a.ajax({type:"PUT",url:"/2code/Handlers/event/event-handler.ashx",data:JSON.stringify(c),success:function(c){b.$preloader.hide(0);c=JSON.parse(c);1===c.Result&&"SENTSUCCESS"==c.ResultEXType&&(h(b,!1),e(b,!1),a(window).scrollTop(0));null!=c.Result&&""!=c.Message&&(k(b,c),"true"!==a.trim(a("#is-china-enabled").text().toLowerCase())?window.grecaptcha&&
window.grecaptcha.reset():a("#china-captcha-img").attr("src","/2code/handlers/captcha.aspx?d="+(new Date).getTime()))}})})};a("document").ready(function(){if(0===window.location.pathname.indexOf("/events/contact")){var b=window.location.pathname.split("/").splice(-2,1)[0],c=window.location.pathname.split("/").splice(-1,1)[0];!g(b)&&g(c)&&(b=window.location.pathname.split("/").splice(-1,1)[0],c=null);b={$saveBtn:a("#event-contact-btn"),$dvSaveBtn:a(".dv-button"),$preloader:a(".button-preloader"),$preloaderLarge:a(".button-preloader-large"),
$eventForm:a(".waves-form"),$errorMess:a(".result-msg-box"),$eventShare:a(".event-share"),$eventId:b,$eventGUID:c};c=0<a("#captcha").length;"true"!==a.trim(a("#is-china-enabled").text().toLowerCase())?(!0===c&&(window.onloadCallback=function(){window.grecaptcha.render("captcha",{sitekey:a('meta[name="recaptcha-key"]').attr("content")})}),a.getScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",function(a,b,c){})):a("#china-captcha").removeClass("hidden");d(b)}})})(jQuery);(function(a){function g(a){var e=new Date(a);a=(10>e.getHours()?"0":"")+e.getHours();e=(10>e.getMinutes()?"0":"")+e.getMinutes();return"{h}:{m} {amPM}".format({h:a,m:e,amPM:11<a?"pm":"am"})}String.prototype.format=function(a){var e=this,f;for(f in a)e=e.replace("{"+f+"}",a[f]);return e};a("document").ready(function(){if(0===window.location.pathname.indexOf("/events/complete")&&0!=a("#event-start").length){var f=a("#event-start").html(),e=a("#event-end").html();f="{startDate}&ndash;{endDate} in your current time zone".format({startDate:g(f),
endDate:g(e)});a("#event-local-time").html(f)}})})(jQuery);