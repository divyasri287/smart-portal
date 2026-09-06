import React from "react";

import QRCard from "../../components/farmer/QRCard.jsx";

export default function QRCodePage({ onNavigate }) {
  return (
    <div className="qr-page">

      {/* Navbar */}
      <header className="qr-navbar">

        <div className="qr-brand">

          <div className="qr-logo">
            🌾
          </div>

          <div>
            <h2>Smart Procurement</h2>
            <span>Farmer Portal</span>
          </div>

        </div>

        <div className="qr-user">

          <div className="qr-avatar">
            K
          </div>

          <div>
            <strong>Kiruba</strong>
            <span>Farmer</span>
          </div>

        </div>

      </header>

      <div className="qr-body">

        {/* Sidebar */}
        <aside className="qr-sidebar">

          <div className="qr-sidebar-title">
            Farmer Menu
          </div>

          <button onClick={() => onNavigate("dashboard")}>
            🏠 Dashboard
          </button>

          <button onClick={() => onNavigate("book-slot")}>
            📅 Book Slot
          </button>

          <button
            onClick={() => onNavigate("token")}
          >
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

        {/* Main */}
        <main className="qr-main">

          {/* Header */}
          <div className="qr-header">

            <p className="qr-small-title">
              DIGITAL BOOKING
            </p>

            <h1>
              Booking QR Code
            </h1>

            <p>
              Show this QR code at the procurement centre.
            </p>

          </div>

          {/* Success */}
          <section className="qr-success">

            <div className="qr-success-icon">
              ✓
            </div>

            <div>
              <h2>
                Booking Confirmed!
              </h2>

              <p>
                Your procurement slot has been successfully confirmed.
              </p>
            </div>

          </section>

          {/* QR Card Component */}
          <QRCard
            bookingId="BK-2026-1024"
            token="TK-1024"
            crop="Paddy / நெல்"
            centre="Salem Main Procurement Centre"
            date="10 September 2026"
            time="10:00 AM"
            onViewToken={() => onNavigate("token")}
            onDashboard={() => onNavigate("dashboard")}
          />

          {/* Important */}
          <section className="qr-info-box">

            <div className="qr-info-icon">
              ℹ️
            </div>

            <div>

              <h3>
                Important
              </h3>

              <p>
                Keep this QR code ready when you visit the
                procurement centre. Your digital token will
                be generated after verification.
              </p>

            </div>

          </section>

          {/* Actions */}
          <div className="qr-actions">

            <button
              className="qr-secondary-button"
              onClick={() => onNavigate("dashboard")}
            >
              ← Dashboard
            </button>

            <button
              className="qr-primary-button"
              onClick={() => onNavigate("token")}
            >
              View My Token →
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}