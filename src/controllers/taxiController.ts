//handling the incoming request and response logic

import { Request, Response } from 'express';
import { getTaxis } from '../services/taxiService';

export const fetchTaxis = async (req: Request, res: Response) => {
    try {
        // Get query parameters
        const plate = req.query.plate as string | undefined;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

        // Validate pagination
        if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
            return res.status(400).json({
                message: 'Page or limit is not valid',
            });
        }

        // Call service to get taxis
        const taxis = await getTaxis(plate, page, limit);
        
        // Send response
        return res.status(200).json(taxis);
    } catch (error) {
        console.error('Failed retrieving taxis', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
