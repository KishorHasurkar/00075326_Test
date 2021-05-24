(function($){
	'use strict';
	
	var sendImpressions = function(seg){
		
		var impressions = []
			,title;
		
		$('[data-type="list-item"], [data-type="product"]').each(function(index, el){
							
			var $item = $(this);
			
			impressions.push({
				name: $item.attr('data-name')
				,id: $item.attr('data-skunumber')
				,price: $item.attr('data-skuprice')
				,category: global.domain.gtm.getCategoryFromURL($item.attr('data-url'))
				,variant: 'BF 2016'
				,list: 'homepage'
				,position: (index+1)
			});					
		});	
		
		global.domain.gtm.productImpression(impressions);
	};
	
	var initCommonEvents = function(){
				
		/**
		* send to data layer on product click
		*/
		$(document).on('click', '[data-ga-link="true"]', function(e){
					
			
			var $this = $(this)
				,$parent = $this.parents('[data-type="list-item"], [data-type="product"]')
				,title = ''
				//,variant = global.domain.gtm.NONE
				,properties;
				
			if($parent.length > 0){
				
				properties = [{
					name: $parent.attr('data-name')
					,id: $parent.attr('data-skunumber')
					,price: $parent.attr('data-skuprice')
					,category: global.domain.gtm.getCategoryFromURL($parent.attr('data-url'))
					//,variant: variant
					,list: 'homepage'
					,position: $parent.attr('data-index')
				}];				
				
				global.domain.gtm.productClick(properties ,{list: title});
			}
		});		
		
		/**
		* send to data layer on add to cart
		*/
		$(document).on('click', '[data-ga-cart="true"]', function(e){
			
			var $this = $(this) 
				,$parent = $this.parents('[data-type="list-item"], [data-type="product"]')
				,title = 'homepage'
				//,variant = global.domain.gtm.NONE
				,item
				,seg;
				
			seg = global.dal.url.getQueryString()['seg'];
							
			if($parent.length > 0){
				
				item = {					
					name: $parent.attr('data-name')
					,id: $parent.attr('data-skunumber')
					,price: $parent.attr('data-skuprice')
					//,variant: variant
					,quantity: 1
					,category: global.domain.gtm.getCategoryFromURL($parent.attr('data-url'))
				};
				
				global.domain.gtm.addToCart([item]);
				
				global.domain.gtm.productClick([{
					name: $parent.attr('data-name')
					,id: $parent.attr('data-skunumber')
					,price: $parent.attr('data-skuprice')
					,category: global.domain.gtm.getCategoryFromURL($parent.attr('data-url'))
					//,variant: variant
					,list: title
					,position: $parent.attr('data-index')
				}] 
				,{list: title});
			}
		});	
	};
	
	/**
	* entry point
	*/
	$(document).ready(function(){
	
		 $('img.lazy').lazyload();
		 
		 $.ajax({
			url: '/2code/handlers/products/landing-page-list.ashx'
			,type: 'POST'
			,dataType: 'json'
			,data: {'order': $.trim($('#hidden-products').text())}
			,cache: false
		})
		.done(function(data){
			
			var html;
			
			if(data && data.items){
								
				html = $('#products-6-template').render({items: data.items.slice(0, 2)});				
				$('#products-6-placeholder').html(html);						
				
				html = $('#products-4-template').render({items: data.items.slice(2)});
				$('#products-4-placeholder').html(html);
				
				//GA events
				sendImpressions();
				initCommonEvents();
			}
		});
	
	});
	 
})(jQuery);