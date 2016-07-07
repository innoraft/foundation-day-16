/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Genaral Global variables
	var $win = $(window),
		$doc = $(document),
		$winW = function(){ return $(window).width() },
		$winH = function(){ return $(window).height() },
		$mainmenu = $('#mainmenu'),
		$screensize = function(element){  
			$(element).width($winW()).height($winH());
		};
		
		var screencheck = function(mediasize){
			if (typeof window.matchMedia !== "undefined"){
				var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
				if( screensize.matches ) {
					return true;
				}else {
					return false;
				}
			} else { // for IE9 and lower browser
				if( $winW() <=  mediasize ) {
					return true;
				}else {
					return false;
				}
			}
		};

	$doc.ready(function() {
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
		// Remove No-js Class
		$("html").removeClass('no-js').addClass('js');
		
		
		
		/* Get Screen size
		---------------------------------------------------------------------*/
		$win.load(function(){
			$win.on('resize', function(){
				$screensize('your selector');	
			}).resize();	
		});
		
		
		/* Menu ICon Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(1023)) {
				if(!$('#menu').length){
					$('#mainmenu .wrap').prepend('<a href="#" id="menu" class="menulines-button"><span class="menulines"></span> <em>Menu</em></a>');
				}
				
			} else {
				$("#menu").remove();
			}
		}).resize();

		/* This adds placeholder support to browsers that wouldn't otherwise support it. 
		---------------------------------------------------------------------*/
		if (document.createElement("input").placeholder == undefined) {
			var active = document.activeElement;
			$(':text').focus(function () {
				if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
					$(this).val('').removeClass('hasPlaceholder');
				}
			}).blur(function () {
				if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
					$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
				}
			});
			$(':text').blur();
			$(active).focus();
			$('form:eq(0)').submit(function () {
				$(':text.hasPlaceholder').val('');
			});
		}
		
		
		/* Tab Content box 
		---------------------------------------------------------------------*/
		var tabBlockElement = $('.tab-data');
			$(tabBlockElement).each(function(index, element) {
				var $this = $(this),
					tabTrigger = $this.find(".tabnav li"),
					tabContent = $this.find(".tabcontent");
					var textval = new Array();
					tabTrigger.each(function() {
						textval.push( $(this).text() );
					});	
				$this.find(tabTrigger).first().addClass("active");
				$this.find(tabContent).first().show();

				
				$(tabTrigger).on('click',function () {
					$(tabTrigger).removeClass("active");
					$(this).addClass("active");
					$(tabContent).hide().removeClass('visible');
					var activeTab = $(this).find("a").attr("data-rel");
					$this.find('#' + activeTab).fadeIn('normal').addClass('visible');
								
					return false;
				});
			
				var responsivetabActive =  function(){
				if (screencheck(767)){
					if( !$('.tabMobiletrigger').length ){
						$(tabContent).each(function(index, element) {
							$(this).before("<h2 class='tabMobiletrigger'>"+textval[index]+"</h2>");	
							$this.find('.tabMobiletrigger:first').addClass("rotate");
						});
						$('.tabMobiletrigger').click('click', function(){
							var tabAcoordianData = $(this).next('.tabcontent');
							if($(tabAcoordianData).is(':visible') ){
								$(this).removeClass('rotate');
								$(tabAcoordianData).slideUp('normal');
								//return false;
							} else {
								$this.find('.tabMobiletrigger').removeClass('rotate');
								$(tabContent).slideUp('normal');
								$(this).addClass('rotate');
								$(tabAcoordianData).not(':animated').slideToggle('normal');
							}
							return false;
						})
					}
						
				}
				if ( $winW() > 768 ){
					$('.tabMobiletrigger').remove();
					$this.find(tabTrigger).removeClass("active").first().addClass('active');
					$this.find(tabContent).hide().first().show();		
				}
			}
			$(window).on('resize', function(){
				if(!$this.hasClass('only-tab')){
					responsivetabActive();
				}
			}).resize();
		});
		
		/* Accordion box JS
		---------------------------------------------------------------------*/
		$('.accordion-databox').each(function(index, element) {
			var $accordion = $(this),
			$accordionTrigger = $accordion.find('.accordion-trigger'),
			$accordionDatabox = $accordion.find('.accordion-data');
			
			$accordionTrigger.first().addClass('open');
			$accordionDatabox.first().show();
			
			$accordionTrigger.on('click',function (e) {
				var $this = $(this);
				var $accordionData = $this.next('.accordion-data');
				if( $accordionData.is($accordionDatabox) &&  $accordionData.is(':visible') ){
					$this.removeClass('open');
					$accordionData.slideUp(400);
					e.preventDefault();
				} else {
					$accordionTrigger.removeClass('open');
					$this.addClass('open');
					$accordionDatabox.slideUp(400);
					$accordionData.slideDown(400);
				}
			})
		});
		
		/* FullPage Js
		---------------------------------------------------------------------*/
     $('#fullpage').fullpage({
            // Events.
			onLeave: function(index, nextIndex, direction){
				if(index==2 && direction=='up'){
					$('.curtain').hide();	
				} else {
					$('.curtain').show();	
					$('.curtain').addClass('full').removeClass('fullWidth');
					$('.text-placeholder').html('');  
				}
			},
            afterLoad: function(anchorLink, index){
					setTimeout(function() {
					$('.curtain').removeClass('fullWidth full');
					$('.curtain').addClass('xswidth');
					
					if (index%2 == 0) { 
						$('.curtain').addClass('left-align');
					} else { 
						$('.curtain').removeClass('left-align');
					}
					
					var $bg = $('.section').eq(index-1).attr('data-rel');
					$('.curtain').css('background-color',$bg);
					$('.section').eq(index-1).parents('#fullpage').css('background-color',$bg);
					
					text = $('.section').eq(index-1).find('.text-container').html();
					$('.text-placeholder').html(text);
					$('.text-placeholder').fadeIn('slow');
				  },300);
				  setTimeout(function(){ 
					$('.text-placeholder').each(function() {
						var $this = $(this);
							$this.find('.animate').each(function(i) {
								var $item = $(this);
								var animation = $item.data("animate");
								setTimeout( function () {
									$item.addClass('animated '+animation).removeClass('animate');
								}, i*100 );
							});
						});
				}, 500);

            },
            afterRender: function(){
            	setTimeout(function(){ 
					$('.section').eq(0).each(function() {
						var $this = $(this);
							$this.find('.animate').each(function(i) {
								var $item = $(this);
								var animation = $item.data("animate");
								setTimeout( function () {
									$item.addClass('animated '+animation).removeClass('animate');
								}, i*100 );
							});
						});
				}, 400);
			},
            afterResize: function(){},
        });


/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);