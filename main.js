document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const text = "Hi, I'm Soham Tilekar.";
  const typingText = document.getElementById("typing-text");
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();

  // Scroll Progress and Fade Indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const progressBar = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    // Progress Bar
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    // Fade Scroll Indicator
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.classList.add("fade-out");
      } else {
        scrollIndicator.classList.remove("fade-out");
      }
    }
  });

  // Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll("section, .glass-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
  });

  // Nav Background on Scroll
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.style.background = "rgba(10, 15, 29, 0.95)";
      nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
    } else {
      nav.style.background = "rgba(10, 15, 29, 0.8)";
      nav.style.boxShadow = "none";
    }
  });

  // Nav links with fixed-header offset
  const navHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--nav-height",
      ),
      10,
    ) || 70;
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const sectionId = link.getAttribute("href");
      const section = document.querySelector(sectionId);
      if (!section) return;

      event.preventDefault();
      const offset =
        section.getBoundingClientRect().top + window.scrollY - navHeight - 14;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  });

  // Card hover depth effect
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -3;
      const rotateY = (x / rect.width - 0.5) * 3;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "none";
    });
  });

  setupGigglyOrbit();
  setupGigglyTransformShowcase();
  setupTilekarEmulator();
  setupSS32Schematic();
});

function setupSS32Schematic() {
  const container = document.querySelector(".ss32-schematic-container");
  const svg = document.getElementById("ss32-wires-svg");
  const components = document.querySelectorAll(".ss32-comp-v2");
  if (!container || !svg) return;

  const getPortPos = (comp, portType) => {
    const port = comp.querySelector(`.p-${portType}`);
    const rect = (port || comp).getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    return {
      x: rect.left - contRect.left + rect.width / 2,
      y: rect.top - contRect.top + rect.height / 2,
    };
  };

  const getCompRects = () => Array.from(components).map(c => {
    const r = c.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    return {
      left: r.left - cr.left - 5,
      top: r.top - cr.top - 5,
      right: r.right - cr.left + 5,
      bottom: r.bottom - cr.top + 5,
      type: Array.from(c.classList).find(cls => ["pc", "mmu", "alu", "cu", "ram", "reg", "bus", "vga", "intr"].includes(cls))
    };
  });

  const createWire = (sComp, eComp, sPort, ePort, type, id) => {
    const start = getPortPos(sComp, sPort);
    const end = getPortPos(eComp, ePort);
    const rects = getCompRects();

    // Multi-segment Manhattan routing with component avoidance
    let pathD = `M ${start.x} ${start.y}`;
    const midY = (start.y + end.y) / 2;
    
    // Check if direct Z-path is blocked
    const isPathBlocked = (y1, y2, x1, x2) => rects.some(r => {
      const srcType = Array.from(sComp.classList).find(cls => ["pc", "mmu", "alu", "cu", "ram", "reg", "bus", "vga", "intr"].includes(cls));
      const destType = Array.from(eComp.classList).find(cls => ["pc", "mmu", "alu", "cu", "ram", "reg", "bus", "vga", "intr"].includes(cls));
      if (r.type === srcType || r.type === destType) return false;
      
      const xOverlap = (Math.min(x1, x2) < r.right && Math.max(x1, x2) > r.left);
      const yOverlap = (Math.min(y1, y2) < r.bottom && Math.max(y1, y2) > r.top);
      return xOverlap && yOverlap;
    });

    if (isPathBlocked(start.y, midY, start.x, start.x) || isPathBlocked(midY, midY, start.x, end.x) || isPathBlocked(midY, end.y, end.x, end.x)) {
      // Try alternative routing (Step around)
      const offset = start.y < end.y ? -45 : 45;
      const bypassY = Math.min(start.y, end.y) + offset;
      pathD += ` L ${start.x} ${bypassY} L ${end.x} ${bypassY} L ${end.x} ${end.y}`;
    } else {
      pathD += ` L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
    }

    const base = document.createElementNS("http://www.w3.org/2000/svg", "path");
    base.setAttribute("d", pathD);
    base.setAttribute("class", `wire-base wire-${type}`);
    svg.appendChild(base);

    const pulse = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pulse.setAttribute("d", pathD);
    pulse.setAttribute("class", `wire-pulse pulse-${type} wire-id-${id}`);
    pulse.style.display = "none";
    svg.appendChild(pulse);
  };

  const connections = [
    { from: "pc", to: "bus", type: "addr", sP: "bottom-2", eP: "top-2" },
    { from: "bus", to: "mmu", type: "addr", sP: "top", eP: "bottom" },
    { from: "mmu", to: "ram", type: "addr", sP: "right", eP: "left" },
    { from: "ram", to: "bus", type: "data", sP: "bottom-2", eP: "top" },
    { from: "bus", to: "cu", type: "ctrl", sP: "bottom-2", eP: "top" },
    { from: "cu", to: "reg", type: "ctrl", sP: "right", eP: "left" },
    { from: "cu", to: "alu", type: "ctrl", sP: "right", eP: "left" },
    { from: "reg", to: "alu", type: "data", sP: "right", eP: "bottom" },
    { from: "alu", to: "reg", type: "data", sP: "bottom", eP: "right" },
    { from: "reg", to: "bus", type: "data", sP: "top", eP: "bottom" },
    { from: "bus", to: "vga", type: "data", sP: "right", eP: "left" },
    { from: "intr", to: "cu", type: "ctrl", sP: "right", eP: "left" },
    { from: "bus", to: "ram", type: "data", sP: "top-2", eP: "bottom" },
  ];

  const updateWires = () => {
    svg.innerHTML = "";
    const compMap = {};
    components.forEach((c) => {
      const type = Array.from(c.classList).find((cls) => ["pc", "mmu", "alu", "cu", "ram", "reg", "bus", "vga", "intr"].includes(cls));
      compMap[type] = c;
    });

    connections.forEach((conn) => {
      const s = compMap[conn.from];
      const e = compMap[conn.to];
      if (s && e) {
        createWire(s, e, conn.sP, conn.eP, conn.type, `${conn.from}-${conn.to}`);
      }
    });
  };

  updateWires();
  window.addEventListener("resize", updateWires);

  const flashWire = (from, to, duration = 800) => {
    const wire = svg.querySelector(`.wire-id-${from}-${to}`);
    if (wire) {
      wire.style.display = "block";
      setTimeout(() => { wire.style.display = "none"; }, duration);
    }
  };

  const activateNode = (type, duration = 600) => {
    const comp = container.querySelector(`.${type}`);
    if (comp) {
      comp.style.borderColor = "#00ff41";
      comp.style.boxShadow = "0 0 20px rgba(0, 255, 65, 0.4)";
      if (type === "vga") comp.classList.add("active");
      setTimeout(() => {
        comp.style.borderColor = "";
        comp.style.boxShadow = "";
        if (type === "vga") comp.classList.remove("active");
      }, duration);
    }
  };

  const variants = [
    () => { // Variant 1: Full Fetch Cycle
      activateNode("pc"); flashWire("pc", "bus");
      setTimeout(() => {
        activateNode("bus"); flashWire("bus", "mmu");
        setTimeout(() => {
          activateNode("mmu"); flashWire("mmu", "ram");
          setTimeout(() => {
            activateNode("ram"); flashWire("ram", "bus");
            setTimeout(() => { activateNode("cu"); flashWire("bus", "cu"); }, 400);
          }, 400);
        }, 400);
      }, 400);
    },
    () => { // Variant 2: Control & Execution
      activateNode("cu"); flashWire("cu", "reg");
      flashWire("cu", "alu");
      setTimeout(() => {
        activateNode("reg"); activateNode("alu");
        flashWire("reg", "alu");
        setTimeout(() => {
          activateNode("alu"); flashWire("alu", "reg");
          setTimeout(() => { activateNode("reg"); flashWire("reg", "bus"); }, 400);
        }, 400);
      }, 400);
    },
    () => { // Variant 3: Peripheral / VGA Update
      activateNode("reg"); flashWire("reg", "bus");
      setTimeout(() => {
        activateNode("bus"); flashWire("bus", "vga");
        activateNode("vga");
      }, 400);
    },
    () => { // Variant 4: Interrupt Vectoring
      activateNode("intr"); flashWire("intr", "cu");
      setTimeout(() => {
        activateNode("cu"); flashWire("bus", "cu");
        setTimeout(() => {
          activateNode("bus"); flashWire("bus", "pc");
          activateNode("pc");
        }, 400);
      }, 400);
    }
  ];

  let currentVariant = 0;
  const runPipeline = () => {
    if (!document.hidden) {
      variants[currentVariant]();
      currentVariant = (currentVariant + 1) % variants.length;
    }
    setTimeout(runPipeline, 2800);
  };

  setTimeout(runPipeline, 1000);

  components.forEach((comp) => {
    comp.addEventListener("click", (e) => {
      e.stopPropagation();
      const type = Array.from(comp.classList).find(cls => ["pc", "mmu", "alu", "cu", "ram", "reg", "bus", "vga", "intr"].includes(cls));
      activateNode(type, 1200);
      connections.filter(c => c.from === type).forEach(c => flashWire(c.from, c.to, 1500));
    });
  });
}

function setupGigglyOrbit() {
  const card = document.querySelector(".theme-giggly");
  if (!card) return;

  const snippets = [
    {
      stage: "gc",
      text: "GC   def add(a: int, b: int) -> int { return a + b; };",
    },
    {
      stage: "gc",
      text: "GC   def subtract(a: float, b: float) -> float { ... };",
    },
    {
      stage: "gc",
      text: "GC   @generic(T: Any) struct ListNode { value: T; };",
    },
    {
      stage: "gc",
      text: "GC   struct Rectangle { width: int; height: int; };",
    },
    { stage: "gc", text: "GC   arr: int[] = array(int, 5);" },
    {
      stage: "gc",
      text: "GC   while (counter < 5) { counter = counter + 1; };",
    },
    { stage: "ir", text: "IR   define i32 @add(i32 %a, i32 %b) {" },
    { stage: "ir", text: "IR   %sum = add nsw i32 %a, %b" },
    { stage: "ir", text: "IR   ret i32 %sum" },
    {
      stage: "ir",
      text: "IR   %idx = getelementptr inbounds i32, ptr %arr, i64 %i",
    },
    { stage: "ir", text: "IR   br i1 %cmp, label %loop.body, label %loop.end" },
    { stage: "bin", text: "BIN  55 48 89 E5 48 83 EC 10" },
    { stage: "bin", text: "BIN  01 F7 89 45 FC" },
    { stage: "bin", text: "BIN  83 7D FC 05 7C F1" },
    { stage: "bin", text: "BIN  5D C3" },
  ];

  const colorClassByStage = { gc: "c1", ir: "c2", bin: "c3" };
  const fragments = snippets.map((snippet, index) => {
    const frag = document.createElement("span");
    frag.className = `giggly-frag ${colorClassByStage[snippet.stage] || "c4"}`;
    frag.textContent = snippet.text;
    frag.dataset.stage = snippet.stage;
    frag.dataset.index = String(index);
    frag.dataset.origStage = snippet.stage;
    frag.style.opacity = "0";
    // Track position state for smooth movement
    frag.fragmentState = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    };
    card.appendChild(frag);
    return frag;
  });

  const animateFragments = () => {
    requestAnimationFrame(() => {
      const cardBounds = card.getBoundingClientRect();
      if (cardBounds.width < 100 || cardBounds.height < 100) {
        setTimeout(animateFragments, 300);
        return;
      }

      fragments.forEach((frag, idx) => {
        animateGigglyFragment(frag, card, idx);
      });
    });
  };

  animateFragments();
  window.addEventListener("resize", animateFragments);
}

function animateGigglyFragment(fragment, card, index) {
  const bounds = card.getBoundingClientRect();
  const width = Math.max(bounds.width, 1);
  const height = Math.max(bounds.height, 1);

  const fragSeed = index * 73;
  const state = fragment.fragmentState;

  const speedMultiplier = 0.2 + Math.sin(fragSeed) * 0.08;
  const verticalBias = (Math.sin(fragSeed * 0.7) * 0.5 + 0.5) * height;
  const horizontalBias = Math.sin(fragSeed * 1.3) < 0 ? -0.35 : 0.15;

  const spawnDuration = 3500;
  const gcDuration = 12000 * speedMultiplier;
  const irDuration = 10000 * speedMultiplier;
  const binDuration = 10000 * speedMultiplier;
  const exitDuration = 6000 * speedMultiplier;
  const despawnDuration = 3500;

  const fullCycle =
    spawnDuration +
    gcDuration +
    irDuration +
    binDuration +
    exitDuration +
    despawnDuration +
    4000;
  const elapsed = (Date.now() - index * 800) % fullCycle;

  let phase = "rest";
  let stagePhase = "gc";
  let phaseProgress = 0;
  let opacity = 0;

  // Determine current phase and stage
  if (elapsed < spawnDuration) {
    phase = "spawn";
    phaseProgress = elapsed / spawnDuration;
    opacity = phaseProgress;
    stagePhase = "gc";
  } else if (elapsed < spawnDuration + gcDuration) {
    phase = "gc";
    phaseProgress = (elapsed - spawnDuration) / gcDuration;
    opacity = 1;
    stagePhase = "gc";
  } else if (elapsed < spawnDuration + gcDuration + irDuration) {
    phase = "ir";
    phaseProgress = (elapsed - spawnDuration - gcDuration) / irDuration;
    opacity = Math.max(0.3, 1 - phaseProgress * 0.2); // Slight fade during transition
    stagePhase = "ir";
  } else if (elapsed < spawnDuration + gcDuration + irDuration + binDuration) {
    phase = "bin";
    phaseProgress =
      (elapsed - spawnDuration - gcDuration - irDuration) / binDuration;
    opacity = Math.max(0.3, 1 - phaseProgress * 0.2); // Slight fade during transition
    stagePhase = "bin";
  } else if (
    elapsed <
    spawnDuration + gcDuration + irDuration + binDuration + exitDuration
  ) {
    phase = "exit";
    phaseProgress =
      (elapsed - spawnDuration - gcDuration - irDuration - binDuration) /
      exitDuration;
    opacity = 1;
    stagePhase = "bin";
  } else if (elapsed < fullCycle - 4000) {
    phase = "despawn";
    phaseProgress =
      (elapsed -
        spawnDuration -
        gcDuration -
        irDuration -
        binDuration -
        exitDuration) /
      despawnDuration;
    opacity = 1 - phaseProgress;
    stagePhase = "bin";
  } else {
    phase = "rest";
    opacity = 0;
  }

  // Gradual text transition - blend between stages
  const gcSnippets = [
    "GC   def add(a: int, b: int) -> int { return a + b; };",
    "GC   def subtract(a: float, b: float) -> float { ... };",
    "GC   @generic(T: Any) struct ListNode { value: T; };",
    "GC   struct Rectangle { width: int; height: int; };",
    "GC   arr: int[] = array(int, 5);",
    "GC   while (counter < 5) { counter = counter + 1; };",
  ];
  const irSnippets = [
    "IR   define i32 @add(i32 %a, i32 %b) {",
    "IR   %sum = add nsw i32 %a, %b",
    "IR   ret i32 %sum",
    "IR   %idx = getelementptr inbounds i32, ptr %arr, i64 %i",
    "IR   br i1 %cmp, label %loop.body, label %loop.end",
    "IR   define void @init(ptr %self) {",
  ];
  const binSnippets = [
    "BIN  55 48 89 E5 48 83 EC 10",
    "BIN  01 F7 89 45 FC",
    "BIN  83 7D FC 05 7C F1",
    "BIN  5D C3",
    "BIN  48 89 E5 89 37",
    "BIN  89 45 FC 5D C3",
  ];

  // Smooth transition: show current stage, gradually transition to next
  let displayText = "";
  if (stagePhase === "gc" || (stagePhase === "ir" && phaseProgress < 0.1)) {
    displayText = gcSnippets[index % gcSnippets.length];
  } else if (
    stagePhase === "ir" ||
    (stagePhase === "bin" && phaseProgress < 0.1)
  ) {
    displayText = irSnippets[index % irSnippets.length];
  } else {
    displayText = binSnippets[index % binSnippets.length];
  }
  fragment.textContent = displayText;

  if (phase === "rest") {
    state.x = 0;
    state.y = 0;
    state.vx = 0;
    state.vy = 0;
  } else {
    // Use noise for direction, not position
    const t = (elapsed / (fullCycle - 4000)) * Math.PI * 2;

    const dirX = Math.sin(t + fragSeed);
    const dirY = Math.cos(t * 0.7 + fragSeed * 1.5);

    let targetVx = 0,
      targetVy = 0;
    let targetX = 0,
      targetY = verticalBias;

    if (phase === "spawn" || phase === "gc") {
      // Wander inside card
      targetVx = dirX * 30;
      targetVy = dirY * 25;
      targetX = (0.35 + horizontalBias * 0.2) * width;
    } else if (phase === "ir") {
      // Move left
      targetVx = dirX * 25 - 15;
      targetVy = dirY * 30;
      targetX = (0.25 + horizontalBias * 0.3) * width;
    } else if (phase === "bin") {
      // Move further left
      targetVx = dirX * 20 - 25;
      targetVy = dirY * 35;
      targetX = (0.15 + horizontalBias * 0.4) * width;
    } else if (phase === "exit") {
      // Exit left
      targetVx = dirX * 30 - 50 + horizontalBias * 80;
      targetVy = dirY * 40;
      targetX = -150;
    } else if (phase === "despawn") {
      // Continue exiting
      targetVx = dirX * 40 - 60 + horizontalBias * 100;
      targetVy = dirY * 50;
      targetX = -220;
    }

    // Smooth velocity transition (damping)
    state.vx += (targetVx - state.vx) * 0.1;
    state.vy += (targetVy - state.vy) * 0.1;

    // Update position with velocity
    state.x += state.vx * 0.016; // 16ms per frame
    state.y += state.vy * 0.016;

    // Apply target attraction
    const attractionStrength =
      phase === "exit" || phase === "despawn" ? 0.05 : 0.08;
    state.x += (targetX - state.x) * attractionStrength;
    state.y += (targetY - state.y) * attractionStrength;
  }

  fragment.style.left = `${state.x}px`;
  fragment.style.top = `${state.y}px`;
  fragment.style.position = "absolute";
  fragment.style.opacity = opacity;

  requestAnimationFrame(() => animateGigglyFragment(fragment, card, index));
}

function highlightCode(code, stage) {
  if (stage === "gc") {
    return code
      .replace(
        /\b(def|struct|@generic|while|return|int|float|void|Any)\b/g,
        '<span class="kw">$1</span>',
      )
      .replace(/\b([A-Z]\w*)\b/g, '<span class="type">$1</span>')
      .replace(/(\d+)/g, '<span class="num">$1</span>');
  } else if (stage === "ir") {
    return code
      .replace(
        /\b(define|void|type|entry|label|loop|body|exit|i32|ptr|load|store|add|mul|ret|br|icmp|getelementptr|nsw|slt)\b/g,
        '<span class="kw">$1</span>',
      )
      .replace(/(@\w+|%\w+)/g, '<span class="type">$1</span>')
      .replace(/(\d+)/g, '<span class="num">$1</span>');
  } else if (stage === "bytes") {
    return code.replace(/([0-9A-F]{2})/g, '<span class="num">$1</span>');
  }
  return code;
}

function setupGigglyTransformShowcase() {
  const showcase = document.getElementById("giggly-transform-showcase");
  const exampleEl = document.getElementById("giggly-transform-example");
  const stageEl = document.getElementById("giggly-transform-stage");
  const codeEl = document.getElementById("giggly-transform-code");
  if (!showcase || !exampleEl || !stageEl || !codeEl) return;

  const examples = [
    {
      name: "Example 1: add() function",
      gc: "def add(a: int, b: int) -> int { return a + b; };",
      ir: "define i32 @add(i32 %a, i32 %b) {\nentry:\n  %sum = add nsw i32 %a, %b\n  ret i32 %sum\n}",
      bytes: "55 48 89 E5 01 F7 5D C3",
    },
    {
      name: "Example 2: struct method",
      gc: "struct Rectangle {\n  width: int;\n  height: int;\n  def area(self: Rectangle) -> int { return self.width * self.height; };\n};",
      ir: "define i32 @Rectangle_area(ptr %self) {\nentry:\n  %w = load i32, ptr %self.width\n  %h = load i32, ptr %self.height\n  %area = mul nsw i32 %w, %h\n  ret i32 %area\n}",
      bytes: "55 48 89 E5 8B 07 0F AF 47 04 5D C3",
    },
    {
      name: "Example 3: generic node init",
      gc: "@generic(T: Any)\nstruct ListNode {\n  value: T;\n  next: ListNode[T];\n};",
      ir: "%ListNode.i32 = type { i32, ptr }\ndefine void @ListNode_i32_init(ptr %self, i32 %v, ptr %next) {\nentry:\n  store i32 %v, ptr %self\n  %n = getelementptr %ListNode.i32, ptr %self, i32 0, i32 1\n  store ptr %next, ptr %n\n  ret void\n}",
      bytes: "55 48 89 E5 89 37 48 89 77 08 5D C3",
    },
    {
      name: "Example 4: loop condition",
      gc: "counter: int = 0;\nwhile (counter < 5) {\n  counter = counter + 1;\n};",
      ir: "br label %loop\nloop:\n  %c = load i32, ptr %counter\n  %cmp = icmp slt i32 %c, 5\n  br i1 %cmp, label %body, label %exit",
      bytes: "83 7D FC 05 7C 08 83 45 FC 01 EB F3",
    },
  ];

  const stages = [
    { key: "gc", label: "GigglyCode" },
    { key: "ir", label: "LLVM IR" },
    { key: "bytes", label: "Bytes" },
  ];

  let exampleIndex = 0;
  let stageIndex = 0;

  const render = () => {
    const currentExample = examples[exampleIndex];
    const currentStage = stages[stageIndex];
    exampleEl.textContent = currentExample.name;
    stageEl.textContent = currentStage.label;
    stageEl.dataset.stage = currentStage.key;

    const rawCode = currentExample[currentStage.key];
    const highlightedCode = highlightCode(rawCode, currentStage.key);
    codeEl.innerHTML = highlightedCode;
  };

  const tick = () => {
    showcase.classList.add("is-switching");
    setTimeout(() => {
      stageIndex += 1;
      if (stageIndex >= stages.length) {
        stageIndex = 0;
        exampleIndex = (exampleIndex + 1) % examples.length;
      }
      render();
      showcase.classList.remove("is-switching");
    }, 180);
  };

  render();
  setInterval(tick, 2500);
}

function setupTilekarEmulator() {
  const output = document.getElementById("tilekar-output");
  const input = document.getElementById("tilekar-input");
  const promptPath = document.getElementById("tilekar-prompt-path");
  const screen = document.querySelector("#tilekar-emulator .tilekar-screen");
  if (!output || !input || !promptPath || !screen) return;

  const bootSequence = [
    "TilekarOS booting...",
    "Mounted ata0m as /",
    "Launching /bin/init...",
    "Init process started.",
    "Spawning shell /bin/sh...",
    "TilekarOS Shell ready. Type 'help' for commands.",
  ];

  const fs = {
    type: "dir",
    children: {
      BIN: {
        type: "dir",
        children: {
          HELLO: {
            type: "file",
            content: "[ELF32] executable: HELLO",
          },
          SH: {
            type: "file",
            content: "[ELF32] executable: SH",
          },
        },
      },
      ETC: {
        type: "dir",
        children: {
          issue: {
            type: "file",
            content: "TilekarOS i386 monolithic-kernel #1",
          },
        },
      },
      HOME: {
        type: "dir",
        children: {
          soham: {
            type: "dir",
            children: {
              "notes.txt": {
                type: "file",
                content:
                  "TilekarOS: kernel + VFS + shell.\nNow with a web emulator view.",
              },
            },
          },
        },
      },
      MNT: { type: "dir", children: {} },
      TMP: { type: "dir", children: {} },
      USR: {
        type: "dir",
        children: {
          README: {
            type: "file",
            content: "Welcome to TilekarOS userspace.",
          },
        },
      },
      "hello.c": {
        type: "file",
        content:
          '#include <stdio.h>\nint main(){\n  printf("HELLO from TilekarOS\\n");\n  return 0;\n}',
      },
    },
  };

  let cwd = [];

  const appendLine = (line = "") => {
    output.textContent += `${line}\n`;
    screen.scrollTop = screen.scrollHeight;
  };

  const cwdText = () => (cwd.length ? `/${cwd.join("/")}` : "/");
  const promptText = () => `[${cwdText()}]`;

  const nodeAtPath = (parts) => {
    let node = fs;
    for (const part of parts) {
      if (node.type !== "dir" || !node.children[part]) return null;
      node = node.children[part];
    }
    return node;
  };

  const resolvePath = (rawPath = "") => {
    if (!rawPath || rawPath === ".") return [...cwd];
    const start = rawPath.startsWith("/") ? [] : [...cwd];
    const parts = rawPath.split("/").filter(Boolean);
    for (const part of parts) {
      if (part === ".") continue;
      if (part === "..") {
        start.pop();
      } else {
        start.push(part);
      }
    }
    return start;
  };

  const formatEntry = (name, node) =>
    node.type === "dir" ? `${name}/` : name;

  const refreshPrompt = () => {
    promptPath.textContent = promptText();
  };

  const runCommand = (cmd) => {
    const raw = cmd.trim();
    if (!raw) return;
    appendLine(`${promptText()} # ${raw}`);

    const [command, ...args] = raw.split(/\s+/);
    const normalized = command.toLowerCase();

    if (normalized === "clear") {
      output.textContent = "";
      return;
    }

    if (normalized === "help") {
      appendLine("Commands:");
      appendLine(
        "help, pwd, ls [path], cd [path], cat <file>, uname, ps, whoami, clear",
      );
      return;
    }

    if (normalized === "pwd") {
      appendLine(cwdText());
      return;
    }

    if (normalized === "ls") {
      const path = resolvePath(args[0]);
      const node = nodeAtPath(path);
      if (!node) {
        appendLine(`ls: cannot access '${args[0]}': No such file or directory`);
        return;
      }
      if (node.type !== "dir") {
        appendLine(formatEntry(path[path.length - 1], node));
        return;
      }
      appendLine(
        Object.entries(node.children)
          .map(([name, entry]) => formatEntry(name, entry))
          .join("  ") || "(empty)",
      );
      return;
    }

    if (normalized === "cd") {
      const targetRaw = args[0] || "/";
      const target = resolvePath(targetRaw);
      const node = nodeAtPath(target);
      if (!node) {
        appendLine(`cd: ${targetRaw}: No such file or directory`);
        return;
      }
      if (node.type !== "dir") {
        appendLine(`cd: ${targetRaw}: Not a directory`);
        return;
      }
      cwd = target;
      refreshPrompt();
      return;
    }

    if (normalized === "cat") {
      if (!args[0]) {
        appendLine("cat: missing operand");
        return;
      }
      const path = resolvePath(args[0]);
      const node = nodeAtPath(path);
      if (!node) {
        appendLine(`cat: ${args[0]}: No such file or directory`);
        return;
      }
      if (node.type !== "file") {
        appendLine(`cat: ${args[0]}: Is a directory`);
        return;
      }
      appendLine(node.content);
      return;
    }

    if (normalized === "uname") {
      appendLine("TilekarOS i386 monolithic-kernel #1");
      return;
    }

    if (normalized === "ps") {
      appendLine("PID 0 init");
      appendLine("PID 1 shell");
      appendLine("PID 2 kworker");
      return;
    }

    if (normalized === "whoami") {
      appendLine("root");
      return;
    }

    appendLine(`${normalized}: command not found`);
  };

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    runCommand(input.value);
    input.value = "";
  });

  document
    .getElementById("tilekar-emulator")
    .addEventListener("click", () => input.focus());

  refreshPrompt();
  let bootIndex = 0;
  const runBoot = () => {
    if (bootIndex >= bootSequence.length) return;
    appendLine(bootSequence[bootIndex]);
    bootIndex += 1;
    setTimeout(runBoot, 300);
  };
  runBoot();
}
