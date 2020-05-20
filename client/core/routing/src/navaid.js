/**
 * The MIT License (MIT)

Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
/* eslint-disable */
import convert from 'regexparam';

export default function Navaid(base, on404) {
	var rgx, curr, routes = [], $ = {};

	var fmt = $.format = function (uri) {
		if (!uri) return uri;
		uri = '/' + uri.replace(/^\/|\/$/g, '');
		return rgx.test(uri) && uri.replace(rgx, '/');
	}

	base = '/' + (base || '').replace(/^\/|\/$/g, '');
	rgx = base == '/' ? /^\/+/ : new RegExp('^\\' + base + '(?=\\/|$)\\/?', 'i');

	$.route = function (uri, replace) {
		if (uri[0] == '/' && !rgx.test(uri)) uri = base + uri;
		history[(uri === curr || replace ? 'replace' : 'push') + 'State'](uri, null, uri);
	}

	$.on = function (pat, fn) {
		(pat = convert(pat)).fn = fn;
		routes.push(pat);
		return $;
	}

	$.run = function (uri) {
		var i = 0, params = {}, arr, obj;
		if (uri = fmt(uri || location.pathname)) {
			uri = uri.match(/[^\?#]*/)[0];
			for (curr = uri; i < routes.length; i++) {
				if (arr = (obj = routes[i]).pattern.exec(uri)) {
					for (i = 0; i < obj.keys.length;) {
						params[obj.keys[i]] = arr[++i] || null;
					}
					obj.fn(params); // todo loop?
					return $;
				}
			}
			if (on404) on404(uri);
		}
		return $;
	}

	$.listen = function (u) {
		wrap('push');
		wrap('replace');

		function run(e) {
			$.run();
		}
		function findA(e){
			var i = 0, p = e.path || e.composedPath && e.composedPath(), a = p && p[i];
			while(a && a.tagName !== 'A') a = p[++i];
			return a || e.target.closest('a');
		  }
		function click(e) {
			var x = findA(e), y = x && x.getAttribute('href');
			if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button || e.defaultPrevented) return;
			if (!y || x.target || x.host !== location.host || x.hasAttribute('download') || x.getAttribute('rel') === 'external') return;
			if (y[0] != '/' || rgx.test(y)) {
				e.preventDefault();
				$.route(y);
			}
		}

		addEventListener('popstate', run);
		addEventListener('replacestate', run);
		addEventListener('pushstate', run);
		addEventListener('click', click);

		$.unlisten = function () {
			removeEventListener('popstate', run);
			removeEventListener('replacestate', run);
			removeEventListener('pushstate', run);
			removeEventListener('click', click);
		}

		return $.run(u);
	}

	return $;
}

function wrap(type, fn) {
	if (history[type]) return;
	history[type] = type;
	fn = history[type += 'State'];
	history[type] = function (uri) {
		var ev = new Event(type.toLowerCase());
		ev.uri = uri;
		fn.apply(this, arguments);
		return dispatchEvent(ev);
	}
}
