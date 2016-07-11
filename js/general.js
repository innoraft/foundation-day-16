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

      $('#fullpage').fullpage({
        // Events.
		
        onLeave: function(index, nextIndex, direction){
		  $('.curtain').find('.logo-container').show();	
		  if (curtain_visibility(index, direction)) {
            $('.curtain').removeClass('open');
            $('.curtain').addClass('full');
          }
          else {
            $('.curtain').addClass('full');
            $('.curtain').addClass('open');
          }
		  $('.text-placeholder').html('');	  
		  $('.mouse-icon').removeClass('fadeMouse');    
		},
        afterLoad: function(anchorLink, index){
		  $('.curtain').find('.logo-container').show();	
          setTimeout(function() {
            $('.curtain').removeClass('full');
            $('.curtain').toggleClass('white');
            $('.curtain').toggleClass('black');
			$('.mouse-icon').toggleClass('blue');
			
            text = $('.section').eq(index-1).find('.text-container').html();
            $('.text-placeholder').html(text);
            $('.text-placeholder').fadeIn('slow');
			
          },300);
          setTimeout(function(){
			$('.curtain').find('.logo-container').toggleClass('applyflip');
		  },400);
          setTimeout(function(){
            $('.curtain').each(function() {
	            var $this = $(this);
	            $this.find('.animate').each(function(i) {
	              var $item = $(this);
	              var animation = $item.data("animate");	       
	              setTimeout( function () {
	                $item.addClass('animated '+animation).removeClass('animate');
	              }, i*100 );
	            });
            });
			if(index==6){
				$('.mouse-icon').removeClass('fadeMouse');	
			} else {
				$('.mouse-icon').addClass('fadeMouse');	
			}
          }, 500);
        },
        afterRender: function(index){
		  $('.curtain').find('.logo-container').hide();		
		  setTimeout(function() {
            $('.curtain').addClass('open');
            $('.curtain').addClass('white');
            $('.curtain').removeClass('black');
			$('.logo-container').removeClass('animated fadeOutLeftBig');          	
		  },300);
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

      function curtain_visibility(index, direction) {
        if (direction == 'down') {
          if ($('.section').eq(index).hasClass('hash-point')) {
            return true;
          }
          else {
            return false;
          }
        }
        else {
          if ($('.section').eq(index-2).hasClass('hash-point')) {
            return true;
          }
          else {
            return false;
          }
        }
      }
	  
	  $(document).on('click tap', '.mouse-icon ', function(){
		 $.fn.fullpage.moveSectionDown();
	});


/*--------------------------------------------------------------------------------------------------------------------------------------*/
	});
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);
