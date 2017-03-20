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
			
			kwm.setTextarea(field, target);
			kwm.toggle(field);

			field.find('input').on('change paste keyup', function() {
				keywords = $(this).val().split(',');
				kwm.mark(field, keywords);
			});

			$('.field-name-' + target).find('textarea').on('change paste keyup', function() {
				kwm.setTextarea(field, target);
				kwm.mark(field, keywords);
			});

			if(localStorage.getItem('kwm-disabled') !== null) {
				field.find('.field-content').addClass('kwm-disabled');
			}
		});
	};

	var kwm = (function () {
		var fn = {};

		fn.clear = function(field) {
			field.find('.keywordmap-tags [data-tag]').removeClass('active');
			field.find('.keywordmap-tags [data-tag] .tag-label').attr('style', '');
			field.find('.keywordmap-tags .kwt-count').remove();
			field.find('.keywordmap').unmark();
		};

		fn.mark = function(field, keywords) {
			kwm.clear(field);

			field.find('.keywordmap-tags .kwt-count').remove();
			field.find('.keywordmap').mark(keywords, {
				'separateWordSearch': false,
				'diacritics': false,
				'accuracy': {
					'value': 'exactly',
					'limiters': ['-', '#', ',', '.', '!', '?', '(', ')', '[', ']']
				},
				'done': function() {
					kwm.setTags(field);
					kwm.setTextareaColor(field, keywords);
				}
			});
		};

		fn.toggle = function(field) {
			field.find('.kwm-toggle').click(function() {
				if($(this).parent().hasClass('kwm-disabled')) {
					$(this).parent().removeClass('kwm-disabled');
					localStorage.removeItem('kwm-disabled');
				} else {
					$(this).parent().addClass('kwm-disabled');
					localStorage.setItem('kwm-disabled', '1');
				}
			});
		};

		fn.setTextareaColor = function(field, keywords) {
			$.each(keywords, function( index, keyword ) {
				var findings = field.find('mark').filter(function () {
					return $(this).text().toLowerCase() == keyword.toLowerCase();
				});

				findings.each(function(index) {
					var keyword = $(this).text().toLowerCase();
					var style = $('[data-tag="' + keyword + '"] .tag-label').attr('style');

					$(this).attr('style', style);
				});

			});
		};

		fn.setTags = function(field) {
			var colorHash = new ColorHash();
			field.find('[data-tag]').each(function(index) {
				var tag = $(this);
				var word = $(this).attr('data-tag');
				var color = colorHash.hsl(word);

				var findings = field.find('mark').filter(function () {
					return $(this).text().trim().toLowerCase() == word.toLowerCase();
				});

				var count = findings.length;
				
				if(count > 0 ) {
					kwm.setTagColor(tag, word, color);
					if(count > 1 ) {
						kwm.setTagCount(tag, word, count);
					}
				}
			});
		};

		fn.setTagColor = function(tag, word, color) {
			tag.addClass('active');
			tag.find('.tag-label').css('background-color', 'hsl(' + color[0] + ', ' + color[1]*100 + '%, ' + color[2]*100 + '%)');
		};

		fn.setTagCount = function(tag, word, count) {
			tag.find('button').html(word + '<span class="kwt-count">' + count + '</span>');
		};

		fn.setTextarea = function(field, target) {
			var textarea = $('.field-name-' + target).find('textarea');
			var keywordmap = field.find('.keywordmap');
			if(textarea.length) {
				textarea = textarea.val().replace(/\n/g, '<br>');
				keywordmap.html(textarea);
			}
		};

		return fn;
	})();

})(jQuery);