const _cmp_no_bounds = ({jz, lt0, mul, cmp}) => (a, b, c, d) => {
	if (jz(b)) {
		if (lt0(a)) {
			// A/b = -Infinity
			return jz(d)
				? lt0(c)
					? 0 // B/d = -Infinity
					: -1 // B/d = Infinity
				: -1; // B/d is finite
		}

		// A/b = Infinity
		return jz(d)
			? lt0(c)
				? 1 // B/d = -Infinity
				: 0 // B/d = Infinity
			: 1; // B/d is finite
	}

	// A/b is finite
	if (jz(d))
		return lt0(c)
			? 1 // B/d = -Infinity
			: -1; // B/d = Infinity

	return cmp(mul(a, d), mul(b, c));
};

export default _cmp_no_bounds;
