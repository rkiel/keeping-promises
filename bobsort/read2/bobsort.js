// 11

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

function saveCallback(array) {
  function callback(data) {
    return array;
  }

  return callback;
}

function save(array) {
  const callbackWithArray = saveCallback(array);

  return fs
    .writeFile("saved.txt", array)
    .then(writeFileCallback)
    .then(callbackWithArray);
}

function closing() {
  console.log();
  console.log("THE END");
}

function handleError(error) {
  console.error(error);
}

function read() {
  const promise = fs.readFile("input.txt");
  return promise;
}

function convertToString(data) {
  return data.toString("utf-8");
}

function stringToArray(data) {
  return data.split("\n");
}

const promise = read()
  .then(convertToString)
  .then(stringToArray)
  .then(unique)
  .then(sort)
  .then(save)
  .then(output)
  .then(closing)
  .catch(handleError);
