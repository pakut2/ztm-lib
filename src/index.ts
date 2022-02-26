import axios from 'axios';
import * as Models from './models/models.interface';
import { Constants } from './constants/contants.enum';

export class Ztm {
  /**
   * Get all stops
   */
  public async stops() {
    const { data } = await axios.get(
      `${Constants.BASE_URL}dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json`,
    );

    return data.stops as Models.Stop[];
  }
}
