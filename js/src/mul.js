
/**
 * Dummy mul template.
 */

const _mul = function ( mul ) {

	return function ( a0 , a1 , b0 , b1 ) {

		const d = mul( a1 , b1 ) ;
		const n = mul( a0 , b0 ) ;

		return [ n , d ] ;

	} ;

} ;

exports._mul = _mul;
