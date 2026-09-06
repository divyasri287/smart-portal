import React from "react";

export default function FarmerNavbar({ farmerName = "Farmer" }) {
  return (
    <header className="farmer-navbar">

      <div className="navbar-brand">
        <div className="navbar-logo">
          🌾
        </div>

        <div>
          <h2>Smart Procurement</h2>
          <span>Farmer Portal</span>
        </div>
      </div>

      <div className="navbar-user">

        <button className="notification-button">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            {farmerName.charAt(0).toUpperCase()}
          </div>

          <div className="user-details">
            <strong>{farmerName}</strong>
            <span>Farmer</span>
          </div>
        </div>

      </div>

    </header>
  );
}