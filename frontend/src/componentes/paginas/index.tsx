
import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import '../../css/style.css';


const Index = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "Bienvenido a Synapse",
      text: "Explora nuestro sitio web",
    },
    {
      title: "Tu Éxito es Nuestro Objetivo",
      text: "Trabajamos juntos para alcanzar tus metas y sueños",
    },
    {
      title: "Nuestra Misión",
      text: "Conectarte con nuevas oportunidades",
    },
  ];

  // Cambiar slide automáticamente cada 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div>
      <Navbar />

      {/* Carrusel */}
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === current ? "active" : ""}`}
          >
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
          </div>
        ))}

        {/* Controles */}
        <div className="carousel-controls">
          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        {/* Indicadores */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
