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

type Status = 'REALTIME' | 'SCHEDULED';
