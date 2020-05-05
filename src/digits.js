import { take } from '@aureooms/js-itertools' ;
import { _decimals } from './decimals' ;
import { _transient } from './transient' ;

export function _digits ( { jz , gt1 , eq , muln , divmodn , divmod , egcd , sgn , abs } ) {

	const tr = _transient( { jz , gt1 , divmodn } ) ;
	const dec = _decimals( { eq , muln , divmod } ) ;

	return function ( b , bfactors , x , d ) {

		const [ integral , r ] = divmod(abs(x), d) ;

		const { u , v } = egcd(d, r) ;

		const [ transient_length , has_repetend ] = tr( bfactors , v ) ;

		const decimals = dec(b, v, transient_length, has_repetend , u) ;

		const transient = [ ...take(decimals, transient_length) ] ;

		const repetend = [ ...decimals ] ;

		return { sign: sgn(x) , integral , transient , repetend } ;

	}

}
