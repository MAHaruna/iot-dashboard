import React, { useState } from "react"; // 👈 Import useState
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import mapImageUrl from "../assets/mapImageUrl.png";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // 👈 State for mobile menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the menu when a link is clicked (useful for anchors/Links)
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="universe-container">
      {/* 🧭 HEADER */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Autonomous Universe Logo" className="logo-img" />
          <h2>AgroSense IoT</h2>
        </div>
        
        {/* 🍔 MENU TOGGLE ICON (visible only on mobile via CSS) */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {/* Unicode for Hamburger (☰) or Close (✕) */}
          {isOpen ? '✕' : '☰'} 
        </div>

        {/* NAV: Added dynamic class based on 'isOpen' state for mobile responsiveness */}
        <nav className={`nav ${isOpen ? 'nav-open' : ''}`} onClick={closeMenu}>
          {/* Using closeMenu handler on links/buttons to auto-close menu */}
          <a href="#features" onClick={closeMenu}>Explore</a>
          <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
          
          <Link to="/login" className="nav-btn" onClick={closeMenu}>Login</Link>
        </nav>
      </header>

      {/* 🌌 HERO SECTION */}
      <section className="hero">
        <div className="bg-animation"></div>
        <div className="hero-content fade-in">
          <h1>
            Welcome to the <span className="highlight">AgroSense IoT</span>
          </h1>
          <p>
            Explore self-evolving systems where <strong>humans</strong>, <strong>machines</strong>, 
            and <strong>data</strong> merge into an intelligent network.
          </p>
          <div className="hero-buttons">
            <a href="#features" className="btn primary">Explore the Universe</a>
            <Link to="/signup" className="btn secondary">Join the Network</Link>
          </div>
        </div>
      </section>

      {/* ⚙️ CORE FEATURES */}
      <section id="features" className="features">
        <h2>Core Pillars of Intelligence</h2>
        <div className="feature-grid">
          <div className="feature">
            <div className="icon">🌍</div>
            <h3>Autonomous Systems</h3>
            <p>AI-powered environments that learn and adapt dynamically.</p>
          </div>
          <div className="feature">
            <div className="icon">💡</div>
            <h3>Smart Integration</h3>
            <p>Seamless connection between devices, data, and decision layers.</p>
          </div>
          <div className="feature">
            <div className="icon">🧠</div>
            <h3>Cognitive Intelligence</h3>
            <p>A growing neural-like ecosystem that evolves with every insight.</p>
          </div>
          <div className="feature">
            <div className="icon">🔗</div>
            <h3>Open Innovation</h3>
            <p>Developers and creators unite to expand the autonomous frontier.</p>
          </div>
        </div>
      </section>

      {/* 🛰️ HOW IT WORKS */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <p><strong>Sensors + AI</strong> gather and analyze data in real-time.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p><strong>Systems</strong> make autonomous decisions based on insights.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p><strong>Insights</strong> are shared across the connected universe.</p>
          </div>
        </div>
      </section>

      {/* 🪐 SHOWCASE */}
      <section className="showcase">
        <h2>Live Universe Map</h2>
        <p>Visualize real-time networks — from smart farms to digital labs.</p>
        <div className="map-placeholder">
          <img 
            src={mapImageUrl} 
            alt="Live Universe Map Visualization" 
            className="map-image" 
          />
        </div>
      </section>

      {/* 💬 COMMUNITY */}
      <section id="community" className="community">
        <h2>Develop. Build. Evolve with Us.</h2>
        <p>Join innovators and creators shaping the future of intelligent automation.</p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn primary">Join Beta</Link>
          <Link to="/contact" className="btn secondary">Partner with Us</Link>
        </div>
      </section>

      {/* 🧭 FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#technology">Technology</a>
          <a href="#blog">Blog</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>
        <p>© 2025 Autonomous Universe — Crafted by Intelligence.</p>
      </footer>
    </div>
  );
}
