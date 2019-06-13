# Promises -- A Journey From Callbacks to Async/Await

Let's build a simple alphabetic sort program in Node.js and along the way explore "promises" in JavaScript. (And maybe we'll see some functional programming too.)

DISCLAIMER: Some of the code in this article is written is a style that is not what you would expect to see in the real world. It is overly verbose and done so to visually emphasize what is going on and hopefully aid in learning about promises and functional programming.

## Hello World

To start with, we can create a file called `sort.js` with the classic Hello World.

```JavaScript
console.log("hello world");
```

With Node.js installed, we can run it using `node`.

```bash
node sort.js
```

And get the expected output.

```bash
hello world
```

We can further expand our Hello World program to include some of the basics of a well-structured program. We can declare a top-level function called `justDoIt` which generates the Hello World along with top-level exception handling.

```JavaScript
function handleError(e) {
  console.error(e);
}

function justDoIt() {
  try {
    console.log("hello world");
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
```

## Our goal

Our goal is to build an alphabetic sort program. To start off, let's pass a series of words on the command line and output them in alphabetic order. Something like this,

```bash
node sort.js one two three four
```

that would generate the following output:

```bash
four
one
three
two
```

## Command line arguments

From the Node.js documentation, we know there is a global variable called `process`. If we output the contents of that object,

```JavaScript
console.log(process);
```

we see there is a ton of information, including an array called `argv` which contains the command line arguments. Our first task is to transform `process` into the array. We can write a function called `getCommandLineArgs` to do that transformation.

```JavaScript
function getCommandLineArgs(processData) {
  return processData.argv;
}
```

We can replace all the Hello World stuff with some real code now.

```JavaScript
function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    console.log(initialArgs);
  } catch (e) {
    handleError(e);
  }
}

justDoIt(process);
```

When we run this,

```bash
node sort.js one two three four
```

we get something like this.

```JavaScript
[ '/path/to/the/binary/for/node',
  '/path/to/the/project/sort.js',
  'one',
  'two',
  'three',
  'four' ]
```

Looks like the command line arguments include the path to the `node` executable and the path to our source code file for `sort.js`. Our next task is to transform the array into an array without the first element. We can write a function called `removeFirst` to do that transformation.

```JavaScript
function removeFirst(array) {
  const firstItem = array.shift();
  return array;
}
```

If we perform that transform twice, we can remove the first two items.

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

We now have an array of words.

## Output

Even though our list of words is not in alphabetic order, we can still format the output so that each word appears on a separate line. Our next task does not need a transform but rather generate a side-effect. We can write a function called `output` to iterate over each array item.

```JavaScript
function output(array) {
  array.forEach(outputItem);
}
```

Here we see our first use of a callback function. We register the callback function `outputItem` by passing it as a parameter to the array function `forEach`. Behind the scenes, `forEach` will loop through the array, one item at a time, and invoke the callback function. Inside `outputItem`, we can print each item to the terminal.

```JavaScript
function outputItem(item) {
  console.log(item);
}
```

So far, we've had a nice, linear transformation of data from beginning to end. We can continue that by making `output` an identity function that returns its input parameter.

```JavaScript
function output(array) {
  array.forEach(outputItem);
  return array;
}
```

Putting it all together,

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

We now get the following output:

```bash
one
two
three
four
```

## Sorting

We are finally at the main event. Our next task is to transform the array into an array that is in alphabetical order. We can write a function called `sort` to do that transformation.

```JavaScript
function sort(array) {
  return array.sort();
}
```

If we add that into our functional pipeline,

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

we now get the following output.

```text
four
one
three
two
```

Great. We now have a program to sort words.

## Uniqueness

Our simple sort program does just fine but what should we do if the same word appears more than once?

```bash
node sort.js one two three four four
```

Let's decide to filter out duplicates. To do this, we need to transform the array of words into an array of unique words. We can write a function called `unique` to do that transformation.

```JavaScript
function unique(array) {
  return array.reduce(uniqueReducer, []);
}
```

Just like with `output`, we are using a built-in array function called `reduce`. We now have another opportunity to use a callback function. We register the function `uniqueReducer` by passing it as a parameter. And just like with the built-in `each`, `reduce` handles looping through the array. But `reduce` goes one step further, it returns a value. More specifically, an accumulated value. To initialize that accumulated value, we pass in a second parameter to `reduce`. In our case, we will initialize with an empty array which will be transformed into an array of unique values.

The `uniqueReducer` looks at the accumulated value to see if it contains the array element. If it does, it does not add the element. Otherwise, it adds the element to the accumulated value.

```JavaScript
function uniqueReducer(accum, elem) {
  if (accum.includes(elem)) {
    return accum;
  } else {
    return accum.concat([elem]);
  }
}
```

If we add those functions into our functional pipeline,

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

We now have a list of unique, sorted words.

```text
four
one
three
two
```

## What about promises?

You are asking, "I thought this was an article about promises?"

Fair enough. We are laying the groundwork for promises. Let's review what we have built so far in the `justDoIt` function.

- We have created a data pipeline where we start off with an object containing process information and step-by-step transforming that data into an array of unique words.
- The data pipeline is achieved by a sequence of function calls: `getCommandLineArgs`, `removeFirst`, `unique`, `sort`, and `output`. The output of one function is the input to the next function.
- Each of the functions in the data pipeline are simple with a single purpose. They are easy to understand and easy to write unit tests.

This is a functional style of programming. This step-by-step approach should feel easy and natural.

It is also a very synchronous style of programming. Since it is JavaScript, there is one execution thread and the execution of `justDoIt` runs super fast from start to finish. None of the functions have any execution roadblocks, such as blocking I/O, to slow it down.

But what about `console.log`? Isn't that blocking I/O? Yes but let's ignore that for now. We'll continue on in our journey towards promises.

## Writing to a file

Let's enhance our program by saving the sorted array of words to a file. From the Node.js documentation, we know there is a built-it module called `fs` for interacting with the file system.

```JavaScript
const fs = require("fs");
```

The `fs` module has a function `writeFile` that we can use to save the array. We can write an identity function, just like our `output`, called `save`.

```JavaScript
function save(array) {
  fs.writeFile("saved.txt", array)
  return array;
}
```

If we add that function into our functional pipeline,

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

We can run out sort program and see that the hard-coded output file `saved.txt` gets created with the contents of the array. Perfect, right? Not so fast. The correct outcome deceives us about the fact that there is something fundamentally wrong about the code we wrote. Let's dig deeper.

One of the many features of Node.js is non-blocking I/O. The `writeFile` function is a non-blocking function. This means that the program execution thread is not blocked waiting for the I/O to complete. It initiates the request for I/O and then continues on. Let's look closely at the program execution thread during the steps of `save` and `output`.

1. The `save` function is invoked
   1. A request to write the array to the file system is made (but not actually performed)
   1. The `save` function returns the array
1. The `output` function is invoked
   1. The words are displayed in the terminal
   1. The `output` function returns the array
1. The `justDoIt` function returns the array
1. Node.js preforms the I/O and writes the array to the file system

The outcome is correct but that is not the intent of what we wrote. Our intent was to save the array to the file and then write the array to the terminal. Well, in this case, who cares? It doesn't matter. However, next time, when we are writing a banking application, the order will absolutely matter.

So what's going on? We have written a functional, synchronous-looking program. Unfortunately, with the introduction of `writeFile`, our program became transformed into the world of asynchronous programming.

## Writing to a file using a callback

Since the Node.js `writeFile` got us into this asynchronous mess with its non-blocking I/O, it better have a solution. The first solution we can try is the use of a callback function. Asynchronous functions in Node.js include a callback function as its last parameter. Suppose we had a callback function called `saveCallback`. We can pass it as the last parameter to `writeFile`.

```JavaScript
function save(array) {
  fs.writeFile("saved.txt", array, saveCallback)
  return array;
}
```

Node.js. defines a standard contract for asynchronous callback functions which is a specific signature of two parameters: `error` and `data`. We can now write our `saveCallback`.

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

Besides the parameter signature, the Node.js contract includes how they are passed. If Node.js encounters any kind of error doing its asynchronous work, the `saveCallback` will be invoked passing an error object as the first parameter. If the asynchronous work is completed successfully, the `saveCallback` will be invoked with the first parameter set to `false` and the second parameter as the asynchronous result. In this particular case, `writeFile` does not have any real result so the second parameter will be passed as `undefined`.

If we rerun our sort program using the `saveCallback`, we see that the output just confirms that the `save` is happening after the `output`. Still not what we want but we have take a step closer.

```text
four
one
three
two
undefined
saved data

```
