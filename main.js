import { HashMap } from "./hashMap.js";

const test = new HashMap(0.75,16);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');


test.set('ice cream', 'chocolate');
test.set('kite', 'ruby');


test.set('moon', 'silver');

test.remove('grape');

console.log(test.length());
console.log(test.has('hat'));
console.log(test.get('dog'));

console.log(test.entries());

test.clear();

console.log(test.length());