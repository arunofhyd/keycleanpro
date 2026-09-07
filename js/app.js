/**
 * KeyClean Pro - Application Controller & UI Coordinator
 */

document.addEventListener('DOMContentLoaded', () => {
    // ── State ─────────────────────────────────────────────────────────────
    let currentLayout = /Mac OS X|Macintosh/.test(navigator.userAgent) ? 'mac' : 'windows';
    let isHeatmapActive = false;
    let holdProgressRaf = null;
    let holdStartTime = null;
    const HOLD_DURATION_MS = 2000;
    const RING_CIRCUMFERENCE = 660; // 2 * pi * 105

    // ── DOM References ────────────────────────────────────────────────────
    const body = document.body;
    const lockCoreBtn = document.getElementById('lockCoreBtn');
    const lockRingProgress = document.getElementById('lockRingProgress');
    const lockIcon = document.getElementById('lockIcon');
    const lockLabel = document.getElementById('lockLabel');
    const lockSublabel = document.getElementById('lockSublabel');
    const heroSubtitle = document.getElementById('heroSubtitle');

    // Safety Mode (1-Click Toggle vs Hold 2s)
    const modePills = document.querySelectorAll('.mode-pill');

    // Telemetry HUD
    const hudCleanedCount = document.getElementById('hudCleanedCount');
    const hudTotalKeys = document.getElementById('hudTotalKeys');
    const hudCoveragePct = document.getElementById('hudCoveragePct');
    const hudProgressFill = document.getElementById('hudProgressFill');
    const hudCurrentRollover = document.getElementById('hudCurrentRollover');
    const hudPeakRollover = document.getElementById('hudPeakRollover');
    const hudTimer = document.getElementById('hudTimer');
    const hudTotalWipes = document.getElementById('hudTotalWipes');

    // Layout & Keyboard Deck
    const layoutTabs = document.querySelectorAll('.layout-tab');
    const keyboardDeck = document.getElementById('keyboardDeck');
    const toggleHeatmapBtn = document.getElementById('toggleHeatmapBtn');
    const resetSessionBtn = document.getElementById('resetSessionBtn');

    // Header Controls
    const themeSelect = document.getElementById('themeSelect');
    const screenCleanBtn = document.getElementById('screenCleanBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    // Screen Inspection Overlay
    const screenOverlay = document.getElementById('screenOverlay');
    const screenExitBtn = document.getElementById('screenExitBtn');
    const screenColorBtns = document.querySelectorAll('.screen-color-btn');

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    // Particle & Confetti Canvases
    const particleCanvas = document.getElementById('particleCanvas');
    const pCtx = particleCanvas.getContext('2d');

    // ── Setup & Initialization ────────────────────────────────────────────
    function init() {
        initTheme();
        initSafetyMode();
        renderKeyboard();
        updateHud();
        initParticleCanvas();
        bindEvents();
    }

    // ── Theme Management ──────────────────────────────────────────────────
    function initTheme() {
        const savedTheme = localStorage.getItem('keyclean_theme') || 'cyberpunk';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeSelect) themeSelect.value = savedTheme;
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            document.documentElement.setAttribute('data-theme', val);
            localStorage.setItem('keyclean_theme', val);
        });
    }

    // ── Safety Mode & Unlock Controls ─────────────────────────────────────
    function initSafetyMode() {
        let mode = window.cleanerEngine.unlockMode;
        if (!['click', 'hold'].includes(mode)) {
            mode = 'click';
            window.cleanerEngine.setUnlockMode('click');
        }
        modePills.forEach(pill => {
            const isActive = pill.dataset.mode === mode;
            pill.classList.toggle('active', isActive);
            pill.setAttribute('aria-checked', isActive ? 'true' : 'false');
        });
        updateSafetyUI();
    }

    modePills.forEach(pill => {
        pill.addEventListener('click', () => {
            const mode = pill.dataset.mode;
            window.cleanerEngine.setUnlockMode(mode);
            modePills.forEach(p => {
                const isActive = p === pill;
                p.classList.toggle('active', isActive);
                p.setAttribute('aria-checked', isActive ? 'true' : 'false');
            });
            updateSafetyUI();
        });
    });

    function updateSafetyUI() {
        const isLocked = window.cleanerEngine.isLocked;
        const mode = window.cleanerEngine.unlockMode;

        if (isLocked) {
            if (mode === 'hold') {
                lockSublabel.textContent = 'Hold 2s to Unlock';
            } else {
                lockSublabel.textContent = 'Click to Unlock';
            }
        } else {
            lockSublabel.textContent = 'Click to Start';
        }
    }

    // ── Hold-To-Unlock & Core Button Events ────────────────────────────────
    function startHoldProgress() {
        if (!window.cleanerEngine.isLocked || window.cleanerEngine.unlockMode !== 'hold') return;
        holdStartTime = performance.now();

        const animateRing = (now) => {
            const elapsed = now - holdStartTime;
            const progress = Math.min(1, elapsed / HOLD_DURATION_MS);
            const offset = RING_CIRCUMFERENCE * (1 - progress);
            lockRingProgress.style.strokeDashoffset = offset;

            if (progress >= 1) {
                cancelHoldProgress();
                unlockApp();
            } else {
                holdProgressRaf = requestAnimationFrame(animateRing);
            }
        };

        holdProgressRaf = requestAnimationFrame(animateRing);
    }

    function cancelHoldProgress() {
        if (holdProgressRaf) {
            cancelAnimationFrame(holdProgressRaf);
            holdProgressRaf = null;
        }
        holdStartTime = null;
        lockRingProgress.style.strokeDashoffset = RING_CIRCUMFERENCE;
    }

    // Pointer events on core button
    lockCoreBtn.addEventListener('pointerdown', (e) => {
        if (!window.cleanerEngine.isLocked) {
            // Locking is immediate 1-click
            lockApp();
        } else {
            if (window.cleanerEngine.unlockMode === 'hold') {
                startHoldProgress();
            } else {
                unlockApp();
            }
        }
    });

    lockCoreBtn.addEventListener('pointerup', cancelHoldProgress);
    lockCoreBtn.addEventListener('pointerleave', cancelHoldProgress);
    lockCoreBtn.addEventListener('pointercancel', cancelHoldProgress);

    // Prevent space/enter triggering button after locking
    lockCoreBtn.addEventListener('keydown', (e) => {
        if (window.cleanerEngine.isLocked) {
            e.preventDefault();
            e.target.blur();
        }
    });

    // ── Lock & Unlock State Handlers ──────────────────────────────────────
    function lockApp() {
        window.cleanerEngine.lock();

        body.classList.add('locked');
        lockIcon.className = 'fa-solid fa-lock text-4xl';
        lockLabel.textContent = 'UNLOCK';
        heroSubtitle.textContent = '🔒 Keyboard is FROZEN. Wipe and scrub keys freely.';
        heroSubtitle.style.color = 'var(--accent-ruby)';

        updateSafetyUI();
    }

    function unlockApp() {
        window.cleanerEngine.unlock();

        body.classList.remove('locked');
        lockIcon.className = 'fa-solid fa-lock-open text-4xl';
        lockLabel.textContent = 'LOCK';
        heroSubtitle.textContent = 'Ready to clean. Lock your keyboard to start.';
        heroSubtitle.style.color = '';

        updateSafetyUI();
    }

    // ── Cleaner Engine Callbacks ──────────────────────────────────────────
    window.cleanerEngine.onKeyCleaned = (data) => {
        // Update keycap UI
        markKeycapCleaned(data.code, data.count);

        // Spawn visual bubble
        spawnKeyBubble(data.key);

        // Update HUD
        updateHud();

        // Check 100% completion milestone
        const report = window.cleanerEngine.getSessionReport(currentLayout);
        if (report.coveragePct === 100 && !window.hasCelebratedThisSession) {
            window.hasCelebratedThisSession = true;
            launchConfetti();
        }
    };

    window.cleanerEngine.onRolloverChange = (activeCount, peakCount) => {
        hudCurrentRollover.textContent = activeCount;
        hudPeakRollover.textContent = peakCount;

        // Visual flash for high rollover wipes
        if (activeCount >= 6) {
            hudCurrentRollover.style.color = 'var(--accent-cyan)';
            hudCurrentRollover.style.textShadow = '0 0 16px var(--accent-cyan)';
        } else {
            hudCurrentRollover.style.color = '';
            hudCurrentRollover.style.textShadow = '';
        }
    };

    window.cleanerEngine.onTick = (seconds) => {
        hudTimer.textContent = window.cleanerEngine.formatTime(seconds);
    };

    // ── Keyboard Rendering & Keycaps ──────────────────────────────────────
    function renderKeyboard() {
        const layout = window.KEYBOARD_LAYOUTS[currentLayout];
        if (!layout) return;

        let html = '';

        if (layout.type === 'compact') {
            layout.rows.forEach(row => {
                html += '<div class="kbd-row">';
                row.forEach(k => {
                    if (k.isSplit) {
                        html += `
                            <div class="kbd-key-split" style="flex:${k.flex}">
                                <div class="kbd-split-half ${getKeyCleanedClasses(k.top.code)}" data-code="${k.top.code}">
                                    ${k.top.label}
                                </div>
                                <div class="kbd-split-half ${getKeyCleanedClasses(k.bottom.code)}" data-code="${k.bottom.code}">
                                    ${k.bottom.label}
                                </div>
                            </div>
                        `;
                    } else {
                        html += `
                            <div class="kbd-key ${getKeyCleanedClasses(k.code)}" style="flex:${k.flex}" data-code="${k.code}">
                                ${k.sub ? `<span class="sub-legend">${k.sub}</span>` : ''}
                                <span class="main-legend">${k.label}</span>
                            </div>
                        `;
                    }
                });
                html += '</div>';
            });
        } else if (layout.type === 'full') {
            html += '<div class="fullsize-grid">';
            layout.sections.forEach(sec => {
                html += `<div class="fullsize-section ${sec.id}-block">`;
                sec.rows.forEach(row => {
                    html += '<div class="kbd-row">';
                    row.forEach(k => {
                        if (k.isSpacer) {
                            html += `<div style="flex:${k.flex}"></div>`;
                        } else {
                            html += `
                                <div class="kbd-key ${getKeyCleanedClasses(k.code)}" style="flex:${k.flex}" data-code="${k.code}">
                                    ${k.sub ? `<span class="sub-legend">${k.sub}</span>` : ''}
                                    <span class="main-legend">${k.label}</span>
                                </div>
                            `;
                        }
                    });
                    html += '</div>';
                });
                html += '</div>';
            });
            html += '</div>';
        }

        keyboardDeck.innerHTML = html;
    }

    function getKeyCleanedClasses(code) {
        if (!code) return '';
        const isCleaned = window.cleanerEngine.cleanedKeys.has(code);
        let classes = isCleaned ? 'cleaned' : '';
        if (isHeatmapActive && isCleaned) {
            const intensity = window.cleanerEngine.getHeatmapIntensity(code);
            classes += ` heat-${intensity}`;
        }
        return classes;
    }

    function markKeycapCleaned(code, count) {
        const keyEls = keyboardDeck.querySelectorAll(`[data-code="${code}"]`);
        keyEls.forEach(el => {
            el.classList.add('cleaned', 'active');
            setTimeout(() => el.classList.remove('active'), 120);

            if (isHeatmapActive) {
                const intensity = window.cleanerEngine.getHeatmapIntensity(code);
                el.className = el.className.replace(/heat-\d/g, '').trim();
                el.classList.add(`heat-${intensity}`);
            }
        });
    }

    // Layout Switching
    layoutTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const layoutKey = tab.dataset.layout;
            if (layoutKey === currentLayout) return;
            currentLayout = layoutKey;
            layoutTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            keyboardDeck.style.opacity = '0';
            setTimeout(() => {
                renderKeyboard();
                updateHud();
                keyboardDeck.style.opacity = '1';
            }, 150);
        });
    });

    // Heatmap Toggle
    if (toggleHeatmapBtn) {
        toggleHeatmapBtn.addEventListener('click', () => {
            isHeatmapActive = !isHeatmapActive;
            toggleHeatmapBtn.classList.toggle('active', isHeatmapActive);
            renderKeyboard();
        });
    }

    // Reset Session Button
    if (resetSessionBtn) {
        resetSessionBtn.addEventListener('click', () => {
            window.cleanerEngine.reset();
            window.hasCelebratedThisSession = false;
            renderKeyboard();
            updateHud();
            hudTimer.textContent = '00:00';
            hudCurrentRollover.textContent = '0';
            hudPeakRollover.textContent = '0';
        });
    }

    // ── Telemetry HUD Updater ─────────────────────────────────────────────
    function updateHud() {
        const totalLayoutKeys = window.getLayoutKeyCodes(currentLayout).size || 78;
        const cleanedKeys = [...window.cleanerEngine.cleanedKeys].filter(code =>
            window.getLayoutKeyCodes(currentLayout).has(code)
        ).length;
        const coverage = Math.min(100, Math.round((cleanedKeys / totalLayoutKeys) * 100));

        hudCleanedCount.textContent = cleanedKeys;
        hudTotalKeys.textContent = totalLayoutKeys;
        hudCoveragePct.textContent = `${coverage}%`;
        hudProgressFill.style.width = `${coverage}%`;
        hudTotalWipes.textContent = window.cleanerEngine.totalWipes;
    }

    // ── Floating Key Bubble Spawner ───────────────────────────────────────
    function spawnKeyBubble(key) {
        const bubble = document.createElement('div');
        bubble.className = 'floating-key-bubble';
        bubble.textContent = key === ' ' ? '␣' : key.toUpperCase();

        const x = window.innerWidth * (0.2 + Math.random() * 0.6);
        const y = window.innerHeight * (0.4 + Math.random() * 0.4);
        const rot = (Math.random() - 0.5) * 30;

        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.setProperty('--rot', `${rot}deg`);

        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1200);
    }

    // ── Screen Cleaning / Dust Inspection Overlay ─────────────────────────
    if (screenCleanBtn) {
        screenCleanBtn.addEventListener('click', () => {
            screenOverlay.classList.add('visible');
            setScreenBackground('#000000');
        });
    }

    if (screenExitBtn) {
        screenExitBtn.addEventListener('click', () => {
            screenOverlay.classList.remove('visible');
        });
    }

    screenColorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            screenColorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const color = btn.dataset.color;
            if (color === 'grid') {
                screenOverlay.className = 'screen-inspection-overlay visible screen-grid-pattern';
                screenOverlay.style.backgroundColor = '#0b0f19';
            } else {
                screenOverlay.className = 'screen-inspection-overlay visible';
                screenOverlay.style.backgroundColor = color;
            }
        });
    });

    function setScreenBackground(col) {
        screenOverlay.className = 'screen-inspection-overlay visible';
        screenOverlay.style.backgroundColor = col;
        screenColorBtns.forEach(b => b.classList.toggle('active', b.dataset.color === col));
    }

    // ── Fullscreen Toggle ─────────────────────────────────────────────────
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
                fullscreenBtn.classList.add('active');
            } else {
                document.exitFullscreen().catch(() => {});
                fullscreenBtn.classList.remove('active');
            }
        });
    }

    // ── FAQ Accordion ─────────────────────────────────────────────────────
    faqItems.forEach(item => {
        const q = item.querySelector('.faq-question');
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // ── Ambient Dust Particles Canvas ─────────────────────────────────────
    let particles = [];
    function initParticleCanvas() {
        function resize() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        particles = [];
        for (let i = 0; i < 45; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.4 + 0.1
            });
        }

        function animateParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            pCtx.fillStyle = '#ffffff';

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = particleCanvas.width;
                if (p.x > particleCanvas.width) p.x = 0;
                if (p.y < 0) p.y = particleCanvas.height;
                if (p.y > particleCanvas.height) p.y = 0;

                pCtx.globalAlpha = p.alpha;
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                pCtx.fill();
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ── Built-in Confetti Cannon (Zero external dependencies) ──────────────
    function launchConfetti() {
        const confettiCanvas = document.createElement('canvas');
        confettiCanvas.style.position = 'fixed';
        confettiCanvas.style.inset = '0';
        confettiCanvas.style.pointerEvents = 'none';
        confettiCanvas.style.zIndex = '99999';
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        document.body.appendChild(confettiCanvas);

        const ctx = confettiCanvas.getContext('2d');
        const pieces = [];
        const colors = ['#00f2fe', '#38bdf8', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#ffffff'];

        for (let i = 0; i < 180; i++) {
            pieces.push({
                x: window.innerWidth * (0.3 + Math.random() * 0.4),
                y: window.innerHeight * 0.5,
                vx: (Math.random() - 0.5) * 22,
                vy: -Math.random() * 18 - 8,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 12,
                alpha: 1
            });
        }

        let frame = 0;
        function renderConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let alive = false;

            pieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.45; // gravity
                p.vx *= 0.98; // air drag
                p.rotation += p.rSpeed;
                p.alpha -= 0.007;

                if (p.alpha > 0) {
                    alive = true;
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    ctx.restore();
                }
            });

            frame++;
            if (alive && frame < 240) {
                requestAnimationFrame(renderConfetti);
            } else {
                confettiCanvas.remove();
            }
        }

        renderConfetti();
    }

    // ── Global Keyboard Shortcut Esc Handler ──────────────────────────────
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (screenOverlay && screenOverlay.classList.contains('visible')) {
                screenOverlay.classList.remove('visible');
            }
        }
    });

    function bindEvents() {
        // Ready
    }

    init();
});
