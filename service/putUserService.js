const fs = require("fs");

function putUserService(userFile, userData) {
  const data = fs.readFileSync(userFile, "utf8");
  let users = [];
  if (data.trim()) {
    users = JSON.parse(data);
  }
  const userIndex = users.findIndex(
    (user) => user.empCode === userData.empCode,
  );
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
  };
  fs.writeFileSync(userFile, JSON.stringify(users), "utf8");
  console.log("Updated User:", users[userIndex]);
  return users[userIndex];
}
module.exports = putUserService;
