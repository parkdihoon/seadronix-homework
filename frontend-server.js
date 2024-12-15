const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const appName = process.argv[2];
console.log(appName)

if (!appName) {
    console.error(`Usage: node ${path.basename(__filename)} <appName>`);
    return;
}

app.use(express.static(path.join(__dirname, appName)));

app.listen(port, () => {
    console.log(`Frontend server running at http://localhost:${port}`);
});
