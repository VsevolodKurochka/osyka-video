$(document).ready(function(){

	function scroll(scrollLink, speed){
		$('html, body').animate({
			scrollTop: scrollLink.offset().top
		}, speed);
		return false;
	}
	$('.anchor').click(function(e){
		e.preventDefault();
		scroll($( $(this).attr('href') ), 1500);
	});

	// Collapse

		$(".js-collapse__group.active").children(".js-collapse__group-body").slideDown();

		$('.js-collapse').on('click', '.js-collapse__group-header', function(){
			var collapseInner = $(this).parents('.js-collapse').find('.js-collapse__group');

			$(this)
				.parent()
				.toggleClass('active');

			$(this)
				.next()
				.slideToggle('slow');

			collapseInner
				.not($(this).parent())
				.removeClass('active');

			collapseInner
				.children('.js-collapse__group-body')
				.not($(this).next())
				.slideUp("slow");

		});
	// Tabs
		$('[data-action="tab"]').click(function(){			
			// Tab links toggle class
				$(this).closest(".vtabs__list").children("li").removeClass('active');
				$(this).parent().addClass('active');
			// Show tab content
				var tabTarget = $(this).attr('data-target');
				$(tabTarget).fadeIn('slow');
				$(".vtabs__content > div").not($(tabTarget)).fadeOut('slow');
		});
	// Develope
});	