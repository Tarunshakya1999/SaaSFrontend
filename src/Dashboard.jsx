import Sidebar from "./Sidebar";
import SuperAdmin from "./SuperAdmin";
import AgencyAdmin from "./AgencyAdmin";
import Owner from "./Owner";
import Team from "./Team";
import Client from "./Client";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const renderDashboard = () => {
    switch (user.role) {
      case "super_admin":
        return <SuperAdmin />;
      case "agency_admin":
        return <AgencyAdmin />;
      case "owner":
        return <Owner />;
      case "team":
        return <Team />;
      case "client":
        return <Client />;
      default:
        return <h4>No Access ❌</h4>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar role={user.role} />

        <div className="col-md-9 p-4">
          <h2>Welcome {user.username} 🎉</h2>
          <p>
            Role: <strong>{user.role}</strong>
          </p>

          <button
            className="btn btn-danger mb-3"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>

          {renderDashboard()}
        </div>
      </div>
    </div>
  );
}
