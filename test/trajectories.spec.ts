//unit testing for fetchTrajectories in trajectoryController.ts

import { fetchTrajectories } from '../src/controllers/trajectoryController';
import { getTrajectories } from '../src/services/trajectoryService';
import { Request, Response } from 'express';

jest.mock('../src/services/trajectoryService'); //mocking service to avoid db

describe('fetchTrajectories', () => {
    //testing1 missing query parameters
    it('should return 400 if taxiId or date is missing', async () => {
        const req = { query: { taxiId: '', date: '' } } as unknown as Request;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

        await fetchTrajectories(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Missing required parameters: taxiId or date' });
    });

    //testing internal server error handling
    it('should return 500 if an internal error occurs', async () => {
        const req = { query: { taxiId: '123', date: '02-02-2008' } } as unknown as Request;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
        (getTrajectories as jest.Mock).mockRejectedValue(new Error('Internal server error'));
  
    await fetchTrajectories(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});  