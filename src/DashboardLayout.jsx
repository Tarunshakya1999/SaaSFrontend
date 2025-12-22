import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ role }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={role} />

      {/* RIGHT SIDE CONTENT */}
      <main style={{ flex: 1, padding: "20px", background: "#020617" }}>
        <Outlet />
      </main>
    </div>
  );
}
