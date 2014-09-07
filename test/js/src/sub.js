	

var int = require('int');
var util = require('util');
var fmt = util.format;



var check = function(ALG, alg, Rational, alu, traits){

	var name = fmt('sub<%s, %s, %s>', alg, Rational.name, alu.name);

	var sub = ALG[alg](Rational, alu);

	var one = function(a, b, c, d, e){

		a = alu.reg(a);
		b = alu.reg(b);
		c = alu.reg(c);
		d = alu.reg(d);

		x = new Rational(a, b);
		y = new Rational(c, d);

		z = sub(x, y);

		deepEqual(traits.num(z), e, 'should be ' + e);
	};

	test(name, function(){
		one('5', '4', '1', '4', 1);
		one('5', '10', '2', '10', 0.3);
		one('9', '10', '2', '10', 0.7);
		one('22', '10', '2', '10', 2);
		one('2', '3', '1', '6', 0.5);
		one('3', '3', '2', '6', 2 / 3);
	});

};




// params

var ALG = { 'rational.sub_t' : rational.sub_t };

var REAL = [Array];

var ALU = [{
	name : 'node-int based alu',
	add : function(a, b){ return a.add(b); },
	sub : function(a, b){ return a.sub(b); },
	mul : function(a, b){ return a.mul(b); },
	div : function(a, b){ return a.div(b); },
	reg : function(x){ return int(x); },
}];

var TRAITS = [{
	repr : function(x){ return fmt('%s / %s', x[0].toString(), x[1].toString()); },
	num  : function(x){ return Number(x[0].toString()) / Number(x[1].toString()); }
}];



for (var alg in ALG)
for (var j = 0; j < REAL.length; ++j)
for (var k = 0; k < ALU.length; ++k)
	check(ALG, alg, REAL[j], ALU[k], TRAITS[k]);