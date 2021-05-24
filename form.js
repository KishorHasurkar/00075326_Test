(function(){
	'use strict';
		
	/*
		<noscript>
		<div style="display:inline;">
		<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/871411056/?label=fJFZCKnUgIUBEPDawp8D&amp;guid=ON&amp;script=0"/>
		</div>
		</noscript>
	*/
	
	/**
	* send google analytics track event
	* @param {string} eventTitle - event title (data-gaevent="Click")
	* @param {string} eventValue - event value (data-gavalue="...")
	*/
	var sendGATrackEvent = function(eventTitle, eventValue){	
	
		if(window['dataLayer']){
		
			window['dataLayer'].push({
				'GA_event_action': eventTitle
				,'GA_event_category': document.location.pathname
				,'GA_event_label': eventValue
				,'event': 'GTM event To GA'
			});
		}
	};
	
	var googleConversion = function(){
		var google_conversion_id = 871411056;
		var google_conversion_label = "fJFZCKnUgIUBEPDawp8D";
		var google_remarketing_only = false;
		$.getScript('https://www.googleadservices.com/pagead/conversion.js', function(){
			//load done...
		});
	};
		
	var drop_fb_pixel = function() {
		try {
			fbq('track', 'Lead');
			googleConversion();
		}
		catch (err) {
			setTimeout(function () { drop_fb_pixel(); }, 1000);

		}
	};

	$(document).ready(function () {
		drop_fb_pixel();
		sendGATrackEvent('Webinar Signup','Signup');
	});
})();

