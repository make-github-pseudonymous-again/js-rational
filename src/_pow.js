const _pow = ({pown}) => (a, b, n) =>
	n >= 0 ? [pown(a, n), pown(b, n)] : [pown(b, -n), pown(a, -n)];

export default _pow;
