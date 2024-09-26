//querying the db for trajectories that match the taxiId and date

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findTrajectoriesByTaxiAndDate = async (taxiId: string, date: string) => {
  //parse the incoming date string (format DD-MM-YYYY)
  const [day, month, year] = date.split('-').map(Number);

  //checking if the parsed date components are valid
  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error('Invalid date format');
  }

  //creating a Date object for the start of the day
  const startOfDay = new Date(year, month - 1, day, 0, 0, 0); // month - 1 because months are 0-indexed | 00:00:00
  //creating a Date object for the end of the day
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

  //checking if the created Date objects are valid
  if (isNaN(startOfDay.getTime()) || isNaN(endOfDay.getTime())) {
    throw new Error('Invalid date');
  }

  //querying the db filtering between the start and end of the day
  const trajectories = await prisma.trajectories.findMany({
    where: {
      taxi_id: parseInt(taxiId),
      date: {
        gte: startOfDay, //gte: greater than or equal to (start of the day)
        lte: endOfDay, //lte: less than or equal to (end of the day)
      },
    },
    select: {
      id: true,
      taxi_id: true,
      date: true,
      latitude: true,
      longitude: true,
    },
  });

  //transforming the `taxi_id` to `taxiId` in the returned data
  const transformedTrajectories = trajectories.map(trajectory => ({
    id: trajectory.id,
    taxiId: trajectory.taxi_id, //map `taxi_id` to `taxiId`
    date: trajectory.date,
    latitude: trajectory.latitude,
    longitude: trajectory.longitude,
  }));

  return transformedTrajectories;
};

//method to find the latest trajectories
export const findLatestTrajectories = async () => {
  //group by taxi_id and get the latest date for each taxi
  const latestTrajectories = await prisma.trajectories.groupBy({
    by: ['taxi_id'],
    _max: {
      date: true,
    },
    orderBy: {
      _max: {
        date: 'desc', //get the latest data based on date
      },
    },
    take: 10, //limit to 10 latest entries
  });

  //fetch full trajectory details for the latest records
  const detailedTrajectories = await Promise.all(
    latestTrajectories.map(async (trajectory) => {
      const detailedTrajectory = await prisma.trajectories.findFirst({
        where: {
          taxi_id: trajectory.taxi_id,
          date: trajectory._max.date,
        },
        include: {
          taxis: {
            select: { plate: true }, //only select the taxi plate
          },
        },
      });
      return detailedTrajectory;
    })
  );

  //transforming the result using built-in methods
  return detailedTrajectories.map((trajectory) => ({
    taxiId: trajectory!.taxi_id, //with non-null assertion
    plate: trajectory!.taxis?.plate, //with non-null assertion
    timestamp: trajectory!.date?.toLocaleString('en-US', { //with non-null assertion
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    latitude: trajectory!.latitude, //with non-null assertion
    longitude: trajectory!.longitude, //with non-null assertion
  }));
};