import React, { useState } from "react";

import HelpCard from "../../components/farmer/HelpCard.jsx";

export default function HelpFAQ({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How can I book a procurement slot?",
      answer:
        "Go to Book Slot from the farmer menu. Select your crop, procurement district and centre, then choose your preferred date and available time slot.",
    },
    {
      question: "Where can I find my digital token?",
      answer:
        "After confirming your booking, open My Token from the farmer menu. Your active token number will be displayed there.",
    },
    {
      question: "How do I check my procurement status?",
      answer:
        "Open Procurement Status from the farmer menu. You can view the current stage of your procurement through the status timeline.",
    },
    {
      question: "Where can I check my payment status?",
      answer:
        "Open Payment Status to view your payment amount, transaction reference, payment mode and payment processing status.",
    },
    {
      question: "Can I view my previous bookings?",
      answer:
        "Yes. Open History from the farmer menu to view your previous procurement bookings, tokens and payment details.",
    },
    {
      question: "What should I bring to the procurement centre?",
      answer:
        "Carry the required farmer identification documents and keep your digital QR code or token number ready for verification.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="help-page">

      {/* Navbar */}
      <header className="help-navbar">

        <div className="help-brand">

          <div className="help-logo">
            🌾
          </div>

          <div>
            <h2>Smart Procurement</h2>
            <span>Farmer Portal</span>
          </div>

        </div>

        <div className="help-user">

          <div className="help-avatar">
            K
          </div>

          <div>
            <strong>Kiruba</strong>
            <span>Farmer</span>
          </div>

        </div>

      </header>

      <div className="help-body">

        {/* Sidebar */}
        <aside className="help-sidebar">

          <div className="help-sidebar-title">
            Farmer Menu
          </div>

          <button onClick={() => onNavigate("dashboard")}>
            🏠 Dashboard
          </button>

          <button onClick={() => onNavigate("book-slot")}>
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

          <button className="active">
            ❓ Help & FAQ
          </button>

        </aside>

        {/* Main */}
        <main className="help-main">

          {/* Header */}
          <div className="help-header">

            <p>
              FARMER SUPPORT
            </p>

            <h1>
              Help & FAQ
            </h1>

            <span>
              Find answers to common questions about Smart Procurement.
            </span>

          </div>

          {/* Help Card Component */}
          <HelpCard
            icon="💡"
            title="Need assistance?"
            description="We are here to help you with booking, tokens, procurement status and payment-related questions."
            buttonText="Contact Support"
            onClick={() =>
              window.alert(
                "Support request feature will be connected later."
              )
            }
          />

          {/* FAQ */}
          <section className="faq-card">

            <div className="faq-heading">

              <div>
                <h2>
                  Frequently Asked Questions
                </h2>

                <p>
                  Common questions from farmers
                </p>
              </div>

              <span className="faq-count">
                {faqs.length} Questions
              </span>

            </div>

            <div className="faq-list">

              {faqs.map((faq, index) => (

                <div
                  className={`faq-item ${
                    openFaq === index ? "open" : ""
                  }`}
                  key={index}
                >

                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >

                    <span>
                      {faq.question}
                    </span>

                    <span className="faq-arrow">
                      {openFaq === index ? "−" : "+"}
                    </span>

                  </button>

                  {openFaq === index && (
                    <div className="faq-answer">
                      <p>
                        {faq.answer}
                      </p>
                    </div>
                  )}

                </div>

              ))}

            </div>

          </section>

          {/* Quick Help */}
          <section className="quick-help-card">

            <div className="quick-help-heading">

              <h2>
                Quick Help
              </h2>

              <p>
                Direct access to commonly used services
              </p>

            </div>

            <div className="quick-help-grid">

              <button
                onClick={() => onNavigate("book-slot")}
              >
                <span>📅</span>

                <strong>
                  Book a Slot
                </strong>

                <small>
                  Start a new booking
                </small>
              </button>

              <button
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

              <button
                onClick={() => onNavigate("status")}
              >
                <span>📦</span>

                <strong>
                  Track Procurement
                </strong>

                <small>
                  View current status
                </small>
              </button>

              <button
                onClick={() => onNavigate("payment")}
              >
                <span>💳</span>

                <strong>
                  Payment Status
                </strong>

                <small>
                  Check payment details
                </small>
              </button>

            </div>

          </section>

          {/* Contact */}
          <section className="help-contact-card">

            <div className="help-contact-icon">
              📞
            </div>

            <div>

              <h3>
                Farmer Support Centre
              </h3>

              <p>
                For assistance with your procurement booking,
                please contact your designated procurement centre.
              </p>

              <strong>
                Support available during working hours
              </strong>

            </div>

          </section>

          {/* Actions */}
          <div className="help-actions">

            <button
              className="help-secondary-button"
              onClick={() => onNavigate("dashboard")}
            >
              ← Dashboard
            </button>

            <button
              className="help-primary-button"
              onClick={() => onNavigate("book-slot")}
            >
              Book New Slot →
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}