// 4

function getCommandLineArgs() {
  return process.argv;
}

function removeFirst(array) {
  array.shift();
  return array;
}

function outputItem(item) {
  console.log(item);
  return item;
}

function output(array) {
  array.forEach(outputItem);
  return array;
}

function sort(array) {
  return array.sort();
}

const initialArgs = getCommandLineArgs();
const missingNode = removeFirst(initialArgs);
const missingScript = removeFirst(missingNode);
const sortedArray = sort(missingScript);

output(sortedArray);
