import React, { useState } from "react";

export default function Owner() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Sales Team", members: 6, status: "Active" },
    { id: 2, name: "Marketing Team", members: 4, status: "Active" },
    { id: 3, name: "Support Team", members: 3, status: "Inactive" },
  ]);

  const [clients] = useState([
    { id: 1, name: "Client One", revenue: 45000 },
    { id: 2, name: "Client Two", revenue: 32000 },
    { id: 3, name: "Client Three", revenue: 18000 },
  ]);

  /* ------------ TEAM ACTIONS ------------ */
  const toggleTeamStatus = (id) => {
    setTeams(
      teams.map(t =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t
      )
    );
  };

  /* ------------ STATS ------------ */
  const totalRevenue = clients.reduce((a, c) => a + c.revenue, 0);
  const totalTeams = teams.length;
  const activeTeams = teams.filter(t => t.status === "Active").length;

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👑 Owner Dashboard</h3>
        <span className="badge bg-primary fs-6">BUSINESS CONTROL</span>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <Stat title="Total Revenue" value={`₹${totalRevenue}`} color="success" />
        <Stat title="Clients" value={clients.length} />
        <Stat title="Teams" value={totalTeams} />
        <Stat title="Active Teams" value={activeTeams} color="info" />
      </div>

      {/* TEAM MANAGEMENT */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          <h5>👥 Team Management</h5>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Members</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((t, index) => (
                <tr key={t.id}>
                  <td>{index + 1}</td>
                  <td>{t.name}</td>
                  <td>{t.members}</td>
                  <td>
                    <span className={`badge bg-${badge(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        t.status === "Active"
                          ? "btn-warning"
                          : "btn-success"
                      }`}
                      onClick={() => toggleTeamStatus(t.id)}
                    >
                      {t.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLIENT REVENUE */}
      <div className="card shadow mb-4">
        <div className="card-header bg-secondary text-white">
          <h5>💰 Client Revenue</h5>
        </div>

        <div className="card-body">
          {clients.map(c => (
            <div
              key={c.id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <span>{c.name}</span>
              <strong>₹{c.revenue}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* EXTRA INFO */}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>📊 Business Insights</h5>
            <ul>
              <li>Monthly Growth: 12%</li>
              <li>Top Team: Sales Team</li>
              <li>Customer Retention: 78%</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>📢 Announcements</h5>
            <p>New bonus policy will apply from next month.</p>
            <p>System maintenance scheduled on Sunday.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------- COMPONENTS --------- */

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
  return status === "Active" ? "success" : "secondary";
}
