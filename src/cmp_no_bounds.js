export function _cmp_no_bounds ( { jz , lt0 , mul , cmp } ) {
	return function (a,b,c,d) {
		if (jz(b)) {
			if(lt0(a)) {
				// a/b = -Infinity
				return jz(d) ? lt0(c) ?
					 0 : // b/d = -Infinity
					-1 : // b/d = Infinity
					-1 ; // b/d is finite
			}
			else {
				// a/b = Infinity
				return jz(d) ? lt0(c) ?
					 1 : // b/d = -Infinity
					 0 : // b/d = Infinity
					 1 ; // b/d is finite
			}
		}
		// a/b is finite
		if (jz(d)) return lt0(c) ?
			 1 : // b/d = -Infinity
			-1 ; // b/d = Infinity

		return cmp(mul(a,d), mul(b,c)) ;
	} ;
}
