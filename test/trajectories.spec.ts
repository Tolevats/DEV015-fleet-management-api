//unit testing for trajectoryController.ts

import { fetchTrajectories, fetchLatestTrajectories } from '../src/controllers/trajectoryController';
import { getTrajectories, getLatestTrajectories } from '../src/services/trajectoryService';
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

describe('fetchLatestTrajectories', () => {
    //testing1 if the response has the correct properties
    it('should return an array of trajectories with taxiId, plate, timestamp, latitude, longitude', async () => {
      //mocking the getLatestTrajectories service function to return a valid response
      (getLatestTrajectories as jest.Mock).mockResolvedValue([
        {
          taxiId: 1,
          plate: 'ABC123',
          timestamp: '2024-09-25 09:40:01',
          latitude: 51.5074,
          longitude: -0.1278,
        },
      ]);
  
      //mocking req and res objects
      const req = {} as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      await fetchLatestTrajectories(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          taxiId: 1,
          plate: 'ABC123',
          timestamp: '2024-09-25 09:40:01',
          latitude: 51.5074,
          longitude: -0.1278,
        },
      ]);
    });
  
    //testing2 for internal server errors
    it('should return 500 if an error occurs', async () => {
      (getLatestTrajectories as jest.Mock).mockRejectedValue(new Error('Internal server error'));
  
      const req = {} as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      await fetchLatestTrajectories(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });