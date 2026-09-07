/**
 * KeyClean Pro - Core Cleaner Engine
 * Handles full event suppression, rollover detection, unlock guards, and metrics telemetry
 */

class KeyCleanerEngine {
    constructor() {
        this.isLocked = false;
        this.cleanedKeys = new Set();
        this.activeKeys = new Set();
        this.keyPressCounts = {};
        this.totalWipes = 0;
        this.peakRollover = 0;
        this.currentRollover = 0;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.timerInterval = null;

        // Safety mode: 'click' (1-click fast toggle, default) or 'hold' (2s hold)
        const savedMode = localStorage.getItem('keyclean_unlock_mode');
        this.unlockMode = (savedMode === 'hold') ? 'hold' : 'click';

        // Listeners bound
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleWindowBlur = this.handleWindowBlur.bind(this);

        // Event callbacks for UI
        this.onKeyCleaned = null;
        this.onRolloverChange = null;
        this.onTick = null;
        this.onLockStateChange = null;
    }

    setUnlockMode(mode) {
        if (['click', 'hold'].includes(mode)) {
            this.unlockMode = mode;
            localStorage.setItem('keyclean_unlock_mode', mode);
        }
    }

    lock() {
        if (this.isLocked) return;
        this.isLocked = true;
        this.startTime = Date.now();
        this.elapsedSeconds = 0;
        this.activeKeys.clear();
        this.currentRollover = 0;

        // Attach capture-phase blockers
        window.addEventListener('keydown', this.handleKeyDown, { capture: true, passive: false });
        window.addEventListener('keyup', this.handleKeyUp, { capture: true, passive: false });
        window.addEventListener('keypress', this.handleKeyPress, { capture: true, passive: false });
        window.addEventListener('contextmenu', this.handleContextMenu, { capture: true, passive: false });
        window.addEventListener('blur', this.handleWindowBlur);

        // Start session timer
        this.timerInterval = setInterval(() => {
            this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            if (this.onTick) this.onTick(this.elapsedSeconds);
        }, 1000);

        if (this.onLockStateChange) {
            this.onLockStateChange(true);
        }
    }

    unlock() {
        if (!this.isLocked) return;
        this.isLocked = false;

        // Detach blockers
        window.removeEventListener('keydown', this.handleKeyDown, { capture: true, passive: false });
        window.removeEventListener('keyup', this.handleKeyUp, { capture: true, passive: false });
        window.removeEventListener('keypress', this.handleKeyPress, { capture: true, passive: false });
        window.removeEventListener('contextmenu', this.handleContextMenu, { capture: true, passive: false });
        window.removeEventListener('blur', this.handleWindowBlur);

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        this.activeKeys.clear();
        this.currentRollover = 0;

        if (this.onLockStateChange) {
            this.onLockStateChange(false);
        }
    }

    reset() {
        this.cleanedKeys.clear();
        this.activeKeys.clear();
        this.keyPressCounts = {};
        this.totalWipes = 0;
        this.peakRollover = 0;
        this.currentRollover = 0;
        this.elapsedSeconds = 0;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    handleKeyDown(e) {
        if (!this.isLocked) return;

        // Block browser defaults & shortcuts
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const code = e.code || e.key;

        // Track simultaneous rollover
        this.activeKeys.add(code);
        this.currentRollover = this.activeKeys.size;
        if (this.currentRollover > this.peakRollover) {
            this.peakRollover = this.currentRollover;
        }
        if (this.onRolloverChange) {
            this.onRolloverChange(this.currentRollover, this.peakRollover);
        }

        // Increment scrub counts
        this.totalWipes++;
        this.keyPressCounts[code] = (this.keyPressCounts[code] || 0) + 1;

        const isNewClean = !this.cleanedKeys.has(code);
        if (isNewClean) {
            this.cleanedKeys.add(code);
        }

        // Notify UI
        if (this.onKeyCleaned) {
            this.onKeyCleaned({
                code: code,
                key: e.key,
                isNew: isNewClean,
                totalCleaned: this.cleanedKeys.size,
                totalWipes: this.totalWipes,
                count: this.keyPressCounts[code]
            });
        }

        return false;
    }

    handleKeyUp(e) {
        if (!this.isLocked) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const code = e.code || e.key;
        this.activeKeys.delete(code);
        this.currentRollover = this.activeKeys.size;
        if (this.onRolloverChange) {
            this.onRolloverChange(this.currentRollover, this.peakRollover);
        }

        return false;
    }

    handleKeyPress(e) {
        if (!this.isLocked) return;
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    handleContextMenu(e) {
        if (this.isLocked) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    handleWindowBlur() {
        this.activeKeys.clear();
        this.currentRollover = 0;
        if (this.onRolloverChange) {
            this.onRolloverChange(0, this.peakRollover);
        }
    }

    getHeatmapIntensity(code) {
        const count = this.keyPressCounts[code] || 0;
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 6) return 2;
        if (count <= 12) return 3;
        return 4; // ultra scrubbed
    }

    getSessionReport(layoutKey) {
        const totalKeys = window.getLayoutKeyCodes(layoutKey).size || 1;
        const cleanedCount = [...this.cleanedKeys].filter(code =>
            window.getLayoutKeyCodes(layoutKey).has(code)
        ).length;
        const coverage = Math.min(100, Math.round((cleanedCount / totalKeys) * 100));

        let grade = 'C';
        let gradeTitle = 'Surface Dusting';
        if (coverage >= 100 && this.totalWipes >= totalKeys * 2) {
            grade = 'SSS';
            gradeTitle = 'Pristine Masterpiece!';
        } else if (coverage >= 100) {
            grade = 'S';
            gradeTitle = 'Spotless Clean!';
        } else if (coverage >= 85) {
            grade = 'A';
            gradeTitle = 'Thorough Sanitization';
        } else if (coverage >= 60) {
            grade = 'B';
            gradeTitle = 'Moderate Clean';
        }

        return {
            durationSeconds: this.elapsedSeconds,
            formattedDuration: this.formatTime(this.elapsedSeconds),
            keysCleaned: cleanedCount,
            totalKeys: totalKeys,
            coveragePct: coverage,
            totalWipes: this.totalWipes,
            peakRollover: this.peakRollover,
            grade: grade,
            gradeTitle: gradeTitle
        };
    }

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
}

window.cleanerEngine = new KeyCleanerEngine();
