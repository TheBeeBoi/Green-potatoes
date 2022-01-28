const http = require("http"),
	get = require("./get"),
	post = require("./Experiments/Mimed HTTP Server/post")

const srv = http.createServer(function (req, res) {
	if (req.method === "GET") {
		get(req, res)
	} else if (req.method === "POST") {
		var data = post(req, res)
		if (req.url="/login") {
			console.log(data)
		} else {
			
		}
	}
});

module.exports = srv;