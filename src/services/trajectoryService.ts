import { findTrajectoriesByTaxiAndDate, findLatestTrajectories } from '../repositories/trajectoryRepository';

export const getTrajectories = async (taxiId: string, date: string) => {
  return await findTrajectoriesByTaxiAndDate(taxiId, date);
};

//service method to get the latest trajectories
export const getLatestTrajectories = async () => {
  return await findLatestTrajectories();
};