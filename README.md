Objective
The purpose of this assignment is to understand the fundamentals of Node.js, including the HTTP module, File System (fs) module, handling different HTTP methods, and performing basic CRUD operations using a JSON file.
Task 1: Create an HTTP Server
Create an HTTP server using the built-in http module.
Run the server on a suitable port (e.g., 3000).
Task 2: Implement a POST API
Create a POST API endpoint.
Using Postman, send user data in the request body (JSON format).
Receive the request data on the server.
Task 3: Store User Data
Save the received user data into a file using the fs module.
Store the data in JSON format.
Task 4: Implement a PUT API
Create a PUT API endpoint.
Send additional user information in the request body.
Update the existing user data stored in the file.
Do not overwrite the entire file. Update only the required fields(in the nested object) while preserving the existing data.
Return the updated user object in the API response.
Task 5: Implement a GET API
Create a GET API endpoint.
Read the stored data from the file.
Return only the following fields in the response:
username
empCode
Task 6: Search the user details with respective id (empCode).
