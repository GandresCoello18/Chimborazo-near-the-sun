import { EARTH_RADIUS_EQUATORIAL, VISUAL_EARTH_RADIUS, VISUAL_FLATTENING } from './constants';
import type { Vector3 } from 'three';

/**
 * Converts latitude/longitude to 3D Cartesian coordinates on an oblate spheroid
 * @param lat Latitude in degrees (-90 to 90)
 * @param lon Longitude in degrees (-180 to 180)
 * @param radius Optional radius multiplier (default: 1.0 for surface)
 * @returns Vector3 position in 3D space
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number = VISUAL_EARTH_RADIUS
): Vector3 {
  // Convert to radians
  const phi = (90 - lat) * (Math.PI / 180); // colatitude (0 to π)
  const theta = (lon + 180) * (Math.PI / 180); // longitude (0 to 2π)

  // Calculate radius at this latitude (oblate spheroid)
  const sinLat = Math.sin(lat * (Math.PI / 180));

  // Simplified oblate spheroid radius calculation
  const r = radius * (1 - VISUAL_FLATTENING * sinLat * sinLat);

  // Convert spherical to Cartesian
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);

  return { x, y, z } as Vector3;
}

/**
 * Converts a height in meters to a normalized radius offset
 * @param heightMeters Height in meters
 * @returns Radius multiplier (1.0 + normalized height)
 */
export function heightToRadiusOffset(heightMeters: number): number {
  // Convert meters to km, then normalize to our visual scale
  const heightKm = heightMeters / 1000;
  // Earth radius is ~6378 km, so we scale proportionally
  return 1 + heightKm / EARTH_RADIUS_EQUATORIAL;
}
