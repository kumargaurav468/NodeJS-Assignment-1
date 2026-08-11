const putUserService = require("../service/putUserService");

function putUserController(req, res, userFile) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const userData = JSON.parse(body);
      const updatedUserData = putUserService(userFile, userData);
      if (!updatedUserData) {
        res.writeHead(404, {
          "Content-type": "application/json",
        });
        return res.end(
          JSON.stringify({
            message: "User not found",
          }),
        );
      }
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "User Updated",
          user: updatedUserData,
        }),
      );
    } catch (error) {
      console.log(error);
      res.writeHead(400, {
        message: "Invalid Data",
      });
    }
  });
}
module.exports = putUserController;
