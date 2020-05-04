export function _pow ( { pown } ) {

	return function ( a , b , n ) {

		return [ pown(a,n) , pown(b,n) ] ;

	} ;

}

