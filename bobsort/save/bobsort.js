// 6

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

const initialArgs = getCommandLineArgs();
const missingNode = removeFirst(initialArgs);
const missingScript = removeFirst(missingNode);
const uniqueArray = unique(missingScript);
const sortedArray = sort(uniqueArray);
const savedArray = save(sortedArray);

output(savedArray);