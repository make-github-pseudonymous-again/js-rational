import int from 'int' ;
import BN from 'bn.js' ;
import { ZZ } from '@aureooms/js-integer' ;

export const ALU = [
	{
		name : 'int',
		add : (a, b) => a.add(b),
		sub : (a, b) => a.sub(b),
		mul : (a, b) => a.mul(b),
		muln : (a, b) => a.mul(b),
		div : (a, b) => a.div(b),
		reg : x => int(x),
		str : x => x.toString(),
		jz  : x => x.eq(0),
		lt0 : x => x.lt(0),
		gt1 : x => x.gt(1),
		cmp  : (a,b) => a.cmp(b),
		eq : (a,b) => a.eq(b),
		neg : x => x.neg(),
		sgn : x => x.cmp(0),
		abs : x => x.abs(),
		divmod : (a,b) => [a.div(b), a.mod(b)],
		divmodn : (a,b) => [a.div(b), a.mod(b)],
		pown : (x,n) => x.pow(n),
	},
	{
		name : 'bn.js',
		add : (a, b) => a.add(b),
		sub : (a, b) => a.sub(b),
		mul : (a, b) => a.mul(b),
		muln : (a, b) => a.muln(b),
		div : (a, b) => a.div(b),
		reg : x => new BN(x),
		str : (x, base) => x.toString(base),
		jz  : x => x.eqn(0),
		lt0 : x => x.ltn(0),
		gt1 : x => x.gtn(1),
		cmp  : (a,b) => a.cmp(b),
		eq : (a,b) => a.eq(b),
		sgn : x => x.cmpn(0),
		abs : x => x.abs(),
		neg : x => x.neg(),
		divmod : (a,b) => {
			const { div , mod } = a.divmod(b) ;
			return [div, mod] ;
		} ,
		divmodn : (a,b) => {
			const { div , mod } = a.divmod(new BN(b)) ;
			return [div, mod] ;
		} ,
		egcd : (a,b) => {
			const gcd = a.gcd(b) ;
			return { u: b.div(gcd), v: a.div(gcd) } ;
		} ,
		pown : (x,n) => x.pow(new BN(n)),
	},
	{
		name : '@aureooms/js-integer',
		add : (a, b) => a.add(b),
		sub : (a, b) => a.sub(b),
		mul : (a, b) => a.mul(b),
		muln : (a, b) => a.muln(b),
		div : (a, b) => a.div(b),
		reg : x => ZZ.from(x),
		str : (x, base) => x.toString(base),
		jz  : x => x.iszero(),
		lt0 : x => x.sign() < 0,
		gt1 : x => x.gtn(1),
		cmp  : (a,b) => a.cmp(b),
		eq : (a,b) => a.eq(b),
		sgn : x => x.sign(),
		abs : x => x.abs(),
		neg : x => x.opposite(),
		divmod : (a,b) => a.divmod(b),
		divmodn : (a,b) => a.divmodn(b),
		egcd : (a,b) => {
			const { u , v } = a.egcd(b) ;
			return {
				u: u.iabs(),
				v: v.iabs(),
			} ;
		},
		pown : (x,n) => x.pown(n),
	}
];

