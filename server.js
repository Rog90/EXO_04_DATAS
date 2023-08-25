const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 9000;

http.createServer((req, res) => {
    const w = res.write.bind(res);
    const wH = res.writeHead.bind(res);

    if (req.url === "/") {
        fs.readFile(path.join(__dirname, "index.html"), (error, data) => {
            if (error) {
                wH(404);
                res.end();
                return;
            }
            wH(200, { "content-type": "text/html" });
            res.end(data);
            return;
        });

    } else if (req.url === "/data") {
        wH(200, { "content-type": "text/html" });
        w("<!DOCTYPE html>");
        w("<html lang=\"de\">");
        w("<head>");
        w("<meta charset=\"UTF-8\">");
        w("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
        w("<title>Seltene Sprachen und Kulturen</title>");
        w("</head>");
        w("<body>");
        w("<header>");
        w("<h1>DATAS</h1>");
        w("<p>JSON</p>");
        w("</header>");
        w("<div class=\"container\">");
        fs.readFile(path.join(__dirname, "package.json"), (error, jsonData) => {
            if (error) {
                w("SORRY, DATAS NOT FOUND");
                res.end();
                return;
            }
            const jsonString = JSON.stringify(JSON.parse(jsonData), null, 2);
            w(jsonString);
            res.end();
            return;
        });
        
        w("</div>");
        w("<footer>");
        w("<p>© 2023 Seltene Sprachen und Kulturen. Alle Rechte vorbehalten.</p>");
        w("</footer>");
        w("</body>");
        w("</html>");
        res.end();
        return;
    }
}).listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
