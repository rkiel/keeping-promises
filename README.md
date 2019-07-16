# JavaScript - A whole new world

- We all know that every country has its own set of unique idioms and customs.
- functional programming and asynchronous programming.

## Hello World

- create `hello.js`

```JavaScript
console.log("hello world");
```

- run it

```bash
node sort.js
```

- output

```bash
hello world
```

## Part 1 -- Functional programming

- first class citizens

* transform inputs and return an output
* be very mindful of the input parameters and return value

* create a data pipeline

## DISCLAIMER

- This is for you. Ask questions. Dialogue not a lecture.
- Code is overly verbose and done so to visually emphasize what is going on and hopefully aid in learning

## Hello World, Improved

- wrap in a function

```JavaScript
function justDoIt() {
  console.log("hello world");
}
```

- wrap in try/catch

```JavaScript
function justDoIt() {
  try {
    console.log("hello world");
  } catch (e) {
    handleError(e);
  }
}
```

- handle exceptions

```JavaScript
function handleError(e) {
  console.error(e);
}
```

- invoke

```JavaScript
justDoIt();
```

## A Sort Project

- copy `hello.js` to `sort.js`

- pass words on the command line

```bash
node sort.js one two three four
```

- output

```bash
four
one
three
two
```

## Command line arguments

- Node docs say there is a global variable `process`

* print that instead

```JavaScript
console.log(process);
```

- too much info
- Node docs say there is a field called `argv`
- our first transform function

```JavaScript
function getCommandLineArgs(processData) {
  return processData.argv;
}
```

- call it

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    console.log(initialArgs);
  } catch (e) {
    handleError(e);
  }
}
```

- output is still wrong. [See code](step01.js)

- next transform function, remove first array item

```JavaScript
function removeFirst(array) {
  const firstItem = array.shift();
  return array;
}
```

- invoke it twice

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    console.log(missingScript);
  } catch (e) {
    handleError(e);
  }
}
```

- We now have an array of words. [See code](step02.js)

## Formatting Output

- our first side-effect function

```JavaScript
function output(array) {
  array.forEach(outputItem);
}
```

- pass a function as a parameter

```JavaScript
function outputItem(item) {
  console.log(item);
}
```

- first identity function

```JavaScript
function output(array) {
  array.forEach(outputItem);
  return array;
}
```

- Putting it all together,

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const outputArray = output(missingScript);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step03.js)

## Sorting

- now the main event: sorting

```JavaScript
function sort(array) {
  return array.sort();
}
```

- add to the pipeline

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const sortedArray = sort(missingScript);
    const outputArray = output(sortedArray);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step04.js)

## Uniqueness

- what happens with duplicates?

```bash
node sort.js one two three four four
```

- transform to remove duplicates

* like `each`, using `reduce` needs a function

```JavaScript
function unique(array) {
  return array.reduce(uniqueReducer, []);
}
```

- reducer function
- first two params: `accum`, `elem`

```JavaScript
function uniqueReducer(accum, elem) {
  if (accum.includes(elem)) {
    return accum;
  } else {
    return accum.concat([elem]);
  }
}
```

- add to the pipeline

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);
    const outputArray = output(sortedArray);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step05.js)

## Part 2 -- Asynchronous programming

## Writing to a file

- write the output to a file
- Node docs says there is a built-in module called `fs`

```JavaScript
const fs = require("fs");
```

- `fs` has a function `writeFile`

* make it an identity function

```JavaScript
function save(array) {
  fs.writeFile("saved.txt", array)
  return array;
}
```

- add to data pipeline

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);
    const savedArray = save(sortedArray);
    const outputArray = output(savedArray);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step06.js)

- every looks good, right?
- something is wrong
- code we wrote behaves differently from how we have visually written it
- Node.js is non-blocking I/O.
- `writeFile` function is a non-blocking function.

1. The `save` function is invoked
   1. A request to write the array to the file system is made (but not actually performed)
   1. The `save` function returns the array
1. The `output` function is invoked
   1. The words are displayed in the terminal
   1. The `output` function returns the array
1. The `justDoIt` function returns the array
1. Node.js preforms the I/O and writes the array to the file system

- We have written a functional, synchronous-looking program.
- the introduction of `writeFile`, our program became transformed into the world of asynchronous programming.

## Asynchronous Callback

- add third parameter to `writeFile`. a callback

```JavaScript
function save(array) {
  fs.writeFile("saved.txt", array, saveCallback)
  return array;
}
```

- Node.js. defines a standard contract for asynchronous callback functions
- specific signature of two parameters: `error` and `data`

```JavaScript
function saveCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    console.log("saved data");
    console.log();
  }
}
```

- confirmed our logic is wrong
- hope we are not writing a bankin app

## Callback Hell

- need to move the `output` function inside the callback

```JavaScript
function saveCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    console.log("saved data");
    console.log();
    return output(array);  // problem solved???
  }
}
```

- problem: no access to `array`
- JavaScript gives us several techniques to solve this problem.
- Since we are on the road to Promises, we'll pick one of the simpler ones.
- What if we define the `saveCallback` inside the `save` function?
- scoping rules are our friend

```JavaScript
function save(array) {
  function saveCallback(error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      console.log("saved data");
      console.log();
      return output(array);
    }
  }

  fs.writeFile("saved.txt", array, saveCallback);
  return array;
}
```

- still not what we want.
- `save` is now hard-coded with `output`
- Let's clean that up by passing in a callback to `save`.

```JavaScript
function save(array, callback) {
  function saveCallback(error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      console.log("saved data");
      console.log();
      if (callback) {
        return callback(array);
      }
    }
  }
```

- pass the `output` function into `save`

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);
    const savedArray = save(sortedArray, output);

    return savedArray;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step07.js)

- output is correct

* But at what price?
* try writing a complex, asynchronous application like this. "callback hell".

## Welcome to Promises

- Promises are now part of JavaScript language.
- first-class object
- at some point in the future will have a value

* an abstraction around asynchronous result
* Promises end up in either one of two states: Resolved or Reject
* Promises can be chained together
* Callbacks require you to passing something into a function
* Promises return you an object which you can then pass something in

## Writing using a promise

- In Node 10, `fs` has an alternative where the functions return promises instead of using callbacks.

Node 10

```JavaScript
const fs = require("fs").promises;
```

- In Node 8, you can promisify the individual `fs` functions

```JavaScript
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
```

- remove callback, return promise

```JavaScript
function save(array) {
  // Node 8
  const promise = writeFile("saved.txt", array)
  // Node 10
  // const promise = fs.writeFile("saved.txt", array)
  return promise;
}
```

- an identity function called `writeFileCallback` that contains all the success logic of the `saveCallback`.

```JavaScript
function writeFileCallback(data) {
  console.log(data);
  console.log("saved data");
  console.log();
  return data;
}
```

- chain them together using `then`

```JavaScript
function save(array) {
  // Node 8
  const promise = writeFile("saved.txt", array);
  // Node 10
  //const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);
  return promise2;
}
```

- `writeFile` does not return any data
- we still need a `saveCallback` but it is a much simpler one.

```JavaScript
function save(array) {
  function saveCallback(data) {
    return array;
  }

  // Node 8
  const promise = writeFile("saved.txt", array);
  // Node 10
  // const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);
  const promise3 = promise2.then(saveCallback);

  return promise3;
}
```

- split `save` and `output`

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);

    const promise = save(sortedArray);
    const promise2 = promise.then(output);

    return promise2;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step08.js)

- promises seem like a big win for us
- write asynchronous code in a style that has a very synchronous look and feel to it which we are already familiar and comfortable with.

## Exception handling

- the original implementation of `saveCallback`, it had logic for both failure and success.

```JavaScript
function saveCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    console.log("saved data");
    console.log();
  }
}
```

- We moved the success logic to the `writeFileCallback`
- what about the failure logic?
- Promises gives us `catch`

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);

    const promise = save(sortedArray);
    const promise2 = promise.then(outputCallback);
    const promise3 = promise2.catch(handleError);

    return promise3;
  } catch (e) {
    handleError(e);
  }
}
```

- any file system errors will be handled

[See code](step09.js)

## Reading from a file using a promise

- let's use `readFile`

```JavaScript
function read() {
  // Node 8
  const promise = readFile("input.txt");
  // Node 10
  // const promise = fs.readFile("input.txt");
  return promise;
}
```

- Node docs says that `readFile` returns the contents of the file as a Buffer not a String.
- Need to convert the Buffer into a string

```JavaScript
function convertToString(data) {
  return data.toString("utf-8");
}
```

- contents of the file has one word per line.
- a function called `stringToArray` to convert the multi-line string into a an array.

```JavaScript
function stringToArray(data) {
  return data.split("\n");
}
```

- we can re-write our data pipeline using promises.
- And since we have written our functions well, we can re-use `unique`, `sort`, `save`, `outputCallback`, and `handleError`.

```JavaScript
function justDoIt() {
  const promise = read();
  const promise2 = promise.then(convertToString);
  const promise3 = promise2.then(stringToArray);
  const promise4 = promise3.then(unique);
  const promise5 = promise4.then(sort);
  const promise6 = promise5.then(save);
  const promise7 = promise6.then(outputCallback);
  const promise8 = promise7.catch(handleError);

  return promise8;
}
```

- no longer need the try/catch

[See code](step10.js)

## Promises in the real world

- First, we can re-write `save` and remove all the intermediate variables in favor of method chaining.

```JavaScript
function save(array) {
  function saveCallback(data) {
    return array;
  }

  // Node 8
  return writeFile("saved.txt", array)
    .then(writeFileCallback)
    .then(saveCallback);
  // Node 10
  // return fs
  //   .writeFile("saved.txt", array)
  //   .then(writeFileCallback)
  //   .then(saveCallback);
}
```

- Second, we can re-write `read` without an intermediate variable.

```JavaScript
function read() {
  // Node 8
  return readFile("input.txt");
  // Node 10
  // return readFile("input.txt");
}
```

- finally, we can re-write `justDoIt` and greatly simplify it using method chaining.

```JavaScript
function justDoIt() {
  return read()
    .then(convertToString)
    .then(stringToArray)
    .then(unique)
    .then(sort)
    .then(save)
    .then(output)
    .catch(handleError);
}
```

[See code](step11.js)

## Async/Await

- Promises gives us asynchronous programming that kinda looks like synchronous
- Chaining all the `then` is confusing. Not at all like what we started with.
- The added Async/Await

```JavaScript
async function justDoIt() {
  const data = await read();
}
```

- add back out data pipeline

```JavaScript
async function justDoIt() {
  const data = await read();
  const string = convertToString(data);
  const array = stringToArray(string);
  const uniqueArray = unique(array);
  const sortedArray = sort(uniqueArray);
  const savedArray = await save(sortedArray);
  const outputArray = output(savedArray);

  return outputArray;
}
```

- add back a normal try/catch exception handling

```JavaScript
async function justDoIt() {
  try {
    const data = await read();
    const string = convertToString(data);
    const array = stringToArray(string);
    const uniqueArray = unique(array);
    const sortedArray = sort(uniqueArray);
    const savedArray = await save(sortedArray);
    const outputArray = output(savedArray);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}
```

[See code](step12.js)

## Homework

1. Watch YouTube: ["Redemption from Callback Hell"](https://www.youtube.com/watch?v=hf1T_AONQJU)

   1. listen to Michael Jackson
   1. ignore Domenic Denicola (nothing personal; too much in the weeds)
   1. ignore references to future things such as ES6 Generators

1. Read "A GENTLE INTRODUCTION TO FUNCTIONAL JAVASCRIPT"

   1. [Part 1: Building blocks and motivation](https://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/)

   1. [Part 2: Working with Arrays and Lists](https://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-arrays/)

   1. [Part 3: Functions for making functions](https://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-functions/)

   1. skip Part 4: Doing it with style
