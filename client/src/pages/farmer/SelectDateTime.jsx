import React, { useState } from "react";

export default function SelectDateTime({ onNavigate }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dates = [
    {
      id: "2026-09-07",
      day: "07",
      weekday: "Monday",
      month: "Sep",
    },
    {
      id: "2026-09-08",
      day: "08",
      weekday: "Tuesday",
      month: "Sep",
    },
    {
      id: "2026-09-09",
      day: "09",
      weekday: "Wednesday",
      month: "Sep",
    },
    {
      id: "2026-09-10",
      day: "10",
      weekday: "Thursday",
      month: "Sep",
    },
    {
      id: "2026-09-11",
      day: "11",
      weekday: "Friday",
      month: "Sep",
    },
  ];

  const timeSlots = [
    {
      id: "8am",
      time: "08:00 AM",
      available: true,
    },
    {
      id: "9am",
      time: "09:00 AM",
      available: true,
    },
    {
      id: "10am",
      time: "10:00 AM",
      available: true,
    },
    {
      id: "11am",
      time: "11:00 AM",
      available: true,
    },
    {
      id: "12pm",
      time: "12:00 PM",
      available: false,
    },
    {
      id: "1pm",
      time: "01:00 PM",
      available: true,
    },
    {
      id: "2pm",
      time: "02:00 PM",
      available: true,
    },
    {
      id: "3pm",
      time: "03:00 PM",
      available: true,
    },
    {
      id: "4pm",
      time: "04:00 PM",
      available: true,
    },
  ];

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    onNavigate("booking-confirmation");
  };

  return (
    <div className="farmer-layout">

      {/* Navbar */}
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

          <div className="user-avatar">
            K
          </div>

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
              <span className="sidebar-icon">
                🏠
              </span>
              <span>Dashboard</span>
            </button>

            <button
              className="sidebar-item active"
              onClick={() => onNavigate("book-slot")}
            >
              <span className="sidebar-icon">
                📅
              </span>
              <span>Book Slot</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("token")}
            >
              <span className="sidebar-icon">
                🎫
              </span>
              <span>My Token</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("status")}
            >
              <span className="sidebar-icon">
                📦
              </span>
              <span>Procurement Status</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("payment")}
            >
              <span className="sidebar-icon">
                💳
              </span>
              <span>Payment Status</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("history")}
            >
              <span className="sidebar-icon">
                📋
              </span>
              <span>History</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("profile")}
            >
              <span className="sidebar-icon">
                👤
              </span>
              <span>Profile</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => onNavigate("help")}
            >
              <span className="sidebar-icon">
                ❓
              </span>
              <span>Help & FAQ</span>
            </button>

          </nav>

        </aside>

        {/* Main */}
        <main className="select-date-main">

          <div className="select-date-header">

            <p>Booking Step 3 of 3</p>

            <h1>Select Date & Time</h1>

            <span>
              Choose your preferred procurement date and available
              time slot.
            </span>

          </div>

          {/* Progress */}
          <div className="date-progress">

            <div className="date-progress-step completed">
              <div>✓</div>
              <span>Crop</span>
            </div>

            <div className="date-progress-line completed"></div>

            <div className="date-progress-step completed">
              <div>✓</div>
              <span>Centre</span>
            </div>

            <div className="date-progress-line completed"></div>

            <div className="date-progress-step active">
              <div>3</div>
              <span>Date & Time</span>
            </div>

          </div>

          {/* Date Card */}
          <section className="select-date-card">

            <div className="select-date-title">

              <div className="date-title-icon">
                📅
              </div>

              <div>
                <h2>Select Procurement Date</h2>

                <p>
                  Choose one of the available dates.
                </p>
              </div>

            </div>

            <div className="date-grid">

              {dates.map((date) => (
                <button
                  key={date.id}
                  className={`date-option ${
                    selectedDate === date.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedDate(date.id);
                    setSelectedTime("");
                  }}
                >

                  <span className="date-weekday">
                    {date.weekday}
                  </span>

                  <strong>
                    {date.day}
                  </strong>

                  <span className="date-month">
                    {date.month} 2026
                  </span>

                </button>
              ))}

            </div>

          </section>

          {/* Time Card */}
          {selectedDate && (
            <section className="select-date-card">

              <div className="select-date-title">

                <div className="date-title-icon">
                  🕐
                </div>

                <div>
                  <h2>Select Time Slot</h2>

                  <p>
                    Available slots for your selected date.
                  </p>
                </div>

              </div>

              <div className="time-grid">

                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    className={`time-option ${
                      selectedTime === slot.id
                        ? "selected"
                        : ""
                    } ${
                      !slot.available
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedTime(slot.id)
                    }
                  >

                    <span>🕐</span>

                    <strong>
                      {slot.time}
                    </strong>

                    <small>
                      {slot.available
                        ? "Available"
                        : "Full"}
                    </small>

                  </button>
                ))}

              </div>

            </section>
          )}

          {/* Selection Summary */}
          {selectedDate && selectedTime && (
            <div className="date-selection-summary">

              <div>
                <span>Selected Date</span>

                <strong>
                  {dates.find(
                    (date) => date.id === selectedDate
                  )?.weekday}{" "}
                  {dates.find(
                    (date) => date.id === selectedDate
                  )?.day}{" "}
                  September 2026
                </strong>
              </div>

              <div>
                <span>Selected Time</span>

                <strong>
                  {
                    timeSlots.find(
                      (slot) => slot.id === selectedTime
                    )?.time
                  }
                </strong>
              </div>

            </div>
          )}

          {/* Actions */}
          <div className="date-actions">

            <button
              className="date-back-button"
              onClick={() => onNavigate("select-centre")}
            >
              ← Back
            </button>

            <button
              className="date-continue-button"
              onClick={handleContinue}
            >
              Continue →
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}