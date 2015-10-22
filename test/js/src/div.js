

var int = require('int');
var util = require('util');
var fmt = util.format;



var check = function(ALG, alg, alu, traits){

	var name = fmt('div<%s, %s>', alg, alu.name);

	var div = ALG[alg]( alu.mul );

	var one = function(a, b, c, d, e){

		var a0 = alu.reg(a);
		var a1 = alu.reg(b);
		var b0 = alu.reg(c);
		var b1 = alu.reg(d);

		var z = div( a0 , a1 , b0 , b1 ) ;

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

var ALG = { 'rational._div' : rational._div };

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
for (var k = 0; k < ALU.length; ++k)
	check(ALG, alg, ALU[k], TRAITS[k]);
