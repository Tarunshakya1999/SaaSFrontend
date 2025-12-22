import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaGavel,
  FaRocket,
  FaRobot,
  FaUsers,
  FaGraduationCap,
  FaCode,
  FaBullhorn,
  FaMoneyBill,
  FaCommentDots,
  FaNetworkWired,
  FaHeadset,
} from "react-icons/fa";

/* ===== ROLE PERMISSIONS ===== */
const PERMISSIONS = {
  super_admin: [
    "branding","legal","product","automation","crm","lms",
    "development","marketing","finance","assistant","network","support"
  ],
  agency_admin: [
    "branding","legal","product","automation","crm","marketing",
    "finance","assistant","network"
  ],
  owner: [
    "branding","product","automation","crm","marketing","assistant","network"
  ],
  team: ["product","crm","marketing","assistant"],
  client: ["branding","crm","assistant"],
};

/* ===== FULL SAAS MODULES ===== */
const MODULES = {
  branding: {
    title: "AI Branding & Identity",
    icon: <FaPaintBrush />,
    features: {
      aibs :" Ai Brand Name Suggestions ",
      logo: "AI Logo & Color Psychology",
      card: "Visiting Card & Letterhead",
      voice: "Brand Voice & Audio Logo",
      pdf: "Business Profile & Pitch Deck",
      festival: "Festival Poster Generator",
      qr: "Digital Business Card (QR)",
      verify: "Brand Verification & Awards",
      
    },
  },

  legal: {
    title: "Legal & Business Setup",
    icon: <FaGavel />,
    features: {
      registration: "Company Registration",
      gst: "GST / MSME / ISO / Trademark",
      roc: "ROC Compliance & Filing",
      docs: "Legal Document Builder",
     
    },
  },

  product: {
    title: "AI Product Launcher",
    icon: <FaRocket />,
    features: {
      name: "Product Name & Pricing",
      website: "Website & Landing Page",
      funnel: "Sales Funnel Builder",
      market: "Market & Competitor Analysis",
      video: "Explainer Video Generator",
    },
  },

  automation: {
    title: "Automation & Workflow",
    icon: <FaRobot />,
    features: {
      whatsapp: "WhatsApp AI Bot",
      email: "Email / SMS Automation",
      reminder: "Follow-ups & Lead Scoring",
      task: "Task & Workflow Manager",
      payment: "Payment & Invoice Automation",
    },
  },

  crm: {
    title: "AI CRM & Intelligence",
    icon: <FaUsers />,
    features: {
      leads: "Lead Capture System",
      pipeline: "Sales Pipeline",
      proposal: "Quotation & Proposal",
      pament : "Payments",
      billing : "Billing",
      performance: "Employee Performance",
      analytics: "AI Analytics Dashboard",
    },
  },

  lms: {
    title: "Education & LMS",
    icon: <FaGraduationCap />,
    features: {
      course: "Auto Course Builder",
      student: "Student Portal",
      certificate: "Certificate Generator",
      placement: "Internship & Placement",
      webinar: "Webinar Integration",
    },
  },

  development: {
    title: "Web & App Development",
    icon: <FaCode />,
    features: {
      website: "Website Development",
      app: "Mobile App Development",
      saas: "SaaS Platform Setup",
      hosting: "Cloud Hosting & Security",
      support: "AMC & Tech Support",
    },
  },

  marketing: {
    title: "Social Media & Marketing",
    icon: <FaBullhorn />,
    features: {
      sml:"Social Media Launcher",
      smas : "Social Media Account Setup",
      ads: "AI Ads Launcher",
      content: "Poster & Caption Generator",
      scheduler: "Auto Post Scheduler",
      seo: "SEO & Google Business",
      reels: "AI Reels & Videos",
    },
  },

  finance: {
    title: "Finance & Compliance",
    icon: <FaMoneyBill />,
    features: {
      invt : "Inventry",
      invoice: "Invoice & GST Billing",
      ledger: "Ledger & Payments",
      profit: "Expense & Profit Analysis",
      tax: "AI Tax Calculator",
    },
  },

  assistant: {
    title: "AI Assistant",
    icon: <FaCommentDots />,
    features: {
      chat: "Voice & Text AI",
      whatsapp: "WhatsApp Command Center",
      hr: "HR / Legal / Sales AI",
    },
  },

  network: {
    title: "Verified Business Network",
    icon: <FaNetworkWired />,
    features: {
      listing: "Verified Business Listing",
      leads: "Lead Exchange Hub",
      vendor: "Vendor & Franchise Finder",
      seo: "AI SEO Auto Posting",
    },
  },

  support: {
    title: "24x7 Support & DFY",
    icon: <FaHeadset />,
    features: {
      priority: "Priority Support",
      manager: "Dedicated Account Manager",
      dfy: "Done-For-You Services",
      training: "Onboarding & Training",
    },
  },
};
export default function Sidebar({ role }) {
  const [activeModule, setActiveModule] = useState(null);
  const { pathname } = useLocation();

  return (
    <>
      {/* ===== SIDEBAR ===== */}
      <aside className="indokona-sidebar">
        <h6 className="sidebar-title">Indokona OS</h6>

        <ul className="sidebar-list">
          <li>
            <Link to="/dashboard" className={pathname === "dashboard" ? "active-link" : ""}>
              🏠 Dashboard
            </Link>
          </li>

          {Object.entries(MODULES).map(
            ([key, module]) =>
              PERMISSIONS[role]?.includes(key) && (
                <React.Fragment key={key}>
                  {/* MODULE HEADER */}
                  <li
                    className={`sidebar-module ${
                      activeModule === key ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveModule(activeModule === key ? null : key)
                    }
                  >
                    <span className="module-title">
                      {module.icon} {module.title}
                    </span>
                  </li>

                  {/* SUB FEATURES */}
                  {activeModule === key && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="sidebar-sublist"
                    >
                      <li>
                        <Link
                          to={`/${key}`}
                          className={
                            pathname === `/${key}` ? "active-link" : ""
                          }
                        >
                          Overview
                        </Link>
                      </li>

                      {Object.entries(module.features).map(([fKey, label]) => (
                        <li key={fKey}>
                          <Link
                            to={`/${key}/${fKey}`}
                            className={
                              pathname === `/${key}/${fKey}`
                                ? "active-link"
                                : ""
                            }
                          >
                            • {label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </React.Fragment>
              )
          )}
        </ul>
      </aside>

      {/* ===== CSS (INLINE) ===== */}
      <style>{`
        .indokona-sidebar {
  width: 260px;
  padding: 1rem;
  min-height: 100vh;

  /* 🔥 MAIN BACKGROUND */
  background: linear-gradient(
    180deg,
    #0f172a 0%,
    #020617 100%
  );

  border-right: 1px solid rgba(255,255,255,0.06);
  color: #e5e7eb;
}

/* ===== TITLE ===== */
.sidebar-title {
  text-align: center;
  margin-bottom: 1.2rem;
  font-weight: 700;
  letter-spacing: .08em;
  color: #38bdf8;
  text-transform: uppercase;
}

/* ===== LIST RESET ===== */
.sidebar-list,
.sidebar-sublist {
  list-style: none;
  padding-left: 0;
  margin: 0;
  font-size: .9rem;
}

/* ===== LINKS ===== */
.indokona-sidebar a {
  color: #cbd5f5;
  text-decoration: none;
  display: block;
  padding: .45rem .65rem;
  border-radius: 8px;
  transition: all .25s ease;
}

.indokona-sidebar a:hover {
  background: rgba(56,189,248,.12);
  color: #fff;
}

/* ===== MODULE HEADER ===== */
.sidebar-module {
  margin-top: .75rem;
  padding: .55rem .65rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all .25s ease;
  background: rgba(255,255,255,0.03);
}

.sidebar-module:hover {
  background: rgba(56,189,248,.15);
}

/* ===== ACTIVE MODULE ===== */
.sidebar-module.active {
  background: linear-gradient(
    135deg,
    rgba(56,189,248,.35),
    rgba(99,102,241,.25)
  );
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
}

/* ===== MODULE TITLE ===== */
.module-title {
  display: flex;
  align-items: center;
  gap: .55rem;
  font-weight: 600;
  color: #e0f2fe;
}

/* ===== SUB MENU ===== */
.sidebar-sublist {
  margin-left: .8rem;
  margin-top: .35rem;
  border-left: 1px dashed rgba(255,255,255,.12);
  padding-left: .6rem;
}

/* ===== ACTIVE LINK (NEON EFFECT) ===== */
.active-link {
  color: #fff !important;
  background: rgba(56,189,248,.18);
}

.active-link::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    #38bdf8,
    #6366f1
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
    }
      `}</style>
    </>
  );
}