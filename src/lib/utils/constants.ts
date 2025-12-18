// Earth dimensions (approximations)
export const EARTH_RADIUS_EQUATORIAL = 6378.1; // km
export const EARTH_RADIUS_POLAR = 6356.8; // km
export const EARTH_FLATTENING = (EARTH_RADIUS_EQUATORIAL - EARTH_RADIUS_POLAR) / EARTH_RADIUS_EQUATORIAL;

// For visualization, we'll use a slightly exaggerated oblate spheroid
export const VISUAL_EARTH_RADIUS = 1; // normalized unit for 3D scene
export const VISUAL_FLATTENING = 0.02; // slightly exaggerated for clarity

// Mountain data
export const CHIMBORAZO = {
  name: 'Chimborazo',
  lat: -1.4693,
  lon: -78.8176,
  height: 6263, // meters
  distanceFromCenter: 6384.4, // km (approximate)
};

export const EVEREST = {
  name: 'Mount Everest',
  lat: 27.9881,
  lon: 86.9250,
  height: 8848, // meters
  distanceFromCenter: 6382.3, // km (approximate)
};

