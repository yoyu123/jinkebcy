var _site = 'm';

require.config({
	paths: {
		'cycler': _STATIC + '/' + _site + '/cycler'
	}
});

//require(['fastclick'], function (FastClick) {
//	FastClick.attach(document.body);
//});

function loadmore() {
	var url = $('.pages a.next').attr('href');
	var isloading = false;

	$(window).scroll(function () {
		if (!isloading && $.type(url) != 'undefined' && $(document).scrollTop() + $(window).height() > $(document).height() - 200) {
			isloading = true;
			$.get(url, function (data) {
				$('#list').append($(data).find('#list').html());
				url = $(data).find('.pages a.next').attr('href');
				if ($.type(url) == 'undefined') {
				} else {
					isloading = false;
				}
			});
		}
	});
}

function wxPreviewImage(selector) {
	require(['http://res.wx.qq.com/open/js/jweixin-1.0.0.js', 'jquery'], function (wx) {
		wx.config({
			jsApiList: ['previewImage']
		});
		wx.ready(function () {
			var urls = [];
			$(selector).each(function () {
				urls.push('http://' + location.hostname + $(this).attr('href'));
			}).click(function (e) {
				e.preventDefault();
				wx.previewImage({
					current: 'http://' + location.hostname + $(this).attr('href'),
					urls: urls
				});
			});
		});
	});
}

//*
require(['hammer', 'jquery'], function (Hammer) {
	$(function () {
		var mc = new Hammer(document.querySelector('html'));
		var $menu = $('#menu');
		var $menumask = $('#menumask');
		mc.on('swipeleft', function (ev) {
			$menu.removeClass('show');
			$menumask.removeClass('show');
		});
		$('#header .menu').click(function () {
			$menu.toggleClass('show');
			$menumask.toggleClass('show');
		});
		$menu.find('.close').click(function () {
			$menu.removeClass('show');
			$menumask.removeClass('show');
		});
	});
});
//*/
require(['jquery', 'datepicker'], function () {
	$(document).on('click', 'input.date', function () {
		WdatePicker({
			onpicked: function () {
				$(this).change()
			}
		});
	});
	$(document).on('click', 'input.datetime', function () {
		WdatePicker({
			dateFmt: 'yyyy-MM-dd HH点',
			onpicked: function () {
				$(this).change()
			}
		});
	});
});

require(['jquery'], function () {
//function resize() {
//	$('#contwrap').css('min-height', $(window).height() - 54);
//}
	$(function () {
		stats();
		if ($('form.yuform').length) {
			require(['yuform'], function () {
				$('.yuform').yuform();
			});
		}
		if ($('.pages').length) {
			loadmore();
		}
		$('.content img').removeAttr('width').removeAttr('height');
		//resize();
		//$(window).resize(function () {
		//	resize();
		//});
	});
});
//*/

//require(['yupost'], function () {
//	$(function () {
//		$(document).on('click', '.likeadd', function () {
//			$(document).yupost({
//				action: '/order/like/edit_ajax',
//				datas: {id: $(this).data('id')}
//			});
//		});
//		$(document).on('click', '.cartadd', function () {
//			$(document).yupost({
//				action: '/order/cart/edit_ajax',
//				datas: {id: $(this).data('id'), model: $(this).data('model'), quantity: $(this).data('quantity')}
//			});
//		});
//	});
//});


require(['yupost'], function () {
	$(function () {
		$(document).on('click', '.likeadd', function () {
			$(document).yupost({
				action: '/order/like/edit_ajax',
				datas: {id: $(this).data('id')}
			});
		});
		$(document).on('click', '.cartadd', function () {

			$(document).yupost({
				action: '/order/cart/edit_ajax',
				datas: {id: $(this).data('id'),quantity: $('#qty').val()}
			});

			// window.location.href=window.location.href;
		});
	});
});