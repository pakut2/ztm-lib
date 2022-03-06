import axios from 'axios';
import { ActiveVehicle, Vehicle } from './models';
import { partialMatch } from './utils';

/**
 * Fetch all vehicles for the stop
 *
 * @param stopId
 * @param where Optional object containing properties to query by
 *
 * @returns Array of vehicles
 */
export const stopVehicles = async (
  stopId: number,
  where?: Partial<Vehicle>,
): Promise<Vehicle[]> => {
  const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`);

  const vehicles: Vehicle[] = data.departures;
  const matchedVehicles = where && Object.keys(where).length ? partialMatch(vehicles, where) : null;

  return matchedVehicles ?? vehicles;
};

interface KeyedVehicles {
  [stopId: number]: Vehicle[];
}

/**
 * Fetch all vehicles for multiple stops
 *
 * @param stopIds
 * @param where Optional object containing properties to query by
 *
 * @returns An array of vehicles keyed by id of the corresponding stop
 */
export const stopsVehicles = async (
  stopIds: number[],
  where?: Partial<Vehicle>,
): Promise<KeyedVehicles[]> => {
  const vehicles = await Promise.all(stopIds.map((id) => stopVehicles(id, where)));

  return vehicles.map((vehicle, i) => {
    return { [stopIds[i]]: vehicle };
  });
};

/**
 * Fetch all vehicles currently en route
 *
 * @param where Optional object containing properties to query by
 *
 * @returns An array of vehicles
 */
export const activeVehicles = async (where?: Partial<ActiveVehicle>): Promise<ActiveVehicle[]> => {
  const { data } = await axios.get('https://ckan2.multimediagdansk.pl/gpsPositions?v=2');

  const vehicles: ActiveVehicle[] = data.vehicles;
  const matchedVehicles = where && Object.keys(where).length ? partialMatch(vehicles, where) : null;

  return matchedVehicles ?? vehicles;
};
