<div align="center">
<h1>Library for ZTM Gdańsk</h1>

[![build](https://img.shields.io/github/workflow/status/pakut2/ztm-sdk/CI)]()
[![codecov](https://codecov.io/gh/pakut2/ztm-sdk/branch/main/graph/badge.svg?token=LB087ONKKA)](https://codecov.io/gh/pakut2/ztm-sdk)
[![downloads](https://img.shields.io/npm/dm/ztm)](https://www.npmjs.com/package/ztm)
[![license](https://img.shields.io/github/license/pakut2/ztm-sdk)](https://github.com/pakut2/ztm-sdk/blob/main/LICENSE.md)

This library offers some utility functions and allows for easier interaction with the ZTM Gdańsk API.

</div>

## Installation

```shell
npm i ztm
```

## Usage

```typescript
import ztm from 'ztm';

const stops = await ztm.stops({ stopId: 1337 });
```

### Methods

`stops(where?: Object)`

Fetch all stops (filtered by properties in `where`)

@param `where`

- `stopId`: number - unique id of the stop (in Tricity)
- `stopCode`: string - used to identify stops with the same name
- `stopName`: string - stop name
- `stopShortName`: string - unique id of the stop (in ZTM | ZKM)
- `stopDesc`: string - ZTM stop name
- `subName`: string - optional
- `date`: Date - date of the last data update
- `zoneId`: number - town/community unique id
- `zoneName`: string - town/community name
- `virtual`: number - flag used to determine whether stop is not intended for passengers (1 - yes, 0 - no)
- `nonpassenger`: number - flag used to determine whether stop is intended for passengers (1 - yes, 0 - no)
- `depot`: number - flag used to determine whether stop is a depot (1 - yes, 0 - no)
- `ticketZoneBorder`: number - flag used to determine whether stop is a ticket zone border (1 - yes, 0 - no)
- `onDemand`: number - flag used to determine whether stop is on demand (1 - yes, 0 - no)
- `activationDate`: Date - date since stop data has been valid
- `stopLat`: number - stop latitude
- `stopLon`: number - stop longitude

@returns Array of stops

---

`nearStops(latitude: number, longitude: number, where?: Object, distance: number)`
Fetch all stops in specified radius

@param `latitude` Starting point latitude

@param `longitude` Starting point longitude

@param `where` (the same as above)

@param `distance` Search radius (in meters). Default: 500m

@returns Array of stops with distance from starting point. Sorted desc. based on distance

---

`stopVehicles(stopId: number, where? Object)`

Fetch all vehicles for the stop

@param `stopId`

@param `where`

- `id`: string - vehicle id ('T' + `tripId` + 'R' + `routeId`)
- `delayInSeconds`: number | null - set only when `status` equals "REALTIME"
- `estimatedTime`: Date - estimated departure time
- `headsign`: string - trip destination
- `routeId`: number
- `scheduledTripStartTime`: Date
- `tripId`: number
- `status`: string - "REALTIME" | "SCHEDULED"
- `theoreticalTime`: Date - scheduled departure time
- `timestamp`: Date - timestamp used for calculating estimated values
- `trip`: number - internal `tripId`
- `vehicleCode`: number | null - set only when `status` equals "REALTIME"
- `vehicleId`: number | null - internal id, set only when `status` equals "REALTIME"
- `vehicleService`: string - vehicle service id

@returns Array of vehicles

---

`stopsVehicles(stopIds: number[], where? Object)`
Fetch all vehicles for multiple stops

@param `stopIds`
@param `where` the same as for `stopVehicles`

@returns An array of vehicles keyed by id of the corresponding stop

---

`activeVehicles(where?: Object)`

Fetch all vehicles currently en route

@param `where`

- `generated`: Date - timestamp of last `lat` and `lon` update (generally delay is around 20s)
- `routeShortName`: string - vehicle number
- `tripId`: number
- `headsign`: string - vehicle destination
- `vehicleCode`: string - unique vehicle code (visible on the vehicle's side)
- `vehicleService`: string - vehicle service id
- `vehicleId`: number
- `speed`: number - vehicle velocity in km/h
- `direction`: number - geographic direction in range of 0-315, with steps by 45 (0 - north, 315 - north-west)
- `delay`: number - delay in seconds
- `scheduledTripStartTime`: Date
- `lat`: number - vehicle latitude
- `lon`: number - vehicle longitude
- `gpsQuality`: number - 0 - no GPS signal, 1-3 - GPS signal strength

  @returns An array of vehicles

---

- Returned objects have the same properties as the corresponding `where` param
- All dates are in ISO-8601 (UTC)
