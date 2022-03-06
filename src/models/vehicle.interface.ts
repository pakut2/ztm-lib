import { Status, Quality } from './types';
export interface Vehicle {
  id: string;
  delayInSeconds: number | null;
  estimatedTime: Date;
  headsign: string;
  routeId: number;
  scheduledTripStartTime: Date;
  tripId: number;
  status: Status;
  theoreticalTime: Date;
  timestamp: Date;
  trip: number;
  vehicleCode: number | null;
  vehicleId: number | null;
  vehicleService: string;
}

export interface ActiveVehicle {
  generated: Date;
  routeShortName: string;
  tripId: number;
  headsign: string;
  vehicleCode: string;
  vehicleService: string;
  vehicleId: number;
  speed: number;
  direction: number;
  delay: number;
  scheduledTripStartTime: Date;
  lat: number;
  lon: number;
  gpsQuality: Quality;
}
