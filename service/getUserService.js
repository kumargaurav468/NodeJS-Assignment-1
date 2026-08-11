const fs = require("fs");

function getUserService(userFile) {
  const data = fs.readFileSync(userFile, "utf8");
  let users = [];
  if (data.trim()) {
    users = JSON.parse(data);
  }
  return users.map((user) => {
    return { username: user.username, empCode: user.empCode };
  });
}
module.exports = getUserService;
