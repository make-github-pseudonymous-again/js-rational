(function(exports, undefined){

	'use strict';


/* js/src/add */
/* js/src/add/add.js */


/**
 * Dummy add template.
 */

var add_t = function(Real, alu){


	var add = function(a, b){
		var d = alu.mul(a[1], b[1]);
		var x = alu.mul(a[0], b[1]);
		var y = alu.mul(b[0], a[1]);
		var n = alu.add(x, y);

		return new Real(n, d);
	};

	return add;

};


exports.add_t = add_t;

/* js/src/div */
/* js/src/div/div.js */

/**
 * Dummy div template.
 */

var div_t = function(Real, alu){


	var div = function(a, b){
		var d = alu.mul(a[1], b[0]);
		var n = alu.mul(a[0], b[1]);

		return new Real(n, d);
	};

	return div;

};


exports.div_t = div_t;

/* js/src/mul */
/* js/src/mul/mul.js */

/**
 * Dummy mul template.
 */

var mul_t = function(Real, alu){


	var mul = function(a, b){
		var d = alu.mul(a[1], b[1]);
		var n = alu.mul(a[0], b[0]);

		return new Real(n, d);
	};

	return mul;

};


exports.mul_t = mul_t;

/* js/src/sub */
/* js/src/sub/sub.js */

/**
 * Dummy sub template.
 */

var sub_t = function(Real, alu){


	var sub = function(a, b){
		var d = alu.mul(a[1], b[1]);
		var x = alu.mul(a[0], b[1]);
		var y = alu.mul(b[0], a[1]);
		var n = alu.sub(x, y);

		return new Real(n, d);
	};

	return sub;

};


exports.sub_t = sub_t;

})(typeof exports === 'undefined' ? this['rational'] = {} : exports);
