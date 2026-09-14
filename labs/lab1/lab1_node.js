/*
    run a node.js file on the command line via localhost 127.0.0.1 without needing an HTML file
*/ 

var http = require("http")

// Remember: callback function best written in arrow syntax
http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"})
    response.end("Hello World - the server is up and running")
}).listen(8088)