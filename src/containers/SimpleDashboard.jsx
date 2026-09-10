import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set, get } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Dashboard.css";

function RelayCard({ name, path }) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const relayRef = ref(db, path);
    const unsub = onValue(relayRef, (snapshot) => {
      setStatus(snapshot.val());
    });
    return () => unsub();
  }, [path]);

  const toggleRelay = async () => {
    const relayRef = ref(db, path);
    const snap = await get(relayRef);
    await set(relayRef, !snap.val());
  };

  return (
    <div className="card-item">
      <h3 className="card-title">{name}</h3>
      <p className="status-display">
        Status:{" "}
        <span className={status ? "status-on" : "status-off"}>
          {status ? "ON" : "OFF"}
        </span>
      </p>
      <button
        onClick={toggleRelay}
        className={`card-button ${
          status ? "button-active" : "button-inactive"
        }`}
      >
        {status ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
}

function SensorCard({ name, path, unit }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const sensorRef = ref(db, path);
    const unsub = onValue(sensorRef, (snapshot) => {
      setValue(snapshot.val());
    });
    return () => unsub();
  }, [path]);

  return (
    <div className="card-item sensor-card">
      <h3 className="card-title">{name}</h3>
      <div className="sensor-value">
        {value !== null ? (
          <span className="value-number">
            {value}
            <span className="value-unit">{unit}</span>
          </span>
        ) : (
          <span className="value-number loading">Loading...</span>
        )}
      </div>
    </div>
  );
}

export default function SimpleDashboard() {
  const relays = [
    { name: "Pump", path: "pump" },
    { name: "Fan", path: "fan" },
    { name: "Heater", path: "heater" },
    { name: "Light", path: "led" },
  ];

  const sensors = [
    { name: "Temperature", path: "temp", unit: "°C" },
    { name: "Humidity", path: "humidity", unit: "%" },
    { name: "Soil Moisture", path: "moisture", unit: "%" },
    { name: "Light Level", path: "ldr", unit: "lx" },
  ];

  const allOff = () => {
    relays.forEach((r) => set(ref(db, r.path), false));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="universe-container">
      {/* HEADER */}
      <header className="header">
        <h1 className="logo-title">
          AgroSense IoT <span className="highlight-text">Smart Farm</span>
        </h1>
        <nav className="nav">
          <button
            onClick={handleLogout}
            className="nav-btn btn-logout"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* MAIN DASHBOARD */}
      <main className="dashboard-content-area">
        {/* RELAYS SECTION */}
        <section className="dashboard-section">
          <h2>Device Control</h2>
          <div className="card-grid">
            {relays.map((r) => (
              <RelayCard key={r.path} name={r.name} path={r.path} />
            ))}
          </div>
          <button onClick={allOff} className="btn-danger-action">
            Turn All OFF
          </button>
        </section>

        {/* SENSORS SECTION */}
        <section className="dashboard-section">
          <h2>Real-Time Data</h2>
          <div className="card-grid">
            {sensors.map((s) => (
              <SensorCard
                key={s.path}
                name={s.name}
                path={s.path}
                unit={s.unit}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
