import axios from 'axios';
import { Stop, Vehicle } from './models';
import { partialMatch } from './utils';

/**
 * Fetch all stops
 *
 * @param where Optional object containing properties to query by
 *
 * @returns Array of stops
 */
export const stops = async (where?: Partial<Stop>): Promise<Stop[]> => {
  const { data } = await axios.get(
    `https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json`,
  );

  const stopsRes: Stop[] = data.stops;
  const matchedStops = where && Object.keys(where).length && partialMatch(stopsRes, where);

  return matchedStops ? matchedStops : stopsRes;
};

/**
 * Fetch all vehicles for the stop
 *
 * @param stopId
 * @param where Optional object containing properties to query by
 *
 * @returns Array of vehicles
 */
export const vehiclesForStop = async (
  stopId: number,
  where?: Partial<Vehicle>,
): Promise<Vehicle[]> => {
  const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`);

  const vehicles: Vehicle[] = data.departures;
  const matchedVehicles = where && Object.keys(where).length && partialMatch(vehicles, where);

  return matchedVehicles ? matchedVehicles : vehicles;
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
export const vehiclesForStops = async (
  stopIds: number[],
  where?: Partial<Vehicle>,
): Promise<KeyedVehicles[]> => {
  const vehicles = await Promise.all(stopIds.map((id) => vehiclesForStop(id, where)));

  return vehicles.map((vehicle, i) => {
    return { [stopIds[i]]: vehicle };
  });
};
