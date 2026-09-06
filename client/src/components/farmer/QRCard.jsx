import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCard({
  bookingId = "BK-2026-1024",
  token = "TK-1024",
  crop = "Paddy / நெல்",
  centre = "Salem Main Procurement Centre",
  date = "10 September 2026",
  time = "10:00 AM",
  onViewToken,
  onDashboard,
}) {
  const qrData = JSON.stringify({
    bookingId,
    token,
    crop,
    centre,
    date,
    time,
  });

  return (
    <div className="component-qr-card">

      {/* Header */}
      <div className="component-qr-header">
        <div>
          <p>Digital Booking Pass</p>
          <h3>QR Code</h3>
        </div>

        <span className="component-qr-badge">
          Confirmed
        </span>
      </div>

      {/* QR Code */}
      <div className="component-qr-box">

        <div className="component-qr-placeholder">

          <QRCodeSVG
            value={qrData}
            size={180}
            bgColor="#FFFFFF"
            fgColor="#111827"
            level="H"
            includeMargin={true}
          />

        </div>

        <p>
          Scan this QR code at the procurement centre
        </p>

      </div>

      {/* Details */}
      <div className="component-qr-details">

        <div>
          <span>Booking ID</span>
          <strong>{bookingId}</strong>
        </div>

        <div>
          <span>Token</span>
          <strong>{token}</strong>
        </div>

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

      {/* Actions */}
      <div className="component-qr-actions">

        <button
          className="component-qr-secondary"
          onClick={onViewToken}
        >
          View Token
        </button>

        <button
          className="component-qr-primary"
          onClick={onDashboard}
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
}