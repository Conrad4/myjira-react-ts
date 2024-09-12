let obj = { a: 1, b: 2, c: { name: "world" } };
let obj1 = { ...obj };
obj1.a = 5;
console.log(obj); //{ a: 1, b: 2, c: { name: 'world' } }
console.log(obj1); //{ a: 5, b: 2, c: { name: 'world' } }
