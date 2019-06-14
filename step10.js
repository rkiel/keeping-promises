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

function justDoIt() {
  const promise = read();
  const promise2 = promise.then(convertToString);
  const promise3 = promise2.then(stringToArray);
  const promise4 = promise3.then(unique);
  const promise5 = promise4.then(sort);
  const promise6 = promise5.then(save);
  const promise7 = promise6.then(outputCallback);
  const promise8 = promise7.catch(handleError);

  return promise8;
}

justDoIt();
