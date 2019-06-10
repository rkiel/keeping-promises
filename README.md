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

Just like with `output`, we are using a built-in array function called `reduce`. We now have another opportunity to use a callback function. We register the function `uniqueReducer` by passing it as a parameter. And just like with the built-in `each`, `reduce` handles looping through the array. But `reduce` goes one step further, it returns a value. More specifically, an accumulated value. To initialize that accumulated value, we pass in a second parameter to `reduce`. In our case, we will initialize with in an empty array which will be transformed into an array of unique values.

The `uniqueReducer` looks at the accumulated value to see if it contains the array element. If it does, it does not add the element. Otherwise, it adds the element to the accumulate value.

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

Fair enough. We are laying the groundwork for promises. Let's review what we have built so far in the `justDoIt` function. We have created a data pipeline where we start off with an object containing process information and step-by-step transforming that data into an array of unique words. The data pipeline is achieved by a sequence of function calls: `getCommandLineArgs`, `removeFirst`, `unique`, `sort`, and `output`. The output of one function is the input to the next function. This is a functional style of programming.

This step-by-step approach should feel easy and natural. We probably spend the majority of day writing very synchronous code. The execution of `justDoIt` runs from start to finish without any blocking. But what about `console.log`? That's blocking I/O. Let's replace it.

## Writing to a file
