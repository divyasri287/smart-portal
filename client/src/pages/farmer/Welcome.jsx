import React from "react";

export default function Welcome({ onStart }) {
  return (
    <div className="welcome-page">
      <div className="welcome-card">

        <div className="welcome-icon">
          🌾
        </div>

        <h1>Smart Procurement</h1>

        <p className="welcome-subtitle">
          Farmer Procurement & Slot Booking Portal
        </p>

        <p className="welcome-description">
          A simple and transparent platform for farmers to book
          procurement slots, select centres, receive digital tokens,
          and track procurement and payment status.
        </p>

        <div className="welcome-features">

          <div className="welcome-feature">
            <div className="feature-icon">📅</div>
            <div>
              <h3>Easy Slot Booking</h3>
              <p>Book your preferred procurement date and time.</p>
            </div>
          </div>

          <div className="welcome-feature">
            <div className="feature-icon">📍</div>
            <div>
              <h3>Procurement Centres</h3>
              <p>Select a suitable centre from your district.</p>
            </div>
          </div>

          <div className="welcome-feature">
            <div className="feature-icon">🎫</div>
            <div>
              <h3>Digital Token</h3>
              <p>Get your token and avoid unnecessary waiting.</p>
            </div>
          </div>

          <div className="welcome-feature">
            <div className="feature-icon">💳</div>
            <div>
              <h3>Payment Tracking</h3>
              <p>Track your procurement payment status easily.</p>
            </div>
          </div>

        </div>

        <button
          className="welcome-start-button"
          onClick={onStart}
        >
          Get Started →
        </button>

        <p className="welcome-footer">
          Smart • Transparent • Farmer Friendly
        </p>

      </div>
    </div>
  );
}