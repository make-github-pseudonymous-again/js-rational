/**
 * Dummy sub template.
 */

export function _sub({mul, sub}) {
	return function (a0, a1, b0, b1) {
		const d = mul(a1, b1);
		const x = mul(a0, b1);
		const y = mul(b0, a1);
		const n = sub(x, y);

		return [n, d];
	};
}
