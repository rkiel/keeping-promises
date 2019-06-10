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

Looks like the command line arguments include the path to the `node` executable and the path to our source code file for `sort.js`. Our next task is to transform the array without the first element. We can write a function called `removeFirst` to do that transformation.

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
