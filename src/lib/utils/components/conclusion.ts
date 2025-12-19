/**
 * Lógica del componente Conclusion
 */

import { CHIMBORAZO, EVEREST, EARTH_RADIUS_EQUATORIAL } from '../constants';

export function getDistanceFromCenter(lat: number, heightMeters: number): number {
  const latRad = lat * (Math.PI / 180);
  const earthRadiusKm =
    EARTH_RADIUS_EQUATORIAL * (1 - 0.00335 * Math.sin(latRad) * Math.sin(latRad));
  const heightKm = heightMeters / 1000;
  return earthRadiusKm + heightKm;
}

export function calculateDistanceDifference(): string {
  const chimborazoDistance = getDistanceFromCenter(CHIMBORAZO.lat, CHIMBORAZO.height);
  const everestDistance = getDistanceFromCenter(EVEREST.lat, EVEREST.height);
  return ((chimborazoDistance - everestDistance) * 1000).toFixed(0);
}
