const fs = require("fs");

function postUserService(userFile, userData) {
  const data = fs.readFileSync(userFile, "utf8");
  let users = [];
  if (data.trim()) {
    users = JSON.parse(data);
  }
  users.push(userData);
  fs.writeFileSync(userFile, JSON.stringify(users), "utf8");
  return userData;
}
module.exports = postUserService;
