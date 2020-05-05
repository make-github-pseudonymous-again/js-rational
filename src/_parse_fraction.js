
import { FRACTION_SEP } from './_constants' ;

export function _parse_fraction ( { reg } ) {

	return function ( base , s ) {

		const [ _numerator , _denominator ] = s.split(FRACTION_SEP) ;

		return [ reg(_numerator, base), reg(_denominator, base) ] ;

	}

}
