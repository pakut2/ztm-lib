import axios from 'axios';
import { Stop } from './models';
import { calcDistance, partialMatch } from './utils';

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
        distance: Math.round(calcDistance(latitude, longitude, stop.stopLat, stop.stopLon)),
      }),
    )
    .filter((stop) => distance >= stop.distance);

  return stopsInVicinity.sort((stop1, stop2) => {
    return stop1.distance - stop2.distance;
  });
};
