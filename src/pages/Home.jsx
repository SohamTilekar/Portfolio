import React, { useEffect } from 'react';
import { initPortfolio } from '../main.js';

const Home = () => {
  useEffect(() => {
    initPortfolio();

    // Handle initial scroll if hash exists
    if (window.location.hash) {
      const hash = window.location.hash;
      const id = hash.substring(hash.lastIndexOf('#'));
      
      // Ensure it is a valid ID selector and not just '#'
      if (id.length > 1) {
        try {
          const element = document.querySelector(id);
          if (element) {
            setTimeout(() => {
              const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"), 10) || 70;
              const offset = element.getBoundingClientRect().top + window.scrollY - navHeight - 14;
              window.scrollTo({ top: offset, behavior: 'smooth' });
            }, 100);
          }
        } catch (e) {
          console.error("Invalid selector:", id);
        }
      }
    }
  }, []);

  return (
    <>
        <header id="hero">
            <div className="terminal">
                <div className="terminal-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">soham@system: ~</span>
                </div>
                <div className="terminal-body">
                    <p className="command">
                        <span className="prompt">soham@system:~$</span> ./whoami
                    </p>
                    <h1 id="typing-text"></h1>
                    <p className="subtitle">
                        Building Systems from Scratch: Compilers, CPUs, Browsers
                        & OS
                    </p>
                    <div className="social-hero">
                        <a
                            href="https://github.com/SohamTilekar"
                            target="_blank" rel="noreferrer"
                            ><i className="fab fa-github"></i> GitHub</a
                        >
                        <a
                            href="https://www.linkedin.com/in/soham-tilekar"
                            target="_blank" rel="noreferrer"
                            ><i className="fab fa-linkedin"></i> LinkedIn</a
                        >
                        <a href="mailto:sohamtilekar233@gmail.com"><i className="fas fa-envelope"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse"></div>
                <p>Scroll to Explore</p>
            </div>
        </header>

        <main>
            <section id="about">
                <h2>01. About Me</h2>
                <div className="glass-card">
                    <p>
                        <strong>Self-taught systems developer</strong> with a passion for
                        building <strong>foundational technology from the ground up</strong>.
                        Coding since age 15, focusing on deep technical
                        challenges including <strong>custom compiler backends</strong>, <strong>hardware
                        architecture</strong>, and <strong>kernel development</strong>.
                    </p>
                    <p>
                        Currently pursuing a
                        <strong
                            >B.Tech in Computer Science Engineering (Aug 2024 - July 2028)</strong
                        >
                        at Pimpri Chinchwad University.
                        (Current: <strong>3rd Semester</strong>)
                    </p>
                    <div className="profile-grid">
                        <div>
                            <h3>Professional Focus</h3>
                            <ul>
                                <li>Systems Programming</li>
                                <li>Compiler Design and LLVM backend work</li>
                                <li>
                                    CPU architecture and emulator toolchains
                                </li>
                                <li>
                                    Kernel-level operating system development
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>Current Direction</h3>
                            <ul>
                                <li>High-performance language tooling</li>
                                <li>Hardware-software co-design experiments</li>
                                <li>
                                    Agentic AI workflows and research automation
                                </li>
                                <li>
                                    Open-source system libraries and developer
                                    tooling
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="section-scroll-hint">
                    <p>Check my Skills</p>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </section>

            <section id="skills">
                <h2>02. Technical Arsenal</h2>
                <div className="skills-grid">
                    <div className="skill-category glass-card">
                        <h3>Languages</h3>
                        <ul>
                            <li className="highlighted clickable-skill" data-project="project-codearena">Java (Expert)</li>
                            <li className="highlighted clickable-skill" data-project="project-berus">Rust (Expert)</li>
                            <li className="highlighted clickable-skill" data-project="project-giggly">C++ / C (Expert)</li>
                            <li className="clickable-skill" data-project="project-wardrobe">Python (Expert)</li>
                            <li className="clickable-skill" data-project="project-portfolio">JavaScript (Proficient)</li>
                            <li className="clickable-skill" data-project="project-ss32">Assembly (x86/Custom)</li>
                        </ul>
                    </div>
                    <div className="skill-category glass-card">
                        <h3>Systems & Low-Level</h3>
                        <ul>
                            <li className="highlighted clickable-skill" data-project="project-codearena">Concurrency & Multithreading</li>
                            <li className="highlighted clickable-skill" data-project="project-giggly">LLVM Backend & Compilers</li>
                            <li className="highlighted clickable-skill" data-project="project-tilekar">Kernel Dev & Bootloaders</li>
                            <li className="clickable-skill" data-project="project-tilekar">VFS / Paging / PMM</li>
                            <li className="highlighted clickable-skill" data-project="project-ss32">CPU Arch & ISA Design</li>
                            <li className="clickable-skill" data-project="project-jpassman">Cryptography (AES/GCM)</li>
                        </ul>
                    </div>
                    <div className="skill-category glass-card">
                        <h3>Infrastructure & Tools</h3>
                        <ul>
                            <li className="clickable-skill" data-project="project-codearena">Docker & JVM Sandboxing</li>
                            <li className="clickable-skill" data-project="project-portfolio">Node.js, React, Tailwind, Webpack</li>
                            <li className="clickable-skill" data-project="project-portfolio">Git & Version Control</li>
                            <li className="clickable-skill" data-project="project-jpassman">Interactive TUI & Maven</li>
                            <li className="clickable-skill" data-project="project-friday">Agentic AI Architectures</li>
                            <li className="clickable-skill" data-project="project-vidiopy">FFmpeg / VidioPy</li>
                        </ul>
                    </div>
                </div>
                <div className="section-scroll-hint">
                    <p>View My Projects</p>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </section>

            <section id="projects">
                <h2>03. Featured Engineering</h2>
                <div className="projects-container">
                    {/* GigglyCode */}
                    <div className="project-card glass-card theme-giggly" id="project-giggly">
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="giggly-orbit" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">C++ | LLVM 17+</span>
                                <h3>GigglyCode</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            A compiled <strong>systems language</strong> designed to bridge performance and flexibility, featuring <strong>recursive-descent parsing</strong> and <strong>robust type inference</strong>.
                        </p>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li>
                                        <strong>Bridge Mechanism:</strong>
                                        Seamlessly embed <strong>Python</strong> and <strong>C</strong> code directly within the source.
                                    </li>
                                    <li>
                                        <strong>Ownership Model:</strong> Custom
                                        <strong>type system</strong> and <strong>ownership rules</strong> to prevent memory leaks.
                                    </li>
                                    <li>
                                        <strong>Advanced Features:</strong>
                                        <strong>Generic structs</strong>, function overloading via <strong>name mangling</strong>, and modules.
                                    </li>
                                </ul>
                            </div>
                            <div className="detail-group">
                                <span className="transform-example"
                                    >GigglyCode &rarr; LLVM IR &rarr;
                                    Bytes</span
                                >
                                <div
                                    className="transform-showcase"
                                    id="giggly-transform-showcase"
                                    aria-live="polite"
                                >
                                    <div className="transform-meta">
                                        <span
                                            className="transform-example"
                                            id="giggly-transform-example"
                                            >Example 1: add() function</span
                                        >
                                        <span
                                            className="transform-stage"
                                            id="giggly-transform-stage"
                                            data-stage="gc"
                                            >GigglyCode</span
                                        >
                                    </div>
                                    <pre
                                        className="transform-sample"
                                    ><code id="giggly-transform-code">def add(a: int, b: int) -> int {'{'} return a + b; {'}'};</code></pre>
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/GigglyCode"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    {/* TilekarOS */}
                    <div className="project-card glass-card theme-tilekar" id="project-tilekar">
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">C | x86 ASM</span>
                                <h3>TilekarOS</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            A <strong>monolithic 32-bit x86</strong> operating system built from
                            scratch to explore <strong>kernel-level</strong> resource management.
                        </p>
                        <p className="project-note">
                            <strong>Current status:</strong> <strong>CLI-first</strong>
                            experience with <strong>VGA TTY</strong> and keyboard-driven
                            workflow.
                        </p>
                        <div className="tilekar-emulator" id="tilekar-emulator">
                            <div className="tilekar-bar">
                                <span className="tilekar-dot"></span>
                                <span className="tilekar-dot"></span>
                                <span className="tilekar-dot"></span>
                                <span className="tilekar-title"
                                    >qemu-system-i386 : TilekarOS</span
                                >
                            </div>
                            <div className="tilekar-screen">
                                <pre
                                    id="tilekar-output"
                                    aria-live="polite"
                                ></pre>
                                <label className="tilekar-input-row">
                                    <span id="tilekar-prompt-path">[/]</span>
                                    <span>#</span>
                                    <input
                                        id="tilekar-input"
                                        type="text"
                                        autoComplete="off"
                                        spellCheck="false"
                                        aria-label="TilekarOS shell input"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="project-details" style={{ display: 'block', margin: '20px 0' }}>
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <img
                                    src="asserts/TilekarOS on QEMU.png"
                                    alt="TilekarOS on QEMU"
                                    className="feature-image project-asset clickable-asset"
                                    onClick={() => window.openModal('asserts/TilekarOS on QEMU.png')}
                                />
                                <ul>
                                    <li><strong>Kernel:</strong> <strong>Monolithic 32-bit x86</strong> architecture with a custom <strong>bootloader</strong>.</li>
                                    <li><strong>Memory Management:</strong> Implemented <strong>paging</strong>, <strong>bitmap-based</strong> physical memory management, and <strong>heap allocation</strong>.</li>
                                    <li><strong>VFS:</strong> <strong>Virtual File System</strong> layer with <strong>FAT12</strong> support and an extensible design.</li>
                                    <li><strong>Device Drivers:</strong> Custom drivers for <strong>VGA (TTY)</strong>, <strong>PS/2 Keyboard</strong>, and <strong>ATA</strong> (Hard Drive/CD-ROM).</li>
                                    <li><strong>Dev Tooling:</strong> <strong>Python-based</strong> host-to-OS file synchronization and integrated <strong>debugging tools</strong>.</li>
                                </ul>
                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/TilekarOS"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    {/* Berus */}
                    <div className="project-card glass-card theme-berus" id="project-berus">
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Rust</span>
                                <h3>Berus Browser</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            A lightweight, from-scratch browser engine
                            implemented without WebKit, Blink, or Gecko.
                        </p>
                        <div className="berus-preview">
                            <img
                                src="asserts/BerusBrowser.png"
                                alt="Berus render preview"
                                className="berus-img clickable-asset"
                                onClick={() => window.openModal('asserts/BerusBrowser.png')}
                            />
                        </div>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li>
                                        <strong>Custom Parsers:</strong>
                                        Stateful HTML-to-DOM and CSS rule-set
                                        tokenizers built in Rust.
                                    </li>
                                    <li>
                                        <strong>Layout Engine:</strong>
                                        Handles CSS specificity, cascade, and
                                        complex text wrapping logic.
                                    </li>
                                    <li>
                                        <strong>Multimedia:</strong> Integrated
                                        audio playback using the rodio library
                                        for &lt;audio&gt; tags.
                                    </li>
                                </ul>
                            </div>
                            <div className="detail-group">
                                <h4>🛠️ Technical Deep Dive</h4>
                                <p>
                                    Uses the egui framework for rendering the
                                    layout tree. Implements hand-coded logic for
                                    border-radius and block element positioning.
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/berus"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    {/* SS32 */}
                    <div className="project-card glass-card theme-ss32" id="project-ss32">
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Rust | Logisim</span>
                                <h3>SS32 Architecture</h3>
                            </div>
                        </div>

                        <div className="project-images logisim-wire">
                            <img
                                src="asserts/CPU.png"
                                alt="SS32 CPU Schematic"
                                className="project-img clickable-asset"
                                onClick={() => window.openModal('asserts/CPU.png')}
                            />
                            <img
                                src="asserts/Computer.png"
                                alt="SS32 Computer Overview"
                                className="project-img clickable-asset"
                                onClick={() => window.openModal('asserts/Computer.png')}
                            />
                        </div>

                        <p className="project-desc">
                            A complete <strong>32-bit computer system</strong> designed from the
                            <strong>gate level</strong> up to the <strong>software toolchain</strong>.
                        </p>

                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <div className="features-list">
                                    <div className="feature-item">
                                        <span className="feature-label"
                                            >ISA & Hardware Design:</span
                                        >
                                        <span className="feature-text"
                                            ><strong>32-bit ISA</strong> with <strong>GPRs</strong>, <strong>stack operations</strong>, and <strong>interrupt handling</strong> designed in <strong>Logisim</strong>.</span
                                        >
                                    </div>
                                    <div className="feature-item">
                                        <span className="feature-label"
                                            >Rust Toolchain:</span
                                        >
                                        <span className="feature-text"
                                            ><strong>Cycle-accurate emulator</strong> with a built-in <strong>debugger</strong> and <strong>memory visualizer</strong>.</span
                                        >
                                    </div>
                                    <div className="feature-item">
                                        <span className="feature-label"
                                            >Custom Assembler:</span
                                        >
                                        <span className="feature-text"
                                            >Translates <strong>mnemonics into binary</strong> for the <strong>SS32 architecture</strong>.</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ss32-schematic-container randomized">
                            <div className="ss32-board-v2">
                                <div className="ss32-grid-bg"></div>
                                <svg
                                    className="ss32-wires"
                                    id="ss32-wires-svg"
                                    preserveAspectRatio="none"
                                >
                                    {/* Procedurally generated wires go here */}
                                </svg>
                                <div className="ss32-components-v2">
                                    {/* CPU Core */}
                                    <div
                                        className="ss32-comp-v2 pc-box pc"
                                        data-full="Program Counter: Manages instruction pointer and fetch address."
                                    >
                                        <div className="port p-top"></div>
                                        <div className="port p-bottom"></div>
                                        <div className="port p-bottom-2"></div>
                                        <div className="port p-right"></div>
                                        <span className="comp-icon">⏱</span>PC
                                    </div>
                                    <div
                                        className="ss32-comp-v2 mmu-box mmu"
                                        data-full="MMU: Translates virtual addresses to physical RAM locations."
                                    >
                                        <div className="port p-left"></div>
                                        <div className="port p-right"></div>
                                        <div className="port p-bottom"></div>
                                        <div className="port p-top"></div>
                                        <span className="comp-icon">▦</span>MMU
                                    </div>
                                    <div
                                        className="ss32-comp-v2 alu-trap alu"
                                        data-full="ALU: Executes arithmetic and logical operations."
                                    >
                                        <div className="port p-left"></div>
                                        <div className="port p-left-2"></div>
                                        <div className="port p-right"></div>
                                        <div className="port p-top"></div>
                                        <div className="port p-bottom"></div>
                                        <span className="comp-icon">∑</span>ALU
                                    </div>
                                    <div
                                        className="ss32-comp-v2 cu-hex cu"
                                        data-full="Control Unit: Decodes instructions and orchestrates signals."
                                    >
                                        <div className="port p-bottom"></div>
                                        <div className="port p-bottom-2"></div>
                                        <div className="port p-left"></div>
                                        <div className="port p-right"></div>
                                        <div className="port p-top"></div>
                                        <span className="comp-icon">⚙</span>CU
                                    </div>

                                    {/* Registers & Storage */}
                                    <div
                                        className="ss32-comp-v2 reg-bank reg"
                                        data-full="Register Bank: High-speed GPRs for fast operand access."
                                    >
                                        <div className="port p-left"></div>
                                        <div className="port p-right"></div>
                                        <div className="port p-top"></div>
                                        <div className="port p-bottom"></div>
                                        <span className="comp-icon">📂</span>REG
                                    </div>
                                    <div
                                        className="ss32-comp-v2 ram-grid ram"
                                        data-full="RAM: 16MB x 32-bit main memory storage."
                                    >
                                        <div className="port p-left"></div>
                                        <div className="port p-top"></div>
                                        <div className="port p-bottom"></div>
                                        <div className="port p-bottom-2"></div>
                                        <span className="comp-icon">▤</span>RAM
                                    </div>

                                    {/* I/O & Bus */}
                                    <div
                                        className="ss32-comp-v2 bus-strip bus"
                                        data-full="System Bus: Central highway for data, addr, and ctrl signals."
                                    >
                                        <div className="port p-top"></div>
                                        <div className="port p-top-2"></div>
                                        <div className="port p-bottom"></div>
                                        <div className="port p-bottom-2"></div>
                                        <div className="port p-left"></div>
                                        <div className="port p-right"></div>
                                        <span className="comp-icon">⇄</span>BUS
                                    </div>
                                    <div
                                        className="ss32-comp-v2 vga-module vga"
                                        data-full="VGA Output: Displays pixel data and graphics on screen."
                                    >
                                        <div className="port p-left"></div>
                                        <div className="port p-top"></div>
                                        <div className="port p-top-2"></div>
                                        <div className="vga-screen-mini">
                                            <img className="snail-mini" src="asserts/PFP.png" alt="Snail mini" />
                                        </div>
                                    </div>

                                    {/* Peripherals */}
                                    <div
                                        className="ss32-comp-v2 int-box intr"
                                        data-full="Interrupts: Handles external hardware and timer events."
                                    >
                                        <div className="port p-right"></div>
                                        <div className="port p-left"></div>
                                        <div className="port p-bottom"></div>
                                        <div className="port p-top"></div>
                                        <span className="comp-icon">!</span>INT
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://github.com/SohamTilekar/SS32"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    {/* Code Arena */}
                    <div className="project-card glass-card theme-codearena hidden-project" id="project-codearena" style={{ display: 'none' }}>
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Core Java 17 | Vanilla JS | Docker</span>
                                <h3>Code Arena</h3>
                            </div>
                        </div>
                        <div className="project-images codearena-wire">
                            <img
                                src="asserts/Solo Arena.png"
                                alt="Solo Arena Challenge"
                                className="project-img clickable-asset"
                                onClick={() => window.openModal('asserts/Solo Arena.png')}
                            />
                            <img
                                src="asserts/1v1.png"
                                alt="1v1 Real-Time Duel"
                                className="project-img clickable-asset"
                                onClick={() => window.openModal('asserts/1v1.png')}
                            />
                        </div>
                        <p className="project-desc">
                            A <strong>Real-Time Multiplayer Competitive Programming Platform</strong> built from scratch with an algorithmic Elo ranking system, concurrency utilities, and a secure code sandbox.
                        </p>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li><strong>Zero-Dependency Backend:</strong> Powered by Java's native <code>HttpServer</code> package with custom HTTP routing, JSON parsing, and cookie/session handling.</li>
                                    <li><strong>Multithreading & Matchmaking:</strong> Custom thread pools manage active duels, matchmaking queue polling, and challenge countdown timers.</li>
                                    <li><strong>JVM Code Sandbox:</strong> Executes user-submitted code in a restricted runtime process via <code>ProcessBuilder</code>, with memory limits (<code>-Xmx64m</code>), file scan keyword-blocklists, and timeouts to prevent exploits.</li>
                                    <li><strong>State Persistence:</strong> Atomic object serialization for local persistence of player ranks, session logs, and match history.</li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/CodeArena"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    {/* JPassMan */}
                    <div className="project-card glass-card theme-jpassman hidden-project" id="project-jpassman" style={{ display: 'none' }}>
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Core Java 17 | Cryptography | Maven</span>
                                <h3>JPassMan</h3>
                            </div>
                        </div>
                        <div className="project-details" style={{ display: 'block', margin: '20px 0' }}>
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <div className="terminal-frame clickable-asset" onClick={() => window.openModal('asserts/JPassMan_Homescreen.png')}>
                                    <div className="terminal-header-dots">
                                        <span className="dot red"></span>
                                        <span className="dot yellow"></span>
                                        <span className="dot green"></span>
                                        <span className="terminal-title">jpassman --tui</span>
                                    </div>
                                    <img
                                        src="asserts/JPassMan_Homescreen.png"
                                        alt="JPassMan TUI Homescreen"
                                    />
                                </div>
                                <ul>
                                    <li><strong>Interactive Terminal TUI:</strong> Professional text-based interface featuring keyboard navigation, SGR mouse tracking, and tab button focus.</li>
                                    <li><strong>Cryptographic Security:</strong> Uses <code>AES/GCM/NoPadding</code> encryption with unique 12-byte IVs and <code>PBKDF2WithHmacSHA256</code> (65,536 iterations) key derivation.</li>
                                    <li><strong>Zero Supply-Chain Risks:</strong> Implemented entirely on top of native JDK libraries, containing zero external software dependencies.</li>
                                    <li><strong>Memory Safety:</strong> Active protection against memory scraping attacks by instantly overwriting and zeroing out master password character arrays after key derivation.</li>
                                    <li><strong>Multiple User Profiles:</strong> Instantly switches between completely isolated, portable database files (e.g. <code>work.db</code>, <code>personal.db</code>) saved directly to local storage.</li>
                                    <li><strong>Password Generator:</strong> Integrates a cryptographically secure generator allowing real-time tuning of length, character sets (alphanumeric, capitals, symbols), and strength requirements.</li>
                                    <li><strong>Classic CLI Fallback:</strong> Designed with an auto-fallback routine that switches to a clean, line-by-line stdin CLI if the host terminal lacks ANSI escape sequences or mouse tracking capabilities.</li>
                                </ul>
                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/JPassMan"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    <div className="project-card glass-card theme-wardrobe hidden-project" id="project-wardrobe" style={{ display: 'none' }}>
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Python | FastAPI | React</span>
                                <h3>Wardrobe AI</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            A <strong>smart, local-first styling coordinator</strong> that digitizes clothing inventory, tracks laundry cycles, and generates <strong>personalized, scenario-based outfit recommendations</strong>.
                        </p>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li>
                                        <strong>Styling Engine:</strong>
                                        Evaluates combinations across <strong>5 scenario-based destinations</strong> using structural fashion principles.
                                    </li>
                                    <li>
                                        <strong>Cycle Tracking:</strong>
                                        Automates laundry alerts by logging <strong>wear history</strong>, <strong>dirt levels</strong>, and <strong>wash statuses</strong>.
                                    </li>
                                    <li>
                                        <strong>Local & Private:</strong>
                                        High-performance <strong>FastAPI backend</strong> with <strong>local JSON storage</strong> for total data privacy.
                                    </li>
                                    <li>
                                        <strong>Smart Rotation:</strong>
                                        Biased recommendation algorithm to promote <strong>natural rotation</strong> and prevent "unworn item" fatigue.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/Wardrobe-AI"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    <div className="project-card glass-card theme-friday hidden-project" id="project-friday" style={{ display: 'none' }}>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Python | Agentic AI</span>
                                <h3>Friday v2</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            A <strong>high-autonomy agentic assistant</strong> built for <strong>deep research</strong>, tool use, and <strong>system-level execution loops</strong>.
                        </p>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li>
                                        <strong>Deep Research Loop:</strong>
                                        Uses <strong>Firecrawl</strong> to build <strong>hierarchical knowledge trees</strong> from the web.
                                    </li>
                                    <li>
                                        <strong>Computer Access:</strong> Local
                                        <strong>sandboxed terminal</strong> for file management and <strong>code execution</strong>.
                                    </li>
                                    <li>
                                        <strong>Branching History:</strong>
                                        Supports <strong>non-linear chat paths</strong>, allowing users to "rewind" and explore.
                                    </li>
                                    <li>
                                        <strong>Multi-modal:</strong> Integrated with <strong>Gemini 1.5 Pro</strong> and <strong>Imagen</strong> for analysis and generation.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/fridayv2"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    <div className="project-card glass-card theme-vidiopy hidden-project" id="project-vidiopy" style={{ display: 'none' }}>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">Python | FFmpeg</span>
                                <h3>VidioPy</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            A <strong>programmatic video editing toolkit</strong> with <strong>timeline automation</strong> and <strong>dynamic composition APIs</strong>.
                        </p>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li>
                                        <strong>FFmpeg Wrapper:</strong> Clean
                                        <strong>object-style API</strong> over complex <strong>filtergraphs</strong>.
                                    </li>
                                    <li>
                                        <strong>Dynamic Coordinates:</strong>
                                        <strong>Time-based lambda positioning</strong> for animation.
                                    </li>
                                    <li>
                                        <strong>PyPI Release:</strong> Packaged
                                        for <strong>production use</strong> with dependency management.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/vidiopy"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Source &rarr;</a
                        >
                    </div>

                    {/* Portfolio Website */}
                    <div className="project-card glass-card theme-portfolio hidden-project" id="project-portfolio" style={{ display: 'none' }}>
                        <div className="card-halo" aria-hidden="true"></div>
                        <div className="project-header">
                            <div className="header-top">
                                <span className="tech-tag">React | Node.js | Webpack</span>
                                <h3>Portfolio</h3>
                            </div>
                        </div>
                        <p className="project-desc">
                            The source code and documentation for this <strong>Portfolio Website</strong>. A high-performance, containerized application serving as my digital engineering workspace.
                        </p>
                        <div className="project-details">
                            <div className="detail-group feature-group">
                                <h4>✨ Key Features</h4>
                                <ul>
                                    <li>
                                        <strong>Source Repository:</strong> Hosted at <span className="project-link"><a href="https://github.com/SohamTilekar/Portfolio" target="_blank" rel="noreferrer">GitHub.com/SohamTilekar/Portfolio</a></span>.
                                    </li>
                                    <li>
                                        <strong>Live Site:</strong> Published at <span className="project-link"><a href="https://sohamtilekar.github.io/Portfolio" target="_blank" rel="noreferrer">sohamtilekar.github.io/Portfolio</a></span>.
                                    </li>
                                    <li>
                                        <strong>Modern Stack:</strong> Engineered with <strong>React 19</strong>, <strong>Tailwind CSS v4</strong>, and <strong>Webpack 5</strong> for optimized delivery.
                                    </li>
                                    <li>
                                        <strong>CI/CD:</strong> Automated deployment via production-ready <strong>GitHub Actions</strong> pipelines.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="https://github.com/SohamTilekar/Portfolio"
                            target="_blank" rel="noreferrer"
                            className="view-project"
                            ><i className="fab fa-github"></i> View Repository &rarr;</a
                        >
                    </div>
                </div>
                <div className="projects-toggle-container" style={{ textAlign: 'center', marginTop: '30px' }}>
                    <span id="show-more-projects" className="projects-more-link">Show More Projects &darr;</span>
                    <p className="projects-github-note">Additional projects are available on my <a href="https://github.com/SohamTilekar" target="_blank" rel="noreferrer">GitHub</a>.</p>
                </div>
            </section>

            <section id="contact">
                <h2>04. Get In Touch</h2>
                <div className="glass-card contact-content">
                    <p>
                        I am always looking for opportunities to apply
                        systems-level expertise to real-world challenges in
                        compilers, kernel engineering, architecture design, and
                        AI-integrated developer systems.
                    </p>
                    <a href="mailto:sohamtilekar233@gmail.com" className="btn"
                        ><i className="fas fa-paper-plane"></i> Send a Ping</a
                    >
                </div>
            </section>
        </main>
    </>
  );
};

export default Home;
