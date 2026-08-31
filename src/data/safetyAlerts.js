export const initialSafetyAlerts = [
  {
    id: "alt-101",
    title: "Enhanced Police Patrol Deployed - Connaught Place Outer Circle",
    category: "Security Update",
    level: "info", // info, warning, danger
    area: "Connaught Place, Central Delhi",
    timestamp: "35 mins ago",
    verifiedBy: "Delhi Police Special Unit",
    description: "All-women PCR vans & static police checkpoints have been reinforced around Metro Gate 4 and outer circle until 2:00 AM.",
    helpfulCount: 42
  },
  {
    id: "alt-102",
    title: "Poor Street Illumination Caution - Underpass Link Road",
    category: "Infrastructure Caution",
    level: "warning",
    area: "South Extension Link Road",
    timestamp: "2 hours ago",
    verifiedBy: "SafeHer Community Moderation",
    description: "Municipal lighting fault reported along the 300m pedestrian underpass stretch. Travelers are advised to use the main lit boulevard.",
    helpfulCount: 89
  },
  {
    id: "alt-103",
    title: "Late Night Women Safe Cab Kiosk Active at Metro Stations",
    category: "Safety Facility",
    level: "info",
    area: "Rajiv Chowk & Saket Metro",
    timestamp: "4 hours ago",
    verifiedBy: "DMRC Transit Authority",
    description: "Pre-paid verified safe cab booths with registered marshals are operating outside Gate 2 & 5 with direct police monitoring.",
    helpfulCount: 124
  },
  {
    id: "alt-104",
    title: "Heavy Crowd & Restricted Pedestrian Flow Near Market",
    category: "Advisory",
    level: "warning",
    area: "Sarojini Nagar Market Entry",
    timestamp: "6 hours ago",
    verifiedBy: "Local Civic Authority",
    description: "High footfall due to festive event. Please stay vigilant in crowded bottlenecks and keep emergency SOS shortcut handy.",
    helpfulCount: 56
  }
];

export const initialCommunityRatings = [
  {
    id: "cr-1",
    placeName: "Rajiv Chowk Metro Concourse",
    area: "Central Delhi",
    category: "Transit Station",
    rating: 4.8,
    lightingScore: 5,
    crowdScore: 5,
    policeScore: 5,
    comment: "Extremely well-lit at all hours with visible CISF personnel and high public presence. Very safe for late commutes.",
    author: "Ananya S.",
    date: "Yesterday",
    verifiedVisit: true
  },
  {
    id: "cr-2",
    placeName: "South Extension Part 1 Main Market",
    area: "South Delhi",
    category: "Commercial Market",
    rating: 4.2,
    lightingScore: 4,
    crowdScore: 4,
    policeScore: 4,
    comment: "Great lighting on main road, but inner service lanes get dim after 10 PM. Always stick to the central market arcade.",
    author: "Pooja R.",
    date: "2 days ago",
    verifiedVisit: true
  },
  {
    id: "cr-3",
    placeName: "Saket District Centre & Mall Corridor",
    area: "South Delhi",
    category: "Public Plaza",
    rating: 4.7,
    lightingScore: 5,
    crowdScore: 4,
    policeScore: 4,
    comment: "Continuous private security and police patrol van stationed outside. Very accessible autos and pre-paid cabs.",
    author: "Meera K.",
    date: "3 days ago",
    verifiedVisit: true
  }
];
