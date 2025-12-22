import React, { useState } from "react";

/* IMPORT FORMS */
import GSTRegistrationForm from "./GSTRegistrationForm";
import ISORegistrationForm from "./ISOForm";
import MsmeForm from "./MSMEForm";
import TrademarkForm from "./TrademarkForm";

export default function GSTMSMEISOTrademark() {
  const [activeForm, setActiveForm] = useState("gst");

  const renderForm = () => {
    switch (activeForm) {
      case "gst":
        return <GSTRegistrationForm />;
      case "msme":
        return <MsmeForm />;
      case "iso":
        return <ISORegistrationForm />;
      case "trademark":
        return <TrademarkForm />;
      default:
        return (
          <div className="text-gray-300 text-center mt-32">
            <h2 className="text-3xl font-bold">
              Select a Registration Service
            </h2>
            <p className="mt-3 text-gray-400">
              Choose any service from the top navigation bar
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* BRAND */}
          <h1 className="text-xl font-bold text-white">
            Business Registrations
          </h1>

          {/* NAV OPTIONS */}
          <div className="flex gap-3">
            <NavButton
              title="GST"
              active={activeForm === "gst"}
              onClick={() => setActiveForm("gst")}
            />
            <NavButton
              title="MSME"
              active={activeForm === "msme"}
              onClick={() => setActiveForm("msme")}
            />
            <NavButton
              title="ISO"
              active={activeForm === "iso"}
              onClick={() => setActiveForm("iso")}
            />
            <NavButton
              title="Trademark"
              active={activeForm === "trademark"}
              onClick={() => setActiveForm("trademark")}
            />
          </div>
        </div>
      </nav>

      {/* ================= FORM AREA ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">{renderForm()}</div>
    </div>
  );
}

/* ================= NAV BUTTON ================= */
function NavButton({ title, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full font-semibold transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
            : "bg-white/10 text-gray-300 hover:bg-white/20"
        }`}
    >
      {title}
    </button>
  );
}
