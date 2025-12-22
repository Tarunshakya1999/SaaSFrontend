import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function ProductLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* LEFT SIDEBAR */}
      <Sidebar role="super_admin" />

      {/* RIGHT CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "1.5rem",
          background: "#020617",
          color: "#fff",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>

    </div>
  );
}
