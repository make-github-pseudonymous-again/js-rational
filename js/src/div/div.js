
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
