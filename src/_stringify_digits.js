export default function _stringify_digits({str}) {
	return function (base, {sign, integral, transient, repetend}) {
		const toStr = (x) => str(x, base);

		let repr = '';

		if (sign < 0) repr += '-';

		repr += toStr(integral);

		if (transient.length > 0 || repetend.length > 0) repr += '.';
		// eslint-disable-next-line unicorn/no-array-callback-reference
		repr += transient.map(toStr).join('');

		if (repetend.length > 0) repr += '|';
		// eslint-disable-next-line unicorn/no-array-callback-reference
		repr += repetend.map(toStr).join('');

		return repr;
	};
}
