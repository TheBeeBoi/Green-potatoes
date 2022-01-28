const fs = require("fs"),
  { join } = require("path"),
  mimes = require("../../mimes.json");

module.exports = (req, res) => {
  var headers = {
    "Access-Control-Allow-Origin": "*", // CORS
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET", // CORS
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Security-Policy": "object-src 'self' blob:;", // CSP
    viewport: "width=device-width, initial-scale=1.0", // Basic viewport meta tag equivalent
    "X-UA-Compatible": "IE=edge",
    /*
	X-UA-Compatible allows you to choose what version of Internet Explorer the page should be rendered as.
	I chose edge as it's based on chromium... idk.
	Try switching it to IE11 or IE7 to not open the site in a newer browser if your code supports it.
*/
  };

  const extension = req.url.substring(req.url.lastIndexOf("."));

  const type = mimes[extension];
  if (type) {
    headers["Content-Type"] = type;
  }

  if (req.url != "/") {
    fs.readFile(join(__dirname, "public", req.url), function (err, data) {
      if (err) {
        if (err.code === "ENOENT") {
          headers["Content-Type"] = "text/html";
          res.writeHead(404, headers);
          res.end(
            fs.readFileSync(join(__dirname, "public", "error", "404.html"))
          );
          console.log(err);
          return;
        } else {
          res.writeHead(520, headers);
          res.end(err.message);
          throw err;
        }
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  } else {
    fs.readFile(join(__dirname, "public", "index.html"), function (err, data) {
      if (err) {
        if (err.code === "ENOENT") {
          headers["Content-Type"] = "text/html";
          res.writeHead(404, headers);
          res.end(fs.readFile(join(__dirname, "public", "error", "404.html")));
          console.log(err);
          return;
        } else {
          res.writeHead(520, headers);
          res.end(err.message);
          throw err;
        }
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  }
};
