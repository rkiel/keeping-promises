//
// node step06.js one two three
//

const fs = require("fs");

function handleError(e) {
  console.error(e);
}

function getCommandLineArgs(processData) {
  return processData.argv;
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

function saveCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    console.log("saved data");
    console.log();
  }
}

function save(array) {
  fs.writeFile("saved.txt", array, saveCallback);
  return array;
}

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

justDoIt(process);
