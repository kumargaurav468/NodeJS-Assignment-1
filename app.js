const http = require("http");
const fs = require("fs");
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    //after data is received
    req.on("end", () => {
      try {
        const userData = JSON.parse(body);
        //read existing users
        fs.readFile("users.json", "utf8", (err, data) => {
          let users = [];
          //if file and data exists
          if (!err && data) {
            users = JSON.parse(data);
          }
          users.push(userData);
          fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
              console.log(err);
              res.writeHead(500, {
                "Content-Type": "application/json",
              });
              return res.end(
                JSON.stringify({
                  message: "Error in saving the data.",
                }),
              );
            }
            res.writeHead(201, {
              "Content-Type": "application/json",
            });
            res.end(
              JSON.stringify({
                message: "User Data Received and Saved",
                user: userData,
              }),
            );
          });
        });
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: "Invalid data",
          }),
        );
      }
    });
  } else if (req.method === "PUT" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const userData = JSON.parse(body);
        //read existing users
        fs.readFile("users.json", "utf8", (err, data) => {
          if (err) {
            res.writeHead(500, {
              "Content-Type": "application/json",
            });
            return res.end(
              JSON.stringify({ message: "Error in updating the data" }),
            );
          }
          const users = JSON.parse(data);
          const userIndex = users.findIndex(
            (user) => user.empCode === userData.empCode,
          );
          //if user does not found
          if (userIndex === -1) {
            res.writeHead(404, {
              "Content-Type": "application/json",
            });
            return res.end(JSON.stringify({ message: "User not found" }));
          }
          //update only the required field
          users[userIndex] = {
            ...users[userIndex],
            ...userData,
          };
          console.log("Updated User", users[userIndex]);
          //save updated users
          fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({
                  message: "Error updating the user",
                }),
              );
            }
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(
              JSON.stringify({
                message: "User Updated",
                user: users[userIndex],
              }),
            );
          });
        });
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify({ message: "Invalid Data" }));
      }
    });
  } else if (req.method === "GET" && req.url === "/users") {
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        return res.end(
          JSON.stringify({
            message: "Error in reading the data",
          }),
        );
      }
      const users = JSON.parse(data);
      const response = users.map((user) => ({
        username: user.username,
        empCode: user.empCode,
      }));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      return res.end(JSON.stringify(response));
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
