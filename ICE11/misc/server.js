// const hello = require('./hello')

// hello.sayHello()

// this above is the regular way, if we highlight and click on 
// convert to E5 we get the stuff below:

import { sayHello } from './hello.js'

sayHello()

//hello() // if we are only passing that one function we can call it like this
// because the entire file is the function, but most cases we will have more things being 
// passed so it is better to use the first notation where we create an object