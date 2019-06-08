//
// node step01.js one two three
//

function handleError(e) {
  console.error(e);
}

function getCommandLineArgs(processData) {
  return processData.argv;
}

function justDoIt(processData) {
  try {
    const initialArgs = getCommandLineArgs(processData);
    console.log(initialArgs);
  } catch (e) {
    handleError(e);
  }
}

justDoIt(process);
