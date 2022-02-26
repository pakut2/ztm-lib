export interface Stop {
  stopId: number;
  stopCode: string;
  stopName: string;
  stopShortName: string;
  stopDesc: string;
  subName: string;
  date: Date;
  zoneId: number;
  zoneName: string;
  virtual: number | boolean;
  nonpassenger: number | boolean;
  depot: number | boolean;
  ticketZoneBorder: number | boolean;
  onDemand: number | boolean;
  activationDate: Date;
  stopLat: number;
  stopLon: number;
  stopUrl: string;
  locationType?: string;
  parentStation?: string;
  stopTimezone: string;
  wheelchairBoarding?: number | boolean;
}
