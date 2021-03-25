import FRACTION_SEP from './constants/FRACTION_SEP.js';

const _parse_fraction = ({reg}) => (base, s) => {
	const [_numerator, _denominator] = s.split(FRACTION_SEP);

	return [reg(_numerator, base), reg(_denominator, base)];
};

export default _parse_fraction;
