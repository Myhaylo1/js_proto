/* Реализовать функцию конструктор MyArray. */

function MyArray() {
  this.length = 0;
}

let myArrayPrototype = new MyArray;

/* Реализовать метод функции конструктора: MyArray.isMyArray(); */

/**
 *
 * @param {obj} value
 * @returns {boolean}
 */
myArrayPrototype.isMyArray = (value) => value instanceof MyArray;

/* Реализовать прототип для создаваемых коллекций */

/**
 *
 * @returns {number}
 */
myArrayPrototype.push = function push() {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length++] = arguments[i];
  }
  return this.length;
};

/**
 *
 * @param {function} callback
 * @param value
 * @returns {undefined|*}
 */
myArrayPrototype.find = function find(callback, value) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this, value)) return this[i];
  }
  return undefined;
};

/**
 *
 * @param value
 * @param {number} fromIndex
 * @returns {boolean}
 */
myArrayPrototype.includes = function includes(value, fromIndex = 0) {
  if (fromIndex < 0) fromIndex += this.length;
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === value) return true;
  }
  return false;
};

/**
 *
 * @param {string} separator
 * @returns {string}
 */
myArrayPrototype.join = function join(separator = ',') {
  let s;
  if (this.length) s = this[0]; else s = '';
  for (let i = 1; i < this.length; i++) {
    s += separator + String(this[i]);
  }
  return s;
};

/**
 *
 * @param {function} callback
 * @param value
 * @returns {MyArray}
 */
myArrayPrototype.filter = function filter(callback, value) {
  let a = new MyArray();
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this, value)) a.push(this[i]);
  }
  return a;
};

/**
 *
 * @param {function} callback
 * @returns {MyArray}
 */
myArrayPrototype.map = function map(callback) {
  let a = new MyArray();
  for (let i = 0; i < this.length; i++) a.push(callback(this[i], i, this));
  return a;
};

/**
 *
 * @param {function} callback
 * @param {*} initialAccumulator
 * @returns {*}
 */
myArrayPrototype.reduce = function reduce(callback, initialAccumulator) {
let accumulator;
  if (initialAccumulator !== undefined) accumulator = initialAccumulator;
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== undefined) {
      if (accumulator !== undefined) {
        accumulator = callback(accumulator, this[i], i, this);
      } else {
        accumulator = this[i];
      }
    }
  }
  if (accumulator !== undefined) {
    return accumulator;
  } else {
    throw TypeError('reduce of empty array with no initial value');
  }
}
;

/**
 *
 * @param {MyArray} a2
 * @returns {MyArray}
 */
myArrayPrototype.concat = function concat(a2) {
  let a3 = new MyArray;
  for (let i = 0; i < this.length; i++) a3.push(this[i]);
  for (let i = 0; i < a2.length; i++) a3.push(a2[i]);
  return a3;
}

/**
 *
 * @param {number} depth
 * @returns {*}
 */
myArrayPrototype.flat = function flat(depth = 1) {
  let array = new MyArray;
  return this.reduce(function (accumulator, value) {
    if (array.isMyArray(value) && (depth)) {
      accumulator = accumulator.concat(value.flat(--depth));
    } else accumulator.push(value);
    return accumulator;
  }, new MyArray());
}

/**
 * @returns {*}
 */
myArrayPrototype.pop = function pop() {
  let result = undefined;
  if (this.length) {
    result = this[this.length - 1];
    delete this[--this.length];
  }
  return result;
}

MyArray.prototype = myArrayPrototype;

console.log(`MyArray=${MyArray}`);

let mas = new MyArray();

console.log('It was: mas[]=', mas);
console.log(`mas.isMyArray(mas)=${mas.isMyArray(mas)}`);
console.log(`mas.isMyArray([])=${mas.isMyArray([])}`);
mas.push(12, -45, -5, '4');
console.log('mas[] has become after push: mas=', mas);

/**
 *
 * @param element
 * @param {number} index
 * @param array
 * @param value
 * @returns {boolean}
 */
function callbackFindElement(element, index, array, value) {
  return element === value;
}

/**
 *
 * @param element
 * @param {number} index
 * @param array
 * @returns {boolean}
 */
function callbackFindNegativeElement(element, index, array) {
  if (typeof element === 'number') return element < 0; else return false;
}

console.log(`Find mas[i]="4": ${mas.find(callbackFindElement, '4')}`);
console.log(`Find mas[i]=4: ${mas.find(callbackFindElement, 4)}`);
console.log(`Find mas[i]<0: ${mas.find(callbackFindNegativeElement)}`);

console.log(`Includes mas[i]=-5? ${mas.includes(-5)}`);
console.log(`Includes mas[i]=-5 for i>=3? ${mas.includes(-5, 3)}`);
console.log(`Includes mas[i]=-5 for i>=-2? ${mas.includes(-5, -2)}`);

console.log(`Convert a[] to string without separator: ${mas.join('')}`);
console.log(`Convert a[] to string with separator=',': ${mas.join()}`);
console.log(`Convert a[] to string with separator='+': ${mas.join('+')}`);

console.log('Create new [mas[i]<0]: ', mas.filter(callbackFindNegativeElement));

/**
 *
 * @param element
 * @param {number} index
 * @param array
 * @returns {number}
 */
function callbackSqrElement(element, index, array) {
  if (typeof element === 'number') return element * element;
}

console.log('Create new [map[i]**]: ', mas.map(callbackSqrElement));

mas = new MyArray();
//mas.push(undefined,undefined,2,undefined,undefined);
mas.push(2);
console.log('mas=', mas);
console.log('mas.reduce((a,b) => a+b*b) = 2: ', mas.reduce(function (accumulator, value) {
  return accumulator + value * value;
}));
console.log('mas.reduce((a,b) => a+b*b,1) = 5: ', mas.reduce(function (accumulator, value) {
  return accumulator + value * value;
}, 1));
console.log();

mas.push(3);
console.log('mas=', mas);
console.log('mas.reduce((a,b) => a+b*b) = 11: ', mas.reduce((a, b) => a + b * b));
console.log('mas.reduce((a,b) => a+b*b,1) = 14: ', mas.reduce((a, b) => a + b * b, 1));
console.log();

mas.push('4');
console.log('mas=', mas);
console.log('mas.reduce((a,b) => a+b)) = "54": ', mas.reduce((a, b) => a + b));
console.log('mas.reduce((a,b) => a+b),"1") = "1234": ', mas.reduce((a, b) => a + b, '1'));
console.log('mas.reduce(function(accumulator, value),"1") = "1234": ', mas.reduce(function (accumulator, value) {
  return accumulator + value
}, '1'));
console.log();

mas = new MyArray();
mas.push(1, 2, 3);
mas1 = new MyArray();
mas1.push(11, 22, 33);
mas2 = new MyArray();
mas2.push(111, 222, 333);
// mas3 = new MyArray();
// mas3.push(1111,2222,3333);
// mas2.push(mas3);
mas1.push(mas2);
mas.push(mas1);
//mas.push(4,5,6);

console.log('mas=', mas, ' mas.flat()=', mas.flat());
console.log('mas=', mas, ' mas.flat(2)=', mas.flat(2));
console.log('mas=', mas, ' mas.flat(0)=', mas.flat(0));
console.log();

mas = new MyArray();
mas.push(1, 2, 3, 4, 5);
console.log('It was: mas[]=', mas);
console.log('mas[] has become after pop(): ', mas.pop(), ' is deleted, thefore mas=', mas);
mas = new MyArray();
console.log('It was: mas[]=', mas);
console.log('mas[] has become after pop(): ', mas.pop(), ' is deleted, thefore mas=', mas);

var arr = [1, 2, 3, [11, 22, 33, 44, [222, 333, 444]]];

/**
 *
 * @param {Array} arr
 * @returns {Array}
 */
function flatRecursive(arr) {
  return arr.reduce((acc, val) =>
      Array.isArray(val) ? acc.concat(flatRecursive(val)) : acc.concat(val)
    , new Array);
}

console.log(flatRecursive(arr)); // [1, 2, 3, 11, 22, 33, 44, 222, 333, 444]
