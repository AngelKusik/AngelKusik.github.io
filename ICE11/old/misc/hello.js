const hello = 'hey everyone'

// module.exports.sayHello = function() {
//     console.log(hello)
// }

// function sayHello() {
//     console.log(hello)
// }

// now with E5

export function sayHello() {
    console.log(hello)
}

// module.exports = { sayHello }
module.exports = sayHello // if I am only specifying one single function I can do it like this