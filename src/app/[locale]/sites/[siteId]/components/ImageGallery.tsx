import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  siteName: string;
}

export function ImageGallery({ images, siteName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const goToPrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      {/* Modern Gallery Grid */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-theme-primary/10 rounded-lg">
            <ImageIcon size={20} className="text-theme-primary" />
          </div>
          <div>
            <h3 className="text-theme-text">Image Gallery</h3>
            <p className="text-theme-muted text-sm">{images.length} photos</p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {/* Large Featured Image */}
          <div
            className="col-span-4 md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group aspect-[16/10] md:aspect-auto"
            onClick={() => openModal(0)}
          >
            <img
              src={images[0]}
              alt={`${siteName} - Featured`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-white">
                  <Maximize2 size={18} />
                  <span className="text-sm font-medium">View Full Size</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-medium">
              Featured
            </div>
          </div>

          {/* Thumbnail Grid */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index + 1}
              className="col-span-2 md:col-span-1 relative rounded-xl overflow-hidden cursor-pointer group aspect-square"
              onClick={() => openModal(index + 1)}
            >
              <img
                src={image}
                alt={`${siteName} - Image ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <Maximize2
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"
                />
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs font-medium">
                {index + 2}
              </div>
            </div>
          ))}

          {/* More Images Indicator */}
          {images.length > 5 && (
            <div
              className="col-span-2 md:col-span-1 relative rounded-xl overflow-hidden cursor-pointer group aspect-square bg-theme-primary/10"
              onClick={() => openModal(5)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-theme-primary/80 to-theme-secondary/80 group-hover:from-theme-primary group-hover:to-theme-secondary transition-all duration-300">
                <ImageIcon size={32} className="text-white mb-2" />
                <span className="text-white font-medium text-lg">+{images.length - 5}</span>
                <span className="text-white/90 text-sm">More Photos</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all duration-300 group"
            aria-label="Close modal"
          >
            <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={28} className="text-white" />
          </button>

          {/* Main Image */}
          <div
            className="w-full max-w-6xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImageIndex]}
              alt={`${siteName} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl animate-fadeIn"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 px-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${selectedImageIndex === index
                    ? 'ring-4 ring-theme-primary scale-110'
                    : 'ring-2 ring-white/30 hover:ring-white/60 opacity-70 hover:opacity-100'
                  }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}