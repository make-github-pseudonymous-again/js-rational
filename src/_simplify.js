const _simplify = ({egcd, sgn, neg}) => (a, b) => {
	const {u, v} = egcd(a, b);
	return [sgn(v) === sgn(a) ? v : neg(v), sgn(u) === sgn(b) ? u : neg(u)];
};

export default _simplify;
