// /* Реализовать функцию конструктор MyArray. */
// /* Реализовать метод функции конструктора: MyArray.isMyArray(); */
//
// function MyArray() {
//   this.length = 0;
//   this.isMyArray = () => this instanceof MyArray;
// }
//
// MyArray.prototype = MyArray;
//
// console.log(`MyArray=${MyArray}`);
//
// mas=new MyArray();
//
// /* Реализовать прототип для создаваемых коллекций */
//
// MyArray.push = function push() {
//   for (let i = 0; i < arguments.length; i++) {
//     this[i] = arguments[i];
//     this.length++;
//   }
//   return this.length;
// };
//
// console.log('mas=',mas);
// console.log(`mas.isMyArray()=${mas.isMyArray()}`);
// mas.push(12,'45');
// console.log('mas=',mas);
// console.log(`mas=${mas}`);


/* Реализовать функцию конструктор MyArray. */
/* Реализовать метод функции конструктора: MyArray.isMyArray(); */

function MyArray() {
  this.length = 0;
  this.isMyArray = () => this instanceof MyArray;
}

let myArrayPrototype = MyArray;

/* Реализовать прототип для создаваемых коллекций */

myArrayPrototype.push = function push() {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length++] = arguments[i];          // ось так - не працює!!!!!

  }
  return this.length;
};

myArrayPrototype.find = function find() {
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
    this.length++;
  }
  return this.length;
};

MyArray.prototype = myArrayPrototype;

console.log(`MyArray=${MyArray}`);

mas=new MyArray();

console.log('mas=',mas);
console.log(`mas.isMyArray()=${mas.isMyArray()}`);
mas.push(12,'45');
console.log('mas=',mas);
/* Як бачите, mas[0]='45' замість mas[0]=12, mas[1]='45'... */