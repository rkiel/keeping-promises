// 9

const fs = require("fs").promises;

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

function writeFileCallback(writeFileData) {
  console.log(writeFileData);
  console.log("saved data");
  console.log();
  return writeFileData;
}

function save(array, saveCallback) {
  const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);

  if (saveCallback) {
    const callbackWithArray = saveCallback(array);
    const promise3 = promise2.then(callbackWithArray);
    return promise3;
  } else {
    return promise2;
  }
}

function outputCallback(array) {
  function callback(data) {
    return output(array);
  }

  return callback;
}

function salutation() {
  console.log();
  console.log("THE END");
}

const initialArgs = getCommandLineArgs();
const missingNode = removeFirst(initialArgs);
const missingScript = removeFirst(missingNode);
const uniqueArray = unique(missingScript);
const sortedArray = sort(uniqueArray);
const promise = save(sortedArray, outputCallback);
const promise2 = promise.then(salutation);
