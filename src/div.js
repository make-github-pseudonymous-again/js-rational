/**
 * Dummy div template.
 */

export function _div({mul}) {
	return function (a0, a1, b0, b1) {
		const d = mul(a1, b0);
		const n = mul(a0, b1);

		return [n, d];
	};
}
