export enum BoundingBoxType {
  GEOJSON,
}

export interface BoundingBox {
  type: BoundingBoxType.GEOJSON;
  file: string;
}

interface Location {
  boundingBox: BoundingBox;
  name: string;
}

const LOCATIONS: { [key: string]: Location } = {
  poland: {
    boundingBox: {
      type: BoundingBoxType.GEOJSON,
      file: "poland.geojson",
    },
    name: "Poland",
  },
  birmingham: {
    boundingBox: {
      type: BoundingBoxType.GEOJSON,
      file: "birmingham.geojson",
    },
    name: "Birmingham",
  },
  czechia: {
    boundingBox: {
      type: BoundingBoxType.GEOJSON,
      file: "czechia.geojson",
    },
    name: "Czechia",
  },
  netherlands: {
    boundingBox: {
      type: BoundingBoxType.GEOJSON,
      file: "netherlands.geojson",
    },
    name: "Netherlands",
  },
  germany: {
    boundingBox: {
      type: BoundingBoxType.GEOJSON,
      file: "germany.geojson",
    },
    name: "Germany",
  },
};

export type LocationId = keyof typeof LOCATIONS;

// You'll want to populate this with more locations
const AVAILABLE_LOCATIONS: Location[] = [
  {
    imageId: "603171171942583",
    lat: 40.7128,
    lng: -74.006,
  },
  // Add more locations...
];

export function getRandomLocation(): Location {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_LOCATIONS.length);
  return AVAILABLE_LOCATIONS[randomIndex];
}

export function calculateScore(
  guessLat: number,
  guessLng: number,
  actualLat: number,
  actualLng: number,
): number {
  // Implement your scoring logic here
  // This is a simple example - you might want more sophisticated distance calculation
  const distance = Math.sqrt(
    Math.pow(guessLat - actualLat, 2) + Math.pow(guessLng - actualLng, 2),
  );
  return Math.round(5000 * Math.max(0, 1 - distance / 180));
}
