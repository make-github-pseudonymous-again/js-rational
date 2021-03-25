export function _cmp({jz, lt0, cmp, neg, divmod}) {
	const compare_positive_fractions = function (a, b, c, d) {
		if (jz(b)) {
			if (jz(d)) return 0;
			return 1;
		}

		if (jz(d)) return -1;
		const [q1, r1] = divmod(a, b);
		const [q2, r2] = divmod(c, d);
		return cmp(q1, q2) || compare_positive_fractions(d, r2, b, r1);
	};

	return function (a, b, c, d) {
		if (lt0(b)) {
			b = neg(b);
			a = neg(a);
		}

		if (lt0(d)) {
			d = neg(d);
			c = neg(c);
		}

		if (lt0(a)) {
			if (lt0(c)) return compare_positive_fractions(neg(c), d, neg(a), b);
			return -1;
		}

		if (lt0(c)) return 1;
		return compare_positive_fractions(a, b, c, d);
	};
}
