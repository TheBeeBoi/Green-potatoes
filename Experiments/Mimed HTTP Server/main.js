(async () => {
  const srv = require("../../srv");
  try {
    let startFinished = false;
    await new Promise((resolve, reject) => {
      srv.listen(80, "127.0.0.1", () => {
        if (!startFinished) {
          startFinished = true;
          resolve();
        }
      });
      srv.once("error", (err) => {
        if (!startFinished) {
          startFinished = true;
          console.log(
            "There was an error starting the server in the error listener:",
            err.message
          );
          reject();
        }
      });
    });
    return srv;
  } catch (e) {
    if (e) {
      console.log(e.message);
    }
  }
})();
