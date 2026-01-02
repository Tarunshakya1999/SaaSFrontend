import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";

export default function SuperAdmin() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "rahul_01",
      role: "Owner",
      status: "Pending",
    },
    {
      id: 2,
      username: "agency_xyz",
      role: "Agency Admin",
      status: "Approved",
    },
    {
      id: 3,
      username: "client_demo",
      role: "Client",
      status: "Rejected",
    },
  ]);

  /* ---------- HELPERS ---------- */
  const updateStatus = (id, status) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status } : u
      )
    );
  };

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure?")) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  const approveAllPending = () => {
    setUsers(
      users.map((u) =>
        u.status === "Pending" ? { ...u, status: "Approved" } : u
      )
    );
  };

  const suspendAll = () => {
    setUsers(
      users.map((u) =>
        u.status === "Approved" ? { ...u, status: "Suspended" } : u
      )
    );
  };

  const deleteInactive = () => {
    if (!window.confirm("Delete all rejected users?")) return;
    setUsers(users.filter((u) => u.status !== "Rejected"));
  };

  /* ---------- STATS ---------- */
  const total = users.length;
  const pending = users.filter((u) => u.status === "Pending").length;
  const approved = users.filter((u) => u.status === "Approved").length;
  const rejected = users.filter((u) => u.status === "Rejected").length;

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👑 Super Admin Panel</h3>
        <span className="badge bg-danger fs-6">ALL ACCESS</span>
      </div>
       <AdminDashboard/>
      {/* STATS */}
      <div className="row mb-4">
        <Stat title="Total Users" value={total} />
        <Stat title="Pending Requests" value={pending} color="warning" />
        <Stat title="Approved" value={approved} color="success" />
        <Stat title="Rejected" value={rejected} color="danger" />
      </div>

      {/* ACTION BUTTONS */}
      <div className="mb-4">
        <button
          className="btn btn-success me-2"
          onClick={approveAllPending}
        >
          ✅ Approve All Pending
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={suspendAll}
        >
          ⏸ Suspend Approved
        </button>

        <button
          className="btn btn-danger"
          onClick={() => setUsers([])}
        >
          🗑 Delete All
        </button>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5>User Management</h5>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={`badge bg-${badge(u.status)}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    {u.status !== "Approved" && (
                      <button
                        className="btn btn-sm btn-success me-1"
                        onClick={() => updateStatus(u.id, "Approved")}
                      >
                        Approve
                      </button>
                    )}

                    {u.status !== "Rejected" && (
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => updateStatus(u.id, "Rejected")}
                      >
                        Reject
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="card shadow border-danger mt-4">
        <div className="card-header bg-danger text-white">
          ⚠ Danger Zone
        </div>
        <div className="card-body">
          <button
            className="btn btn-outline-danger me-2"
            onClick={deleteInactive}
          >
            Delete Rejected Users
          </button>

          <button
            className="btn btn-outline-dark"
            onClick={() => window.location.reload()}
          >
            System Reset
          </button>
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
  if (status === "Approved") return "success";
  if (status === "Pending") return "warning";
  if (status === "Rejected") return "danger";
  if (status === "Suspended") return "secondary";
  return "dark";
}
