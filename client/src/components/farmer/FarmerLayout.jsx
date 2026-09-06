import React from "react";
import FarmerSidebar from "./FarmerSidebar";
import FarmerNavbar from "./FarmerNavbar";

function FarmerLayout({
  children,
  title,
  subtitle,
}) {
  return (
    <div className="farmer-app">

      <FarmerSidebar />

      <div className="farmer-main">

        <FarmerNavbar />

        <main className="farmer-content">

          {title && (
            <div className="page-header">

              <h1>{title}</h1>

              {subtitle && (
                <p>{subtitle}</p>
              )}

            </div>
          )}

          {children}

        </main>

      </div>

    </div>
  );
}

export default FarmerLayout;