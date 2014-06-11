
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
