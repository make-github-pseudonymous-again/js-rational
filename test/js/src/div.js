	

var int = require('int');
var util = require('util');
var fmt = util.format;



var check = function(ALG, alg, Real, alu, traits){

	var name = fmt('div<%s, %s, %s>', alg, Real.name, alu.name);

	var div = ALG[alg](Real, alu);

	var one = function(a, b, c, d, e){

		a = alu.reg(a);
		b = alu.reg(b);
		c = alu.reg(c);
		d = alu.reg(d);

		x = new Real(a, b);
		y = new Real(c, d);

		z = div(x, y);

		deepEqual(traits.num(z), e, 'should be ' + e);
	};

	test(name, function(){
		one('3', '4', '1', '4', 3);
		one('1', '10', '2', '10', 1 / 2);
		one('5', '10', '2', '10', 5 / 2);
		one('18', '10', '2', '10', 9);
		one('1', '3', '1', '6', 2);
		one('1', '3', '2', '6', 1);
	});

};




// params

var ALG = { 'real.div_t' : real.div_t };

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