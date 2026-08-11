const getUserService = require("../service/getUserService");

function getUserController(req, res, userFile) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const empCode = url.searchParams.get("empCode");
    const users = getUserService(userFile);
    if (empCode) {
      const user = users.find((user) => user.empCode === empCode);
      if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error in reading the data" }));
  }
}
module.exports = getUserController;
