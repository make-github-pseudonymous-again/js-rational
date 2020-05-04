import test from 'ava';
import { _add , _sub , _mul , _div , _pow , _cmp , _cmp_no_bounds , _simplify } from '../../src';

const GOOGOL = '10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' ;

import { ALU } from './_fixtures' ;

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

	const repr = x => `${alu.str(x[0])}/${alu.str(x[1])}` ;

	const _a = alu.reg(a);
	const _b = alu.reg(b);

	const z = apply( _a , _b ) ;

	t.is(e, repr(z));

}

unary.title = ( _ , alu , [ [ name , impl ] , a , b , e ] ) => {
	return `${name}<${impl.name}, ${alu.name}> ${name}(${a}/${b}) = ${e}` ;
} ;

const add = [ 'add' , '+' , [ _add ] , binary ] ;
const sub = [ 'sub' , '-' , [ _sub ] , binary ] ;
const mul = [ 'mul' , '*' , [ _mul ] , binary ] ;
const div = [ 'div' , '/' , [ _div ] , binary ] ;
const pow = [ 'pow' , '^' , [ _pow ] , binary_n ] ;
const cmp = [ 'cmp' , '~' , [ _cmp , _cmp_no_bounds ] , binary ] ;
const simplify = [ 'simplify' , '=' , [ _simplify ] , unary , alu => alu.egcd ] ;

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

] ;

for (const alu of ALU)
for (const [[name, symbol, implementations, macro, predicate], ...params] of PARAMS)
if (!predicate || predicate(alu)) {
	for (const factory of implementations)
		test(macro, alu, [[name, symbol, factory], ...params]);
}
