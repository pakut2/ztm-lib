import { Bool } from './types';

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
  virtual: Bool;
  nonpassenger: Bool;
  depot: Bool;
  ticketZoneBorder: Bool;
  onDemand: Bool;
  activationDate: Date;
  stopLat: number;
  stopLon: number;
}
