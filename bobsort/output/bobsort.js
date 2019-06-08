// 3

function getCommandLineArgs() {
  return process.argv;
}

function removeFirst(array) {
  array.shift();
  return array;
}

function outputItem(item) {
  console.log(item);
}

function output(array) {
  array.forEach(outputItem);
  return array;
}

const initialArgs = getCommandLineArgs();
const missingNode = removeFirst(initialArgs);
const missingScript = removeFirst(missingNode);

output(missingScript);
