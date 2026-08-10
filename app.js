const http = require("http");
const fs = require("fs");
const PORT = 3000;

const server = http.createServer((req, res) => {
  //Create a POST API endpoint.
  if (req.method === "POST" && req.url === "/users") {
    let body = "";
    //Receive the request data on the server.
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    //on receiving data
    req.on("end", () => {
      console.log(body);
      const userData = JSON.parse(body);
      console.log(userData);

      //Save the received user data into a file using the fs module.
      fs.writeFile("users.json", JSON.stringify(userData), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500, {
            "Content-type": "application/JSON",
          });
          return res.end(
            JSON.stringify({
              message: "Error saving the data",
            }),
          );
        }
        //data successfully saved
        res.writeHead(200, {
          "Content-Type": "application/JSON",
        });
        res.end(
          JSON.stringify({
            message: "User Data Received and Saved",
            user: userData,
          }),
        );
      });
    });
  }

  //   Create a PUT API endpoint.
  else if (req.method === "PUT" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const userData = JSON.parse(body);
      fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, {
            "Content-type": "application/JSON",
          });
          return res.end(
            JSON.stringify({
              message: "Error in updating the data",
            }),
          );
        }
        //read existing user
        const existingUser = JSON.parse(data);
        //update only the fields which has been updated
        Object.assign(existingUser, userData);
        console.log("Updated User:", userData);
        //save the updated data
        fs.writeFile("users.json", JSON.stringify(existingUser), (err) => {
          if (err) {
            res.writeHead(500, {
              "Content-type": "application/JSON",
            });
            return res.end(
              JSON.stringify({
                message: "Error updating the task",
              }),
            );
          }
          res.writeHead(200, {
            "Content-type": "application/JSON",
          });
          res.end(
            JSON.stringify({
              message: "User updated",
              user: existingUser,
            }),
          );
        });
      });
    });
  }
  //Create a GET API endpoint.
  else if (req.method === "GET" && req.url === "/users") {
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Error in reading the data." }),
        );
      }
      const userData = JSON.parse(data);
      const reponse = {
        username: userData.username,
        empCode: userData.empCode,
      };
      res.writeHead(200, {
        "Content-type": "application/JSON",
      });
      res.end(JSON.stringify(reponse));
    });
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
