const postUserService = require("../service/postUserService");

function postUserController(req, res, userFile) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const userData = JSON.parse(body);
      const newUser = postUserService(userFile, userData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "User data received and saved",
          user: newUser,
        }),
      );
    } catch (error) {
      console.log(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid Data" }));
    }
  });
}
module.exports = postUserController;
