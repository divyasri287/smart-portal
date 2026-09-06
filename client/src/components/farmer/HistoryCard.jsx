import React from "react";

export default function HistoryCard({
  bookingId = "BK-2026-1024",
  crop = "Paddy / நெல்",
  centre = "Salem Main Procurement Centre",
  date = "10 September 2026",
  token = "TK-1024",
  amount = "₹24,500",
  status = "Completed",
  onViewDetails,
}) {
  return (
    <div className="component-history-card">
      <div className="component-history-main">
        <div className="component-history-icon">🌾</div>

        <div className="component-history-info">
          <div className="component-history-title">
            <h3>{crop}</h3>
            <span className="component-history-status">
              {status}
            </span>
          </div>

          <p>{centre}</p>

          <div className="component-history-meta">
            <span>📅 {date}</span>
            <span>🎫 {token}</span>
            <span>🆔 {bookingId}</span>
          </div>
        </div>
      </div>

      <div className="component-history-right">
        <span>Amount Received</span>
        <strong>{amount}</strong>

        <button
          className="component-history-button"
          onClick={onViewDetails}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}