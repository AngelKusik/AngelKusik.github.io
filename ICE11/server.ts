import http from 'http' // importing the http third party library
import fs from 'fs' // this is for file system, enables interaction with file systems
import mime from 'mime-types' // mime types are media types, it can be a webpage or a json


const hostname = '127.0.0.1'; // we don't need to pass this to the server.listen function
const port = process.env.PORT || 3000; // use the variable PORT if it doesn't exist use the port 3000
let lookup = mime.lookup

const server = http.createServer((req, res) => {
  let path = req.url as string //same as the path, so this is going to be just the slash

  if (path == "/" || path == "/home") {
    path = "/index.html" // no matter what load the index page
  }

  let mimeType = lookup(path.substring(1)) as string

  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
        res.writeHead(404)
        res.end("ERROR 404 - File not found!" + err.message)
        return
    }

    res.setHeader("X-Content-Type-Options", "nosniff") // security guard
    res.writeHead(200, {
        "Content-Type": mimeType
    })
    res.end(data)
  }) 
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});