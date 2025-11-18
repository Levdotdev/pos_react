import React from "react";

export default function Dashboard() {
  return (
    <div id="dashboard" className="content-section active">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <h3>Total Sales (Today)</h3>
              <p className="stat-value">₱ 78,540.50</p>
            </div>
            <i className="fas fa-chart-line stat-icon" />
          </div>
          <span className="trend up"><i className="fas fa-arrow-up" /> 12% vs yesterday</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <h3>Net Profit</h3>
              <p className="stat-value">₱ 25,480.25</p>
            </div>
            <i className="fas fa-coins stat-icon" />
          </div>
          <span className="trend up"><i className="fas fa-arrow-up" /> 8% vs yesterday</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <h3>Products Sold</h3>
              <p className="stat-value">215</p>
            </div>
            <i className="fas fa-shopping-bag stat-icon" />
          </div>
          <span className="trend down"><i className="fas fa-arrow-down" /> 3% vs yesterday</span>
        </div>

        <div className="stat-card inventory-alert">
          <div className="stat-header">
            <div>
              <h3>Low Stock Items</h3>
              <p className="stat-value">12</p>
            </div>
            <i className="fas fa-exclamation-circle stat-icon" />
          </div>
          <span className="trend alert">Action Needed</span>
        </div>
      </div>

      <div className="chart-container">
        <div className="placeholder-chart">
          <h3>Weekly Sales Chart (₱'000)</h3>
          <div className="bar-chart-visual" aria-hidden>
            <div style={{ height: "50%" }} data-label="₱35k">Mon</div>
            <div style={{ height: "80%" }} data-label="₱56k">Tue</div>
            <div style={{ height: "30%" }} data-label="₱21k">Wed</div>
            <div style={{ height: "95%" }} data-label="₱66k">Thu</div>
            <div style={{ height: "70%" }} data-label="₱49k">Fri</div>
            <div style={{ height: "60%" }} data-label="₱42k">Sat</div>
            <div style={{ height: "45%" }} data-label="₱31k">Sun</div>
          </div>
        </div>
      </div>
    </div>
  );
}
