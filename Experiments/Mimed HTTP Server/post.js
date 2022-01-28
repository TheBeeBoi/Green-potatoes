module.exports = (req, res) => {
  var body = "";
  req.on("data", function (chunk) {
    body += chunk.toString();
  });

  req.on("end", function () {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(body);
    body = JSON.parse(body);
  });
  return body;
};
