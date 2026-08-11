const getUserController = require("../controller/getUserController");
const putUserController = require("../controller/putUserController");
const postUserController = require("../controller/postUserController");

//get userFile from app.js
function userRoutes(req, res, userFile) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log("Path:", url.pathname);
  console.log("Query:", url.searchParams.get("empCode"));
  if (url.pathname !== "/users") {
    return false;
  } else if (req.method === "GET") {
    getUserController(req, res, userFile);
    return true;
  } else if (req.method === "POST") {
    postUserController(req, res, userFile);
    return true;
  } else if (req.method === "PUT") {
    putUserController(req, res, userFile);
    return true;
  } else {
    return false;
  }
}
module.exports = userRoutes;
