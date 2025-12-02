import db from "../config/db.js";

export async function monthlyReport(req, res) {
  try {
    const [salesRows] = await db.query("SELECT SUM(total) AS total_sales, COUNT(*) AS transacts FROM transactions WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date)=YEAR(CURDATE())");
    const [soldRows] = await db.query("SELECT SUM(qty) AS products_sold FROM transaction_items INNER JOIN transactions t ON transaction_items.transaction_id = t.id WHERE MONTH(t.date) = MONTH(CURDATE()) AND YEAR(t.date)=YEAR(CURDATE())");

    const [topCashierRows] = await db.query("SELECT cashier, COUNT(*) AS total_transactions, SUM(total) AS total_sales FROM transactions WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date)=YEAR(CURDATE()) GROUP BY cashier ORDER BY SUM(total) DESC LIMIT 1");
    const topCashier = topCashierRows[0] || { cashier: "-", total_transactions: 0, total_sales: 0 };

    const [topProducts] = await db.query("SELECT p.name, SUM(ti.qty) AS units_sold, SUM(ti.qty * p.price) AS revenue FROM transaction_items ti JOIN products p ON ti.product_id = p.id JOIN transactions t ON ti.transaction_id = t.id WHERE MONTH(t.date)=MONTH(CURDATE()) AND YEAR(t.date)=YEAR(CURDATE()) GROUP BY ti.product_id ORDER BY units_sold DESC LIMIT 5");

    const [transactions] = await db.query("SELECT id,cashier,date,total FROM transactions WHERE MONTH(date)=MONTH(CURDATE()) AND YEAR(date)=YEAR(CURDATE()) ORDER BY date DESC");

    const data = {
      sales: salesRows[0]?.total_sales || 0,
      transacts: salesRows[0]?.transacts || 0,
      sold: soldRows[0]?.products_sold || 0,
      top_cashier: topCashier,
      top_products: topProducts,
      transactions
    };

    let html = `<!doctype html><html><head><meta charset="utf-8"><title>TechStore Monthly Report</title><style>
      body{font-family:Arial, sans-serif; font-size:12px} table{border-collapse:collapse;width:100%;} th,td{border:1px solid #333;padding:6px;text-align:center} th{background:#f2f2f2}
      </style></head><body>`;
    html += `<h1>TechStore Monthly Report</h1><p>Generated on: ${new Date().toLocaleString()}</p>`;
    html += `<h2>Sales Summary</h2><p>Total Sales: Php ${Number(data.sales).toFixed(2)}</p><p>Total Transactions: ${data.transacts}</p><p>Products Sold: ${data.sold}</p>`;
    html += `<h2>Top Cashier</h2><p>Cashier: ${data.top_cashier.cashier}</p><p>Total Transactions: ${data.top_cashier.total_transactions}</p><p>Total Sales Handled: Php ${Number(data.top_cashier.total_sales).toFixed(2)}</p>`;
    html += `<h2>Top 5 Selling Products</h2><table><thead><tr><th>Rank</th><th>Product Name</th><th>Units Sold</th><th>Revenue (Php)</th></tr></thead><tbody>`;
    let rank = 1;
    for (const p of data.top_products) {
      html += `<tr><td>${rank++}</td><td>${p.name}</td><td>${p.units_sold}</td><td>${Number(p.revenue).toFixed(2)}</td></tr>`;
    }
    html += `</tbody></table>`;

    html += `<h2>All Transactions of the Month</h2><table><thead><tr><th>Transaction ID</th><th>Cashier</th><th>Date</th><th>Total (Php)</th></tr></thead><tbody>`;
    for (const t of data.transactions) {
      html += `<tr><td>${t.id}</td><td>${t.cashier}</td><td>${new Date(t.date).toISOString().slice(0,19).replace('T',' ')}</td><td>${Number(t.total).toFixed(2)}</td></tr>`;
    }
    html += `</tbody></table></body></html>`;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
