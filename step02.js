//
// node step02.js one two three
//

function handleError(e) {
  console.error(e);
}

function getCommandLineArgs() {
  return process.argv;
}

function removeFirst(array) {
  array.shift();
  return array;
}

function justDoIt() {
  try {
    const initialArgs = getCommandLineArgs();
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    console.log(missingScript);
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
