import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const labels = (data.cashier_sales || []).map(i => i.cashier);
    const totals = (data.cashier_sales || []).map(i => Number(i.total_sales) || 0);
    const transactions = (data.cashier_sales || []).map(i => Number(i.total_transactions) || 0);

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Total Sales (₱)", data: totals, backgroundColor: "rgba(0,0,0,0.8)" },
          { label: "Transactions", data: transactions, backgroundColor: "rgba(100,100,100,0.6)" }
        ]
      },
      options: { indexAxis: "y", responsive: true, maintainAspectRatio: false }
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div id="dashboard" className="content-section active">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <h3>Total Sales</h3>
              <p className="stat-value">₱ {data.sales?.total ?? "0.00"}</p>
            </div>
            <i className="fas fa-chart-line stat-icon"></i>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <h3>Products Sold</h3>
              <p className="stat-value">{data.sold?.sold ?? 0}</p>
            </div>
            <i className="fas fa-shopping-bag stat-icon"></i>
          </div>
        </div>

        <div className="stat-card inventory-alert">
          <div className="stat-header">
            <div>
              <h3>Low Stock Items</h3>
              <p className="stat-value">{data.low_stock?.total ?? 0}</p>
            </div>
            <i className="fas fa-exclamation-circle stat-icon"></i>
          </div>
          <span className="trend alert">Action Needed</span>
        </div>
      </div>

      <div className="chart-container" style={{ height: 600, marginTop: 20 }}>
        <canvas id="salesPieChart" ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
