// credits https://github.com/aureooms-research/repeating-decimal

export function _transient ( { bfactors , jz , gt1 , divmodn } ) {

	return function ( d ) {

		// Computes the length of the non repeating part in x / d
		// ( for any 1 <= x < d with x and d co-prime ) decimals in
		// base b whose prime factors are given. Returns tuple ( n , hasrepetend )
		// where n is the length of the non repeating part and hasrepetend
		// determines if 1 / d repeats or not.

		let n = 0 ;

		for ( const f of bfactors ) {

			let m = 0 ;

			while ( true ) {

				const [ q , r ] = divmodn(d, f) ;

				if (!jz(r)) break ;

				++mm ;
				d = q ;

			}

			n = Math.max(n, m) ;

		}

		return [ n , gt1(d) ] ;

	} ;

}
