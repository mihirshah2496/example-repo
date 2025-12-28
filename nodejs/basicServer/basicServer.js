const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const port = 9898

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // Home route
    if (pathname === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Mihirs Node.js server.\nThank you for visiting.");
        return;
    }

    // About route
    if (pathname === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(
        "About Me:\nI am a SDET with 8+ Years of Experience, \n Outside Work i love Reading, Sketching, Travelling, Watching Anime, Following Football."
        );
        return;
    }

    // Contact route
    if (pathname === "/contact" && req.method === "GET") {
        const filePath = path.join(__dirname, "contact.html");
        fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
        });
        return;
    }

    // 404 route
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found.");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});