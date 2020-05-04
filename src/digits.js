import { take } from '@aureooms/js-itertools' ;
import { _decimals } from './decimals' ;
import { _transient } from './transient' ;

export function _digits ( { b , bfactors , jz , gt1 , eq , muln , divmodn , divmod , egcd , sgn , abs } ) {

	const tr = _transient( { bfactors , jz , gt1 , divmodn } ) ;
	const dec = _decimals( { b , eq , muln , divmod } ) ;

	return function ( x , d ) {

		const [ left , r ] = divmod(abs(x), d) ;

		const { u , v } = egcd(d, r) ;

		const [ transient_length , has_repetend ] = tr( v ) ;

		const decimals = dec(v, transient_length, has_repetend , u) ;

		const transient = [ ...take(decimals, transient_length) ] ;

		const repetend = [ ...decimals ] ;

		return { sign: sgn(x) , left , transient , repetend } ;

	}

}
