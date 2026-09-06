import React from "react";

import TokenCard from "../../components/farmer/TokenCard.jsx";

export default function TokenPage({ onNavigate }) {
  return (
    <div className="token-page">

      {/* Navbar */}
      <header className="token-navbar">

        <div className="token-brand">

          <div className="token-logo">
            🌾
          </div>

          <div>
            <h2>Smart Procurement</h2>
            <span>Farmer Portal</span>
          </div>

        </div>

        <div className="token-user">

          <div className="token-avatar">
            K
          </div>

          <div>
            <strong>Kiruba</strong>
            <span>Farmer</span>
          </div>

        </div>

      </header>

      <div className="token-body">

        {/* Sidebar */}
        <aside className="token-sidebar">

          <div className="token-sidebar-title">
            Farmer Menu
          </div>

          <button onClick={() => onNavigate("dashboard")}>
            🏠 Dashboard
          </button>

          <button onClick={() => onNavigate("book-slot")}>
            📅 Book Slot
          </button>

          <button className="active">
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
        <main className="token-main">

          {/* Header */}
          <div className="token-header">

            <p>
              PROCUREMENT TOKEN
            </p>

            <h1>
              My Token
            </h1>

            <span>
              Your digital token for the confirmed procurement booking.
            </span>

          </div>

          {/* Token Card Component */}
          <TokenCard
            token="TK-1024"
            crop="Paddy / நெல்"
            centre="Salem Main Procurement Centre"
            date="10 September 2026"
            time="10:00 AM"
            queuePosition="08"
            waitingTime="20 mins"
            onViewQR={() => onNavigate("qr-code")}
            onViewStatus={() => onNavigate("status")}
          />

          {/* Instructions */}
          <section className="token-instructions">

            <div className="token-instruction-icon">
              ℹ️
            </div>

            <div>

              <h3>
                Important Instructions
              </h3>

              <ul>

                <li>
                  Carry your farmer identification documents.
                </li>

                <li>
                  Reach the procurement centre during your selected slot.
                </li>

                <li>
                  Show your QR code or token number during verification.
                </li>

                <li>
                  Wait for your token number to be called.
                </li>

              </ul>

            </div>

          </section>

          {/* Actions */}
          <div className="token-actions">

            <button
              className="token-secondary-button"
              onClick={() => onNavigate("qr-code")}
            >
              ← View QR Code
            </button>

            <button
              className="token-primary-button"
              onClick={() => onNavigate("status")}
            >
              Track Procurement →
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}