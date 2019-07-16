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

- output is still wrong

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

- We now have an array of words.

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

- output is correct

But at what price? This technique works fine for something as simple as our little sort program but try writing a complex, asynchronous application like this. That's when you find yourself in the world of nested callbacks known as "callback hell".

## Welcome to Promises

Promises are now part of JavaScript language.

## Writing to a file using a promise

We have been using the built-in `fs` module to interact with the file system. By default, the functions you have access to all use the asynchronous callback technique. There is an alternative where the functions return promises instead of using callbacks.

```JavaScript
const fs = require("fs").promises;
```

Let's start by going back to our original `save` function. The `writeFile` now returns a promise. The `save` function is no longer an identity function. It now returns a promise.

```JavaScript
function save(array) {
  const promise = fs.writeFile("saved.txt", array)
  return promise;
}
```

We can write an identity function called `writeFileCallback` that contains all the success logic of the `saveCallback`.

```JavaScript
function writeFileCallback(data) {
  console.log(data);
  console.log("saved data");
  console.log();
  return data;
}
```

We can chain that callback to when the asynchronous work of writing to the file system is complete.

```JavaScript
function save(array) {
  const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);
  return promise2;
}
```

If you recall, `writeFile` does not return any data and we still need a way to pass the array onto the next step in our pipeline, which is `output`. To do that, we still need a `saveCallback` but it is a much simpler one.

```JavaScript
function save(array) {
  function saveCallback(data) {
    return array;
  }

  const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);
  const promise3 = promise2.then(saveCallback);

  return promise3;
}
```

The `saveCallback` is still an internal function and it is there to take advantage of the scoping rules of JavaScript. It receives `data` from the previous thing in the promise chain, ignores it completely, and instead passes the array onto the next thing in the promise chain.

Of course, once we change `save` to return a promise, this bubbles up to our main function. And then `justDoIt` will also bubble up the promise.

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);

    const promise = save(sortedArray);

    return promise;
  } catch (e) {
    handleError(e);
  }
}
```

We can reuse the `outputCallback` and add it to the promise chain so that the terminal output appears after the data is saved to the file.

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

    return promise2;
  } catch (e) {
    handleError(e);
  }
}
```

So promises seem like a big win for us. We get to write asynchronous code in a style that is much simpler and will scale much more in big, complex applications than using "callback hell". And even though we are doing asynchronous programming, the code we write still has a very synchronous look and feel to it which we are already familiar and comfortable with.

## Exception handling

If you think back to the original implementation of `saveCallback`, it had logic for both failure and success.

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

We moved the success logic to the `writeFileCallback` but what about the failure logic? If `writeFile` fails for any reason, won't it get caught by our try/catch? No, it will not. The try/catch only handles errors when the execution thread runs through `justDoIt`. The actual writing to the file system, as we have seen, happens asynchronously after `justDoIt` completes.

One of the benefits that promises gives to asynchronous programming is the return of exception handling in the style and spirit of the familiar try/catch. And since the method signature is the same, our `handleError` function can be used by both the try/catch and the promise `catch`.

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

Now if there is any error condition writing to the file system, the asynchronous execution will skip over the `outputCallback` and invoke `handleError`.

## Reading from a file using a promise

Let's continue on with our journey to promises. Instead of passing the words on the command line, we can read them from a file. We've already used the `fs` module function `writeFile` and it has a corresponding `readFile` function. We can use it in a function called `read` to read the words from a file. And like `writeFile`, `readFile` will return a promise but unlike `writeFile`, which returned `undefined`, `readFile` will return the the contents of the file.

```JavaScript
function read() {
  const promise = fs.readFile("input.txt");
  return promise;
}
```

From the Node.js documentation, we know that `readFile` returns the contents of the file as a Buffer. Ultimately, we want to work with an array of strings so the first step will be to convert the Buffer into a string. We can write a function called `convertToString` that does just that.

```JavaScript
function convertToString(data) {
  return data.toString("utf-8");
}
```

The contents of the file has one word per line. We can write a function called `stringToArray` to convert the multi-line string into a an array.

```JavaScript
function stringToArray(data) {
  return data.split("\n");
}
```

With these three functions, we can re-write our data pipeline using promises. And since we have written our functions well, we can re-use `unique`, `sort`, `save`, `outputCallback`, and `handleError`.

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

Since we have written our data pipeline from top to bottom with promises, we no longer need the try/catch.

## Promises in the real world

Throughout this tutorial, we've written code in a style that is meant for instruction but not what you would see in the real world. Let's re-write several of our functions to be more realistic.

First, we can re-write `save` and remove all the intermediate variables in favor of method chaining.

```JavaScript
function save(array) {
  function saveCallback(data) {
    return array;
  }

  return fs
    .writeFile("saved.txt", array)
    .then(writeFileCallback)
    .then(saveCallback);
}
```

Second, we can re-write `read` without an intermediate variable.

```JavaScript
function read() {
  return fs.readFile("input.txt");
}
```

And finally, we can re-write `justDoIt` and greatly simplify it using method chaining.

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

## Cobminations

Promise.all
Promise.race

## Async/Await

JavaScript promises give us a nice way to do asynchronous programming in a style that looks very synchronous. This makes building complex programs much easier and familiar to most developers. But could we do better? The caretakers of the JavaScript language have listened to the community and added Async/Await to the language to make asynchronous programming even simpler. This will be our last stop on the journey of promises.
