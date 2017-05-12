import test from 'ava';
import { _add , _sub , _mul , _div } from '../../src';

import int from 'int' ;
import { ZZ } from '@aureooms/js-integer' ;

function macro ( t , alu , [ [ _x , _y , _z , factory ] , a , b , c , d , e ] ) {

	const apply = factory( alu );

	//const repr = x => `${alu.str(x[0])} / ${alu.str(x[1])}` ;
	const num  = x => Number(alu.str(x[0])) / Number(alu.str(x[1])) ;

	const a0 = alu.reg(a);
	const a1 = alu.reg(b);
	const b0 = alu.reg(c);
	const b1 = alu.reg(d);

	const z = apply( a0 , a1 , b0 , b1 ) ;

	t.is(num(z), e);

}

macro.title = ( _ , alu , [ [ name , op , impl ] , a , b , c , d , e] ) => {
	return `${name}<${impl}, ${alu.name}> ${a}/${b} ${op} ${c}/${d} = ${e}` ;
} ;

const ALU = [
	{
		name : 'node-int based alu',
		add : (a, b) => a.add(b),
		sub : (a, b) => a.sub(b),
		mul : (a, b) => a.mul(b),
		div : (a, b) => a.div(b),
		reg : x => int(x),
		str : x => x.toString()
	},
	{
		name : '@aureooms/js-integer',
		add : (a, b) => a.add(b),
		sub : (a, b) => a.sub(b),
		mul : (a, b) => a.mul(b),
		div : (a, b) => a.div(b),
		reg : x => ZZ.from(x),
		str : x => x.toString()

	}
];

const add = [ 'add' , '+' , '_add' , alu => _add( alu.mul , alu.add ) ] ;
const sub = [ 'sub' , '-' , '_sub' , alu => _sub( alu.mul , alu.sub ) ] ;
const mul = [ 'mul' , '*' , '_mul' , alu => _mul( alu.mul ) ] ;
const div = [ 'div' , '/' , '_div' , alu => _div( alu.mul ) ] ;

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

] ;

for (const alu of ALU)
for (const params of PARAMS)
	test(macro, alu, params);
