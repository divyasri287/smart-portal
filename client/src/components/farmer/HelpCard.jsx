import React from "react";

export default function HelpCard({
  icon = "❓",
  title = "Need Help?",
  description = "Get assistance with your procurement booking.",
  buttonText = "Get Support",
  onClick,
}) {
  return (
    <div className="component-help-card">
      <div className="component-help-icon">
        {icon}
      </div>

      <div className="component-help-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <button
          className="component-help-button"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}