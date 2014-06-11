

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
