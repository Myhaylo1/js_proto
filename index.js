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
};

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
console.log('mas.reduce((a,b) => a+b*b) = 2: ', mas.reduce(function (accumulator, value, index, array) {
  return accumulator + value * value;
}));
console.log('mas.reduce((a,b) => a+b*b,1) = 5: ', mas.reduce(function (accumulator, value, index, array) {
  return accumulator + value * value;
}, 1));
console.log();
mas.push(3);
console.log('mas=', mas);
// console.log('mas.reduce((a,b) => a+b*b) = 11: ', mas.reduce((a, b) => a + b * b));
console.log('mas.reduce((a,b) => a+b*b,1) = 14: ', mas.reduce((a, b) => a + b * b, 1));
console.log();

mas.push('4');
console.log('mas=', mas);
console.log('mas.reduce((a,b) => a+b*b) = "54": ', mas.reduce((a, b) => a + b));
console.log('mas.reduce((a,b) => a+b*b) = "1234": ', mas.reduce((a, b) => a + b, '1'));
console.log('mas.reduce(function(accumulator, value, index, array),"1") = "1234": ', mas.reduce(function (accumulator, value, index, array) {
  return accumulator + value
}, '1'));


