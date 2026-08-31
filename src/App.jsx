import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SafetyProvider } from './context/SafetyContext';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { SOSModal } from './components/SOSModal';
import { FakeCallModal } from './components/FakeCallModal';

import { Home } from './pages/Home';
import { Emergency } from './pages/Emergency';
import { Contacts } from './pages/Contacts';
import { Location } from './pages/Location';
import { SafetyMapPage } from './pages/SafetyMapPage';
import { ReportIncident } from './pages/ReportIncident';
import { MyReports } from './pages/MyReports';
import { SafetyAlerts } from './pages/SafetyAlerts';
import { Resources } from './pages/Resources';
import { SafetyFeedback } from './pages/SafetyFeedback';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <SafetyProvider>
        <Router>
          <div className="app-container">
            {/* Top Navigation Bar */}
            <Navbar />

            {/* Main Page Routing Container */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/location" element={<Location />} />
                <Route path="/safety-map" element={<SafetyMapPage />} />
                <Route path="/report" element={<ReportIncident />} />
                <Route path="/reports" element={<MyReports />} />
                <Route path="/alerts" element={<SafetyAlerts />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/feedback" element={<SafetyFeedback />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Emergency Modals */}
            <SOSModal />
            <FakeCallModal />

            {/* Footer */}
            <Footer />

            {/* Mobile Bottom Navigation Bar */}
            <BottomNav />
          </div>
        </Router>
      </SafetyProvider>
    </AuthProvider>
  );
}

export default App;
