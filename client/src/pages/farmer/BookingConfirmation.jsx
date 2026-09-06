import React from "react";

export default function BookingConfirmation({ onNavigate }) {
  return (
    <div className="booking-confirmation-page">

      {/* Navbar */}
      <header className="confirmation-navbar">
        <div className="confirmation-brand">
          <div className="confirmation-logo">🌾</div>

          <div>
            <h2>Smart Procurement</h2>
            <span>Farmer Portal</span>
          </div>
        </div>

        <div className="confirmation-user">
          <div className="confirmation-avatar">K</div>

          <div>
            <strong>Kiruba</strong>
            <span>Farmer</span>
          </div>
        </div>
      </header>

      <div className="confirmation-body">

        {/* Sidebar */}
        <aside className="confirmation-sidebar">
          <div className="confirmation-sidebar-title">
            Farmer Menu
          </div>

          <button onClick={() => onNavigate("dashboard")}>
            🏠 Dashboard
          </button>

          <button className="active">
            📅 Book Slot
          </button>

          <button onClick={() => onNavigate("token")}>
            🎫 My Token
          </button>

          <button onClick={() => onNavigate("status")}>
            📦 Procurement Status
          </button>

          <button onClick={() => onNavigate("payment")}>
            💳 Payment Status
          </button>

          <button onClick={() => onNavigate("history")}>
            📋 History
          </button>

          <button onClick={() => onNavigate("profile")}>
            👤 Profile
          </button>

          <button onClick={() => onNavigate("help")}>
            ❓ Help & FAQ
          </button>
        </aside>

        {/* Main Content */}
        <main className="confirmation-main">

          <div className="confirmation-header">
            <div>
              <p className="confirmation-small-title">
                BOOKING PROCESS
              </p>

              <h1>Booking Confirmation</h1>

              <p>
                Please review your procurement booking details.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="confirmation-progress">

            <div className="confirmation-progress-step completed">
              <div>✓</div>
              <span>Crop</span>
            </div>

            <div className="confirmation-progress-line completed"></div>

            <div className="confirmation-progress-step completed">
              <div>✓</div>
              <span>Centre</span>
            </div>

            <div className="confirmation-progress-line completed"></div>

            <div className="confirmation-progress-step completed">
              <div>✓</div>
              <span>Date & Time</span>
            </div>

            <div className="confirmation-progress-line completed"></div>

            <div className="confirmation-progress-step current">
              <div>4</div>
              <span>Confirmation</span>
            </div>

          </div>

          {/* Success Message */}
          <section className="confirmation-success-card">

            <div className="confirmation-success-icon">
              ✓
            </div>

            <h2>Ready to Confirm Your Booking</h2>

            <p>
              Your selected procurement slot is ready.
              Please verify the details below before confirming.
            </p>

          </section>

          {/* Booking Details */}
          <section className="confirmation-details-card">

            <div className="confirmation-card-title">
              <div>
                <h2>Booking Details</h2>
                <p>Selected procurement information</p>
              </div>

              <span className="confirmation-status-badge">
                Ready
              </span>
            </div>

            <div className="confirmation-details-grid">

              <div className="confirmation-detail">
                <span>🌾 Crop</span>
                <strong>Paddy / நெல்</strong>
              </div>

              <div className="confirmation-detail">
                <span>📍 Procurement Centre</span>
                <strong>Salem Main Procurement Centre</strong>
              </div>

              <div className="confirmation-detail">
                <span>📅 Date</span>
                <strong>10 September 2026</strong>
              </div>

              <div className="confirmation-detail">
                <span>🕐 Time</span>
                <strong>10:00 AM</strong>
              </div>

            </div>

          </section>

          {/* Important Information */}
          <section className="confirmation-info-box">

            <div className="confirmation-info-icon">
              ℹ️
            </div>

            <div>
              <h3>Before you continue</h3>

              <p>
                Please arrive at the selected procurement centre
                during your booked time slot. After confirmation,
                you will receive a digital QR code and token.
              </p>
            </div>

          </section>

          {/* Actions */}
          <div className="confirmation-actions">

            <button
              className="confirmation-back-button"
              onClick={() => onNavigate("select-date-time")}
            >
              ← Back
            </button>

            <button
              className="confirmation-next-button"
              onClick={() => onNavigate("qr-code")}
            >
              Confirm Booking →
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}