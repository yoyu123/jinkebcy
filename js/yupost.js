(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	var methods = {
		init: function (options) {
			return this.each(function () {
				var pending = false;
				var settings = $.extend({
					'notice': '#notification',
					'action': '',
					'datas': '',
					'func': function (data) {
					}
				}, options);

				if (pending) {
					return false;
				}

				pending = true;
				$(settings.notice).removeClass().addClass('pending').html('正在提交...');

				$.post(settings.action, settings.datas)
					.done(function (data) {
						$(settings.notice).removeClass();
						if (data.status) {
							$(settings.notice).addClass(data.status);
						}
						if (data.notice) {
							$(settings.notice).html(data.notice);
						}
						if (data.alert) {
							alert(data.alert);
						}
						if (data.alert=="添加成功！") {
							
							window.location.href=window.location.href;
						}
						if (data.reload) {
							location.reload();
						}
						if (data.redirect) {
							location.href = data.redirect;
						}
						if (data.script) {
							eval(data.script);
						}
						settings.func(data);
					})
					.fail(function () {
						$(settings.notice).html('网络错误，请稍后再试。');
					})
					.always(function () {
						pending = false;
					});
			});
		}
	};

	$.fn.yupost = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist');
		}
	};
}));