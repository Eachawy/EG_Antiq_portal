'use client';


import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
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
// import { Toast } from 'primereact/toast';
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
      return '#f59e0b'; // amber-500
    case 'Ptolemaic':
      return '#a855f7'; // purple-500
    case 'Roman':
      return '#ef4444'; // red-500
    case 'Byzantine':
      return '#3b82f6'; // blue-500
    case 'Islamic':
      return '#22c55e'; // green-500
    default:
      return '#6b7280'; // gray-500
  }
};

// Create a modern outline marker pin using canvas (like the reference image)
const createMarkerCanvas = (color: string, scale: number = 1): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const size = 36 * scale;
  canvas.width = size;
  canvas.height = size * 1.5;
  const ctx = canvas.getContext('2d')!;

  const centerX = size / 2;
  const centerY = size / 2.5;
  const radius = size / 2.8;
  const lineWidth = 3 * scale;

  // Draw shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 6 * scale;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 3 * scale;

  // Draw the pin filled shape (teardrop)
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Draw filled circle at top
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw pointed bottom connecting to circle (filled)
  ctx.beginPath();
  ctx.moveTo(centerX - radius * 0.5, centerY + radius * 0.7);
  ctx.quadraticCurveTo(
    centerX - radius * 0.3,
    centerY + radius * 1.5,
    centerX,
    size * 1.15
  );
  ctx.quadraticCurveTo(
    centerX + radius * 0.3,
    centerY + radius * 1.5,
    centerX + radius * 0.5,
    centerY + radius * 0.7
  );
  ctx.closePath();
  ctx.fill();

  // Reset shadow for inner circle
  ctx.shadowColor = 'transparent';

  // Draw white inner circle (filled center dot)
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
};

// Create marker style
const createMarkerStyle = (color: string, scale: number = 1): Style => {
  const canvas = createMarkerCanvas(color, scale);
  return new Style({
    image: new Icon({
      img: canvas,
      width: canvas.width,
      height: canvas.height,
      anchor: [0.5, 1],
    }),
  });
};

export const OpenLayersMap = forwardRef<OpenLayersMapRef, OpenLayersMapProps>(
  ({ sites, onSiteClick }, ref) => {
    const tMap = useTranslations('map');
    const tCommon = useTranslations('common');
    const mapRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const overlayRef = useRef<Overlay | null>(null);
    const [hoveredSite, setHoveredSite] = useState<Site | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [currentLocationLayer, setCurrentLocationLayer] = useState<VectorLayer<VectorSource> | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
      if (!mapRef.current || !popupRef.current) return;

      console.log('Creating map with sites:', sites.length);

      // Create popup overlay
      const overlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      });
      overlayRef.current = overlay;

      // Create features for each site
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
        feature.set('siteData', site); // Store full site data
        feature.set('name', site.name.english);
        feature.set('period', site.historicalPeriod);

        // Create style based on period
        const color = getPeriodColor(site.historicalPeriod);
        feature.setStyle(createMarkerStyle(color, 1));

        return feature;
      });

      console.log('Created features:', features.length);

      // Create vector source and layer
      const vectorSource = new VectorSource({
        features: features,
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 1000,
      });

      // Create map with custom styled tiles
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              // Using CartoDB Dark Matter for a darker, sophisticated look
              url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }),
            opacity: 0.4,
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([31.2357, 30.0444]),
          zoom: 6,
        }),
        overlays: [overlay],
      });

      // Apply custom CSS filter to match the olive-khaki archaeological theme
      const mapElement = map.getTargetElement();
      if (mapElement) {
        // Create olive-khaki tone matching the reference image (much lighter version)
        mapElement.style.filter = 'sepia(0.25) contrast(1.05) brightness(1.2) saturate(0.65) hue-rotate(20deg)';
        mapElement.style.backgroundColor = '#5a5a4a'; // Olive-khaki archaeological tone

        // Add custom CSS for attribution styling
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

        // Also try direct styling after a delay for elements to render
        setTimeout(() => {
          const attributions = mapElement.querySelectorAll('.ol-attribution, .ol-attribution button, .ol-attribution ul, .ol-attribution li, .ol-attribution a');
          attributions.forEach((el) => {
            (el as HTMLElement).style.color = '#6b5845';
          });
        }, 500);
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

      // Add hover effect with popup
      map.on('pointermove', (event) => {
        const pixel = map.getEventPixel(event.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';

        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }

        // Reset all features to normal size
        vectorSource.getFeatures().forEach((feature) => {
          const period = feature.get('period') as string;
          const color = getPeriodColor(period);
          feature.setStyle(createMarkerStyle(color, 1));
        });

        let foundFeature = false;

        // Enlarge hovered feature and show popup
        map.forEachFeatureAtPixel(pixel, (feature: any) => {
          foundFeature = true;
          const period = feature.get('period') as string;
          const color = getPeriodColor(period);
          feature.setStyle(createMarkerStyle(color, 1.3));

          const siteData = feature.get('siteData') as Site;
          const geometry = feature.getGeometry() as Point;
          const coordinates = geometry.getCoordinates();

          // Show popup after a short delay
          hoverTimeoutRef.current = setTimeout(() => {
            setHoveredSite(siteData);
            overlay.setPosition(coordinates);
          }, 300);

          return true;
        });

        // Hide popup if not hovering over any feature
        if (!foundFeature) {
          setHoveredSite(null);
          overlay.setPosition(undefined);
        }
      });

      mapInstanceRef.current = map;

      // Force map to update its size
      setTimeout(() => {
        map.updateSize();
      }, 100);

      // Cleanup
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        map.setTarget(undefined);
      };
    }, [sites, onSiteClick]);

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
        // Toast.error('Geolocation is not supported by your browser');
        return;
      }

      setIsLocating(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });

          if (mapInstanceRef.current) {
            const map = mapInstanceRef.current;
            const coordinates = fromLonLat([longitude, latitude]);

            // Remove existing location layer if any
            if (currentLocationLayer) {
              map.removeLayer(currentLocationLayer);
            }

            // Create a feature for current location
            const locationFeature = new Feature({
              geometry: new Point(coordinates),
            });

            // Create a pulsing blue circle style for current location
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

            // Create vector source and layer for location marker
            const locationSource = new VectorSource({
              features: [locationFeature],
            });

            const locationLayer = new VectorLayer({
              source: locationSource,
              zIndex: 2000, // Higher z-index to appear on top
            });

            map.addLayer(locationLayer);
            setCurrentLocationLayer(locationLayer);

            // Animate to the location
            map.getView().animate({
              center: coordinates,
              zoom: 12,
              duration: 1000,
            });

            // Toast.success(`Location found: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }

          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation Error:', error.code, error.message);

          let errorMessage = 'Unable to retrieve your location';
          let errorDescription = '';

          // Handle different error codes with detailed user-friendly messages
          if (error.code === 1) {
            // PERMISSION_DENIED
            errorMessage = 'Location Access Denied';
            errorDescription = 'This application needs location permission to show your position on the map. Unfortunately, this feature may be blocked in embedded environments or restricted by browser security policies. You can still explore the map manually.';
          } else if (error.code === 2) {
            // POSITION_UNAVAILABLE
            errorMessage = 'Location Unavailable';
            errorDescription = 'Your current location cannot be determined. Please check your device\'s GPS settings and internet connection.';
          } else if (error.code === 3) {
            // TIMEOUT
            errorMessage = 'Location Request Timed Out';
            errorDescription = 'Finding your location is taking too long. Please try again.';
          }

          // Show a more informative toast
          // Toast.error(errorMessage, {
          //   description: errorDescription,
          //   duration: 5000,
          // });

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
              {/* Image */}
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
                {/* Period Badge - inline style needed for dynamic color */}
                <div
                  className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-white text-[10px] backdrop-blur-sm"
                  style={{ backgroundColor: getPeriodColor(hoveredSite.historicalPeriod) + 'dd' }}
                >
                  {hoveredSite.historicalPeriod}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 space-y-1.5">
                {/* Title */}
                <h3 className="text-theme-text text-sm font-medium line-clamp-1">
                  {hoveredSite.name.english}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-theme-muted text-xs">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{hoveredSite.location.city}</span>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-1 text-theme-muted text-xs">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="line-clamp-1">{formatDateRange(hoveredSite.dateRange.start, hoveredSite.dateRange.end)}</span>
                </div>

                {/* Click hint */}
                <p className="text-theme-primary text-[10px] text-center pt-1.5 border-t border-theme-border">
                  {tMap('tooltips.clickDetails')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Subtle paper texture overlay */}
        <div className="map-pattern-overlay" />
      </div>
    );
  }
);

OpenLayersMap.displayName = 'OpenLayersMap';