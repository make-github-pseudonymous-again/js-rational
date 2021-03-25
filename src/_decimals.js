// TODO instead allocate enough space M < log_2(d) + d
// for transient + repetend by multiplying x by b**M and do a single division ?
// That may be too much space in most cases. Though necessary when d is prime.

export default function _decimals({eq, muln, divmod}) {
	return function* (b, d, n, hasrepetend, x) {
		// Computes the length of the repetend of x/d (1 <= x < d) in base b
		// with transient part of size n.

		while (n--) {
			x = muln(x, b);
			const [q, r] = divmod(x, d);
			yield q;
			x = r;
		}

		if (!hasrepetend) return;

		const first = x;

		x = muln(x, b);
		const [q, r] = divmod(x, d);
		yield q;
		x = r;

		while (!eq(first, x)) {
			x = muln(x, b);
			const [q, r] = divmod(x, d);
			yield q;
			x = r;
		}
	};
}
