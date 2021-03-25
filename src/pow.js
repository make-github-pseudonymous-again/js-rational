export function _pow({pown}) {
	return function (a, b, n) {
		return n >= 0 ? [pown(a, n), pown(b, n)] : [pown(b, -n), pown(a, -n)];
	};
}
