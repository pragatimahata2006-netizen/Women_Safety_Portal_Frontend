# SafeHer — Women Safety Portal

> **“Your Safety. Your Support. Your Voice.”**

SafeHer is a comprehensive, responsive web platform designed to provide women with rapid emergency assistance, trusted contact broadcasting, interactive geolocation safety maps, incident reporting, safety resources, and a centralized Safety Command Center.

---

## 🌟 Core Features

### 1. 🚨 Emergency SOS & Crisis Response
- **Safety Command Center**: High-visibility SOS button with a 3-second safety abort countdown to prevent accidental clicks.
- **Emergency Overlay Modal**:
  - Live GPS Coordinates with precision meter.
  - Direct one-touch **112 National Emergency (ERSS)** & **181 Women Helpline** dialing.
  - WhatsApp & SMS distress broadcast links with pinpointed Google Maps links.
  - Built-in **Loud Audio Alarm Siren** using the Web Audio API.
  - Emergency action checklist & trusted contacts status logs.

### 2. 📞 Official Helpline Directory (`/emergency`)
- Pan-India emergency helplines: **112 (ERSS)**, **181 (Women Helpline)**, **1091 (Women in Distress)**, **1930 (Cyber Crime)**, **1098 (Childline)**, **108 (Medical)**, **139 (Railway Security)**, and **14416 (Tele-MANAS)**.
- Category filters, quick-copy, and direct `tel:` dialing.

### 3. 👥 Trusted Emergency Contacts (`/contacts`)
- Add, edit, and delete family members and trusted friends.
- Priority assignment (Primary, Secondary, Standard).
- One-click **"Send Live GPS Test Alert"** via WhatsApp with real-time location.

### 4. 📍 Live Location Sharing & "Walk With Me" (`/location`)
- Real-time W3C browser Geolocation integration.
- Instant share buttons for WhatsApp, SMS, and clipboard link copying.
- **"Walk With Me" Journey Timer**: Set destination and duration (e.g. 15 mins for cab/commute). Automatically sounds alarm and triggers emergency SOS if check-in is not made before time expires.

### 5. 🗺️ Interactive Safety Map (`/safety-map`)
- Powered by Leaflet & OpenStreetMap tiles.
- Custom color-coded pins for **Police Stations (👮)**, **Hospitals & ER (🏥)**, **Transit Safe Hubs (🛡️)**, and **24/7 Pharmacies (💊)**.
- Interactive popups with distance calculation, direct phone dialer, and Google Maps turn-by-turn routing.

### 6. 📝 Incident Reporting & Tracking (`/report` & `/reports`)
- Comprehensive hazard and harassment reporting form.
- Anonymity toggle to protect identity.
- GPS auto-detect and media image attachment preview.
- Auto-generates unique tracking ticket IDs (e.g., `WS-20260831-402`).
- Report management dashboard with status tracking (`Submitted`, `Under Review`, `Action Taken`, `Resolved`) and print summary.

### 7. 📱 Discreet Fake Call Simulator
- Realistic incoming smartphone call screen (Mom / Police / Brother) with ringtone synthesizer and voice audio speech prompt to help users safely exit uncomfortable or suspicious situations.

### 8. 📚 Safety Resources & Legal Rights (`/resources`)
- In-depth verified guides:
  - **Zero FIR**: How to file a complaint at any police station across India.
  - **Right to Privacy & In-Camera Proceedings**.
  - **Protection of Women from Domestic Violence Act (PWDVA)**.
  - **Cyber Stalking & Online Harassment Action Plan**.
  - **Situational Awareness & Physical Self-Defense Tactics**.

### 9. 🔔 Verified Safety Advisories (`/alerts`)
- Monitored municipal and law enforcement notices (enhanced patrols, lighting cautions, safe transit kiosks) with helpful upvotes.

### 10. ⭐ Community Safety Audits (`/feedback`)
- Crowdsourced spot reviews evaluating lighting, crowd activity, and police presence with 5-star ratings.

### 11. 👤 Safety Profile & SafeHer ID Card (`/profile`)
- User profile, blood group, emergency medical/allergy notes.
- Printable SafeHer Emergency Medical ID Card.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + Vite
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Maps**: Leaflet + React-Leaflet + OpenStreetMap
- **Audio Synthesizer**: Web Audio API (Siren & Phone Ringtone oscillators)
- **State Management**: React Context API (`AuthContext`, `SafetyContext`) with persistent LocalStorage
- **Styling**: Vanilla CSS tokens + modern glassmorphism + responsive layouts

---

## 🚀 Getting Started

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Start Local Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will be live at `http://localhost:5173`.

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`

---

## 🔒 Privacy & Responsible Design Notice

- **Device-Level Geolocation**: All location coordinates are captured client-side and only shared when explicitly initiated by the user.
- **Official Disclaimer**: Incident reporting records provide community safety intelligence and do not replace official police FIR filings. In immediate physical danger, users are directed to call 112 directly.
