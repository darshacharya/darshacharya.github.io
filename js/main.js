document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderMarquee();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderEducation();
  renderContact();
  renderFooter();
  initTerminal();
  initNavbar();
  initScrollAnimations();
  initActiveNav();
  initClock();
  initParticles();
  initCursorGlow();
  initCardGlow();
  initCounters();
  initMagneticButtons();
});

/* ═══════════════════════════════════════════════
   Hero
   ═══════════════════════════════════════════════ */

function renderHero() {
  const d = DATA.about;
  document.getElementById("hero-tag").textContent = d.role;
  document.getElementById("hero-name").textContent = d.name;
  document.getElementById("hero-desc").textContent = "I build AI systems, crunch data, and wire up IoT devices.";
}

/* ═══════════════════════════════════════════════
   Marquee
   ═══════════════════════════════════════════════ */

function renderMarquee() {
  const words = [
    "Artificial Intelligence", "Data Analytics", "Machine Learning",
    "IoT Systems", "Computer Vision", "NLP", "Deep Learning",
    "Edge Computing", "Full Stack", "Python", "Developer",
  ];
  const html = words.map((w) => `<span class="mq-word">${w}</span><span class="mq-dot">·</span>`).join("");
  document.getElementById("marquee-content").innerHTML = html;
  document.getElementById("marquee-content-dup").innerHTML = html;
}

/* ═══════════════════════════════════════════════
   About
   ═══════════════════════════════════════════════ */

function renderAbout() {
  const d = DATA.about;
  const exp = DATA.experience[0];
  const container = document.getElementById("about-content");

  container.innerHTML = `
    <div class="about-text fade-up">
      <p>${d.description}</p>
      <p style="margin-top:20px; color: var(--text-muted)">
        I build things, make them work, make them feel good. That's the gig.
      </p>
    </div>
    <div class="about-stats">
      <div class="stat-card fade-right" style="--stagger:0">
        <div class="stat-icon">${Icons.briefcase}</div>
        <div class="stat-label">Current Role</div>
        <div class="stat-value">${exp.role}</div>
      </div>
      <div class="stat-card fade-right" style="--stagger:1">
        <div class="stat-icon">${Icons.building}</div>
        <div class="stat-label">Company</div>
        <div class="stat-value">${exp.company}</div>
      </div>
      <div class="stat-card fade-right" style="--stagger:2">
        <div class="stat-icon">${Icons.graduationCap}</div>
        <div class="stat-label">Education</div>
        <div class="stat-value">${DATA.education[0].degree.split(" in ")[0]}</div>
      </div>
      <div class="stat-card fade-right" style="--stagger:3">
        <div class="stat-icon">${Icons.award}</div>
        <div class="stat-label">CGPA</div>
        <div class="stat-value" data-count="${DATA.education[0].cgpa}" data-decimals="2">0</div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════
   Experience
   ═══════════════════════════════════════════════ */

function renderExperience() {
  const container = document.getElementById("experience-list");
  container.innerHTML = DATA.experience.map((exp, i) => `
    <div class="exp-item fade-up" style="--stagger:${i}">
      <div class="exp-meta">${exp.period}<br>${exp.location}</div>
      <div>
        <div class="exp-role">${exp.role}</div>
        <div class="exp-company">${exp.company}</div>
        <ul class="exp-bullets">
          ${exp.description.map((d) => `<li>${d}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

/* ═══════════════════════════════════════════════
   Projects
   ═══════════════════════════════════════════════ */

function renderProjects() {
  const container = document.getElementById("project-list");
  container.innerHTML = DATA.projects.map((p, i) => {
    const links = [];
    if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link">${Icons.github} GitHub</a>`);
    if (p.instagram) links.push(`<a href="${p.instagram}" target="_blank" rel="noopener noreferrer" class="project-link">${Icons.instagram || ""} Instagram</a>`);

    return `
    <div class="project-item fade-up" style="--stagger:${i}">
      <div class="project-num">0${i + 1}</div>
      <div>
        <div class="project-head">
          <span class="project-name">${p.name}</span>
          <div class="project-head-right">
            ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
            <span class="project-year">${p.year}</span>
          </div>
        </div>
        <div class="project-tagline">${p.tagline}</div>
        <p class="project-desc">${p.description}</p>
        <ul class="project-details">
          ${p.details.map((d) => `<li>${d}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
  }).join("");
}

/* ═══════════════════════════════════════════════
   Skills Marquee
   ═══════════════════════════════════════════════ */

function renderSkills() {
  const s = DATA.skills;

  const row1 = [
    ...s.languages.map((x) => ({ name: x, icon: "code" })),
    ...s.ai_ml.map((x) => ({ name: x, icon: "cpu" })),
    ...s.data.map((x) => ({ name: x, icon: "barChart" })),
  ];
  const row2 = [
    ...s.iot.map((x) => ({ name: x, icon: "wifi" })),
    ...s.tools.map((x) => ({ name: x, icon: "tool" })),
    ...s.databases.map((x) => ({ name: x, icon: "database" })),
    ...s.cloud.map((x) => ({ name: x, icon: "cloud" })),
  ];

  const container = document.getElementById("skills-marquee");

  function buildRow(items) {
    const pills = items.map((item) => {
      const iconSvg = Icons[item.icon] || "";
      return `<span class="skill-pill">${iconSvg}${item.name}</span>`;
    }).join("");
    return `<div class="skills-row"><div class="skills-row-inner">${pills}${pills}</div></div>`;
  }

  container.innerHTML = buildRow(row1) + buildRow(row2);
}

/* ═══════════════════════════════════════════════
   Education
   ═══════════════════════════════════════════════ */

function renderEducation() {
  const container = document.getElementById("education-list");
  container.innerHTML = DATA.education.map((ed, i) => `
    <div class="edu-card fade-up" style="--stagger:${i}">
      <div class="edu-card-icon">${Icons.school}</div>
      <h3>${ed.degree}</h3>
      <div class="institution">${ed.institution}</div>
      <div class="edu-meta">
        <span>${ed.period}</span>
        <span class="cgpa">CGPA: ${ed.cgpa}</span>
      </div>
    </div>
  `).join("");
}

/* ═══════════════════════════════════════════════
   Contact / CTA
   ═══════════════════════════════════════════════ */

function renderContact() {
  const c = DATA.contact;
  const s = DATA.social;
  const container = document.getElementById("contact-content");

  container.innerHTML = `
    <a href="mailto:${c.email}" class="cta-link scale-in" style="--stagger:0">
      <span>${Icons.mail}</span>
      <div class="cta-link-text">
        <h4>Email</h4>
        <span>${c.email}</span>
      </div>
    </a>
    <a href="${s.github}" target="_blank" rel="noopener noreferrer" class="cta-link scale-in" style="--stagger:1">
      <span>${Icons.github}</span>
      <div class="cta-link-text">
        <h4>GitHub</h4>
        <span>darshacharya</span>
      </div>
    </a>
    <a href="${s.linkedin}" target="_blank" rel="noopener noreferrer" class="cta-link scale-in" style="--stagger:2">
      <span>${Icons.linkedin}</span>
      <div class="cta-link-text">
        <h4>LinkedIn</h4>
        <span>Sudarshan T S</span>
      </div>
    </a>
    <a href="${s.instagram}" target="_blank" rel="noopener noreferrer" class="cta-link scale-in" style="--stagger:3">
      <span>${Icons.instagram || Icons.wifi}</span>
      <div class="cta-link-text">
        <h4>DevelDuos</h4>
        <span>Instagram / Startup</span>
      </div>
    </a>
  `;
}

/* ═══════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════ */

function renderFooter() {
  const s = DATA.social;
  document.getElementById("footer-links").innerHTML = `
    <a href="${s.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="${s.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="${s.instagram}" target="_blank" rel="noopener noreferrer">DevelDuos</a>
    <a href="mailto:${DATA.contact.email}">Email</a>
  `;
}

function initClock() {
  function update() {
    const now = new Date();
    const opts = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "Asia/Kolkata" };
    document.getElementById("footer-time").textContent = now.toLocaleTimeString("en-IN", opts) + " IST";
  }
  update();
  setInterval(update, 1000);
}

/* ═══════════════════════════════════════════════
   Terminal
   ═══════════════════════════════════════════════ */

function initTerminal() {
  const container = document.getElementById("terminal");
  const terminal = new Terminal(container, "sudarshan@portfolio:~$ ");
  window.__terminal = terminal;
  terminal.setCommandHandler((input) => Commands.execute(input));
  terminal.setRegisteredCommands(Commands.getNames());
  terminal.printImmediate(Commands.banner());
}

/* ═══════════════════════════════════════════════
   Navbar
   ═══════════════════════════════════════════════ */

function initNavbar() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const progressBar = document.getElementById("scroll-progress");
  let lastScroll = 0;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        navbar.classList.toggle("nav-scrolled", y > 80);
        navbar.classList.toggle("nav-hidden", y > lastScroll && y > 400);
        lastScroll = y;

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar && docHeight > 0) {
          progressBar.style.transform = "scaleX(" + (y / docHeight) + ")";
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ═══════════════════════════════════════════════
   Scroll Animations
   ═══════════════════════════════════════════════ */

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".fade-up,.fade-left,.fade-right,.scale-in").forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
  );

  document.querySelectorAll(".fade-up,.fade-left,.fade-right,.scale-in").forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════════
   Animated Counters
   ═══════════════════════════════════════════════ */

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        observer.unobserve(el);

        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = prefix + current.toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ═══════════════════════════════════════════════
   Card Mouse Tracking
   ═══════════════════════════════════════════════ */

function initCardGlow() {
  const cards = document.querySelectorAll(".exp-item, .project-item, .stat-card, .edu-card, .cta-link");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
      card.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
    });
  });
}

/* ═══════════════════════════════════════════════
   Cursor Glow
   ═══════════════════════════════════════════════ */

function initCursorGlow() {
  const dot = document.getElementById("cursor-dot");
  const glow = document.getElementById("cursor-glow");
  if (!dot || !glow || window.innerWidth < 768) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    if (!dot.classList.contains("active")) dot.classList.add("active");
    if (!glow.classList.contains("active")) glow.classList.add("active");

    const target = e.target.closest("a, button, input, .btn, .project-item, .stat-card, .cta-link, .nav-toggle");
    dot.classList.toggle("hovering", !!target);
  });

  document.addEventListener("mouseleave", () => {
    dot.classList.remove("active");
    glow.classList.remove("active");
  });
}

/* ═══════════════════════════════════════════════
   Magnetic Buttons
   ═══════════════════════════════════════════════ */

function initMagneticButtons() {
  if (window.innerWidth < 768) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const btns = document.querySelectorAll(".btn");
  const strength = 0.3;

  btns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ═══════════════════════════════════════════════
   Particles Background
   ═══════════════════════════════════════════════ */

function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (canvas && typeof TextParticles !== "undefined") {
    TextParticles.init(canvas);
  }
}

/* ═══════════════════════════════════════════════
   Active Nav
   ═══════════════════════════════════════════════ */

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-64px 0px -40% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}
