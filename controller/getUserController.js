const getUserService = require("../service/getUserService");

function getUserController(req, res, userFile) {
  try {
    const users = getUserService(userFile);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error in reading the data" }));
  }
}
module.exports = getUserController;
