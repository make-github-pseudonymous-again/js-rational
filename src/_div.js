/**
 * Dummy div template.
 */

const _div = ({mul}) => (a0, a1, b0, b1) => {
	const n = mul(a0, b1);
	const d = mul(a1, b0);
	return [n, d];
};

export default _div;
