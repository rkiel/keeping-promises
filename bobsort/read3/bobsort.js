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

async function save(array) {
  const data = await fs.writeFile("saved.txt", array);
  const writeData = writeFileCallback(data);
  return array;
}

function closing() {
  console.log();
  console.log("THE END");
}

function handleError(error) {
  console.error(error);
}

async function read() {
  return fs.readFile("input.txt");
}

function convertToString(data) {
  return data.toString("utf-8");
}

function stringToArray(data) {
  return data.split("\n");
}

async function doit() {
  try {
    const data = await read();
    const string = convertToString(data);
    const array = stringToArray(string);
    const uniqueArray = unique(array);
    const sortedArray = sort(uniqueArray);
    const savedArray = await save(sortedArray);
    const outputArray = output(savedArray);
    closing();
  } catch (e) {
    handleError(e);
  }
}

doit();
