﻿(function(c){var e=function(a){a.on("clock-render",function(b,d,a,e,f){b=c("#waves-main-counter");0<b.length&&(a=c("#waves-main-counter-template").render({hours:a,min:e,sec:f}),b.html(a),b.css({opacity:1}),c("#waves-main-counter").removeClass("hidden"))});a.on("clock-stop",function(a,d,e){c("#waves-main-counter").addClass("hidden")})};c(document).ready(function(){var a=new Date,b=c("#waves-main-counter").attr("data-sale-end-date"),d=c("#waves-main-counter");b&&(e(d),d.countdownClock({date:new Date(b),
localTime:a,command:"initAndStart"}),0<d.length&&(b?d.countdownClock({date:new Date(b),localTime:a,command:"update"}):d.countdownClock({command:"stop",localTime:a})))})})(jQuery);
