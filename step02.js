//
// node step02.js one two three
//

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

function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    const missingNode = removeFirst(initialArgs);
    const missingScript = removeFirst(missingNode);
    console.log(missingScript);
  } catch (e) {
    handleError(e);
  }
}

justDoIt(process);
