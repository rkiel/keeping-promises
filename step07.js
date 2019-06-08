//
// node step07.js one two three
//

const fs = require("fs");

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

  fs.writeFile("saved.txt", array, saveCallback);
  return array;
}

function outputCallback(array) {
  output(array);
  return array;
}

function justDoIt() {
  try {
    const initialArgs = getCommandLineArgs();
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);
    const savedArray = save(sortedArray, outputCallback);

    return savedArray;
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
