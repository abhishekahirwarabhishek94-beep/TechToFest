/**
 * S.A.T.I. Vidisha — TechToCheck 2026
 * Official Festival Application Logic & Event Store
 * Dates: 20/11/26 to 25/11/26
 */

// Image Assets Provided
const IMG_CITY = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80";
const IMG_STREET = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80";
const IMG_MATRIX = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";

// S.A.T.I. Vidisha TechToCheck Events Data (20/11/26 to 25/11/26)
// Includes a parallel session on 22/11/26 (11:00 AM) to visibly demonstrate readable shared time slots
const eventsData = [
  {
    id: 1,
    title: "Post Your Poster",
    category: "Creative & Startup",
    badgeClass: "startup",
    date: "20/11/26",
    time: "11:00 AM",
    venue: "1st & 2nd Floor Left Wing, SATI, Vidisha",
    image: IMG_CITY,
    description:
      "An opportunity for students to present innovative ideas and technical concepts through creative posters, encouraging knowledge sharing, innovation, and effective communication."
  },
  {
    id: 2,
    title: "Idea Stage",
    category: "Technical & Research",
    badgeClass: "tech",
    date: "21/11/26",
    time: "11:00 AM",
    venue: "Seminar Hall, SATI, Vidisha",
    image: IMG_MATRIX,
    description:
      "A platform for students to present their research ideas, technical studies, and innovative solutions. Participants will showcase their work, share insights, and discuss real-world applications in their respective domains."
  },
  {
    id: 3,
    title: "Rock with your Robo",
    category: "Robotics & Hardware",
    badgeClass: "robo",
    date: "22/11/26",
    time: "11:00 AM",
    venue: "IT Garden, SATI, Vidisha",
    image: IMG_STREET,
    description:
      "A robotics competition where participants showcase their robot-building, control, and strategic skills through competitive robotic challenges, emphasizing innovation, engineering, and problem-solving."
  },
  {
    id: 4,
    title: "Cyber Circuit Debugging (Parallel Track)",
    category: "Technical & Research",
    badgeClass: "tech",
    date: "22/11/26",
    time: "11:00 AM",
    venue: "Electronics Lab 3, SATI, Vidisha",
    image: IMG_MATRIX,
    description:
      "Fast-paced hardware & embedded systems troubleshooting challenge running concurrently with Rock with your Robo at 11:00 AM."
  },
  {
    id: 5,
    title: "MODEL Presentation",
    category: "Technical & Research",
    badgeClass: "tech",
    date: "23/11/26",
    time: "11:30 AM",
    venue: "Room 216, SATI, Vidisha",
    image: IMG_CITY,
    description:
      "A platform for students to showcase innovative hardware and software models, demonstrate their working, and explain their technical concepts and practical applications."
  },
  {
    id: 6,
    title: "ROBO WALK",
    category: "Robotics & Hardware",
    badgeClass: "robo",
    date: "24/11/26",
    time: "11:00 AM",
    venue: "IT Garden, SATI, Vidisha",
    image: IMG_STREET,
    description:
      "A robotics competition in which participants design and operate wheel-less bots to navigate a challenging track using walking, crawling, or stepping mechanisms."
  },
  {
    id: 7,
    title: "GEN IDEA AND START UP",
    category: "Creative & Startup",
    badgeClass: "startup",
    date: "25/11/26",
    time: "11:00 AM",
    venue: "Smart Classroom, SATI, Vidisha (MP)",
    image: IMG_MATRIX,
    description:
      "Have an idea that can change the world? This is your stage. Join us to pitch your idea, get mentored by real founders, and learn how to build a startup from scratch. Best ideas get incubation support, prizes & funding guidance."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // DOM References
  const eventsGrid = document.getElementById("eventsGrid");
  const categoryFilter = document.getElementById("categoryFilter");
  const dayFilter = document.getElementById("dayFilter");
  const resetFiltersBtn = document.getElementById("resetFilters");
  const scheduleContainer = document.getElementById("scheduleContainer");
  const scheduleTabs = document.querySelectorAll(".tab-btn");
  const eventSelect = document.getElementById("eventSelect");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const registrationForm = document.getElementById("registrationForm");

  // 1. Render Filtered Event Cards
  function renderEvents() {
    if (!eventsGrid || !categoryFilter || !dayFilter) return;
    const selectedCat = categoryFilter.value;
    const selectedDay = dayFilter.value;

    const filtered = eventsData.filter((ev) => {
      const matchCat = selectedCat === "All" || ev.category === selectedCat;
      const matchDay = selectedDay === "All" || ev.date === selectedDay;
      return matchCat && matchDay;
    });

    if (filtered.length === 0) {
      eventsGrid.innerHTML = `<p class="terminal-log">&gt; ZERO_MODULES_FOUND // ADJUST_FILTERS</p>`;
      return;
    }

    eventsGrid.innerHTML = filtered
      .map(
        (ev) => `
        <article class="event-card">
          <img src="${ev.image}" alt="${ev.title}" class="card-banner" loading="lazy" />
          <div class="card-body">
            <span class="badge ${ev.badgeClass}">${ev.category}</span>
            <h3 class="glitch-hover">${ev.title}</h3>
            <p class="event-desc">${ev.description}</p>
          </div>
          <div class="event-meta">
            <span>📅 <strong class="meta-highlight">DATE / TIME:</strong> ${ev.date} // ${ev.time}</span>
            <span>📍 <strong class="meta-highlight">VENUE:</strong> ${ev.venue}</span>
          </div>
          <div class="card-action">
            <button type="button" class="btn-register-card" onclick="window.quickSelectEvent('${ev.title.replace(/'/g, "\\'")}')">
              <span>REGISTER FOR THIS EVENT</span> &rarr;
            </button>
          </div>
        </article>
      `
      )
      .join("");
  }

  // 2. Render Readable Schedule with Side-by-Side Concurrent Slot Grouping
  function renderSchedule(selectedDay = "All") {
    if (!scheduleContainer) return;
    const allDates = ["20/11/26", "21/11/26", "22/11/26", "23/11/26", "24/11/26", "25/11/26"];
    const datesToRender = selectedDay === "All" ? allDates : [selectedDay];

    scheduleContainer.innerHTML = datesToRender
      .map((date) => {
        const dayEvents = eventsData.filter((ev) => ev.date === date);

        // Group events sharing the same timestamp
        const groupedByTime = {};
        dayEvents.forEach((ev) => {
          if (!groupedByTime[ev.time]) groupedByTime[ev.time] = [];
          groupedByTime[ev.time].push(ev);
        });

        const slotsHtml = Object.entries(groupedByTime)
          .map(([time, slotEvents]) => {
            const isConcurrent = slotEvents.length > 1;
            const cardsHtml = slotEvents
              .map(
                (ev) => `
                <div class="slot-item ${ev.badgeClass}">
                  <div class="slot-header">
                    <span class="badge ${ev.badgeClass}">${ev.category}</span>
                    <span class="slot-time-badge">${ev.time}</span>
                  </div>
                  <h4>${ev.title}</h4>
                  <p class="slot-venue">📍 ${ev.venue}</p>
                  ${
                    isConcurrent
                      ? `<span class="conflict-flag">⚡ PARALLEL_SLOT // CHOOSE_TRACK</span>`
                      : ""
                  }
                  <a href="#register" class="slot-reg-link" onclick="window.quickSelectEvent('${ev.title.replace(/'/g, "\\'")}')">
                    Register Track &rarr;
                  </a>
                </div>
              `
              )
              .join("");

            return `
              <div class="time-slot-row ${isConcurrent ? 'has-concurrent-tracks' : ''}">
                <div class="time-label">
                  <span class="time-stamp">${time}</span>
                  ${isConcurrent ? '<span class="parallel-indicator">MULTI-TRACK</span>' : ''}
                </div>
                <div class="slot-events-grid">${cardsHtml}</div>
              </div>
            `;
          })
          .join("");

        return `
          <div class="day-group">
            <h3 class="day-heading">&gt; DATE_LOG // ${date}</h3>
            ${slotsHtml}
          </div>
        `;
      })
      .join("");
  }

  // 3. Populate Registration Event Select Dropdown
  function populateDropdown() {
    if (!eventSelect) return;
    eventSelect.innerHTML = `<option value="" disabled selected>-- SELECT TARGET EVENT MODULE --</option>`;
    eventsData.forEach((ev) => {
      const opt = document.createElement("option");
      opt.value = ev.title;
      opt.textContent = `${ev.title} (${ev.date} @ ${ev.venue})`;
      eventSelect.appendChild(opt);
    });
  }

  // Quick Select helper for event cards and schedule slots
  window.quickSelectEvent = (eventTitle) => {
    if (eventSelect) {
      eventSelect.value = eventTitle;
      const eventError = document.getElementById("eventError");
      if (eventError) eventError.textContent = "";
    }
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 4. Form Validation & On-Screen Confirmation
  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const selectedEvent = document.getElementById("eventSelect").value;
      const college = document.getElementById("college").value.trim();

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const eventError = document.getElementById("eventError");
      const collegeError = document.getElementById("collegeError");
      const formSuccess = document.getElementById("formSuccess");

      if (nameError) nameError.textContent = "";
      if (emailError) emailError.textContent = "";
      if (eventError) eventError.textContent = "";
      if (collegeError) collegeError.textContent = "";
      if (formSuccess) formSuccess.hidden = true;

      let valid = true;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (fullName.length < 2) {
        if (nameError) nameError.textContent = "> ERROR: Operator name required (min 2 chars).";
        valid = false;
      }
      if (!emailPattern.test(email)) {
        if (emailError) emailError.textContent = "> ERROR: Invalid email format (e.g., user@satiengg.in).";
        valid = false;
      }
      if (!selectedEvent) {
        if (eventError) eventError.textContent = "> ERROR: Target event module must be selected.";
        valid = false;
      }
      if (college.length < 2) {
        if (collegeError) collegeError.textContent = "> ERROR: Institute/Branch required.";
        valid = false;
      }

      if (valid && formSuccess) {
        formSuccess.innerHTML = `
          <div class="success-banner">
            <span class="success-icon">✓</span>
            <div>
              <strong>&gt; UPLINK_CONFIRMED:</strong> ${escapeHTML(fullName)} registered for <em>"${escapeHTML(selectedEvent)}"</em> at S.A.T.I. Vidisha!
              <div class="success-sub">Confirmation packet and security token dispatched to <strong>${escapeHTML(email)}</strong>.</div>
            </div>
          </div>
        `;
        formSuccess.hidden = false;
        registrationForm.reset();
        const collegeInput = document.getElementById("college");
        if (collegeInput) collegeInput.value = "S.A.T.I. Vidisha";
        
        // Scroll confirmation into view gently
        formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // Filter & Navigation Event Listeners
  if (categoryFilter) categoryFilter.addEventListener("change", renderEvents);
  if (dayFilter) dayFilter.addEventListener("change", renderEvents);
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      categoryFilter.value = "All";
      dayFilter.value = "All";
      renderEvents();
    });
  }

  if (scheduleTabs) {
    scheduleTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        scheduleTabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderSchedule(btn.dataset.day);
      });
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Matrix Rain Background Effect
  initMatrixRain();

  // Initialize App
  renderEvents();
  renderSchedule();
  populateDropdown();

  function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function initMatrixRain() {
    const canvas = document.getElementById("matrixCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const characters = "010101SATI VIDISHA TECHTOCHECK 2026 <>/{}[];:!@#$%^&*+-=";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));

    function draw() {
      ctx.fillStyle = "rgba(5, 7, 15, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Occasional glowing cyan characters
        if (Math.random() > 0.92) {
          ctx.fillStyle = "#00f0ff";
        } else {
          ctx.fillStyle = "#00ff66";
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 45);
  }
});
