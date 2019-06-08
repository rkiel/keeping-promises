// 5

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

function uniqueReducer(accum, elem) {
  if (accum.includes(elem)) {
    return accum;
  } else {
    return accum.concat([elem]);
  }
}

function unique(array) {
  return array.reduce(uniqueReducer, []);
}

const initialArgs = getCommandLineArgs();
const missingNode = removeFirst(initialArgs);
const missingScript = removeFirst(missingNode);
const uniqueArray = unique(missingScript);
const sortedArray = sort(uniqueArray);

output(sortedArray);
