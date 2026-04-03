const TextParticles = (() => {
  const WORDS = [
    "AI", "Python", "ML", "IoT", "Data", "React", "TensorFlow",
    "NLP", "Docker", "AWS", "SQL", "Flask", "ESP32", "Git",
    "Pandas", "NumPy", "Kubernetes", "Streamlit", "Vision",
    "Edge", "Deep Learning", "RAG", "LLM", "Groq", "API",
    "Redis", "Django", "Whisper", "YOLO", "Analytics",
    "Pipeline", "Cloud", "Embedded", "Sensor", "Model",
    "Neural", "Cluster", "Deploy", "Train", "Predict",
    "if(true)", "=> {}", "async", "import", "const",
    "0x3F", "#!/bin", "sudo", "npm run", "git push",
    "for i in", "class", "def main():", "return",
    "print()", "lambda", "yield", "try:", "catch",
    "Backend", "Microservices", "Realtime", "Scalable",
    "Distributed", "APIs", "Pipelines", "Automation",
    "Monitoring", "Inference", "Sensors", "ESP8266",
    "Arduino", "RaspberryPi", "OpenCV", "MySQL",
    "Agents", "Embeddings", "Vectors", "Search",
    "Indexing", "KDTree", "Geospatial", "Maps",
    "Concurrency", "Threads", "Memory", "Latency",
    "Throughput", "Optimization", "Debugging", "Logging",
    "Tracing", "Caching", "ETL", "Streaming", "Batch",
    "Events", "Queue", "Auth", "JSON", "Linux", "CLI",
    "Prototyping", "MVP", "Integration",
  ];

  let canvas, ctx;
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let width, height;
  let animId;
  let active = false;

  const CONFIG = {
    count: 160,
    repelRadius: 150,
    repelStrength: 6,
    springBack: 0.025,
    friction: 0.9,
    minFontSize: 10,
    maxFontSize: 16,
    minOpacity: 0.03,
    maxOpacity: 0.12,
    hoverOpacityBoost: 0.3,
    fontFamily: '"Fira Code", monospace',
    color: [57, 255, 20],
  };

  function init(canvasEl) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    canvas = canvasEl;
    ctx = canvas.getContext("2d");

    resize();
    spawn();

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    active = true;
    loop();
  }

  function spawn() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      const fontSize = CONFIG.minFontSize + Math.random() * (CONFIG.maxFontSize - CONFIG.minFontSize);
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        x, y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        fontSize,
        baseOpacity: CONFIG.minOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity),
        opacity: 0,
        rotation: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth < 768) {
        destroy();
        return;
      }
      resize();
      spawn();
    }, 200);
  }

  function onMouse(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function loop() {
    if (!active) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distSq = dx * dx + dy * dy;
      const repelRadSq = CONFIG.repelRadius * CONFIG.repelRadius;

      if (distSq < repelRadSq && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (CONFIG.repelRadius - dist) / CONFIG.repelRadius;
        const ax = (dx / dist) * force * CONFIG.repelStrength;
        const ay = (dy / dist) * force * CONFIG.repelStrength;
        p.vx -= ax;
        p.vy -= ay;
        p.opacity += (CONFIG.hoverOpacityBoost - p.opacity) * 0.1;
      } else {
        p.opacity += (p.baseOpacity - p.opacity) * 0.05;
      }

      p.vx += (p.originX - p.x) * CONFIG.springBack;
      p.vy += (p.originY - p.y) * CONFIG.springBack;
      p.vx *= CONFIG.friction;
      p.vy *= CONFIG.friction;
      p.x += p.vx;
      p.y += p.vy;

      const [r, g, b] = CONFIG.color;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.fontSize}px ${CONFIG.fontFamily}`;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillText(p.text, 0, 0);
      ctx.restore();
    }

    animId = requestAnimationFrame(loop);
  }

  function destroy() {
    active = false;
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("mousemove", onMouse);
    particles = [];
  }

  return { init, destroy };
})();
