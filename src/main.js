export function initPortfolio() {
  // Typing Effect
  const text = "Hi, I'm Soham Tilekar.";
  const typingText = document.getElementById("typing-text");
  let i = 0;

  function typeWriter() {
    if (i < text.length && typingText) {
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  if (typingText) typeWriter();

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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          // Faster, smoother reveal
          entry.target.style.transition =
            "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
        }
      });
    },
    { threshold: 0.05 },
  ); // More aggressive threshold

  document.querySelectorAll("section, .glass-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(15px)"; // Less distance to travel
    observer.observe(el);
  });

  // Nav links with fixed-header offset
  const navHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--nav-height",
      ),
      10,
    ) || 70;

  // Scroll Spy: Update URL hash on scroll
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null,
    rootMargin: `-${navHeight + 20}px 0px -70% 0px`,
    threshold: 0,
  };

  const observerSpy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (id) {
          history.replaceState(null, null, `#${id}`);
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observerSpy.observe(section));

  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      // Fix: Skip React Router hash links (like #/resumes or #/about)
      if (href.startsWith("#/")) return;

      const section = document.querySelector(href);
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

  // Skill click to project scroll
  document.querySelectorAll(".clickable-skill").forEach((skill) => {
    skill.addEventListener("click", () => {
      const projectId = skill.getAttribute("data-project");
      const projectCard = document.getElementById(projectId);
      if (!projectCard) return;

      // If project is hidden (Friday/Vidiopy), show them first
      if (window.getComputedStyle(projectCard).display === "none") {
        const showMoreBtn = document.getElementById("show-more-projects");
        if (showMoreBtn) showMoreBtn.click();
      }

      const offset =
        projectCard.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        30;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      // Highlight the card briefly
      projectCard.style.borderColor = "var(--accent-primary)";
      projectCard.style.boxShadow = "0 0 30px rgba(129, 140, 248, 0.4)";
      setTimeout(() => {
        projectCard.style.borderColor = "";
        projectCard.style.boxShadow = "";
      }, 2000);
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

  // Show more projects
  const showMoreBtn = document.getElementById("show-more-projects");
  const hiddenProjects = document.querySelectorAll(".hidden-project");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      hiddenProjects.forEach((project) => {
        project.style.display = "flex";
      });
      showMoreBtn.style.display = "none";
    });
  }

  // Modal Logic
  let scale = 1;
  let isDragging = false;
  let startX,
    startY,
    translateX = 0,
    translateY = 0;

  const modalImg = document.getElementById("modalImg");
  const modalViewer = document.querySelector(".modal-viewer");

  window.openModal = (imgSrc) => {
    const modal = document.getElementById("imageModal");
    if (!modal) return;
    modal.style.display = "block";
    if (modalImg) modalImg.src = imgSrc;

    // Reset transforms
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform(false);
  };

  window.closeModal = () => {
    const modal = document.getElementById("imageModal");
    if (modal) modal.style.display = "none";
  };

  function updateTransform(smooth = true) {
    if (!modalImg) return;
    if (smooth) {
      modalImg.style.transition = "transform 0.2s ease-out";
    } else {
      modalImg.style.transition = "none";
    }
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  window.zoomIn = () => {
    scale += 0.2;
    updateTransform();
  };

  window.zoomOut = () => {
    scale = Math.max(0.2, scale - 0.2); // allow zooming out more
    updateTransform();
  };

  // Keyboard controls
  const keyHandler = (event) => {
    const modal = document.getElementById("imageModal");
    if (modal && modal.style.display === "block") {
      if (event.key === "Escape") window.closeModal();
      if (event.key === "+" || event.key === "=") window.zoomIn();
      if (event.key === "-" || event.key === "_") window.zoomOut();
    }
  };
  document.addEventListener("keydown", keyHandler);

  // Mouse wheel/Touchpad zoom
  if (modalViewer) {
    modalViewer.addEventListener(
      "wheel",
      (event) => {
        const modal = document.getElementById("imageModal");
        if (modal && modal.style.display === "block") {
          event.preventDefault();
          if (event.ctrlKey || event.metaKey) {
            // Zoom
            const zoomSensitivity = 0.005;
            const delta = -event.deltaY * zoomSensitivity;
            scale = Math.max(0.2, scale + delta);
            updateTransform(false); // instant for wheel
          } else {
            // Pan
            translateX -= event.deltaX;
            translateY -= event.deltaY;
            updateTransform(false);
          }
        }
      },
      { passive: false },
    );
  }

  // Drag to pan
  if (modalImg) {
    modalImg.addEventListener("mousedown", (e) => {
      e.preventDefault(); // prevent default image drag
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      modalImg.style.cursor = "grabbing";
    });
  }

  const moveHandler = (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform(false);
  };
  window.addEventListener("mousemove", moveHandler);

  const upHandler = () => {
    isDragging = false;
    if (modalImg) modalImg.style.cursor = "grab";
  };
  window.addEventListener("mouseup", upHandler);

  window.addEventListener("mouseleave", upHandler);

  setupGigglyOrbit();
  setupGigglyTransformShowcase();
  setupTilekarEmulator();
  setupSS32Schematic();
  setupBerusParticles();
  fetchProjectStats();

  function setupBerusParticles() {
    const card = document.querySelector(".theme-berus");
    if (!card) return;

    const particles = [
      "<div>",
      "<span>",
      "<p>",
      "render()",
      "layout()",
      "css_parser",
      "DOMTree",
      "StyleSheet",
      "BoxModel",
      "text_wrap",
      "rodio::play",
      "rustc",
      "cargo",
      "egui",
      "html5",
      "flexbox",
      "border-radius",
    ];

    const createParticle = () => {
      const particle = document.createElement("span");
      particle.className = "berus-dom-particle";
      particle.textContent =
        particles[Math.floor(Math.random() * particles.length)];

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;

      const duration = 10000 + Math.random() * 20000;
      const driftX = (Math.random() - 0.5) * 100;
      const driftY = (Math.random() - 0.5) * 100;

      card.appendChild(particle);

      particle.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)", opacity: 0 },
          { opacity: 0.15, offset: 0.2 },
          { opacity: 0.15, offset: 0.8 },
          {
            transform: `translate(${driftX}px, ${driftY}px) rotate(${Math.random() * 20}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: duration,
          easing: "ease-in-out",
        },
      ).onfinish = () => {
        particle.remove();
        createParticle();
      };
    };

    for (let i = 0; i < 12; i++) {
      setTimeout(createParticle, Math.random() * 5000);
    }
  }

  async function fetchProjectStats() {
    const projects = [
      {
        name: "Wardrobe AI",
        repo: "SohamTilekar/Wardrobe-AI",
        el: document.querySelector(".theme-wardrobe"),
      },
      {
        name: "GigglyCode",
        repo: "SohamTilekar/GigglyCode",
        el: document.querySelector(".theme-giggly"),
      },
      {
        name: "TilekarOS",
        repo: "SohamTilekar/TilekarOS",
        el: document.querySelector(".theme-tilekar"),
      },
      {
        name: "Berus",
        repo: "SohamTilekar/berus",
        el: document.querySelector(".theme-berus"),
      },
      {
        name: "SS32",
        repo: "SohamTilekar/SS32",
        el: document.querySelector(".theme-ss32"),
      },
      {
        name: "Friday v2",
        repo: "SohamTilekar/fridayv2",
        el: document.querySelector(".theme-friday"),
      },
      {
        name: "VidioPy",
        repo: "SohamTilekar/vidiopy",
        el: document.querySelector(".theme-vidiopy"),
      },
    ];

    const CACHE_KEY = "github_project_stats_cache";
    const CACHE_TTL = 3600000;

    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_TTL) {
        updateProjectUI(data);
        return;
      }
    }

    const projectStats = {};
    for (const project of projects) {
      if (!project.el) continue;
      try {
        const response = await fetch(
          `https://api.github.com/repos/${project.repo}`,
        );
        const data = await response.json();
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${project.repo}/commits?per_page=1`,
        );
        const linkHeader = commitsResponse.headers.get("Link");
        let totalCommits = 1;
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          totalCommits = match ? match[1] : 1;
        }
        const createdAt = new Date(data.created_at);
        const diffDays = Math.ceil(
          Math.abs(new Date() - createdAt) / (1000 * 60 * 60 * 24),
        );
        projectStats[project.repo] = {
          stars: data.stargazers_count,
          totalCommits,
          diffDays,
        };
        updateProjectElement(project.el, projectStats[project.repo]);
      } catch (error) {
        console.error(error);
      }
    }
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: projectStats }),
    );
  }

  function updateProjectUI(stats) {
    const projects = [
      {
        repo: "SohamTilekar/Wardrobe-AI",
        el: document.querySelector(".theme-wardrobe"),
      },
      {
        repo: "SohamTilekar/Portfolio",
        el: document.querySelector(".theme-portfolio"),
      },
      {
        repo: "SohamTilekar/GigglyCode",
        el: document.querySelector(".theme-giggly"),
      },
      {
        repo: "SohamTilekar/TilekarOS",
        el: document.querySelector(".theme-tilekar"),
      },
      {
        repo: "SohamTilekar/berus",
        el: document.querySelector(".theme-berus"),
      },
      {
        repo: "SohamTilekar/SS32",
        repo: "SohamTilekar/SS32",
        el: document.querySelector(".theme-ss32"),
      },
      {
        repo: "SohamTilekar/fridayv2",
        el: document.querySelector(".theme-friday"),
      },
      {
        repo: "SohamTilekar/vidiopy",
        el: document.querySelector(".theme-vidiopy"),
      },
    ];
    Object.entries(stats).forEach(([repo, stat]) => {
      const p = projects.find((x) => x.repo === repo);
      if (p && p.el) updateProjectElement(p.el, stat);
    });
  }

  function updateProjectElement(el, stat) {
    let statsContainer = el.querySelector(".project-stats");
    if (!statsContainer) {
      statsContainer = document.createElement("div");
      statsContainer.className = "project-stats";
      el.querySelector(".project-header").appendChild(statsContainer);
    }
    statsContainer.innerHTML = `
      <span class="stat-item"><i class="fas fa-code-commit"></i> ${stat.totalCommits} commits</span>
      ${stat.stars > 8 ? `<span class="stat-item"><i class="fas fa-star"></i> ${stat.stars} stars</span>` : ""}
      <span class="stat-item"><i class="fas fa-clock"></i> ${stat.diffDays} days ago</span>
    `;
  }

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

    const getCompRects = () =>
      Array.from(components).map((c) => {
        const r = c.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        return {
          left: r.left - cr.left - 5,
          top: r.top - cr.top - 5,
          right: r.right - cr.left + 5,
          bottom: r.bottom - cr.top + 5,
          type: Array.from(c.classList).find((cls) =>
            [
              "pc",
              "mmu",
              "alu",
              "cu",
              "ram",
              "reg",
              "bus",
              "vga",
              "intr",
            ].includes(cls),
          ),
        };
      });

    const createWire = (sComp, eComp, sPort, ePort, type, id) => {
      const start = getPortPos(sComp, sPort);
      const end = getPortPos(eComp, ePort);
      const rects = getCompRects();
      let pathD = `M ${start.x} ${start.y}`;
      const midY = (start.y + end.y) / 2;
      const isPathBlocked = (y1, y2, x1, x2) =>
        rects.some((r) => {
          const srcType = Array.from(sComp.classList).find((cls) =>
            [
              "pc",
              "mmu",
              "alu",
              "cu",
              "ram",
              "reg",
              "bus",
              "vga",
              "intr",
            ].includes(cls),
          );
          const destType = Array.from(eComp.classList).find((cls) =>
            [
              "pc",
              "mmu",
              "alu",
              "cu",
              "ram",
              "reg",
              "bus",
              "vga",
              "intr",
            ].includes(cls),
          );
          if (r.type === srcType || r.type === destType) return false;
          return (
            Math.min(x1, x2) < r.right &&
            Math.max(x1, x2) > r.left &&
            Math.min(y1, y2) < r.bottom &&
            Math.max(y1, y2) > r.top
          );
        });
      if (
        isPathBlocked(start.y, midY, start.x, start.x) ||
        isPathBlocked(midY, midY, start.x, end.x) ||
        isPathBlocked(midY, end.y, end.x, end.x)
      ) {
        const offset = start.y < end.y ? -45 : 45;
        const bypassY = Math.min(start.y, end.y) + offset;
        pathD += ` L ${start.x} ${bypassY} L ${end.x} ${bypassY} L ${end.x} ${end.y}`;
      } else {
        pathD += ` L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
      }
      const base = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      base.setAttribute("d", pathD);
      base.setAttribute("class", `wire-base wire-${type}`);
      svg.appendChild(base);
      const pulse = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
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
        const type = Array.from(c.classList).find((cls) =>
          [
            "pc",
            "mmu",
            "alu",
            "cu",
            "ram",
            "reg",
            "bus",
            "vga",
            "intr",
          ].includes(cls),
        );
        compMap[type] = c;
      });
      connections.forEach((conn) => {
        const s = compMap[conn.from];
        const e = compMap[conn.to];
        if (s && e)
          createWire(
            s,
            e,
            conn.sP,
            conn.eP,
            conn.type,
            `${conn.from}-${conn.to}`,
          );
      });
    };
    updateWires();
    window.addEventListener("resize", updateWires);

    const flashWire = (from, to, duration = 800) => {
      const wire = svg.querySelector(`.wire-id-${from}-${to}`);
      if (wire) {
        wire.style.display = "block";
        setTimeout(() => {
          wire.style.display = "none";
        }, duration);
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
      () => {
        activateNode("pc");
        flashWire("pc", "bus");
        setTimeout(() => {
          activateNode("bus");
          flashWire("bus", "mmu");
          setTimeout(() => {
            activateNode("mmu");
            flashWire("mmu", "ram");
            setTimeout(() => {
              activateNode("ram");
              flashWire("ram", "bus");
              setTimeout(() => {
                activateNode("cu");
                flashWire("bus", "cu");
              }, 400);
            }, 400);
          }, 400);
        }, 400);
      },
      () => {
        activateNode("cu");
        flashWire("cu", "reg");
        flashWire("cu", "alu");
        setTimeout(() => {
          activateNode("reg");
          activateNode("alu");
          flashWire("reg", "alu");
          setTimeout(() => {
            activateNode("alu");
            flashWire("alu", "reg");
            setTimeout(() => {
              activateNode("reg");
              flashWire("reg", "bus");
            }, 400);
          }, 400);
        }, 400);
      },
      () => {
        activateNode("reg");
        flashWire("reg", "bus");
        setTimeout(() => {
          activateNode("bus");
          flashWire("bus", "vga");
          activateNode("vga");
        }, 400);
      },
      () => {
        activateNode("intr");
        flashWire("intr", "cu");
        setTimeout(() => {
          activateNode("cu");
          flashWire("bus", "cu");
          setTimeout(() => {
            activateNode("bus");
            flashWire("bus", "pc");
            activateNode("pc");
          }, 400);
        }, 400);
      },
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
        const type = Array.from(comp.classList).find((cls) =>
          [
            "pc",
            "mmu",
            "alu",
            "cu",
            "ram",
            "reg",
            "bus",
            "vga",
            "intr",
          ].includes(cls),
        );
        activateNode(type, 1200);
        connections
          .filter((c) => c.from === type)
          .forEach((c) => flashWire(c.from, c.to, 1500));
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
      {
        stage: "ir",
        text: "IR   br i1 %cmp, label %loop.body, label %loop.end",
      },
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
      frag.style.opacity = "0";
      frag.fragmentState = { x: 0, y: 0, vx: 0, vy: 0 };
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
        fragments.forEach((frag, idx) =>
          animateGigglyFragment(frag, card, idx),
        );
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
    let phase = "rest",
      stagePhase = "gc",
      phaseProgress = 0,
      opacity = 0;
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
      opacity = Math.max(0.3, 1 - phaseProgress * 0.2);
      stagePhase = "ir";
    } else if (
      elapsed <
      spawnDuration + gcDuration + irDuration + binDuration
    ) {
      phase = "bin";
      phaseProgress =
        (elapsed - spawnDuration - gcDuration - irDuration) / binDuration;
      opacity = Math.max(0.3, 1 - phaseProgress * 0.2);
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
    if (phase !== "rest") {
      const t = (elapsed / (fullCycle - 4000)) * Math.PI * 2;
      const dirX = Math.sin(t + fragSeed),
        dirY = Math.cos(t * 0.7 + fragSeed * 1.5);
      let targetVx = 0,
        targetVy = 0,
        targetX = 0,
        targetY = verticalBias;
      if (phase === "spawn" || phase === "gc") {
        targetVx = dirX * 30;
        targetVy = dirY * 25;
        targetX = (0.35 + horizontalBias * 0.2) * width;
      } else if (phase === "ir") {
        targetVx = dirX * 25 - 15;
        targetVy = dirY * 30;
        targetX = (0.25 + horizontalBias * 0.3) * width;
      } else if (phase === "bin") {
        targetVx = dirX * 20 - 25;
        targetVy = dirY * 35;
        targetX = (0.15 + horizontalBias * 0.4) * width;
      } else if (phase === "exit") {
        targetVx = dirX * 30 - 50 + horizontalBias * 80;
        targetVy = dirY * 40;
        targetX = -150;
      } else if (phase === "despawn") {
        targetVx = dirX * 40 - 60 + horizontalBias * 100;
        targetVy = dirY * 50;
        targetX = -220;
      }
      state.vx += (targetVx - state.vx) * 0.1;
      state.vy += (targetVy - state.vy) * 0.1;
      state.x += state.vx * 0.016;
      state.y += state.vy * 0.016;
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
    let exampleIndex = 0,
      stageIndex = 0;
    const render = () => {
      const currentExample = examples[exampleIndex],
        currentStage = stages[stageIndex];
      exampleEl.textContent = currentExample.name;
      stageEl.textContent = currentStage.label;
      stageEl.dataset.stage = currentStage.key;
      codeEl.innerHTML = highlightCode(
        currentExample[currentStage.key],
        currentStage.key,
      );
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

  function highlightCode(code, stage) {
    if (stage === "gc")
      return code
        .replace(
          /\b(def|struct|@generic|while|return|int|float|void|Any)\b/g,
          '<span class="kw">$1</span>',
        )
        .replace(/\b([A-Z]\w*)\b/g, '<span class="type">$1</span>')
        .replace(/(\d+)/g, '<span class="num">$1</span>');
    if (stage === "ir")
      return code
        .replace(
          /\b(define|void|type|entry|label|loop|body|exit|i32|ptr|load|store|add|mul|ret|br|icmp|getelementptr|nsw|slt)\b/g,
          '<span class="kw">$1</span>',
        )
        .replace(/(@\w+|%\w+)/g, '<span class="type">$1</span>')
        .replace(/(\d+)/g, '<span class="num">$1</span>');
    if (stage === "bytes")
      return code.replace(/([0-9A-F]{2})/g, '<span class="num">$1</span>');
    return code;
  }

  function setupTilekarEmulator() {
    const output = document.getElementById("tilekar-output"),
      input = document.getElementById("tilekar-input"),
      promptPath = document.getElementById("tilekar-prompt-path"),
      screen = document.querySelector("#tilekar-emulator .tilekar-screen");
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
            HELLO: { type: "file", content: "[ELF32] executable: HELLO" },
            SH: { type: "file", content: "[ELF32] executable: SH" },
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
      const start = rawPath.startsWith("/") ? [] : [...cwd],
        parts = rawPath.split("/").filter(Boolean);
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
    const refreshPrompt = () => {
      promptPath.textContent = promptText();
    };
    const runCommand = (cmd) => {
      const raw = cmd.trim();
      if (!raw) return;
      appendLine(`${promptText()} # ${raw}`);
      const [command, ...args] = raw.split(/\s+/),
        normalized = command.toLowerCase();
      if (normalized === "clear") {
        output.textContent = "";
        return;
      }
      if (normalized === "help") {
        appendLine(
          "Commands: help, pwd, ls [path], cd [path], cat <file>, uname, ps, whoami, clear",
        );
        return;
      }
      if (normalized === "pwd") {
        appendLine(cwdText());
        return;
      }
      if (normalized === "ls") {
        const path = resolvePath(args[0]),
          node = nodeAtPath(path);
        if (!node) {
          appendLine(
            `ls: cannot access '${args[0]}': No such file or directory`,
          );
          return;
        }
        if (node.type !== "dir") {
          appendLine(path[path.length - 1]);
          return;
        }
        appendLine(
          Object.keys(node.children)
            .map((n) => (node.children[n].type === "dir" ? `${n}/` : n))
            .join("  ") || "(empty)",
        );
        return;
      }
      if (normalized === "cd") {
        const target = resolvePath(args[0] || "/"),
          node = nodeAtPath(target);
        if (!node) {
          appendLine(`cd: ${args[0]}: No such file or directory`);
          return;
        }
        if (node.type !== "dir") {
          appendLine(`cd: ${args[0]}: Not a directory`);
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
        const path = resolvePath(args[0]),
          node = nodeAtPath(path);
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
        appendLine("PID 0 init\nPID 1 shell\nPID 2 kworker");
        return;
      }
      if (normalized === "whoami") {
        appendLine("root");
        return;
      }
      appendLine(`${normalized}: command not found`);
    };
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        runCommand(input.value);
        input.value = "";
      }
    });
    document
      .getElementById("tilekar-emulator")
      .addEventListener("click", () => input.focus());
    refreshPrompt();
    let bootIndex = 0;
    const runBoot = () => {
      if (bootIndex < bootSequence.length) {
        appendLine(bootSequence[bootIndex++]);
        setTimeout(runBoot, 300);
      }
    };
    runBoot();
  }
}
