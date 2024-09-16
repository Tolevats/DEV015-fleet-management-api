// i'm using this file as the entry point that starts the server

import app from "./app";

const PORT = 3000 || process.env.PORT
//app.listen(PORT, ...: This tells the Express application to start listening for incoming HTTP requests on the port specified by PORT
//() => { ... }: This is a callback function that gets executed once the server starts successfully
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
