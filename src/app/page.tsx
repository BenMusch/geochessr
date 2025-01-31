"use client";

import { useEffect, useState } from "react";
import { MapillaryViewer } from "@/components/MapillaryViewer";
import { getRandomImages } from "@/utils/mapillary";
import type { MapillaryImage } from "@/utils/mapillary";

const MAPILLARY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPILLARY_ACCESS_TOKEN;

export default function Home() {
  const [images, setImages] = useState<MapillaryImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      if (!MAPILLARY_ACCESS_TOKEN) return;
      try {
        setLoading(true);
        const fetchedImages = await getRandomImages(MAPILLARY_ACCESS_TOKEN, 5);
        if (fetchedImages.length === 0) {
          throw new Error("No images found");
        }
        setImages(fetchedImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images");
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentImage = images[currentImageIndex];

  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="mb-4">{/* ... header content ... */}</header>

      <main className="flex-1 flex flex-col gap-4">
        {currentImage && (
          <div className="relative">
            <MapillaryViewer
              imageId={currentImage.id}
              accessToken={MAPILLARY_ACCESS_TOKEN}
            />
          </div>
        )}

        {/* Game controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              // Handle guess
              if (currentImageIndex < images.length - 1) {
                setCurrentImageIndex((prev) => prev + 1);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Make Guess
          </button>
        </div>
      </main>
    </div>
  );
}
