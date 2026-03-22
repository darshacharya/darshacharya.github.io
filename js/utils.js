const Utils = (() => {
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function colorize(text, color) {
    return `<span style="color:${color}">${text}</span>`;
  }

  function bold(text) {
    return `<span class="bold">${text}</span>`;
  }

  function link(url, label) {
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label || url)}</a>`;
  }

  function line(text) {
    return text + "\n";
  }

  function padRight(str, len) {
    return str + " ".repeat(Math.max(0, len - str.length));
  }

  function sectionHeader(title) {
    const bar = "═".repeat(title.length + 4);
    return [
      colorize(bar, "var(--accent)"),
      colorize("  " + title, "var(--accent)") + "  ",
      colorize(bar, "var(--accent)"),
    ].join("\n");
  }

  function table(rows, colWidths) {
    return rows
      .map((row) =>
        row.map((cell, i) => padRight(String(cell), colWidths[i] || 20)).join("  ")
      )
      .join("\n");
  }

  function bulletList(items, bullet = "▸") {
    return items.map((item) => `  ${colorize(bullet, "var(--accent)")} ${item}`).join("\n");
  }

  function detectReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  return {
    escapeHtml,
    colorize,
    bold,
    link,
    line,
    padRight,
    sectionHeader,
    table,
    bulletList,
    detectReducedMotion,
  };
})();
