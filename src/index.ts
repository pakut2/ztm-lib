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
  public async stops(where: Partial<Models.Stop>): Promise<Array<Models.Stop>> {
    const { data } = await axios.get(
      `${Constants.BASE_URL}dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json`,
    );

    const stops: Array<Models.Stop> = data.stops;
    let matchedStops: Array<Models.Stop> = [];

    if (!Ztm.isEmpty(where)) {
      const keys = Object.keys(where);
      const values = Object.values(where);

      matchedStops = stops.filter((stop) => {
        let match;

        for (let i = 0; i < keys.length; i++) {
          match = stop[keys[i] as keyof Models.Stop] === values[i];

          if (!match) {
            break;
          }
        }

        return match;
      });
    }

    return matchedStops.length ? matchedStops : stops;
  }

  private static isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
