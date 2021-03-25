/**
 * Dummy add template.
 */

const _add = ({mul, add}) => (a0, a1, b0, b1) => {
	const x = mul(a0, b1);
	const y = mul(b0, a1);
	const n = add(x, y);
	const d = mul(a1, b1);

	return [n, d];
};

export default _add;
