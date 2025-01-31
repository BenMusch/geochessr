"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "mapillary-js";

interface MapillaryViewerProps {
  imageId: string;
  accessToken: string;
}

export function MapillaryViewer({
  imageId,
  accessToken,
}: MapillaryViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      accessToken,
      container: containerRef.current,
      imageId,
    });

    viewerRef.current = viewer;

    return () => {
      viewer.remove();
    };
  }, [imageId, accessToken]);

  return <div ref={containerRef} className="w-full h-[600px]" />;
}
