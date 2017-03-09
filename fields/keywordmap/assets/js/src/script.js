(function($) {
	$.fn.keywordmap = function() {
		return this.each(function() {
			var field = $(this);
			var fieldname = 'keywordmap';
			var keywords = [];
			var target = field.attr('data-target');

			if(field.data( fieldname )) {
				return true;
			} else {
				field.data( fieldname, true );
			}
			
			kwtLoadTextarea(field, target);			

			field.find('input').on('change paste keyup', function() {
				keywords = $(this).val().split(',');
				kwtMark(field, keywords);
			});

			$('.field-name-' + target).find('textarea').on('change paste keyup', function() {
				kwtLoadTextarea(field, target);
				kwtMark(field, keywords);
			});
		});
	};
})(jQuery);

function kwtMark(field, keywords) {
	var keywordmap = field.find('.keywordmap');
	keywordmap.unmark();
	field.find('.keywordmap-tags [data-tag]').removeClass('active');
	keywordmap.mark(keywords, {
		'separateWordSearch': false,
		'diacritics': false,
		'accuracy': {
			'value': 'exactly',
			'limiters': ['-', '#', ',', '.']
		},
		'filter': function(textNode, foundTerm, totalCounter, counter){
			field.find('.keywordmap-tags [data-tag="' + foundTerm + '"]').addClass('active');
			return true;
		}
	});
}

function kwtLoadTextarea(field, target) {
	var textarea = $('.field-name-' + target).find('textarea');
	var keywordmap = field.find('.keywordmap');
	if(textarea.length) {
		textarea = textarea.val().replace(/\n/g, '<br>');
		keywordmap.html(textarea);
	}
}