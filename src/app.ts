//import the Express library for building web server and API in Node.js
//Request and Response represent the HTTP request and response objects that my server handles
import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

//create an instance of an Express application. app is now an object that represents my web server
//setting the port
const app: Application = express();
const prisma = new PrismaClient();

//app.get('/'): This sets up a route that listens for GET requests on the root URL path (/)
//(req: Request, res: Response): These are the request (req) and response (res) objects passed to the callback function when a request is received
//req: Request: Represents the incoming HTTP request. Contains data like query parameters, request body, headers, etc.
//res: Response: Represents the outgoing HTTP response. Contains methods to send data back to the client.
// GET /taxis endpoint
app.get('/taxis', async (req: Request, res: Response) => {
    try {
        // retrieving query parameters
        const plate = req.query.plate as string | undefined;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        // validating page and limit
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({
                message: 'Page or limit is not valid'
            });
        }

        // calculating the offset for pagination
        const skip = (page - 1) * limit;

        // querying the db using Prisma
        const taxis = await prisma.taxis.findMany({
            where: plate ? { plate: { contains: plate } } : {}, // filtering by plate if it's provided
            skip, // used for pagination
            take: limit, // used for pagination
        });

        // returning the list of taxis
        return res.status(200).json({
            messge: 'successful operation',
            data: taxis
        });
    } catch (error) { // added for better handleing if there's an error
        console.error('Failed retrieving taxis', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

export default app;