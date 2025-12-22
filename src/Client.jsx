import React, { useState } from "react";

export default function Client() {
  const [orders] = useState([
    {
      id: 101,
      service: "Website Development",
      amount: 25000,
      status: "Active",
      start: "2025-01-10",
    },
    {
      id: 102,
      service: "Digital Marketing",
      amount: 15000,
      status: "Completed",
      start: "2024-12-15",
    },
  ]);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Payment Issue",
      status: "Open",
    },
    {
      id: 2,
      subject: "Change in campaign",
      status: "Resolved",
    },
  ]);

  /* ---------- ACTIONS ---------- */
  const raiseTicket = () => {
    const title = prompt("Enter your issue");
    if (!title) return;

    setTickets([
      ...tickets,
      {
        id: tickets.length + 1,
        subject: title,
        status: "Open",
      },
    ]);
  };

  /* ---------- STATS ---------- */
  const totalSpent = orders.reduce((a, o) => a + o.amount, 0);
  const activeOrders = orders.filter(o => o.status === "Active").length;

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👤 Client Dashboard</h3>
        <span className="badge bg-secondary fs-6">CLIENT ACCESS</span>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <Stat title="Active Orders" value={activeOrders} color="success" />
        <Stat title="Completed Services" value={orders.length - activeOrders} />
        <Stat title="Total Spent" value={`₹${totalSpent}`} color="primary" />
        <Stat title="Support Tickets" value={tickets.length} color="warning" />
      </div>

      {/* MY SERVICES */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          <h5>🛒 My Services</h5>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, index) => (
                <tr key={o.id}>
                  <td>{index + 1}</td>
                  <td>{o.service}</td>
                  <td>{o.start}</td>
                  <td>
                    <span className={`badge bg-${badge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>₹{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUPPORT */}
      <div className="card shadow mb-4">
        <div className="card-header bg-secondary text-white">
          <h5>🎧 Support Tickets</h5>
        </div>

        <div className="card-body">
          {tickets.map(t => (
            <div
              key={t.id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <span>{t.subject}</span>
              <span className={`badge bg-${badge(t.status)}`}>
                {t.status}
              </span>
            </div>
          ))}

          <button
            className="btn btn-outline-primary mt-3"
            onClick={raiseTicket}
          >
            + Raise New Ticket
          </button>
        </div>
      </div>

      {/* PROFILE */}
      <div className="card shadow p-3">
        <h5>👤 Profile Overview</h5>
        <p>Name: Demo Client</p>
        <p>Email: client@example.com</p>
        <p>Plan: Premium</p>

        <button className="btn btn-sm btn-info">
          Update Profile
        </button>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Stat({ title, value, color = "dark" }) {
  return (
    <div className="col-md-3">
      <div className="card shadow text-center p-3">
        <h6>{title}</h6>
        <h3 className={`text-${color}`}>{value}</h3>
      </div>
    </div>
  );
}

function badge(status) {
  if (status === "Active") return "success";
  if (status === "Completed") return "primary";
  if (status === "Open") return "warning";
  if (status === "Resolved") return "secondary";
  return "dark";
}
