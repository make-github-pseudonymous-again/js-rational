import { _decimals } from './_decimals' ;
import { _transient } from './_transient' ;

export function _stringify ( { b , bfactors , jz , gt1 , eq , muln , divmodn , divmod , egcd } ) {

	const tr = _transient( { bfactors , jz , gt1 , divmodn } ) ;
	const dec = _decimals( { b , eq , muln , divmod } ) ;

	return function ( x , d ) {

		const [ left , r ] = divmod(x, d) ;

		const { u , v } = egcd(d, r) ;

		const [ transient_length , has_repetend ] = tr( v ) ;

		const right = [ ...dec(v, transient_length, u) ] ;

		return [ left , right ] ;

	}

}
