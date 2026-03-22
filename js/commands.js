const Commands = (() => {
  const registry = {};

  function register(name, description, handler) {
    registry[name] = { description, handler };
  }

  function execute(input) {
    const parts = input.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    if (registry[cmd]) {
      return registry[cmd].handler(args);
    }

    return (
      Utils.colorize(`Command not found: ${Utils.escapeHtml(cmd)}`, "var(--error)") +
      "\n" +
      Utils.colorize("Type 'help' to see available commands.", "var(--text-secondary)")
    );
  }

  function getAll() {
    return registry;
  }

  function getNames() {
    return Object.keys(registry);
  }

  // ── help ──────────────────────────────────────────
  register("help", "List all available commands", () => {
    const cmds = Object.entries(registry);
    const maxLen = Math.max(...cmds.map(([k]) => k.length));

    let out = Utils.sectionHeader("AVAILABLE COMMANDS") + "\n\n";
    out += cmds
      .map(
        ([name, { description }]) =>
          `  ${Utils.colorize(Utils.padRight(name, maxLen + 2), "var(--accent)")}${description}`
      )
      .join("\n");
    out += "\n\n" + Utils.colorize("  Tip: Use ↑↓ for history, Tab for autocomplete", "var(--text-secondary)");
    return out;
  });

  // ── about ─────────────────────────────────────────
  register("about", "About me", () => {
    const a = DATA.about;
    let out = Utils.sectionHeader("ABOUT ME") + "\n\n";
    out += `  ${Utils.colorize(a.name, "var(--highlight)")}  —  ${a.role}\n`;
    out += `  ${Utils.colorize(a.title, "var(--text-secondary)")}\n\n`;
    out += `  ${a.description}\n`;
    return out;
  });

  // ── experience ────────────────────────────────────
  register("experience", "Work experience", () => {
    let out = Utils.sectionHeader("EXPERIENCE") + "\n";

    DATA.experience.forEach((exp) => {
      out += "\n";
      out += `  ${Utils.colorize(exp.role, "var(--highlight)")} @ ${Utils.colorize(exp.company, "var(--accent)")}\n`;
      out += `  ${Utils.colorize(exp.period + "  ·  " + exp.location, "var(--text-secondary)")}\n\n`;
      out += Utils.bulletList(exp.description) + "\n";
    });
    return out;
  });

  // ── projects ──────────────────────────────────────
  register("projects", "List projects", () => {
    let out = Utils.sectionHeader("PROJECTS") + "\n\n";

    DATA.projects.forEach((p) => {
      out += `  ${Utils.colorize(p.name, "var(--highlight)")}  ${Utils.colorize("(" + p.year + ")", "var(--text-secondary)")}\n`;
      out += `  ${p.tagline}\n\n`;
    });
    out += Utils.colorize("  Use 'project <name>' for details", "var(--text-secondary)");
    return out;
  });

  // ── project <name> ────────────────────────────────
  register("project", "Show project details — usage: project <name>", (args) => {
    if (args.length === 0) {
      return Utils.colorize("Usage: project <name>", "var(--text-secondary)") +
        "\n" + Utils.colorize("Available: " + DATA.projects.map((p) => p.name.toLowerCase()).join(", "), "var(--text-secondary)");
    }

    const query = args.join(" ").toLowerCase();
    const project = DATA.projects.find(
      (p) => p.name.toLowerCase() === query || p.name.toLowerCase().includes(query)
    );

    if (!project) {
      return Utils.colorize(`Project '${Utils.escapeHtml(args.join(" "))}' not found.`, "var(--error)") +
        "\n" + Utils.colorize("Available: " + DATA.projects.map((p) => p.name.toLowerCase()).join(", "), "var(--text-secondary)");
    }

    let out = Utils.sectionHeader(project.name.toUpperCase()) + "\n\n";
    out += `  ${Utils.colorize(project.tagline, "var(--highlight)")}  ${Utils.colorize("(" + project.year + ")", "var(--text-secondary)")}\n`;
    out += `  ${project.description}\n\n`;
    out += Utils.bulletList(project.details) + "\n";
    return out;
  });

  // ── skills ────────────────────────────────────────
  register("skills", "Technical skills", () => {
    const s = DATA.skills;
    const categories = [
      ["Languages", s.languages],
      ["AI / ML", s.ai_ml],
      ["Data & Viz", s.data],
      ["IoT / Embedded", s.iot],
      ["Tools & Platforms", s.tools],
      ["Databases", s.databases],
      ["Cloud", s.cloud],
      ["Soft Skills", s.soft],
    ];

    let out = Utils.sectionHeader("SKILLS") + "\n\n";
    const maxLabel = Math.max(...categories.map(([l]) => l.length));

    categories.forEach(([label, items]) => {
      out += `  ${Utils.colorize(Utils.padRight(label, maxLabel + 2), "var(--accent)")}`;
      out += items.map((i) => Utils.colorize(i, "var(--highlight)")).join(Utils.colorize(" · ", "var(--text-secondary)"));
      out += "\n";
    });
    return out;
  });

  // ── education ─────────────────────────────────────
  register("education", "Education details", () => {
    let out = Utils.sectionHeader("EDUCATION") + "\n";

    DATA.education.forEach((ed) => {
      out += "\n";
      out += `  ${Utils.colorize(ed.degree, "var(--highlight)")}\n`;
      out += `  ${ed.institution}\n`;
      out += `  ${Utils.colorize(ed.period, "var(--text-secondary)")}  ·  CGPA: ${Utils.colorize(ed.cgpa, "var(--accent)")}\n`;
    });
    return out;
  });

  // ── contact ───────────────────────────────────────
  register("contact", "Contact information", () => {
    const c = DATA.contact;
    let out = Utils.sectionHeader("CONTACT") + "\n\n";
    out += `  ${Utils.colorize("Email", "var(--accent)")}    ${Utils.link("mailto:" + c.email, c.email)}\n`;
    out += `  ${Utils.colorize("Phone", "var(--accent)")}    ${c.phone}\n`;
    return out;
  });

  // ── social ────────────────────────────────────────
  register("social", "Social links", () => {
    const s = DATA.social;
    let out = Utils.sectionHeader("SOCIAL") + "\n\n";
    out += `  ${Utils.colorize("GitHub", "var(--accent)")}      ${Utils.link(s.github, s.github)}\n`;
    out += `  ${Utils.colorize("LinkedIn", "var(--accent)")}    ${Utils.link(s.linkedin, s.linkedin)}\n`;
    out += `  ${Utils.colorize("Instagram", "var(--accent)")}   ${Utils.link(s.instagram, "DevelDuos — IoT Startup")}\n`;
    return out;
  });

  // ── resume ────────────────────────────────────────
  register("resume", "Open / download resume", () => {
    window.open("assets/resume.pdf", "_blank");
    return Utils.colorize("  ↗ Opening resume in a new tab...", "var(--accent)");
  });

  // ── clear ─────────────────────────────────────────
  register("clear", "Clear the terminal", () => {
    if (window.__terminal) window.__terminal.clear();
    return null;
  });

  // ── whoami ────────────────────────────────────────
  register("whoami", "Who am I?", () => {
    return [
      "",
      Utils.colorize("  ╔══════════════════════════════════════╗", "var(--accent)"),
      Utils.colorize("  ║", "var(--accent)") + "  " + Utils.colorize(DATA.about.name, "var(--highlight)") + "                   " + Utils.colorize("║", "var(--accent)"),
      Utils.colorize("  ║", "var(--accent)") + "  " + DATA.about.role + "   " + Utils.colorize("║", "var(--accent)"),
      Utils.colorize("  ║", "var(--accent)") + "  Fueled by curiosity & coffee ☕     " + Utils.colorize("║", "var(--accent)"),
      Utils.colorize("  ╚══════════════════════════════════════╝", "var(--accent)"),
      "",
    ].join("\n");
  });

  // ── theme ─────────────────────────────────────────
  register("theme", "Toggle terminal theme — usage: theme [green|amber|white]", (args) => {
    const themes = ["green", "amber", "white"];
    const current = document.documentElement.getAttribute("data-theme") || "green";

    let next;
    if (args.length > 0 && themes.includes(args[0])) {
      next = args[0];
    } else if (args.length > 0) {
      return Utils.colorize(`Unknown theme '${Utils.escapeHtml(args[0])}'. Options: ${themes.join(", ")}`, "var(--error)");
    } else {
      const idx = themes.indexOf(current);
      next = themes[(idx + 1) % themes.length];
    }

    document.documentElement.setAttribute("data-theme", next);
    return Utils.colorize(`  Theme switched to: ${next}`, "var(--term-accent)");
  });

  // ── Easter eggs ───────────────────────────────────
  register("sudo", "???", () => {
    return [
      "",
      Utils.colorize("  [sudo] password for recruiter: ********", "var(--text-secondary)"),
      "",
      Utils.colorize("  ✓ Access granted.", "var(--accent)"),
      `  ${DATA.about.name} has been added to your team.`,
      Utils.colorize("  Welcome aboard! 🎉", "var(--highlight)"),
      "",
    ].join("\n");
  });

  register("hack", "???", () => {
    const lines = [
      "  Initializing breach protocol...",
      "  Bypassing firewall ████████████ 100%",
      "  Decrypting mainframe...",
      "  Accessing classified data...",
      "",
      Utils.colorize("  ACCESS GRANTED", "var(--accent)"),
      "",
      `  Secret: ${DATA.about.name} is actually a pretty cool developer.`,
      "  Consider hiring them. 😎",
      "",
    ];
    return lines.join("\n");
  });

  register("banner", "Show welcome banner", () => {
    return _banner();
  });

  function _banner() {
    const ascii = String.raw`_____/\\\\\\\\\\\_________________________/\\\_____________________________________________/\\\
 ___/\\\/////////\\\______________________\/\\\____________________________________________\/\\\
  __\//\\\______\///_______________________\/\\\____________________________________________\/\\\
   ___\////\\\__________/\\\____/\\\________\/\\\___/\\\\\\\\\_____/\\/\\\\\\\___/\\\\\\\\\\_\/\\\__________/\\\\\\\\\_____/\\/\\\\\\
    ______\////\\\______\/\\\___\/\\\___/\\\\\\\\\__\////////\\\___\/\\\/////\\\_\/\\\//////__\/\\\\\\\\\\__\////////\\\___\/\\\////\\\
     _________\////\\\___\/\\\___\/\\\__/\\\////\\\____/\\\\\\\\\\__\/\\\___\///__\/\\\\\\\\\\_\/\\\/////\\\___/\\\\\\\\\\__\/\\\__\//\\\
      __/\\\______\//\\\__\/\\\___\/\\\_\/\\\__\/\\\___/\\\/////\\\__\/\\\_________\////////\\\_\/\\\___\/\\\__/\\\/////\\\__\/\\\___\/\\\
       _\///\\\\\\\\\\\/___\//\\\\\\\\\__\//\\\\\\\/\\_\//\\\\\\\\/\\_\/\\\__________/\\\\\\\\\\_\/\\\___\/\\\_\//\\\\\\\\/\\_\/\\\___\/\\\
        ___\///////////______\/////////____\///////\//___\////////\//__\///__________\//////////__\///____\///___\////////\//__\///____\///`.split("\n");

    let out = "\n";
    out += '<div style="white-space:pre;overflow-x:auto;font-size:0.55em;line-height:1.2;padding-bottom:6px">';
    out += Utils.colorize(ascii.join("\n"), "var(--accent)");
    out += "</div>\n";
    out += `  ${Utils.colorize(DATA.about.role, "var(--text-secondary)")}\n`;
    out += `  ${Utils.colorize("Software Developer @ Red Hat", "var(--highlight)")}\n\n`;
    out += `  Type ${Utils.colorize("help", "var(--accent)")} to see all commands.\n`;
    return out;
  }

  return { register, execute, getAll, getNames, banner: _banner };
})();
