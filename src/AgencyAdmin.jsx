import React, { useState } from "react";

export default function AgencyAdmin() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Client Alpha",
      plan: "Premium",
      status: "Active",
      leads: 120,
    },
    {
      id: 2,
      name: "Client Beta",
      plan: "Basic",
      status: "Pending",
      leads: 40,
    },
    {
      id: 3,
      name: "Client Gamma",
      plan: "Standard",
      status: "Suspended",
      leads: 65,
    },
  ]);

  /* ---------- ACTIONS (LIMITED) ---------- */
  const approveClient = (id) => {
    setClients(
      clients.map((c) =>
        c.id === id ? { ...c, status: "Active" } : c
      )
    );
  };

  const suspendClient = (id) => {
    setClients(
      clients.map((c) =>
        c.id === id ? { ...c, status: "Suspended" } : c
      )
    );
  };

  const resetLeads = (id) => {
    if (!window.confirm("Reset leads count?")) return;
    setClients(
      clients.map((c) =>
        c.id === id ? { ...c, leads: 0 } : c
      )
    );
  };

  /* ---------- STATS ---------- */
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "Active").length;
  const pendingClients = clients.filter(c => c.status === "Pending").length;
  const suspendedClients = clients.filter(c => c.status === "Suspended").length;

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>🏢 Agency Admin Dashboard</h3>
        <span className="badge bg-info fs-6">AGENCY ACCESS</span>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <Stat title="Total Clients" value={totalClients} />
        <Stat title="Active" value={activeClients} color="success" />
        <Stat title="Pending" value={pendingClients} color="warning" />
        <Stat title="Suspended" value={suspendedClients} color="danger" />
      </div>

      {/* NOTICE */}
      <div className="alert alert-warning">
        ⚠ You have limited permissions. You cannot delete users or change roles.
      </div>

      {/* CLIENT TABLE */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5>Client Management</h5>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Leads</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.plan}</td>
                  <td>
                    <span className={`badge bg-${badge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{c.leads}</td>
                  <td>
                    {c.status === "Pending" && (
                      <button
                        className="btn btn-sm btn-success me-1"
                        onClick={() => approveClient(c.id)}
                      >
                        Approve
                      </button>
                    )}

                    {c.status === "Active" && (
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => suspendClient(c.id)}
                      >
                        Suspend
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => resetLeads(c.id)}
                    >
                      Reset Leads
                    </button>
                  </td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No clients available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXTRA CONTENT */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>📊 Performance Summary</h5>
            <p>Monthly Leads Generated: <strong>225</strong></p>
            <p>Conversion Rate: <strong>18%</strong></p>
            <p>Top Performing Client: <strong>Client Alpha</strong></p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5>📩 Notifications</h5>
            <ul className="mb-0">
              <li>Client Beta requested plan upgrade</li>
              <li>Client Gamma account suspended</li>
              <li>New campaign approval pending</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

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
  if (status === "Pending") return "warning";
  if (status === "Suspended") return "danger";
  return "secondary";
}
