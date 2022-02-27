import axios from 'axios';
import * as Models from './models/models.interface';
import { Constants } from './constants/contants.enum';

export class Ztm {
  /**
   * Fetch all stops that meet given criteria
   *
   * @param where Optional object containing properties to query by
   *
   * @returns Array of stops
   */
  public async stops(where?: Partial<Models.Stop>): Promise<Array<Models.Stop>> {
    const { data } = await axios.get(
      `${Constants.BASE_URL}dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json`,
    );

    const stops: Array<Models.Stop> = data.stops;
    let matchedStops: Array<Models.Stop> = [];
    asd;
    if (where) {
      matchedStops = stops.filter((stop) => {
        let match;

        for (const [key, value] of Object.entries(where)) {
          match = stop[key as keyof Models.Stop] === value;

          if (!match) break;
        }

        return match;
      });
    }

    return matchedStops.length ? matchedStops : stops;
  }
}
