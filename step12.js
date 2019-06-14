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

  return fs
    .writeFile("saved.txt", array)
    .then(writeFileCallback)
    .then(saveCallback);
}

function outputCallback(array) {
  output(array);
  return array;
}

function read() {
  return fs.readFile("input.txt");
}

function convertToString(data) {
  return data.toString("utf-8");
}

function stringToArray(data) {
  return data.split("\n");
}

async function justDoIt() {
  try {
    const data = await read();
    const string = convertToString(data);
    const array = stringToArray(string);
    const uniqueArray = unique(array);
    const sortedArray = sort(uniqueArray);
    const savedArray = await save(sortedArray);
    const outputArray = output(savedArray);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
