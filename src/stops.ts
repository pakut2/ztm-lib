import axios from 'axios';
import { Stop, Vehicle } from './models';
import { calcDist, partialMatch } from './utils';

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

  const allStops: Stop[] = data.stops;
  const matchedStops = where && Object.keys(where).length ? partialMatch(allStops, where) : null;

  return matchedStops ?? allStops;
};

interface StopWithDistance extends Stop {
  distance: number;
}

/**
 * Fetch all stops in specified radius
 *
 * @param latitude Starting point latitude
 * @param longitude Starting point longitude
 * @param distance Search radius (in meters). Default: 500m
 * @param where Optional object containing properties to query by
 *
 * @returns Array of stops with distance from starting point. Sorted desc. based on distance
 */
export const nearStops = async (
  latitude: number,
  longitude: number,
  distance = 500,
  where?: Partial<Stop>,
): Promise<StopWithDistance[]> => {
  const allStops = await stops(where);

  const stopsInVicinity = allStops
    .map((stop) =>
      Object.assign(stop, {
        distance: Math.round(calcDist(latitude, longitude, stop.stopLat, stop.stopLon)),
      }),
    )
    .filter((stop) => distance >= stop.distance);

  return stopsInVicinity.sort((stop1, stop2) => {
    return stop1.distance - stop2.distance;
  });
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
export const vehiclesForStops = async (
  stopIds: number[],
  where?: Partial<Vehicle>,
): Promise<KeyedVehicles[]> => {
  const vehicles = await Promise.all(stopIds.map((id) => vehiclesForStop(id, where)));

  return vehicles.map((vehicle, i) => {
    return { [stopIds[i]]: vehicle };
  });
};
