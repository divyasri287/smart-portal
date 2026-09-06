import React from "react";

export default function BookingCard({
  crop = "Paddy / நெல்",
  centre = "Salem Main Procurement Centre",
  date = "10 September 2026",
  time = "10:00 AM",
  status = "Confirmed",
  onViewStatus,
}) {
  return (
    <section className="dashboard-card">

      <div className="dashboard-card-header booking-header">

        <div>
          <h2>Current Booking</h2>

          <p>
            Your latest procurement booking
          </p>
        </div>

        <span className="confirmed-badge">
          {status}
        </span>

      </div>

      <div className="booking-details">

        <div className="booking-detail">
          <span>Crop</span>

          <strong>
            🌾 {crop}
          </strong>
        </div>

        <div className="booking-detail">
          <span>Centre</span>

          <strong>
            {centre}
          </strong>
        </div>

        <div className="booking-detail">
          <span>Date</span>

          <strong>
            {date}
          </strong>
        </div>

        <div className="booking-detail">
          <span>Time</span>

          <strong>
            {time}
          </strong>
        </div>

      </div>

      <button
        className="view-status-button"
        onClick={onViewStatus}
      >
        View Procurement Status →
      </button>

    </section>
  );
}