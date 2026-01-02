import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./SignUp";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import FeaturePage from "./FeaturePage";

/* ===== BRANDING COMPONENTS ===== */
import BrandingLayout from "./BrandingLayout";
import OverView from "./Overview";
import AiBrandName from "./AiBrandName";
import AiLogoGenerator from "./Logo";
import AiVisitingCard from "./AiVisitingCard";
import BrandVoiceAI from "./BrandVoiceAi";
import AiPitchDeckGenerator from "./BrandProfile";
import AiFestivalPosterGenerator from "./AiFestivalPoster";
import BusinessCard from "./BrandCard";
import BrandVerification from "./BrandVerification";
import AdminDashboard from "./AdminDashboard";
import CompanyRegistration from "./CompanyRegistration";
import GSTMSMEISOTrademark from "./GSTMSMEISOTrademark";
import ROCComplianceAndFiling from "./ROCComplianceAndFiling";
import LegalDocumentBuilder from "./LegalDocumentBuilder";
import LegalBusinessOverview from "./LegalBusinessOverview";
import LegalLayout from "./LegalLayout";
import MsmeForm from "./MSMEForm";
import TrademarkForm from "./TrademarkForm";
import GSTRegistrationForm from "./GSTRegistrationForm";
import ISORegistrationForm from "./ISOForm";
import AiProductLauncherOverview from "./AiProductLauncherOverview";
import ProductNameAndPricing from "./ProductNameAndPricing";
import WebsiteAndLandingPage from "./WebsiteAndLandingPage";
import SalesFunnelBuilder from "./SalesFunnelBuilder";
import MarketAndCompetitorAnalysis from "./MarketAndCompetitorAnalysis";
import ExplainerVideoGenerator from "./ExplainerVideoGenerator";
import ProductLayout from "./ProductLayout";
import AutomationLayout from "./AutomationLayout";
import AutomationOverview from "./AutomationOverview";
import WhatsAppAIBot from "./WhatsAppAIBot";
import EmailSMSAutomation from "./EmailSMSAutomation";
import FollowupsAndLeadScoring from "./FollowupsAndLeadScoring";
import TaskWorkflowManager from "./TaskWorkflowManager";
import PaymentAndInvoiceAutomation from "./PaymentAndInvoiceAutomation";
import CampaignCreate from "./CampaignCreate";
import Client from "./Client";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/campaign" element={<CampaignCreate />} />
      <Route path="/clients" element={<Client/>} />
        {/* ===== AUTH ===== */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/msme" element={<MsmeForm />} />
        <Route path="/trademark" element={<TrademarkForm />} />
        <Route path="/gstregistration" element={<GSTRegistrationForm />} />
        <Route path="/isoregistration" element={<ISORegistrationForm />} />

        {/* ===== BRANDING (SIDEBAR FIXED) ===== */}
        <Route path="/branding" element={<BrandingLayout />}>
          {/* DEFAULT OVERVIEW */}
          <Route index element={<OverView />} />

          <Route path="aibs" element={<AiBrandName />} />
          <Route path="logo" element={<AiLogoGenerator />} />
          <Route path="card" element={<AiVisitingCard />} />
          <Route path="voice" element={<BrandVoiceAI />} />
          <Route path="pdf" element={<AiPitchDeckGenerator />} />
          <Route path="festival" element={<AiFestivalPosterGenerator />} />
          <Route path="qr" element={<BusinessCard />} />
          <Route path="verify" element={<BrandVerification />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Route>

        {/* ===== LEGAL (SIDEBAR FIXED) ===== */}
        <Route path="/legal" element={<LegalLayout />}>
          {/* OVERVIEW */}
          <Route index element={<LegalBusinessOverview />} />

          {/* FEATURES */}
          <Route path="registration" element={<CompanyRegistration />} />
          <Route path="gst" element={<GSTMSMEISOTrademark />} />
          <Route path="roc" element={<ROCComplianceAndFiling />} />
          <Route path="docs" element={<LegalDocumentBuilder />} />
        </Route>

        {/* ===== Product (SIDEBAR FIXED) ===== */}
        <Route path="/product" element={<ProductLayout />}>
          {/* OVERVIEW */}
          <Route index element={<AiProductLauncherOverview />} />

          {/* FEATURES */}
          <Route path="name" element={<ProductNameAndPricing />} />
          <Route path="website" element={<WebsiteAndLandingPage />} />
          <Route path="funnel" element={<SalesFunnelBuilder />} />
          <Route path="market" element={<MarketAndCompetitorAnalysis />} />
          <Route path="video" element={<ExplainerVideoGenerator />} />
        </Route>





         {/* ===== Automation And WorkFlow(SIDEBAR FIXED) ===== */}
         <Route path="/automation" element={<AutomationLayout/>}>
          {/* OVERVIEW */}
          <Route index element={<AutomationOverview/>} />

          {/* FEATURES */}
          <Route path="whatsapp" element={<WhatsAppAIBot />} />
          <Route path="email" element={<EmailSMSAutomation/>} />
          <Route path="reminder" element={<FollowupsAndLeadScoring />} />
          <Route path="task" element={<TaskWorkflowManager />} />
          <Route path="payment" element={<PaymentAndInvoiceAutomation />} />
        </Route>




        {/* ===== DASHBOARD (UNCHANGED) ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<h2>Dashboard Overview</h2>} />
          <Route path=":module" element={<FeaturePage />} />
          <Route path=":module/:feature" element={<FeaturePage />} />
        </Route>
      </Routes>

     
    </BrowserRouter>
  );
}
