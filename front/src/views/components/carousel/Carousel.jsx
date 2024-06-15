import React, { useState } from 'react';
import styles from './Carousel.module.css';

const PublicationSlider = ({ publications }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % publications.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + publications.length) % publications.length);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {publications.map((publication, index) => (
          <div key={index} className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}>
            <img src={publication.photo} alt={`Foto ${index + 1}`} className={styles.photo} />
            <div className={styles.infoContainer}>
              <h2>{publication.title}</h2>
              <p>{publication.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={styles.nextButton} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default PublicationSlider;
