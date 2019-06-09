//
// node step08.js one two three
//

const fs = require("fs").promises;

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

function writeFileCallback(data) {
  console.log(data);
  console.log("saved data");
  console.log();
  return data;
}

function save(array) {
  function saveCallback(data) {
    return array;
  }

  const promise = fs.writeFile("saved.txt", array);
  const promise2 = promise.then(writeFileCallback);
  const promise3 = promise2.then(saveCallback);

  return promise3;
}

function outputCallback(array) {
  output(array);
  return array;
}

function closing() {
  console.log();
  console.log("THE END");
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

function justDoIt(processData) {
  const promise = read()
    .then(convertToString)
    .then(stringToArray)
    .then(unique)
    .then(sort)
    .then(save)
    .then(output)
    .then(closing)
    .catch(handleError);

  return promise;
}

justDoIt(process);
