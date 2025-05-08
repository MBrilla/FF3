import React, { useState, useEffect } from 'react';
import '../styles/ImageSlider.css';

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxFactor = 0.5;
      document.querySelectorAll('.slider-image').forEach((image) => {
        const offset = scrollPosition * parallaxFactor;
        (image as HTMLDivElement).style.backgroundPosition = `center ${offset}px`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="image-slider">
      {images.map((image, index) => (
        <div
          key={image}
          className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;