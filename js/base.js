//设置_IE为IE版本号，IE10及以上和非IE浏览器都为10
var _IE = (function () {
	var v = 3;
	var div = document.createElement('div');
	var all = div.getElementsByTagName('i');
	while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
	return v > 4 ? v : 10;
}());

//json支持
if (!window.JSON) {
	window.JSON = {
		parse: function (sJSON) {
			return eval("(" + sJSON + ")");
		},
		stringify: function (vContent) {
			if (vContent instanceof Object) {
				var sOutput = "";
				if (vContent.constructor === Array) {
					for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
					return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
				}
				if (vContent.toString !== Object.prototype.toString) {
					return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
				}
				for (var sProp in vContent) {
					sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
				}
				return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
			}
			return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
		}
	};
}

var _STATIC = '/static';

require.config({
	baseUrl: _STATIC + '/lib',
	paths: {
		'kindeditor': _STATIC + '/lib/kindeditor/kindeditor',
		'ztree': _STATIC + '/lib/ztree/jquery.ztree.all.min',
		'datepicker': _STATIC + '/lib/datepicker/WdatePicker',
		'artdialog': _STATIC + '/lib/artdialog/dialog',
		'contextmenu': _STATIC + '/lib/contextmenu/jquery.contextMenu',
		'qtip': _STATIC + '/lib/qtip/jquery.qtip.min',
		'jplayer': _STATIC + '/lib/jplayer/jplayer',
		'html5media': _STATIC + '/lib/html5media/html5media.min',
		'jscrollpane': _STATIC + '/lib/jscrollpane/jquery.jscrollpane', //滚动条
		'fancybox': _STATIC + '/lib/fancybox/jquery.fancybox', //图片展示
		'fancyboxthumbs': _STATIC + '/lib/fancybox/helpers/jquery.fancybox-thumbs',
		'plupload': _STATIC + '/lib/plupload/plupload.full.min',
		'layer': _STATIC + '/lib/layer/layer',
		'swiper': _STATIC + '/lib/swiper/swiper.min' //切换
	},
	shim: {
		'kindeditor': {deps: ['css!' + _STATIC + '/lib/kindeditor/themes/default/default.css']},
		'ztree': {deps: ['css!ztree', 'jquery']},
		'artdialog': {deps: ['css!artdialog', 'jquery']},
		'contextmenu': {deps: ['css!contextmenu', 'jquery']},
		'qtip': {deps: ['css!qtip']},
		'jscrollpane': {deps: ['css!jscrollpane']},
		'fancybox': {deps: ['css!fancybox', 'jquery']},
		'fancyboxthumbs': {deps: ['css!fancyboxthumbs', 'fancybox']},
		'swiper': {deps: ['css!swiper', 'jquery']},
		'layer': {deps: ['css!' + _STATIC + '/lib/layer/skin/layer.css', 'jquery']},
		'mailautocomplete': ['jquery'],
		'jqueryui': ['jquery'],
		'lazyload': ['jquery'],
		'placeholder': ['jquery'],
		'velocity': ['jquery'], //高速动画
		'easing': ['jquery'], //动画缓动效果
		'eraser': ['jquery'], //擦除
		'rotate': ['jquery'], //图片旋转
		'grayscale': ['jquery'], //灰度
		'jsticky': ['jquery'], //滚动悬停
		'timer': ['jquery'],
		'bpa': ['jquery'], //背景定位渐变支持
		's2t': ['jquery'] //简繁转换
	}
});

//IE9以下HTML5支持
if (_IE < 9) {
	require.config({
		paths: {
			'jquery': 'jquery1x'
		}
	});
	document.write('<script src="' + _STATIC + '/lib/html5shiv.js"></script>');
}
if (_IE == 7) {
	document.write('<style>img{-ms-interpolation-mode:bicubic;}</style>');
}
if (_IE == 6) {
	require(['jquery'], function () {
		$(function () {
			$('a[href!=""]').css('cursor', 'pointer');
		});
	});
	try {
		document.execCommand('BackgroundImageCache', false, true);
	} catch (e) {
	}
}

//require(['prefixfree']);

//包括Max Min
function random(a, b) {
	return parseInt(a + Math.random() * (b - a + 1));
}

//PHP round
function round(num, _len) {
	var len = _len ? _len : 0;
	return Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
}

//个数从0开始
function indexPos(total, current, pos) {
	var index = (current + pos) % total;
	if (index < 0) {
		index = index + total;
	}
	return index;
}

//统计
function stats() {
	$.post('http://' + window.location.host + '/order/stats', {
		fb_id: fb_id || 0,
		tb_id: tb_id || 0,
		site: _site
	});
}

//返回Flash版本号，无Flash插件则无返回
function flashVer() {
	try {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if (swf) {
			return parseInt(swf.GetVariable('$version').split(' ')[1].split(',')[0]);
		}
	} catch (e) {
		var swf = navigator.plugins['Shockwave Flash'];
		if (swf) {
			var words = swf.description.split(' ');
			for (var i = 0; i < words.length; ++i) {
				if (isNaN(parseInt(words[i]))) continue;
				return parseInt(words[i]);
			}
		}
	}
}


//设置首页
function setHome(obj, _url) {
	var url = _url || document.URL;
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(url);
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert('您的浏览器不允许网页设置首页。\n请手动进入浏览器选项设置。');
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', url);
		}
	}
}

//加入收藏夹
function addFav(_url, _title) {
	var url = _url || document.URL;
	var title = _title || document.title;
	try {
		window.external.addFavorite(url, title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, url, '');
		} catch (e) {
			alert('请使用 Ctrl+D 收藏本页');
		}
	}
}