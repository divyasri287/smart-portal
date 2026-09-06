import React, { useState } from "react";

export default function SelectCrop({ onNavigate }) {
  const [selectedCrop, setSelectedCrop] = useState("");

  const crops = [
    {
      id: "paddy",
      name: "Paddy",
      tamil: "நெல்",
      icon: "🌾",
    },
    {
      id: "maize",
      name: "Maize",
      tamil: "மக்காச்சோளம்",
      icon: "🌽",
    },
    {
      id: "cotton",
      name: "Cotton",
      tamil: "பருத்தி",
      icon: "☁️",
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      tamil: "கரும்பு",
      icon: "🎋",
    },
    {
      id: "groundnut",
      name: "Groundnut",
      tamil: "நிலக்கடலை",
      icon: "🥜",
    },
    {
      id: "turmeric",
      name: "Turmeric",
      tamil: "மஞ்சள்",
      icon: "🟡",
    },
  ];

  const handleContinue = () => {
    if (!selectedCrop) {
      alert("Please select a crop.");
      return;
    }

    onNavigate("select-centre");
  };

  return (
    <div className="farmer-layout">

      {/* Navbar */}
      <header className="farmer-navbar">

        <div className="navbar-brand">
          <div className="navbar-logo">🌾</div>

          <div>
            <h2>Smart Procurement</h2>
            <span>Farmer Portal</span>
          </div>
        </div>

        <div className="navbar-user">
          <div className="user-avatar">K</div>

          <div className="user-details">
            <strong>Kiruba</strong>
            <span>Farmer</span>
          </div>
        </div>

      </header>

      <div className="farmer-layout-body">

        {/* Sidebar */}
        <aside className="farmer-sidebar">

          <div className="sidebar-heading">
            Farmer Menu
          </div>

          <nav className="sidebar-menu">

            <button
              className="sidebar-item"
              onClick={() => onNavigate("dashboard")}
            >
              <span className="sidebar-icon">🏠</span>
              <span>Dashboard</span>
            </button>

            <button
              className="sidebar-item active"
              onClick={() => onNavigate("book-slot")}
            >
              <span className="sidebar-icon">📅</span>
              <span>Book Slot</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("token")}
            >
              <span className="sidebar-icon">🎫</span>
              <span>My Token</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("status")}
            >
              <span className="sidebar-icon">📦</span>
              <span>Procurement Status</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("payment")}
            >
              <span className="sidebar-icon">💳</span>
              <span>Payment Status</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("history")}
            >
              <span className="sidebar-icon">📋</span>
              <span>History</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("profile")}
            >
              <span className="sidebar-icon">👤</span>
              <span>Profile</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("help")}
            >
              <span className="sidebar-icon">❓</span>
              <span>Help & FAQ</span>
            </button>

          </nav>

        </aside>

        {/* Main */}
        <main className="select-crop-main">

          <div className="select-crop-header">

            <div>
              <p>Booking Step 1 of 3</p>

              <h1>Select Your Crop</h1>

              <span>
                Choose the crop you want to bring for procurement.
              </span>
            </div>

          </div>

          {/* Progress */}
          <div className="crop-progress">

            <div className="crop-progress-step active">
              <div>1</div>
              <span>Crop</span>
            </div>

            <div className="crop-progress-line"></div>

            <div className="crop-progress-step">
              <div>2</div>
              <span>Centre</span>
            </div>

            <div className="crop-progress-line"></div>

            <div className="crop-progress-step">
              <div>3</div>
              <span>Date & Time</span>
            </div>

          </div>

          {/* Crop Card */}
          <section className="select-crop-card">

            <div className="select-crop-card-title">
              <h2>Available Crops</h2>

              <p>
                Select one crop to continue your booking.
              </p>
            </div>

            <div className="crop-grid">

              {crops.map((crop) => (
                <button
                  key={crop.id}
                  className={`crop-card ${
                    selectedCrop === crop.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCrop(crop.id)
                  }
                >
                  <div className="crop-icon">
                    {crop.icon}
                  </div>

                  <div className="crop-info">
                    <strong>{crop.name}</strong>

                    <span>{crop.tamil}</span>
                  </div>

                  <div className="crop-radio">
                    {selectedCrop === crop.id
                      ? "✓"
                      : ""}
                  </div>
                </button>
              ))}

            </div>

            <div className="crop-actions">

              <button
                className="crop-back-button"
                onClick={() => onNavigate("book-slot")}
              >
                ← Back
              </button>

              <button
                className="crop-continue-button"
                onClick={handleContinue}
              >
                Continue →
              </button>

            </div>

          </section>

          {/* Information */}
          <div className="crop-info-box">

            <span>💡</span>

            <div>
              <strong>Tip</strong>

              <p>
                Select the crop that you are planning to bring
                to the procurement centre.
              </p>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}