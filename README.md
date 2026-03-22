# Terminal Portfolio — Sudarshan T S

An interactive terminal-style portfolio website built with vanilla HTML, CSS, and JavaScript. Explore the portfolio by typing commands just like a real terminal.

## Quick Start

No build step required. Just open `index.html` in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Commands

| Command            | Description                  |
|--------------------|------------------------------|
| `help`             | List all commands            |
| `about`            | About me                     |
| `experience`       | Work experience              |
| `projects`         | List projects                |
| `project <name>`   | Detailed project view        |
| `skills`           | Technical skills             |
| `education`        | Education details            |
| `contact`          | Contact information          |
| `social`           | Social links                 |
| `resume`           | Open / download resume       |
| `clear`            | Clear the terminal           |
| `whoami`           | Identity easter egg          |
| `theme [name]`     | Toggle theme (green/amber/white) |
| `banner`           | Show welcome banner          |

## Keyboard Shortcuts

- **Enter** — Execute command
- **↑ / ↓** — Navigate command history
- **Tab** — Autocomplete commands
- **Ctrl+L** — Clear terminal

## Deployment

### GitHub Pages

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to the branch root (`/`)
4. Done — your site is live

### Vercel / Netlify

Just connect the repo — no build configuration needed.

## Tech Stack

- HTML5 + CSS3 + Vanilla JavaScript
- Zero dependencies, zero build step
- Fira Code font (Google Fonts)

## File Structure

```
/portfolio
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── terminal.js
│   ├── commands.js
│   ├── data.js
│   └── utils.js
├── assets/
│   └── resume.pdf
└── README.md
```
