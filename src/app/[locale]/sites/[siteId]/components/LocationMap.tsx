'use client';

import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import 'ol/ol.css';

interface LocationMapProps {
  latitude: string | number;
  longitude: string | number;
  monumentName: string;
}

// Create marker SVG for the monument location
const createMarkerSvg = (): string => {
  const color = '#8B6914'; // Theme primary color
  const darkColor = '#6B5010';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 24.986 32.01">
    <path fill="${color}" d="M12.492-.005c-6.899 0-12.493 5.418-12.493 12.102 0 .13.062 3.24 1.136 5.458 3.077 6.875 11.346 14.488 11.357 14.449.014.026 8.248-7.545 11.34-14.408.918-1.627 1.154-5.234 1.154-5.5.001-6.683-5.594-12.101-12.494-12.101zm.002 16.004c-1.935 0-3.5-1.566-3.5-3.499 0-1.934 1.565-3.501 3.5-3.501 1.934 0 3.5 1.567 3.5 3.501 0 1.933-1.566 3.499-3.5 3.499z"/>
    <path fill="${darkColor}" d="M12.494 7c-3.037 0-5.5 2.462-5.5 5.5 0 3.037 2.463 5.499 5.5 5.499s5.5-2.462 5.5-5.499c0-3.038-2.463-5.5-5.5-5.5zm0 8.999c-1.935 0-3.5-1.566-3.5-3.499 0-1.934 1.565-3.501 3.5-3.501 1.934 0 3.5 1.567 3.5 3.501 0 1.933-1.566 3.499-3.5 3.499z"/>
  </svg>`;
};

export function LocationMap({ latitude, longitude, monumentName }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng)) {
      console.error('Invalid coordinates:', { latitude, longitude });
      return;
    }

    const coordinates = fromLonLat([lng, lat]);

    // Create marker feature
    const markerFeature = new Feature({
      geometry: new Point(coordinates),
      name: monumentName,
    });

    // Create marker style
    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(createMarkerSvg())}`,
        scale: 1.2,
      }),
    });

    markerFeature.setStyle(markerStyle);

    // Create vector layer with the marker
    const vectorSource = new VectorSource({
      features: [markerFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 1000,
    });

    // Create map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: coordinates,
        zoom: 14, // Good zoom level to see the area
      }),
      controls: [], // Remove default controls for cleaner look
    });

    mapInstanceRef.current = map;

    // Update map size after render
    setTimeout(() => {
      map.updateSize();
    }, 100);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, monumentName]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-theme-border">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: '300px' }} />
    </div>
  );
}
