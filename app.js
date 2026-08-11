const http = require("http");
const fs = require("fs");
const path = require("path");
const userRoutes = require("./routes");
const PORT = 4000;

//data folder path in the absolute path
const dataDir = path.join(__dirname, "./data");
//users.json path
const userFile = path.join(dataDir, "users.json");

//create data folder
if (!fs.existsSync(dataDir)) {
  //recursive true will create file if it's parent folder doesn't exist (here it will create data folder if it doesn't exist)
  fs.mkdirSync(dataDir, { recursive: true });
}
//create users.json file
if (!fs.existsSync(userFile)) {
  fs.writeFileSync(userFile, JSON.stringify([]));
  console.log("users.json created successfully");
}

const server = http.createServer((req, res) => {
  const handleRoutes = userRoutes(req, res, userFile);
  if (!handleRoutes) {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(4000, () => {
  console.log(`Server running on ${PORT}`);
});
