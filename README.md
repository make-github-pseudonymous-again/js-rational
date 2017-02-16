[js-rational](http://aureooms.github.io/js-rational)
==

Rational numbers code bricks for JavaScript.

```js
let [ a , b ] = add( 1 , 10 , 1 , 5 ) ;
a / b === 3 / 10 ; // true
```

[![NPM license](https://img.shields.io/npm/l/@aureooms/js-rational.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-rational/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@aureooms/js-rational.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-rational)
[![Bower version](https://img.shields.io/bower/v/@aureooms/js-rational.svg?style=flat)](http://bower.io/search/?q=@aureooms/js-rational)
[![Build Status](https://img.shields.io/travis/aureooms/js-rational.svg?style=flat)](https://travis-ci.org/aureooms/js-rational)
[![Coverage Status](https://img.shields.io/coveralls/aureooms/js-rational.svg?style=flat)](https://coveralls.io/r/aureooms/js-rational)
[![Dependencies Status](https://img.shields.io/david/aureooms/js-rational.svg?style=flat)](https://david-dm.org/aureooms/js-rational#info=dependencies)
[![devDependencies Status](https://img.shields.io/david/dev/aureooms/js-rational.svg?style=flat)](https://david-dm.org/aureooms/js-rational#info=devDependencies)
[![Code Climate](https://img.shields.io/codeclimate/github/aureooms/js-rational.svg?style=flat)](https://codeclimate.com/github/aureooms/js-rational)
[![NPM downloads per month](https://img.shields.io/npm/dm/@aureooms/js-rational.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-rational)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-rational.svg?style=flat)](https://github.com/aureooms/js-rational/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-rational.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-rational)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-rational
# or
jspm install npm:@aureooms/js-rational
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-rational
```

### bower
```terminal
bower install @aureooms/js-rational
```

### ender
```terminal
ender add @aureooms/js-rational
```

### jam
```terminal
jam install @aureooms/js-rational
```

### spm
```terminal
spm install @aureooms/js-rational --save
```

### npm
```terminal
npm install @aureooms/js-rational --save
```

## Require
### jspm
```js
let rational = require( "github:aureooms/js-rational" ) ;
// or
import rational from '@aureooms/js-rational' ;
```
### duo
```js
let rational = require( "aureooms/js-rational" ) ;
```

### component, ender, spm, npm
```js
let rational = require( "@aureooms/js-rational" ) ;
```

### bower
The script tag exposes the global variable `rational`.
```html
<script src="bower_components/@aureooms/js-rational/js/dist/rational.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "@aureooms/js-rational" ] , function ( rational ) { ... } ) ;
```

## Use

```js
let number = require( '@aureooms/js-number' ) ;
let add = rational._add( number.mul , number.add ) ;
let sub = rational._sub( number.mul , number.sub ) ;
let mul = rational._mul( number.mul ) ;
let div = rational._div( number.mul ) ;
```
