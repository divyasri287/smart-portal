import React from "react";

export default function TokenCard({
  token = "TK-1024",
  crop = "Paddy / நெல்",
  centre = "Salem Main Procurement Centre",
  date = "10 September 2026",
  time = "10:00 AM",
  queuePosition = "08",
  waitingTime = "20 mins",
  onViewQR,
  onViewStatus,
}) {
  return (
    <div className="component-token-card">
      <div className="component-token-header">
        <div>
          <p>Active Procurement Token</p>
          <h3>Your Digital Token</h3>
        </div>

        <span className="component-token-badge">
          Active
        </span>
      </div>

      <div className="component-token-number">
        <span>Token Number</span>
        <strong>{token}</strong>
      </div>

      <div className="component-token-details">
        <div>
          <span>Crop</span>
          <strong>🌾 {crop}</strong>
        </div>

        <div>
          <span>Centre</span>
          <strong>{centre}</strong>
        </div>

        <div>
          <span>Date</span>
          <strong>{date}</strong>
        </div>

        <div>
          <span>Time</span>
          <strong>{time}</strong>
        </div>
      </div>

      <div className="component-token-queue">
        <div>
          <span>Queue Position</span>
          <strong>{queuePosition}</strong>
        </div>

        <div>
          <span>Estimated Waiting</span>
          <strong>{waitingTime}</strong>
        </div>
      </div>

      <div className="component-token-actions">
        <button
          className="component-token-secondary"
          onClick={onViewQR}
        >
          View QR Code
        </button>

        <button
          className="component-token-primary"
          onClick={onViewStatus}
        >
          Track Procurement →
        </button>
      </div>
    </div>
  );
}