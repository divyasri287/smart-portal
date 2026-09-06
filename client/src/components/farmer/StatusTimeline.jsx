import React from "react";

export default function StatusTimeline({
  currentStep = 4,
}) {
  const steps = [
    {
      title: "Booking Confirmed",
      description: "Your procurement slot has been confirmed.",
      icon: "✓",
    },
    {
      title: "Farmer Arrived",
      description: "Farmer has arrived at the procurement centre.",
      icon: "📍",
    },
    {
      title: "Quality Verification",
      description: "Crop quality is being verified.",
      icon: "🔍",
    },
    {
      title: "Procurement In Progress",
      description: "Your crop is currently being procured.",
      icon: "📦",
    },
    {
      title: "Procurement Completed",
      description: "Procurement has been successfully completed.",
      icon: "✓",
    },
  ];

  return (
    <div className="component-status-timeline">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        let status = "upcoming";

        if (stepNumber < currentStep) {
          status = "completed";
        } else if (stepNumber === currentStep) {
          status = "current";
        }

        return (
          <div
            className={`component-timeline-item ${status}`}
            key={step.title}
          >
            <div className="component-timeline-marker">
              {step.icon}
            </div>

            {index < steps.length - 1 && (
              <div className="component-timeline-line"></div>
            )}

            <div className="component-timeline-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>

              {status === "completed" && (
                <span className="component-timeline-status">
                  Completed
                </span>
              )}

              {status === "current" && (
                <span className="component-timeline-status current">
                  In Progress
                </span>
              )}

              {status === "upcoming" && (
                <span className="component-timeline-status upcoming">
                  Upcoming
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}