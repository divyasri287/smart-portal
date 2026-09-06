import React, { useState } from "react";

export default function SelectCentre({ onNavigate }) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCentre, setSelectedCentre] = useState("");

  const districts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Kanniyakumari",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];

  const centres = selectedDistrict
    ? [
        {
          id: "main",
          name: `${selectedDistrict} Main Procurement Centre`,
          address: `${selectedDistrict} Collectorate Road`,
          slots: 24,
          time: "8:00 AM - 5:00 PM",
        },
        {
          id: "north",
          name: `${selectedDistrict} North Procurement Centre`,
          address: `North ${selectedDistrict} Agricultural Market`,
          slots: 18,
          time: "8:30 AM - 4:30 PM",
        },
        {
          id: "south",
          name: `${selectedDistrict} South Procurement Centre`,
          address: `South ${selectedDistrict} Farmers Service Road`,
          slots: 12,
          time: "9:00 AM - 5:00 PM",
        },
      ]
    : [];

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedCentre("");
  };

  const handleContinue = () => {
    if (!selectedDistrict) {
      alert("Please select your district.");
      return;
    }

    if (!selectedCentre) {
      alert("Please select a procurement centre.");
      return;
    }

    onNavigate("select-date-time");
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
        <main className="select-centre-main">

          <div className="select-centre-header">

            <p>Booking Step 2 of 3</p>

            <h1>Select Procurement Centre</h1>

            <span>
              Select your district first, then choose a procurement
              centre.
            </span>

          </div>

          {/* Progress */}
          <div className="centre-progress">

            <div className="centre-progress-step completed">
              <div>✓</div>
              <span>Crop</span>
            </div>

            <div className="centre-progress-line completed"></div>

            <div className="centre-progress-step active">
              <div>2</div>
              <span>Centre</span>
            </div>

            <div className="centre-progress-line"></div>

            <div className="centre-progress-step">
              <div>3</div>
              <span>Date & Time</span>
            </div>

          </div>

          {/* District Selection */}
          <section className="select-centre-card">

            <div className="select-centre-title">

              <div className="select-centre-title-icon">
                📍
              </div>

              <div>
                <h2>Select Your District</h2>

                <p>
                  Choose the district where you want to
                  procure your crop.
                </p>
              </div>

            </div>

            <div className="district-select-wrapper">

              <label htmlFor="district">
                District
              </label>

              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">
                  Select your district
                </option>

                {districts.map((district) => (
                  <option
                    key={district}
                    value={district}
                  >
                    {district}
                  </option>
                ))}
              </select>

            </div>

          </section>

          {/* Centres */}
          {selectedDistrict && (
            <section className="select-centre-card centre-list-card">

              <div className="select-centre-title">

                <div className="select-centre-title-icon">
                  🏢
                </div>

                <div>
                  <h2>Available Procurement Centres</h2>

                  <p>
                    Centres available in{" "}
                    <strong>{selectedDistrict}</strong>
                  </p>
                </div>

              </div>

              <div className="centre-list">

                {centres.map((centre) => (
                  <button
                    key={centre.id}
                    className={`centre-option ${
                      selectedCentre === centre.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCentre(centre.id)
                    }
                  >

                    <div className="centre-icon">
                      🏢
                    </div>

                    <div className="centre-details">

                      <h3>{centre.name}</h3>

                      <p>
                        📍 {centre.address}
                      </p>

                      <div className="centre-meta">

                        <span>
                          🕐 {centre.time}
                        </span>

                        <span>
                          🎫 {centre.slots} slots/day
                        </span>

                      </div>

                    </div>

                    <div className="centre-radio">
                      {selectedCentre === centre.id
                        ? "✓"
                        : ""}
                    </div>

                  </button>
                ))}

              </div>

              <div className="centre-actions">

                <button
                  className="centre-back-button"
                  onClick={() => onNavigate("select-crop")}
                >
                  ← Back
                </button>

                <button
                  className="centre-continue-button"
                  onClick={handleContinue}
                >
                  Continue →
                </button>

              </div>

            </section>
          )}

          {/* Before District Selection */}
          {!selectedDistrict && (
            <div className="centre-empty-state">

              <div>📍</div>

              <h3>Select a district to continue</h3>

              <p>
                Procurement centres available in the selected
                district will appear here.
              </p>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}