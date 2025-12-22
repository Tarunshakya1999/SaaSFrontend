import React, { useState } from "react";

export default function Team() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Call new leads",
      priority: "High",
      status: "Pending",
      deadline: "2025-01-20",
    },
    {
      id: 2,
      title: "Prepare campaign report",
      priority: "Medium",
      status: "In Progress",
      deadline: "2025-01-22",
    },
    {
      id: 3,
      title: "Follow up with clients",
      priority: "Low",
      status: "Completed",
      deadline: "2025-01-18",
    },
  ]);

  /* ---------- ACTIONS ---------- */
  const updateStatus = (id, newStatus) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  /* ---------- STATS ---------- */
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status !== "Completed").length;

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👨‍💻 Team Dashboard</h3>
        <span className="badge bg-success fs-6">WORK MODE</span>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <Stat title="Total Tasks" value={total} />
        <Stat title="Completed" value={completed} color="success" />
        <Stat title="Pending" value={pending} color="warning" />
        <Stat title="Today's Productivity" value="82%" color="info" />
      </div>

      {/* TASK LIST */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          <h5>📝 My Tasks</h5>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t, index) => (
                <tr key={t.id}>
                  <td>{index + 1}</td>
                  <td>{t.title}</td>
                  <td>
                    <span className={`badge bg-${priority(t.priority)}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${status(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>{t.deadline}</td>
                  <td>
                    {t.status !== "Completed" && (
                      <>
                        <button
                          className="btn btn-sm btn-info me-1"
                          onClick={() => updateStatus(t.id, "In Progress")}
                        >
                          Start
                        </button>

                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => updateStatus(t.id, "Completed")}
                        >
                          Done
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DAILY NOTE */}
      <div className="card shadow p-3">
        <h5>📌 Daily Note</h5>
        <p>
          Focus on high priority tasks first.  
          Update task status before logging out.
        </p>
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

function priority(p) {
  if (p === "High") return "danger";
  if (p === "Medium") return "warning";
  return "secondary";
}

function status(s) {
  if (s === "Completed") return "success";
  if (s === "In Progress") return "info";
  return "secondary";
}
