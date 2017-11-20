import { Location } from './location';

export interface UserDetails {
  session: string,
  maxTimeConsecutiveOutside: number,
  timeInside: number,
  repeatedLocations: number,
  maxTimeConsecutiveInside: number,
  experiment: string,
  experimentDate: number,
  countLocationsInside: number,
  max_time: string,
  countExiting: number,
  totalDistance: number,
  minSpeed: number,
  timeOutside: number,
  totalDistanceInside: number,
  countLocationsOutside: number,
  countEntering: number,
  batch: string,
  countLocations: number,
  maxSpeed: number,
  totalDistanceOutside: number,
  min_time: string,
  application: string,
  locations: Location[],
  user: string
}
