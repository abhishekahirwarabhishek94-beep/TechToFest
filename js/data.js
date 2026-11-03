/**
 * COSMOS 2026 - Official College Fest Data Store
 * Theme: Deep Space / Cosmic
 * Contact: fest@example.edu
 */

const FEST_CONFIG = {
  name: "COSMOS 2026",
  tagline: "Voyage Beyond the Horizon",
  edition: "Annual Technical & Cultural Odyssey",
  dates: "12 - 13 February, 2026",
  venue: "Cosmic Tech Campus, Main Grounds",
  contactEmail: "fest@example.edu",
  contactPhone: "+1 (555) 019-2834"
};

const CATEGORIES = [
  { id: "all", name: "All Categories", icon: "orbit" },
  { id: "technical", name: "Technical", icon: "cpu" },
  { id: "cultural", name: "Cultural", icon: "sparkles" },
  { id: "gaming", name: "Gaming & Esports", icon: "gamepad" },
  { id: "workshop", name: "Workshops & Talks", icon: "lightbulb" }
];

const DAYS = [
  { id: "all", name: "All Days", dateLabel: "Feb 12 & 13" },
  { id: "day-1", name: "Day 1", dateLabel: "12 Feb 2026", fullDate: "Thursday, 12 February 2026" },
  { id: "day-2", name: "Day 2", dateLabel: "13 Feb 2026", fullDate: "Friday, 13 February 2026" }
];

/**
 * Minimum requirement: at least 6 sample events, at least 2 categories, at least 2 dates.
 * Here we provide 8 high-caliber themed events with overlapping time slots to test
 * schedule readability and analytical filtering.
 */
const EVENTS_DATA = [
  {
    id: "evt-01",
    title: "Code Sprint: Algorithmic Odyssey",
    category: "technical",
    day: "day-1",
    date: "12 Feb, 2026",
    time: "10:00 AM - 01:00 PM",
    timeSlot: "10:00 AM",
    venue: "Lab 2 (Turing Computational Wing)",
    featured: true,
    capacity: "120 Seats",
    prize: "$1,500 Pool",
    description: "Fast-paced algorithmic challenge tackling cosmic-scale computational puzzles, space telemetry parsing, and graph navigation under intense time constraints.",
    tags: ["Competitive Programming", "Algorithms", "DSA"]
  },
  {
    id: "evt-02",
    title: "RoboWars: Asteroid Arena",
    category: "technical",
    day: "day-1",
    date: "12 Feb, 2026",
    time: "10:00 AM - 01:30 PM",
    timeSlot: "10:00 AM",
    venue: "Arena Alpha (Mechanical Hangar)",
    featured: true,
    capacity: "250 Spectators",
    prize: "$2,200 Pool",
    description: "Custom-built armored combat rovers clash in a planetary obstacle arena. High-voltage kinetic combat featuring pneumatic flips and spinning blades.",
    tags: ["Robotics", "Hardware", "Combat Bot"]
  },
  {
    id: "evt-03",
    title: "Stellar Choreography: Celestial Dance",
    category: "cultural",
    day: "day-1",
    date: "12 Feb, 2026",
    time: "02:30 PM - 05:30 PM",
    timeSlot: "02:30 PM",
    venue: "Orion Main Auditorium",
    featured: true,
    capacity: "600 Seats",
    prize: "$1,800 Pool",
    description: "Inter-collegiate group dance showdown featuring cosmic themes, synchronized glow-in-the-dark visual formations, and electrifying beats.",
    tags: ["Dance", "Choreography", "Cultural"]
  },
  {
    id: "evt-04",
    title: "Galactic Keynote: Deep Space Propulsion",
    category: "workshop",
    day: "day-1",
    date: "12 Feb, 2026",
    time: "03:00 PM - 04:30 PM",
    timeSlot: "03:00 PM",
    venue: "Saturn Seminar Hall 4",
    featured: false,
    capacity: "150 Seats",
    prize: "Certificates + Kit",
    description: "Distinguished guest lecture and workshop on ion engines, solar sail dynamics, and the next frontier of interplanetary exploration.",
    tags: ["Aerospace", "Guest Talk", "Hands-on"]
  },
  {
    id: "evt-05",
    title: "Cosmic UI/UX Design Hack",
    category: "technical",
    day: "day-2",
    date: "13 Feb, 2026",
    time: "10:00 AM - 02:00 PM",
    timeSlot: "10:00 AM",
    venue: "Design Lab 1 (Ada Lovelace Floor)",
    featured: true,
    capacity: "80 Designers",
    prize: "$1,200 Pool",
    description: "Sprint to design intuitive mission-control dashboards, astronaut heads-up displays (HUD), and next-generation planetary UI components.",
    tags: ["UI/UX", "Product Design", "Figma"]
  },
  {
    id: "evt-06",
    title: "Battle of the Bands: AstroBeats",
    category: "cultural",
    day: "day-2",
    date: "13 Feb, 2026",
    time: "10:00 AM - 02:00 PM",
    timeSlot: "10:00 AM",
    venue: "Apollo Open Amphitheatre",
    featured: true,
    capacity: "800 Spectators",
    prize: "$2,000 Pool",
    description: "College rock, fusion, and indie bands duel under the open sky with original celestial compositions, crushing guitar solos, and roaring rhythm sections.",
    tags: ["Live Music", "Bands", "Acoustics"]
  },
  {
    id: "evt-07",
    title: "Supernova LAN Championship: Valorant & CS2",
    category: "gaming",
    day: "day-2",
    date: "13 Feb, 2026",
    time: "02:30 PM - 07:00 PM",
    timeSlot: "02:30 PM",
    venue: "Esports Hub (Cyber Lounge)",
    featured: false,
    capacity: "32 Squads",
    prize: "$1,600 Pool",
    description: "High-octane collegiate esports tournament featuring 5v5 tactical shooter brackets on ultra-high refresh rate displays with live commentary shoutcasting.",
    tags: ["Esports", "FPS", "LAN Tournament"]
  },
  {
    id: "evt-08",
    title: "Quantum Trivia & Nebula Quiz",
    category: "workshop",
    day: "day-2",
    date: "13 Feb, 2026",
    time: "03:00 PM - 05:00 PM",
    timeSlot: "03:00 PM",
    venue: "Conference Hall B",
    featured: false,
    capacity: "100 Teams",
    prize: "$800 Pool",
    description: "A battle of wits testing astrophysics, sci-fi pop culture, computing milestones, and general technical mastery with interactive buzzer rounds.",
    tags: ["Trivia", "Science", "Quiz"]
  }
];
