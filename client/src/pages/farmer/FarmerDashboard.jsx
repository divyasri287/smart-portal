import React from "react";

import FarmerNavbar from "../../components/farmer/FarmerNavbar.jsx";
import FarmerSidebar from "../../components/farmer/FarmerSidebar.jsx";
import BookingCard from "../../components/farmer/BookingCard.jsx";

export default function FarmerDashboard({ onNavigate }) {
  return (
    <div className="farmer-layout">

      {/* Navbar */}
      <FarmerNavbar farmerName="Kiruba" />

      <div className="farmer-layout-body">

        {/* Sidebar */}
        <FarmerSidebar
          currentPage="dashboard"
          onNavigate={onNavigate}
        />

        {/* Main Content */}
        <main className="dashboard-page">

          {/* Dashboard Header */}
          <div className="dashboard-top">

            <div>
              <p className="dashboard-welcome">
                Welcome back 👋
              </p>

              <h1>
                Farmer Dashboard
              </h1>

              <p className="dashboard-subtitle">
                Manage your procurement bookings and track your status.
              </p>
            </div>

            <button
              className="dashboard-book-button"
              onClick={() => onNavigate("book-slot")}
            >
              + Book New Slot
            </button>

          </div>

          {/* Statistics */}
          <div className="dashboard-stats">

            {/* Total Bookings */}
            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon">
                📅
              </div>

              <div>
                <p>Total Bookings</p>
                <h2>12</h2>
              </div>

            </div>

            {/* Active Token */}
            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon">
                🎫
              </div>

              <div>
                <p>Active Token</p>
                <h2>TK-1024</h2>
              </div>

            </div>

            {/* Procurement */}
            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon">
                📦
              </div>

              <div>
                <p>Procurement</p>
                <h2>Completed</h2>
              </div>

            </div>

            {/* Payment */}
            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon">
                💳
              </div>

              <div>
                <p>Payment</p>
                <h2>₹24,500</h2>
              </div>

            </div>

          </div>

          {/* Main Cards */}
          <div className="dashboard-content-grid">

            {/* Quick Actions */}
            <section className="dashboard-card">

              <div className="dashboard-card-header">

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Frequently used farmer services
                </p>

              </div>

              <div className="quick-actions-grid">

                {/* Book Procurement Slot */}
                <button
                  className="quick-action-card"
                  onClick={() => onNavigate("book-slot")}
                >
                  <span>📅</span>

                  <strong>
                    Book Procurement Slot
                  </strong>

                  <small>
                    Schedule your crop delivery
                  </small>
                </button>

                {/* View Token */}
                <button
                  className="quick-action-card"
                  onClick={() => onNavigate("token")}
                >
                  <span>🎫</span>

                  <strong>
                    View Token
                  </strong>

                  <small>
                    Check your active token
                  </small>
                </button>

                {/* Track Procurement */}
                <button
                  className="quick-action-card"
                  onClick={() => onNavigate("status")}
                >
                  <span>📦</span>

                  <strong>
                    Track Procurement
                  </strong>

                  <small>
                    Check current status
                  </small>
                </button>

                {/* Booking History */}
                <button
                  className="quick-action-card"
                  onClick={() => onNavigate("history")}
                >
                  <span>📋</span>

                  <strong>
                    Booking History
                  </strong>

                  <small>
                    View previous bookings
                  </small>
                </button>

              </div>

            </section>

            {/* Current Booking Component */}
            <BookingCard
              crop="Paddy / நெல்"
              centre="Salem Main Procurement Centre"
              date="10 September 2026"
              time="10:00 AM"
              status="Confirmed"
              onViewStatus={() => onNavigate("status")}
            />

          </div>

        </main>

      </div>

    </div>
  );
}