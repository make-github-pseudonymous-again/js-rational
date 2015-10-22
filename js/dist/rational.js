"use strict";

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/add.js */

		/**
   * Dummy add template.
   */

		var _add = function _add(mul, add) {

			return function (a0, a1, b0, b1) {

				var d = mul(a1, b1);
				var x = mul(a0, b1);
				var y = mul(b0, a1);
				var n = add(x, y);

				return [n, d];
			};
		};

		exports._add = _add;

		/* js/src/div.js */

		/**
   * Dummy div template.
   */

		var _div = function _div(mul) {

			return function (a0, a1, b0, b1) {

				var d = mul(a1, b0);
				var n = mul(a0, b1);

				return [n, d];
			};
		};

		exports._div = _div;

		/* js/src/mul.js */

		/**
   * Dummy mul template.
   */

		var _mul = function _mul(mul) {

			return function (a0, a1, b0, b1) {

				var d = mul(a1, b1);
				var n = mul(a0, b0);

				return [n, d];
			};
		};

		exports._mul = _mul;

		/* js/src/sub.js */

		/**
   * Dummy sub template.
   */

		var _sub = function _sub(mul, sub) {

			return function (a0, a1, b0, b1) {

				var d = mul(a1, b1);
				var x = mul(a0, b1);
				var y = mul(b0, a1);
				var n = sub(x, y);

				return [n, d];
			};
		};

		exports._sub = _sub;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-rational", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["rational"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-rational");
})();