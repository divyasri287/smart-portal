import React from "react";

export default function FarmerSidebar({
  currentPage,
  onNavigate,
}) {
  const menuItems = [
    {
      id: "dashboard",
      icon: "🏠",
      label: "Dashboard",
    },
    {
      id: "book-slot",
      icon: "📅",
      label: "Book Slot",
    },
    {
      id: "token",
      icon: "🎫",
      label: "My Token",
    },
    {
      id: "status",
      icon: "📦",
      label: "Procurement Status",
    },
    {
      id: "payment",
      icon: "💳",
      label: "Payment Status",
    },
    {
      id: "history",
      icon: "📋",
      label: "History",
    },
    {
      id: "profile",
      icon: "👤",
      label: "Profile",
    },
    {
      id: "help",
      icon: "❓",
      label: "Help & FAQ",
    },
  ];

  return (
    <aside className="farmer-sidebar">

      <div className="sidebar-heading">
        Farmer Menu
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              currentPage === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </button>
        ))}

      </nav>

      <div className="sidebar-support">

        <div className="support-icon">
          💡
        </div>

        <h3>Need Help?</h3>

        <p>
          Get assistance with your procurement booking.
        </p>

        <button
          onClick={() => onNavigate("help")}
        >
          Get Support
        </button>

      </div>

    </aside>
  );
}