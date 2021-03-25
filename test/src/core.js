import test from 'ava';
import { __factorize__ } from '@aureooms/js-prime' ;
import { $2, iadd1, eq0, gt1, divmod } from "@aureooms/js-number" ;
import {
	_add , _sub , _mul , _div , _pow ,
	_cmp , _cmp_no_bounds ,
	_simplify , _digits , _stringify_digits ,
	_parse_fraction , _parse_fixed_point
} from "../../src/index.js";

const GOOGOL = '10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' ;

const factorize = __factorize__( $2, iadd1, eq0, gt1, divmod ) ;

const ufactors = n => new Set(factorize(n)) ;

import { ALU } from "./_fixtures.js" ;

function binary ( t , alu , [ [ _x , _y , factory ] , a , b , c , d , e ] ) {

	const apply = factory( alu );

	const num  = x => Number(alu.str(x[0])) / Number(alu.str(x[1])) ;

	const a0 = alu.reg(a);
	const a1 = alu.reg(b);
	const b0 = alu.reg(c);
	const b1 = alu.reg(d);

	const z = apply( a0 , a1 , b0 , b1 ) ;

	if ( Number.isInteger(z) ) t.is(e, z) ;
	else t.is(e, num(z));

}

binary.title = ( _ , alu , [ [ name , op , impl ] , a , b , c , d , e] ) => {
	return `${name}<${impl.name}, ${alu.name}> ${a}/${b} ${op} ${c}/${d} = ${e}` ;
} ;

function binary_n ( t , alu , [ [ _x , _y , factory ] , a , b , n , e ] ) {

	const apply = factory( alu );

	const num  = x => Number(alu.str(x[0])) / Number(alu.str(x[1])) ;

	const a0 = alu.reg(a);
	const a1 = alu.reg(b);

	const z = apply( a0 , a1 , n ) ;

	if ( Number.isInteger(z) ) t.is(e, z) ;
	else t.is(e, num(z));

}

binary_n.title = ( _ , alu , [ [ name , op , impl ] , a , b , n , e] ) => {
	return `${name}<${impl.name}, ${alu.name}> ${a}/${b} ${op} ${n} = ${e}` ;
} ;

function unary ( t , alu , [ [ _x , _y , factory ] , a , b , e ] ) {

	const apply = factory( alu );

	const _a = alu.reg(a);
	const _b = alu.reg(b);

	const z = apply( _a , _b ) ;

	t.is(e, z);

}

unary.title = ( _ , alu , [ [ name , op , impl ] , a , b , e ] ) => {
	return `${name}<${impl.name}, ${alu.name}> ${name}(${a}/${b}) ${op} ${e}` ;
} ;

function macro_parse ( t , alu , [ [ _x , _y , factory ] , base , s , e ] ) {

	const apply = factory( alu );

	const z = apply(base, s)

	t.is(e, z) ;

}

macro_parse.title = ( _ , alu , [ [ name , op , impl ] , base , s , e ] ) => {
	return `${name}<${impl.name}, ${alu.name}> ${name}(${base},${s}) ${op} ${e}` ;
} ;

const add = [ 'add' , '+' , [ _add ] , binary ] ;
const sub = [ 'sub' , '-' , [ _sub ] , binary ] ;
const mul = [ 'mul' , '*' , [ _mul ] , binary ] ;
const div = [ 'div' , '/' , [ _div ] , binary ] ;
const pow = [ 'pow' , '^' , [ _pow ] , binary_n ] ;
const cmp = [ 'cmp' , '~' , [ _cmp , _cmp_no_bounds ] , binary ] ;
const simplify = [ 'simplify' , '=' , [
	alu => {
		const repr = x => `${alu.str(x[0])}/${alu.str(x[1])}` ;
		const simp = _simplify(alu) ;
		return (a,b) => repr(simp(a,b)) ;
	}
] , unary , alu => alu.egcd ] ;


const stringify_n = b => alu => {
	const bfactors = ufactors(b) ;
	const digits = _digits(alu) ;
	const stringify_digits = _stringify_digits(alu) ;
	return ( x , d ) => stringify_digits( b , digits(b, bfactors, x, d) ) ;
} ;


const stringify_10 = [ 'stringify_10' , '=' , [ stringify_n(10) ] , unary , alu => alu.egcd ] ;
const stringify_2 = [ 'stringify_2' , '=' , [ stringify_n(2) ] , unary , alu => alu.egcd ] ;
const stringify_19 = [ 'stringify_19' , '=' , [ stringify_n(19) ] , unary , alu => alu.egcd ] ;

const parse_fraction = [ 'parse_fraction' , '=' , [
	alu => {
		const repr = x => `${alu.str(x[0])}/${alu.str(x[1])}` ;
		const simp = _simplify(alu) ;
		const parse = _parse_fraction(alu);
		return (base, s) => repr(simp(...parse(base, s))) ;
	}
] , macro_parse , alu => alu.anybase ] ;
const parse_fixed_point = [ 'parse_fixed_point' , '=' , [
	alu => {
		const repr = x => `${alu.str(x[0])}/${alu.str(x[1])}` ;
		const simp = _simplify(alu) ;
		const parse = _parse_fixed_point(alu);
		return (base, s) => repr(simp(...parse(base, s))) ;
	}
] , macro_parse , alu => alu.egcd && alu.anybase ] ;

const PARAMS = [

	[ add , '3', '4', '1', '4', 1] ,
	[ add , '1', '10', '2', '10', 0.3] ,
	[ add , '5', '10', '2', '10', 0.7] ,
	[ add , '18', '10', '2', '10', 2] ,
	[ add , '1', '3', '1', '6', 0.5] ,
	[ add , '1', '3', '2', '6', 2 / 3] ,

	[ sub , '5', '4', '1', '4', 1 ] ,
	[ sub , '5', '10', '2', '10', 0.3 ] ,
	[ sub , '9', '10', '2', '10', 0.7 ] ,
	[ sub , '22', '10', '2', '10', 2 ] ,
	[ sub , '2', '3', '1', '6', 0.5 ] ,
	[ sub , '3', '3', '2', '6', 2 / 3 ] ,

	[ mul , '3', '4', '1', '4', 3 / 16 ] ,
	[ mul , '1', '10', '2', '10', 0.02 ] ,
	[ mul , '5', '10', '2', '10', 0.1 ] ,
	[ mul , '18', '10', '2', '10', 0.36 ] ,
	[ mul , '1', '3', '1', '6', 1 / 18 ] ,
	[ mul , '1', '3', '2', '6', 1 / 9 ] ,

	[ div , '3', '4', '1', '4', 3 ] ,
	[ div , '1', '10', '2', '10', 1 / 2 ] ,
	[ div , '5', '10', '2', '10', 5 / 2 ] ,
	[ div , '18', '10', '2', '10', 9 ] ,
	[ div , '1', '3', '1', '6', 2 ] ,
	[ div , '1', '3', '2', '6', 1 ] ,

	[ pow , '2', '3', 4, 16 / 81 ] ,
	[ pow , '-2', '3', 4, 16 / 81 ] ,

	[ pow , '2', '3', 3, 8 / 27 ] ,
	[ pow , '-2', '3', 3, - 8 / 27 ] ,

	[ pow , '2', '3', -4, 81 / 16 ] ,
	[ pow , '-2', '3', -4, 81 / 16 ] ,

	[ pow , '2', '3', -3, 27 / 8 ] ,
	[ pow , '-2', '3', -3, - 27 / 8 ] ,

	[ pow , '2', '3', 0 , 1 ] ,
	[ pow , '-2', '3', 0 , 1 ] ,

	[ cmp , '3', '4', '1', '4', 1 ] ,
	[ cmp , '1', '10', '2', '10', -1 ] ,
	[ cmp , '5', '10', '2', '10', 1 ] ,
	[ cmp , '18', '10', '2', '10', 1 ] ,
	[ cmp , '1', '3', '1', '6', 1 ] ,
	[ cmp , '1', '3', '2', '6', 0 ] ,
	[ cmp , '6', '7', '13', '14', -1 ] ,
	[ cmp , '7', '6', '14', '13', 1 ] ,

	[ cmp , '1', '0', '6', '7', 1 ] ,
	[ cmp , '1', '0', '-6', '7', 1 ] ,
	[ cmp , '-1', '0', '6', '7', -1 ] ,
	[ cmp , '-1', '0', '-6', '7', -1 ] ,

	[ cmp , '1', '0', '999999', '1', 1 ] ,
	[ cmp , '1', '0', '-999999', '1', 1 ] ,
	[ cmp , '-1', '0', '999999', '1', -1 ] ,
	[ cmp , '-1', '0', '-999999', '1', -1 ] ,

	[ cmp , '1', '0', '1', '0', 0 ] ,
	[ cmp , '1', '0', '-1', '0', 1 ] ,
	[ cmp , '-1', '0', '1', '0', -1 ] ,
	[ cmp , '-1', '0', '-1', '0', 0 ] ,

	[ cmp , '1', '0', '999999', '0', 0 ] ,
	[ cmp , '1', '0', '-999999', '0', 1 ] ,
	[ cmp , '-1', '0', '999999', '0', -1 ] ,
	[ cmp , '-1', '0', '-999999', '0', 0 ] ,

	[ cmp , GOOGOL, '7', GOOGOL, '3', -1 ] ,
	[ cmp , GOOGOL, '3', GOOGOL, '7', 1 ] ,
	[ cmp , GOOGOL, '7', GOOGOL, '7', 0 ] ,
	[ cmp , GOOGOL, '3', GOOGOL, '3', 0 ] ,
	[ cmp , GOOGOL, GOOGOL, GOOGOL, GOOGOL, 0 ] ,

	[ simplify , GOOGOL, GOOGOL, '1/1' ] ,
	[ simplify , '7', '14', '1/2' ] ,
	[ simplify , '-7', '14', '-1/2' ] ,
	[ simplify , '170141183460469231731687303715884105729' , '56713727820156410577229101238628035243' , '3/1' ] ,
	[ simplify , '56713727820156410577229101238628035243' , '170141183460469231731687303715884105729' , '1/3' ] ,
	[ simplify , '170141183460469231731687303715884105729' , '3' , '56713727820156410577229101238628035243/1' ] ,
	[ simplify , '3' , '170141183460469231731687303715884105729' , '1/56713727820156410577229101238628035243' ] ,
	[ simplify , '-170141183460469231731687303715884105729' , '56713727820156410577229101238628035243' , '-3/1' ] ,
	[ simplify , '-56713727820156410577229101238628035243' , '170141183460469231731687303715884105729' , '-1/3' ] ,
	[ simplify , '-170141183460469231731687303715884105729' , '3' , '-56713727820156410577229101238628035243/1' ] ,
	[ simplify , '-3' , '170141183460469231731687303715884105729' , '-1/56713727820156410577229101238628035243' ] ,

	[ stringify_10 , '1' , '7' , '0.|142857' ] ,
	[ stringify_10 , '-4' , '8' , '-0.5' ] ,
	[ stringify_10 , '7' , '14' , '0.5' ] ,
	[ stringify_10 , '0' , '43' , '0' ] ,
	[ stringify_10 , '86' , '43' , '2' ] ,
	[ stringify_10 , '2' , '46' , '0.|0434782608695652173913' ] ,
	[ stringify_10 , '1' , '46' , '0.0|2173913043478260869565' ] ,
	[ stringify_10 , '1' , '14' , '0.0|714285'] ,
	[ stringify_10 , '1' , '45' , '0.0|2' ] ,
	[ stringify_10 , '733' , '750' , '0.977|3' ] ,
	[ stringify_10 , '22' , '7' , '3.|142857' ] ,
	[ stringify_10 , '355' , '113' , '3.|1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168' ] ,
	[ stringify_10 , '7775' , '2260' , '3.44|0265486725663716814159292035398230088495575221238938053097345132743362831858407079646017699115044247787610619469' ] ,

	[ stringify_2 , '-4' , '8' , '-0.1' ] ,
	[ stringify_2 , '7' , '14' , '0.1' ] ,
	// printf -- "scale=10;obase=2;1/7\n" | bc --mathlib
	[ stringify_2 , '1' , '7' , '0.|001' ] ,

	[ stringify_19 , '1' , '2' , '0.|9' ] , // HAHA

	[ stringify_19 , '14' , '13', '1.|18ebd2ha475g'] , // HOHO

	[ parse_fraction , 10 , '1/2' , '1/2' ] ,
	[ parse_fraction , 10 , '10/20' , '1/2' ] ,

	[ parse_fixed_point , 19 , '1.|18ebd2ha475g' , '14/13' ] ,
	[ parse_fixed_point , 2 , '0.1' , '1/2' ] ,
	[ parse_fixed_point , 10 , '3.|1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168' , '355/113' ] ,

	[ parse_fixed_point , 10 , '0.0|2' , '1/45' ] ,
	[ parse_fixed_point , 10 , '0.|142857' , '1/7' ] ,

] ;

for (const alu of ALU)
for (const [[name, symbol, implementations, macro, predicate], ...params] of PARAMS)
if (!predicate || predicate(alu)) {
	for (const factory of implementations)
		test(macro, alu, [[name, symbol, factory], ...params]);
}
