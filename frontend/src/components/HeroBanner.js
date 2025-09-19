// src/components/HeroBanner.js
import React, { useState, useEffect } from "react";
import "./HeroBanner.css";

const slides = [
  { id: 1, title: "🔥 Big Summer Sale!", subtitle: "Up to 50% off on electronics", bg: "#1a73e8" },
  { id: 2, title: "📱 New Arrivals!", subtitle: "Check out the latest gadgets", bg: "#00c6ff" },
  { id: 3, title: "💎 Exclusive Deals", subtitle: "Only this week!", bg: "#ff6f61" },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-banner" style={{ background: slides[current].bg }}>
      <h1>{slides[current].title}</h1>
      <p>{slides[current].subtitle}</p>
    </div>
  );
};

export default HeroBanner;
