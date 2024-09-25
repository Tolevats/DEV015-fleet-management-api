import { Request, Response } from 'express';
import { getTrajectories, getLatestTrajectories } from '../services/trajectoryService';

export const fetchTrajectories = async (req: Request, res: Response) => {
  try {
    const taxiId = req.query.taxiId as string;
    const dateStr = req.query.date as string;

    //check1 for missing taxiId or date parameters
    if (!taxiId || !dateStr) {
        return res.status(400).json({ message: 'Missing required parameters: taxiId or date' });
    }

    //fetch trajectories for the given taxiId and date
    const trajectories = await getTrajectories(taxiId, dateStr);

    //return 404 if no trajectories are found
    if (!trajectories || trajectories.length === 0) {
        return res.status(404).json({ message: 'No trajectories found for the specified taxi id and date' });
    }

    //return trajectories with 200 OK
    return res.status(200).json(trajectories);
  } catch (error) {
    console.error('Error fetching trajectories:', (error as Error).message);

    //check2 if the error is due to an invalid date format
    if ((error as Error).message === 'Invalid date format' || (error as Error).message === 'Invalid date') {
      return res.status(400).json({ message: 'Invalid date format. Please use DD-MM-YYYY format.' });
    }
    //return 500 for any other server error
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//fetchLatestTrajectories for /trajectories/latest endpoint
export const fetchLatestTrajectories = async (req: Request, res: Response) => {
  try {
    //fetch latest trajectories
    const trajectories = await getLatestTrajectories();

    //check if no trajectories were found
    if (!trajectories || trajectories.length === 0) {
      return res.status(404).json({ message: 'No latest trajectories found' });
    }

    //return the latest trajectories with status 200 OK
    return res.status(200).json(trajectories);
  } catch (error) {
    console.error('Error fetching latest trajectories:', (error as Error).message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};