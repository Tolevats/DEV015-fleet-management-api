//import the Express library for building web server and API in Node.js
//Request and Response represent the HTTP request and response objects that my server handles
import express, { Request, Response } from 'express';

//create an instance of an Express application. app is now an object that represents my web server
//setting the port. process.env.PORT: This retrieves the value of the PORT environment variable || 3000: This is a fallback
const app = express();
const PORT = process.env.PORT || 3000;

//app.get('/'): This sets up a route that listens for GET requests on the root URL path (/)
//(req: Request, res: Response): These are the request (req) and response (res) objects passed to the callback function when a request is received
//req: Request: Represents the incoming HTTP request. Contains data like query parameters, request body, headers, etc.
//res: Response: Represents the outgoing HTTP response. Contains methods to send data back to the client.
app.get('/', (req: Request, res: Response) => {
    console.log('Endpoint received');
    res.send('Hello from the endpoint!'); //This sends a response back to the client
});

//app.listen(PORT, ...: This tells the Express application to start listening for incoming HTTP requests on the port specified by PORT
//() => { ... }: This is a callback function that gets executed once the server starts successfully
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
