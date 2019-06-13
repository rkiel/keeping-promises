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

function justDoIt(processData) {
  const initialArgs = getCommandLineArgs(processData);
  const missingNode = removeFirst(initialArgs);
  const missingScript = removeFirst(missingNode);
  const uniqueArray = unique(missingScript);
  const sortedArray = sort(uniqueArray);
  const promise = save(sortedArray);
  const promise2 = promise.then(outputCallback);
  const promise3 = promise2.then(closing);
  const promise4 = promise3.catch(handleError);

  return promise4;
}

justDoIt(process);
