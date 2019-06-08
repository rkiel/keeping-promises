//
// node step01.js one two three
//

function handleError(e) {
  console.error(e);
}

function getCommandLineArgs() {
  return process.argv;
}

function justDoIt() {
  try {
    const initialArgs = getCommandLineArgs();
    console.log(initialArgs);
  } catch (e) {
    handleError(e);
  }
}

justDoIt();
