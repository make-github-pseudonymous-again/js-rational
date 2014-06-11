
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
