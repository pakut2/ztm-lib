import axios from 'axios';
import { Stop } from './models';
import { partialMatch } from './utils';

/**
 * Fetch all stops that meet given criteria
 *
 * @param where Optional object containing properties to query by
 *
 * @returns Array of stops
 */
export const stops = async (where?: Partial<Stop>): Promise<Array<Stop>> => {
  const { data } = await axios.get(
    `https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json`,
  );

  const stopsRes: Array<Stop> = data.stops;
  const matchedStops = where && partialMatch(stopsRes, where);

  return matchedStops ? matchedStops : stopsRes;
};
