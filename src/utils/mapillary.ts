import { BoundingBox, BoundingBoxType } from "@/utils/locations";
const MAPILLARY_API_ENDPOINT = "https://graph.mapillary.com/images";

export interface MapillaryImage {
  id: string;
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  captured_at: string;
}

async function buildMapilaryQueryParams(
  accessToken: string,
  bbox: BoundingBox,
  limit: number,
): Promise<URLSearchParams> {
  switch (bbox.type) {
    case BoundingBoxType.GEOJSON: {
      const response = await fetch(bbox.file);
      if (!response.ok) {
        throw new Error(`Failed to fetch bounding box: ${response.statusText}`);
      }

      const data = await response.json();
      const [west, south, east, north] =
        data.features[0].geometry.coordinates[0];
      const params = new URLSearchParams({
        access_token: accessToken,
        fields: "id,geometry,captured_at",
        bbox: `${west},${south},${east},${north}`,
        limit: limit.toString(),
      });

      return params;
    }
    default:
      throw new Error(`Unsupported bounding box type: ${bbox.type}`);
  }
  const params = new URLSearchParams({
    access_token: accessToken,
    fields: "id,geometry,captured_at",
    bbox: `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`,
    limit: limit.toString(),
  });

  return params;
}

async function fetchImagesInArea(
  accessToken: string,
  bbox: BoundingBox,
  limit: number = 10,
): Promise<MapillaryImage[]> {
  const params = new URLSearchParams({
    access_token: accessToken,
    fields: "id,geometry,captured_at",
    bbox: `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`,
    limit: limit.toString(),
  });

  const response = await fetch(`${MAPILLARY_API_ENDPOINT}?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

// Example areas of interest
const AREAS_OF_INTEREST: Record<string, BoundingBox> = {
  sanFrancisco: {
    west: -122.5158,
    south: 37.7079,
    east: -122.3558,
    north: 37.8199,
  },
};

export async function getRandomImages(
  accessToken: string,
  count: number = 5,
): Promise<MapillaryImage[]> {
  // Randomly select an area
  const areas = Object.values(AREAS_OF_INTEREST);
  const randomArea = areas[Math.floor(Math.random() * areas.length)];

  try {
    const images = await fetchImagesInArea(accessToken, randomArea, count);
    return images;
  } catch (error) {
    console.error("Failed to fetch random images:", error);
    return [];
  }
}
