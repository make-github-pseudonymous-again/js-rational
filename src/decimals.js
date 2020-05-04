// TODO instead allocate enough space M < log_2(d) + d
// for transient + repetend by multiplying x by b**M and do a single division ?
// That may be too much space in most cases. Though necessary when d is prime.

export function _decimals ( { b , eq , muln , divmod } ) {

	return function* ( d , n , x ) {

		// Computes the length of the repetend of x/d (1 <= x < d) in base b
		// with transient part of size n.

		while ( n-- ) {

			x = muln(x, b) ;
			const [q, r] = divmod(x, d) ;
			yield q ;
			x = r ;

		}

		first = x ;

		x = muln(x, b) ;
		const [q, r] = divmod(x, d) ;
		yield q ;
		x = r ;

		while (!eq(first, x)) {

			x = muln(x, b) ;
			const [q, r] = divmod(x, d) ;
			yield q ;
			x = r ;

		}

	} ;

}
