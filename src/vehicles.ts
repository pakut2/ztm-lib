import axios from 'axios';
import { Vehicle } from './models';
import { partialMatch } from './utils';

/**
 * Fetch all vehicles for the stop that meet given criteria
 *
 * @param stopId
 * @param where Optional object containing properties to query by
 *
 * @returns Array of vehicles
 */
export const vehiclesForStop = async (
  stopId: number,
  where?: Partial<Vehicle>,
): Promise<Array<Vehicle>> => {
  const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`);

  const vehicles: Array<Vehicle> = data.departures;
  const matchedVehicles = where && partialMatch(vehicles, where);

  return matchedVehicles ? matchedVehicles : vehicles;
};
