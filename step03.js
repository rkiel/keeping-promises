//
// node step03.js one two three
//

function handleError(e) {
  console.error(e);
}

function getCommandLineArgs() {
  return process.argv;
}

function removeFirst(array) {
  const firstItem = array.shift();
  return array;
}

function outputItem(item) {
  console.log(item);
}

function output(array) {
  array.forEach(outputItem);
  return array;
}

function justDoIt() {
  try {
    const initialArgs = getCommandLineArgs();
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const outputArray = output(missingScript);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
