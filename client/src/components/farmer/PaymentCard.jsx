import React from "react";

export default function PaymentCard({
  amount = "₹24,500",
  crop = "Paddy / நெல்",
  quantity = "50 Quintals",
  rate = "₹490 / Quintal",
  bookingId = "BK-2026-1024",
  date = "10 September 2026",
  paymentMethod = "Direct Bank Transfer",
  paymentId = "PAY-2026-8745",
  status = "Paid",
}) {
  return (
    <div className="component-payment-card">
      <div className="component-payment-header">
        <div>
          <p>Payment Details</p>
          <h3>Procurement Payment</h3>
        </div>

        <span className="component-payment-badge">
          ✓ {status}
        </span>
      </div>

      <div className="component-payment-amount">
        <span>Total Amount Received</span>
        <strong>{amount}</strong>
      </div>

      <div className="component-payment-details">
        <div>
          <span>Crop</span>
          <strong>🌾 {crop}</strong>
        </div>

        <div>
          <span>Quantity</span>
          <strong>{quantity}</strong>
        </div>

        <div>
          <span>Rate</span>
          <strong>{rate}</strong>
        </div>

        <div>
          <span>Booking ID</span>
          <strong>{bookingId}</strong>
        </div>

        <div>
          <span>Payment Date</span>
          <strong>{date}</strong>
        </div>

        <div>
          <span>Payment Method</span>
          <strong>{paymentMethod}</strong>
        </div>

        <div className="component-payment-full">
          <span>Payment ID</span>
          <strong>{paymentId}</strong>
        </div>
      </div>

      <div className="component-payment-success">
        <span>✓</span>
        <div>
          <strong>Payment Successfully Transferred</strong>
          <p>
            The procurement payment has been transferred
            through the selected payment method.
          </p>
        </div>
      </div>
    </div>
  );
}