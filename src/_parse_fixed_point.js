import DECIMAL_PREFIX from './constants/DECIMAL_PREFIX.js';
import REPETEND_PREFIX from './constants/REPETEND_PREFIX.js';

export default function _parse_fixed_point({_chr, reg, sub}) {
	return function (base, s) {
		const [integral, decimal] = s.split(DECIMAL_PREFIX);
		const [transient, repetend] = decimal.split(REPETEND_PREFIX);

		const _integral = integral === '0' ? '' : integral;
		const _repetend = repetend || '';

		const _denominator =
			(!_repetend
				? _chr(1)
				: new Array(repetend.length + 1).join(_chr(base - 1))) +
			new Array(transient.length + 1).join(_chr(0));

		const _big = _integral + transient + _repetend;
		const _small = _integral + transient || '0';

		const _bign = reg(_big, base);
		const _smalln = reg(_small, base);

		const numerator = _repetend ? sub(_bign, _smalln) : _smalln;
		const denominator = reg(_denominator, base);

		return [numerator, denominator];
	};
}
