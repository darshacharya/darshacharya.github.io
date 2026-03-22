class Terminal {
  constructor(containerEl, promptText) {
    this.container = containerEl;
    this.promptText = promptText || "sudarshan@portfolio:~$ ";
    this.history = [];
    this.historyIndex = -1;
    this.commandHandler = null;
    this.typewriterSpeed = 8;
    this.isTyping = false;
    this.typewriterQueue = [];
    this.registeredCommands = [];

    this._build();
    this._bindEvents();
  }

  _build() {
    this.output = this.container.querySelector("#output");
    this.inputLine = this.container.querySelector("#input-line");
    this.promptEl = this.container.querySelector("#prompt");
    this.inputEl = this.container.querySelector("#command-input");
    this.cursorEl = this.container.querySelector("#cursor");
    this.mirrorEl = this.container.querySelector("#input-mirror");

    this.promptEl.textContent = this.promptText;
    this.inputEl.setAttribute("aria-label", "Terminal command input");
  }

  _bindEvents() {
    this.inputEl.addEventListener("input", () => this._syncCursor());
    this.inputEl.addEventListener("keydown", (e) => this._handleKey(e));

    this.container.addEventListener("click", (e) => {
      if (!e.target.closest("a")) this.focus();
    });

    this.container.addEventListener("touchend", (e) => {
      if (!e.target.closest("a")) {
        setTimeout(() => this.focus(), 50);
      }
    });
  }

  focus() {
    this.inputEl.focus({ preventScroll: true });
  }

  _syncCursor() {
    const text = this.inputEl.value;
    this.mirrorEl.textContent = text;
    const pos = this.inputEl.selectionStart;
    const textBeforeCursor = text.substring(0, pos);
    const measure = document.createElement("span");
    measure.className = "input-measure";
    measure.textContent = textBeforeCursor;
    this.mirrorEl.parentElement.appendChild(measure);
    this.cursorEl.style.left = measure.offsetWidth + "px";
    measure.remove();
  }

  _handleKey(e) {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this._execute();
        break;
      case "ArrowUp":
        e.preventDefault();
        this._historyNav(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this._historyNav(1);
        break;
      case "Tab":
        e.preventDefault();
        this._autocomplete();
        break;
      case "l":
        if (e.ctrlKey) {
          e.preventDefault();
          this._executeDirect("clear");
        }
        break;
    }
  }

  _execute() {
    const raw = this.inputEl.value;
    const trimmed = raw.trim();

    this._appendPromptLine(raw);
    this.inputEl.value = "";
    this._syncCursor();

    if (trimmed) {
      this.history.push(trimmed);
      this.historyIndex = this.history.length;
    }

    if (trimmed && this.commandHandler) {
      const result = this.commandHandler(trimmed);
      if (result !== undefined && result !== null && result !== "") {
        this._typewrite(result);
      }
    }

    this._scrollToBottom();
  }

  _executeDirect(cmd) {
    if (this.commandHandler) {
      this.commandHandler(cmd);
    }
  }

  _historyNav(dir) {
    if (this.history.length === 0) return;

    this.historyIndex += dir;
    if (this.historyIndex < 0) this.historyIndex = 0;
    if (this.historyIndex >= this.history.length) {
      this.historyIndex = this.history.length;
      this.inputEl.value = "";
    } else {
      this.inputEl.value = this.history[this.historyIndex];
    }
    this._syncCursor();
  }

  _autocomplete() {
    const input = this.inputEl.value.toLowerCase();
    if (!input) return;

    const matches = this.registeredCommands.filter((c) => c.startsWith(input));
    if (matches.length === 1) {
      this.inputEl.value = matches[0];
      this._syncCursor();
    } else if (matches.length > 1) {
      this._appendOutput(
        Utils.colorize(matches.join("  "), "var(--text-secondary)")
      );
    }
  }

  _appendPromptLine(text) {
    const line = document.createElement("div");
    line.className = "output-line";
    line.innerHTML =
      `<span class="prompt-text">${Utils.escapeHtml(this.promptText)}</span>` +
      `<span>${Utils.escapeHtml(text)}</span>`;
    this.output.appendChild(line);
  }

  _appendOutput(html) {
    const block = document.createElement("div");
    block.className = "output-block";
    block.innerHTML = html;
    this.output.appendChild(block);
    this._scrollToBottom();
  }

  _typewrite(html) {
    if (Utils.detectReducedMotion() || this._isMobile()) {
      this._appendOutput(html);
      return;
    }

    this.typewriterQueue.push(html);
    if (!this.isTyping) this._processQueue();
  }

  _processQueue() {
    if (this.typewriterQueue.length === 0) {
      this.isTyping = false;
      return;
    }

    this.isTyping = true;
    const html = this.typewriterQueue.shift();

    const block = document.createElement("div");
    block.className = "output-block";
    this.output.appendChild(block);

    const temp = document.createElement("div");
    temp.innerHTML = html;
    const fullText = temp.textContent || temp.innerText;

    let charIndex = 0;
    const tick = () => {
      if (charIndex < fullText.length) {
        const charsPerTick = Math.min(3, fullText.length - charIndex);
        charIndex += charsPerTick;
        block.innerHTML = html.substring(
          0,
          this._htmlIndexFromTextIndex(html, charIndex)
        );
        this._scrollToBottom();
        requestAnimationFrame(tick);
      } else {
        block.innerHTML = html;
        this._scrollToBottom();
        this._processQueue();
      }
    };
    requestAnimationFrame(tick);
  }

  _htmlIndexFromTextIndex(html, textIdx) {
    let textCount = 0;
    let inTag = false;
    for (let i = 0; i < html.length; i++) {
      if (html[i] === "<") inTag = true;
      else if (html[i] === ">") inTag = false;
      else if (!inTag) {
        textCount++;
        if (textCount >= textIdx) return i + 1;
      }
    }
    return html.length;
  }

  _scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  _isMobile() {
    return window.innerWidth <= 600;
  }

  setCommandHandler(fn) {
    this.commandHandler = fn;
  }

  setRegisteredCommands(cmds) {
    this.registeredCommands = cmds;
  }

  clear() {
    this.output.innerHTML = "";
  }

  print(html) {
    this._appendOutput(html);
  }

  printImmediate(html) {
    this._appendOutput(html);
  }
}
