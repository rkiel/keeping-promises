//
// node step05.js one two three
//

function handleError(e) {
  console.error(e);
}

function getCommandLineArgs() {
  return process.argv;
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

function justDoIt() {
  try {
    const initialArgs = getCommandLineArgs();
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    const uniqueArray = unique(missingScript);
    const sortedArray = sort(uniqueArray);
    const outputArray = output(sortedArray);

    return outputArray;
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
