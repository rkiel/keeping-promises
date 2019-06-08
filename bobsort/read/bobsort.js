// 10

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
  const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);

  const callbackWithArray = saveCallback(array);
  const promise3 = promise2.then(callbackWithArray);

  return promise3;
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

const promise = read();
const promise2 = promise.then(convertToString);
const promise3 = promise2.then(stringToArray);
const promise4 = promise3.then(unique);
const promise5 = promise4.then(sort);
const promise6 = promise5.then(save);
const promise7 = promise6.then(output);
const promise8 = promise7.then(closing);
const promise9 = promise8.catch(handleError);
