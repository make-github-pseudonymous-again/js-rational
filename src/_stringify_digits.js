export function _stringify_digits ( { str } ) {

	return function ( base , { sign , integral , transient , repetend } ) {

		const toStr = x => str(x, base);

		let repr = '' ;

		if (sign < 0) repr += '-' ;

		repr += toStr(integral) ;

		if (transient.length || repetend.length) repr += '.' ;
		repr += transient.map(toStr).join('') ;

		if (repetend.length) repr += '|' ;
		repr += repetend.map(toStr).join('') ;

		return repr ;

	} ;

}
