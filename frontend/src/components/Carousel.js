import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const slides = [
    {
      id: 1,
      title: "Welcome to Our Store",
      subtitle: "Discover Amazing Products",
      description: "Shop from our wide collection of electronics, clothing, books, and more. Quality products at great prices!",
      image: "https://picsum.photos/1200/500?random=1",
      buttonText: "Shop Now",
      buttonLink: "#products"
    },
    {
      id: 2,
      title: "Electronics Sale",
      subtitle: "Up to 50% Off",
      description: "Get the latest gadgets and electronics at unbeatable prices. Limited time offer on smartphones, laptops, and accessories.",
      image: "https://picsum.photos/1200/500?random=2",
      buttonText: "View Electronics",
      buttonLink: "#products?category=Electronics"
    },
    {
      id: 3,
      title: "Fashion Collection",
      subtitle: "New Arrivals",
      description: "Stay stylish with our latest fashion collection. From casual wear to formal attire, we have everything you need.",
      image: "https://picsum.photos/1200/500?random=3",
      buttonText: "Explore Fashion",
      buttonLink: "#products?category=Clothing"
    },
    {
      id: 4,
      title: "Books & Learning",
      subtitle: "Expand Your Mind",
      description: "Discover knowledge with our extensive collection of books. From fiction to technical guides, find your next read.",
      image: "https://picsum.photos/1200/500?random=4",
      buttonText: "Browse Books",
      buttonLink: "#products?category=Books"
    }
  ];

  // Auto-scroll disabled - users can manually navigate
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  //   }, 5000); // Change slide every 5 seconds

  //   return () => clearInterval(timer);
  // }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleButtonClick = (link) => {
    if (link.startsWith('#')) {
      // Handle internal navigation
      const element = document.querySelector(link.split('?')[0]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Handle category filtering
      if (link.includes('category=')) {
        const category = link.split('category=')[1];
        // This will be handled by the parent component
        window.dispatchEvent(new CustomEvent('filterByCategory', { detail: { category } }));
      }
    }
  };

  const handleImageError = (slideId) => {
    setImageErrors(prev => ({ ...prev, [slideId]: true }));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div 
          className="carousel-slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              <div className="slide-image">
                {!imageErrors[slide.id] ? (
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    onError={() => handleImageError(slide.id)}
                  />
                ) : (
                  <div className="fallback-image">
                    <div className="fallback-icon">🛍️</div>
                    <div className="fallback-text">{slide.title}</div>
                  </div>
                )}
                <div className="slide-overlay"></div>
              </div>
              <div className="slide-content">
                <div className="slide-text">
                  <h2 className="slide-title">{slide.title}</h2>
                  <h3 className="slide-subtitle">{slide.subtitle}</h3>
                  <p className="slide-description">{slide.description}</p>
                  <button 
                    className="slide-button"
                    onClick={() => handleButtonClick(slide.buttonLink)}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
          <span>‹</span>
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
          <span>›</span>
        </button>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
