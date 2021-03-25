export default function _simplify({egcd, sgn, neg}) {
	return function (a, b) {
		const {u, v} = egcd(a, b);
		return [sgn(v) === sgn(a) ? v : neg(v), sgn(u) === sgn(b) ? u : neg(u)];
	};
}
