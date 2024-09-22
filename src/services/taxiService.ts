//handling the business logic
//here is where I implement the pagination logic, validation, and any other rules, but delegate the actual data fetching to the repository.

import { findTaxis } from '../repositories/taxiRepository';

export const getTaxis = async (plate: string | undefined, page: number, limit: number) => {
    // Business logic for pagination
    const skip = (page - 1) * limit;

    // Fetch data from the repository
    return findTaxis(plate, skip, limit);
};