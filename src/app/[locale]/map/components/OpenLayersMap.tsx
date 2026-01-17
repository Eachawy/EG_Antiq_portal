'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle, memo } from 'react';
import { useTranslations } from 'next-intl';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon, Circle, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

interface Site {
  id: string;
  name: { english: string; arabic: string };
  location: {
    city: string;
    governorate: string;
    coordinates: { lat: number; lng: number };
  };
  historicalPeriod: string;
  dynasty: string;
  dateRange: {
    start: number;
    end: number;
  };
  description: string;
  thumbnailUrl: string;
}

interface OpenLayersMapProps {
  sites: Site[];
  onSiteClick?: (siteId: string) => void;
}

export interface OpenLayersMapRef {
  getCurrentLocation: () => void;
}

const getPeriodColor = (period: string): string => {
  switch (period) {
    case 'Ancient Egyptian':
      return '#f59e0b';
    case 'Ptolemaic':
      return '#a855f7';
    case 'Roman':
      return '#ef4444';
    case 'Byzantine':
      return '#3b82f6';
    case 'Islamic':
      return '#22c55e';
    default:
      return '#6b7280';
  }
};

// Helper to darken color for inner circle
const darkenColor = (hex: string): string => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Darken by 30%
  const factor = 0.7;
  const newR = Math.round(r * factor);
  const newG = Math.round(g * factor);
  const newB = Math.round(b * factor);

  // Convert back to hex
  return '#' + [newR, newG, newB].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Create marker SVG matching the provided design
const createMarkerSvg = (color: string, scale: number = 1): string => {
  const width = 24.986 * scale;
  const height = 32.01 * scale;
  const darkColor = darkenColor(color);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24.986 32.01">
    <path fill="${color}" d="M12.492-.005c-6.899 0-12.493 5.418-12.493 12.102 0 .13.062 3.24 1.136 5.458 3.077 6.875 11.346 14.488 11.357 14.449.014.026 8.248-7.545 11.34-14.408.918-1.627 1.154-5.234 1.154-5.5.001-6.683-5.594-12.101-12.494-12.101zm.002 16.004c-1.935 0-3.5-1.566-3.5-3.499 0-1.934 1.565-3.501 3.5-3.501 1.934 0 3.5 1.567 3.5 3.501 0 1.933-1.566 3.499-3.5 3.499z"/>
    <path fill="${darkColor}" d="M12.494 7c-3.037 0-5.5 2.462-5.5 5.5 0 3.037 2.463 5.499 5.5 5.499s5.5-2.462 5.5-5.499c0-3.038-2.463-5.5-5.5-5.5zm0 8.999c-1.935 0-3.5-1.566-3.5-3.499 0-1.934 1.565-3.501 3.5-3.501 1.934 0 3.5 1.567 3.5 3.501 0 1.933-1.566 3.499-3.5 3.499z"/>
  </svg>`;
};

const createMarkerStyle = (color: string, scale: number = 1): Style => {
  const svgString = createMarkerSvg(color, scale);

  return new Style({
    image: new Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
      scale: 1,
    }),
  });
};

const OpenLayersMapComponent = forwardRef<OpenLayersMapRef, OpenLayersMapProps>(
  ({ sites, onSiteClick }, ref) => {
    const tMap = useTranslations('map');
    const tCommon = useTranslations('common');
    const mapRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const overlayRef = useRef<Overlay | null>(null);
    const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
    const [hoveredSite, setHoveredSite] = useState<Site | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [currentLocationLayer, setCurrentLocationLayer] = useState<VectorLayer<VectorSource> | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    // Initialize map once
    useEffect(() => {
      if (!mapRef.current || !popupRef.current || mapInstanceRef.current) return;

      console.log('Initializing map');

      // Create popup overlay
      const overlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      });
      overlayRef.current = overlay;

      // Create map
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }),
            opacity: 0.4,
          }),
        ],
        view: new View({
          center: fromLonLat([31.2357, 30.0444]),
          zoom: 6,
        }),
        overlays: [overlay],
      });

      // Apply theme styling
      const mapElement = map.getTargetElement();
      if (mapElement) {
        mapElement.style.filter = 'sepia(0.25) contrast(1.05) brightness(1.2) saturate(0.65) hue-rotate(20deg)';
        mapElement.style.backgroundColor = '#5a5a4a';

        const style = document.createElement('style');
        style.textContent = `
          .ol-attribution,
          .ol-attribution button,
          .ol-attribution ul,
          .ol-attribution li,
          .ol-attribution a {
            color: #6b5845 !important;
          }
          .ol-attribution button:hover {
            color: #8B6914 !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Add click handler
      map.on('click', (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
          const featureId = feature.getId() as string;
          if (featureId && onSiteClick) {
            onSiteClick(featureId);
          }
          return true;
        });
      });

      // Add hover effect
      map.on('pointermove', (event) => {
        const pixel = map.getEventPixel(event.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';

        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        // Reset all features to normal size
        if (vectorLayerRef.current) {
          const source = vectorLayerRef.current.getSource();
          if (source) {
            source.getFeatures().forEach((feature) => {
              const period = feature.get('period') as string;
              const color = getPeriodColor(period);
              feature.setStyle(createMarkerStyle(color, 1));
            });
          }
        }

        let foundFeature = false;

        map.forEachFeatureAtPixel(pixel, (feature: any) => {
          foundFeature = true;
          const period = feature.get('period') as string;
          const color = getPeriodColor(period);
          feature.setStyle(createMarkerStyle(color, 1.3));

          const siteData = feature.get('siteData') as Site;
          const geometry = feature.getGeometry() as Point;
          const coordinates = geometry.getCoordinates();

          hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSite(siteData);
            overlay.setPosition(coordinates);
          }, 300);

          return true;
        });

        if (!foundFeature) {
          setHoveredSite(null);
          overlay.setPosition(undefined);
        }
      });

      mapInstanceRef.current = map;

      setTimeout(() => {
        map.updateSize();
      }, 100);

      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        map.setTarget(undefined);
        mapInstanceRef.current = null;
      };
    }, []); // Only run once

    // Update markers when sites change
    useEffect(() => {
      if (!mapInstanceRef.current) return;

      const map = mapInstanceRef.current;

      console.log('Updating markers:', sites.length);

      // Remove existing vector layer
      if (vectorLayerRef.current) {
        map.removeLayer(vectorLayerRef.current);
        vectorLayerRef.current = null;
      }

      // Create features from sites
      const features = sites.map((site) => {
        const feature = new Feature({
          geometry: new Point(
            fromLonLat([
              site.location.coordinates.lng,
              site.location.coordinates.lat,
            ])
          ),
        });

        feature.setId(site.id);
        feature.set('siteData', site);
        feature.set('name', site.name.english);
        feature.set('period', site.historicalPeriod);

        const color = getPeriodColor(site.historicalPeriod);
        feature.setStyle(createMarkerStyle(color, 1));

        return feature;
      });

      // Create and add new vector layer
      const vectorSource = new VectorSource({ features });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 1000,
      });

      map.addLayer(vectorLayer);
      vectorLayerRef.current = vectorLayer;

      // Fit view to show all markers
      if (features.length > 0) {
        const extent = vectorSource.getExtent();
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          maxZoom: 12,
          duration: 500,
        });
      }
    }, [sites]); // Only run when sites change

    // Format date range for display
    const formatDateRange = (start: number, end: number) => {
      const formatYear = (year: number) => {
        return year < 0 ? `${Math.abs(year)} ${tCommon('bc')}` : `${year} ${tCommon('ad')}`;
      };
      return `${formatYear(start)} - ${formatYear(end)}`;
    };

    // Get current location
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        return;
      }

      setIsLocating(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (mapInstanceRef.current) {
            const map = mapInstanceRef.current;
            const coordinates = fromLonLat([longitude, latitude]);

            if (currentLocationLayer) {
              map.removeLayer(currentLocationLayer);
            }

            const locationFeature = new Feature({
              geometry: new Point(coordinates),
            });

            const locationStyle = new Style({
              image: new Circle({
                radius: 12,
                fill: new Fill({
                  color: 'rgba(66, 153, 225, 0.6)',
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 3,
                }),
              }),
            });

            locationFeature.setStyle(locationStyle);

            const locationSource = new VectorSource({
              features: [locationFeature],
            });

            const locationLayer = new VectorLayer({
              source: locationSource,
              zIndex: 2000,
            });

            map.addLayer(locationLayer);
            setCurrentLocationLayer(locationLayer);

            map.getView().animate({
              center: coordinates,
              zoom: 12,
              duration: 1000,
            });
          }

          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation Error:', error);
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    useImperativeHandle(ref, () => ({
      getCurrentLocation,
    }));

    return (
      <div className="w-full h-full map-container">
        <div ref={mapRef} className="w-full h-full map-wrapper" />

        {/* Hover Popup */}
        <div ref={popupRef} className="absolute pointer-events-none">
          {hoveredSite && (
            <div className="bg-theme-card border-2 border-theme-primary rounded-lg shadow-2xl overflow-hidden w-56 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="relative h-24 overflow-hidden bg-theme-accent">
                <img
                  src={hoveredSite.thumbnailUrl}
                  alt={hoveredSite.name.english}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400';
                  }}
                />
                <div
                  className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-white text-[10px] backdrop-blur-sm"
                  style={{ backgroundColor: getPeriodColor(hoveredSite.historicalPeriod) + 'dd' }}
                >
                  {hoveredSite.historicalPeriod}
                </div>
              </div>

              <div className="p-3 space-y-1.5">
                <h3 className="text-theme-text text-sm font-medium line-clamp-1">
                  {hoveredSite.name.english}
                </h3>

                <div className="flex items-center gap-1 text-theme-muted text-xs">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{hoveredSite.location.city}</span>
                </div>

                <div className="flex items-center gap-1 text-theme-muted text-xs">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="line-clamp-1">{formatDateRange(hoveredSite.dateRange.start, hoveredSite.dateRange.end)}</span>
                </div>

                <p className="text-theme-primary text-[10px] text-center pt-1.5 border-t border-theme-border">
                  {tMap('tooltips.clickDetails')}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="map-pattern-overlay" />
      </div>
    );
  }
);

OpenLayersMapComponent.displayName = 'OpenLayersMap';

// Memoize the component to prevent unnecessary re-renders
export const OpenLayersMap = memo(OpenLayersMapComponent);
