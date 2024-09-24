import { findTrajectoriesByTaxiAndDate } from '../repositories/trajectoryRepository';

export const getTrajectories = async (taxiId: string, date: string) => {
  const trajectories = await findTrajectoriesByTaxiAndDate(taxiId, date);

  return trajectories;
};