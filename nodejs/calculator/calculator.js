const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const port = 9091

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

//   console.log("➡️ Request:", pathname);

    // Serve HTML
    if (pathname === "/" && req.method === "GET") {
        const html = fs.readFileSync(path.join(__dirname, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        return;
    }

  // Calculate
    if (pathname === "/calculate" && req.method === "GET") {
        const a = Number(url.searchParams.get("a"));
        const b = Number(url.searchParams.get("b"));
        const operation = url.searchParams.get("operation");

        // console.log(a, b, operation);

        if (isNaN(a) || isNaN(b)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Invalid numbers");
        }

        let result;
        let symbol;

        switch (operation) {
            case "add":
                result = a + b;
                symbol = "+";
                break;
            case "subtract":
                result = a - b;
                symbol = "-";
                break;
            case "multiply":
                result = a * b;
                symbol = "*";
                break;
            case "divide":
                if (b === 0) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    return res.end("Cannot divide by zero");
                }
                result = a / b;
                symbol = "/";
                break;
            default:
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Invalid operation");
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <h2>Result</h2>
        <p>${a} ${symbol} ${b} = <strong>${result}</strong></p>
        <a href="/">Go Back</a>
        `);
        return;
    }

    // 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});