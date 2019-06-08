// 7

const fs = require("fs");

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

function save(array) {
  function outputCallback(error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      console.log("saved data");
      console.log();
      output(array);
    }
  }

  fs.writeFile("saved.txt", array, outputCallback);
  return array;
}

const initialArgs = getCommandLineArgs();
const missingNode = removeFirst(initialArgs);
const missingScript = removeFirst(missingNode);
const uniqueArray = unique(missingScript);
const sortedArray = sort(uniqueArray);
const savedArray = save(sortedArray);
