/**
 * Dummy mul template.
 */

const _mul = ({mul}) => (a0, a1, b0, b1) => {
	const n = mul(a0, b0);
	const d = mul(a1, b1);

	return [n, d];
};

export default _mul;
