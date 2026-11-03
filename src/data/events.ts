export interface FestEvent {
  id: number;
  title: string;
  category: 'Creative & Startup' | 'Technical & Research' | 'Robotics & Hardware' | 'Workshops & Coding';
  badgeClass: 'startup' | 'tech' | 'robo' | 'code';
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  isParallel?: boolean;
  coordinator?: string;
  prizePool?: string;
}

// User specified Unsplash Cyberpunk image assets
export const IMG_CITY = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"; // Cyberpunk City Lights
export const IMG_STREET = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"; // Neon Futuristic Street
export const IMG_MATRIX = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"; // Abstract Glowing Circuit / Matrix

export const FEST_METADATA = {
  name: "TechToCheck",
  tagline: "Have vision of creating a Tech? Welcome to TechToCheck",
  college: "S.A.T.I. Vidisha",
  dateRange: "20/11/26 to 25/11/26",
  terminalProtocol: "INITIALIZING_FEST_PROTOCOL_v3.0",
};

export const EVENTS_DATA: FestEvent[] = [
  {
    id: 1,
    title: "Post Your Poster",
    category: "Creative & Startup",
    badgeClass: "startup",
    date: "20/11/26",
    displayDate: "20 Nov 2026",
    time: "11:00 AM",
    venue: "1st & 2nd Floor Left Wing, SATI, Vidisha",
    image: IMG_CITY,
    description: "An opportunity for students to present innovative ideas, technical concepts, through creative posters, encouraging knowledge sharing, innovation, and effective communication.",
    coordinator: "Prof. R. K. Sharma",
    prizePool: "₹15,000"
  },
  {
    id: 2,
    title: "Idea Stage",
    category: "Technical & Research",
    badgeClass: "tech",
    date: "21/11/26",
    displayDate: "21 Nov 2026",
    time: "11:00 AM",
    venue: "Seminar Hall, SATI, Vidisha",
    image: IMG_MATRIX,
    description: "A platform for students to present their research ideas, technical studies and innovative solutions. Participants will showcase their work, share insights and discuss real-world applications in their respective domains.",
    coordinator: "Dr. Ananya Verma",
    prizePool: "₹25,000"
  },
  {
    id: 3,
    title: "Rock with your robo",
    category: "Robotics & Hardware",
    badgeClass: "robo",
    date: "22/11/26",
    displayDate: "22 Nov 2026",
    time: "11:00 AM",
    venue: "IT Garden, SATI, Vidisha",
    image: IMG_STREET,
    description: "A robotics competition where participants showcase their robot-building, control, and strategic skills through competitive robotic challenges, emphasizing innovation, engineering, and problem-solving.",
    isParallel: true,
    coordinator: "Er. Vikram Patel",
    prizePool: "₹30,000"
  },
  {
    id: 4,
    title: "Cyber Circuit Debugging (Parallel Track)",
    category: "Technical & Research",
    badgeClass: "tech",
    date: "22/11/26",
    displayDate: "22 Nov 2026",
    time: "11:00 AM",
    venue: "Electronics Lab 3, SATI, Vidisha",
    image: IMG_MATRIX,
    description: "Fast-paced hardware & embedded systems circuit troubleshooting sprint running concurrently with Rock with your robo at 11:00 AM. Demonstrates shared time-slot concurrency.",
    isParallel: true,
    coordinator: "Prof. Priya Nair",
    prizePool: "₹20,000"
  },
  {
    id: 5,
    title: "MODEL Presentation",
    category: "Technical & Research",
    badgeClass: "tech",
    date: "23/11/26",
    displayDate: "23 Nov 2026",
    time: "11:30 AM",
    venue: "Room 216, SATI, Vidisha",
    image: IMG_CITY,
    description: "A platform for students to showcase innovative hardware and software models, demonstrate their working, and explain their technical concepts and practical applications.",
    coordinator: "Dr. S. K. Gupta",
    prizePool: "₹22,000"
  },
  {
    id: 6,
    title: "ROBO WALK",
    category: "Robotics & Hardware",
    badgeClass: "robo",
    date: "24/11/26",
    displayDate: "24 Nov 2026",
    time: "11:00 AM",
    venue: "IT Garden, SATI, Vidisha",
    image: IMG_STREET,
    description: "A robotics competition in which participants design and operate wheel-less bots to navigate a challenging track using walking, crawling, or stepping mechanisms.",
    coordinator: "Er. Vikram Patel",
    prizePool: "₹28,000"
  },
  {
    id: 7,
    title: "GEN IDEA AND START UP",
    category: "Creative & Startup",
    badgeClass: "startup",
    date: "25/11/26",
    displayDate: "25 Nov 2026",
    time: "11:00 AM",
    venue: "Smart Classroom, SATI, Vidisha (MP)",
    image: IMG_MATRIX,
    description: "Have an idea that can change the world? This is your stage. Join us to pitch your idea, get mentored by real founders, and learn how to build a startup from scratch. Best ideas will get incubation support, prizes & funding guidance. Bring your idea, we’ll give you the roadmap.",
    coordinator: "Incubation Cell SATI",
    prizePool: "₹50,000 + Incubation"
  },
  {
    id: 8,
    title: "Code Sprint (Competitive Hackathon)",
    category: "Workshops & Coding",
    badgeClass: "code",
    date: "12/02/26",
    displayDate: "12 Feb 2026",
    time: "10:00 AM",
    venue: "Computer Lab 2, SATI, Vidisha",
    image: IMG_MATRIX,
    description: "Fast-paced algorithmic programming and code sprint under strict time limits. (Official Problem Statement Sample Event).",
    coordinator: "Prof. M. Joshi (fest@example.edu)",
    prizePool: "₹35,000"
  }
];

export const CATEGORIES = [
  "All",
  "Creative & Startup",
  "Technical & Research",
  "Robotics & Hardware",
  "Workshops & Coding"
] as const;

export const DATES = [
  { value: "All", label: "All Days" },
  { value: "20/11/26", label: "20/11/26 (Posters)" },
  { value: "21/11/26", label: "21/11/26 (Idea Stage)" },
  { value: "22/11/26", label: "22/11/26 (★ Parallel Tracks)" },
  { value: "23/11/26", label: "23/11/26 (Model Pres.)" },
  { value: "24/11/26", label: "24/11/26 (Robo Walk)" },
  { value: "25/11/26", label: "25/11/26 (Startup Pitch)" },
  { value: "12/02/26", label: "12/02/26 (Code Sprint)" }
];
