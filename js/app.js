/**
 * POWERNEX 26 | Main Application Controller
 * Handles Navigation Scrollspy, DaisyUI Theme Controller, Countdown, Rulebook Filters, FAQ Accordion & Calendar
 * SFX Engine and Moving Canvas have been completely removed.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // FAST FAIL-SAFE PRELOADER DISMISSAL
  // ==========================================================================
  const preloader = document.getElementById('site-preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 300);
    } else {
      window.addEventListener('load', hidePreloader);
      // Hard fail-safe: never wait more than 900ms under any network condition
      setTimeout(hidePreloader, 900);
    }
  }


  // ==========================================================================
  // PEEK RATING COMPONENT (React Bits vanilla implementation)
  // ==========================================================================
  (function initPeekRating() {
    const container = document.getElementById('peek-rating-container');
    const feedbackText = document.getElementById('rating-feedback-display');
    if (!container) return;

    const count = 5;
    const labels = ['Poor', 'Fair', 'Good', 'Great', 'Superb'];
    const size = 32;
    const lift = 7;
    const magnify = 1.15;
    let currentValue = parseInt(localStorage.getItem('powernex26_symposium_rating') || '0', 10);
    let hoverIndex = null;
    let isSettled = false;

    // Build DOM
    const root = document.createElement('div');
    root.className = 'peek-rating';
    root.setAttribute('role', 'radiogroup');
    root.setAttribute('aria-label', 'Rating');

    const row = document.createElement('div');
    row.className = 'peek-rating__row';

    const tip = document.createElement('span');
    tip.className = 'peek-rating__tip';
    tip.setAttribute('aria-hidden', 'true');
    row.appendChild(tip);

    const stars = [];
    const lifts = [];
    const glyphs = [];

    const starSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/></svg>`;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'peek-rating__star';
      star.setAttribute('role', 'radio');
      star.setAttribute('aria-checked', currentValue === i + 1 ? 'true' : 'false');
      star.setAttribute('aria-label', `${i + 1} of ${count}, ${labels[i]}`);
      star.tabIndex = currentValue === 0 ? (i === 0 ? 0 : -1) : (currentValue === i + 1 ? 0 : -1);

      const liftSpan = document.createElement('span');
      liftSpan.className = 'peek-rating__lift';

      const glyphSpan = document.createElement('span');
      glyphSpan.className = 'peek-rating__glyph';
      glyphSpan.innerHTML = starSvg;
      glyphSpan.dataset.lit = i < currentValue ? 'true' : 'false';

      liftSpan.appendChild(glyphSpan);
      star.appendChild(liftSpan);
      row.appendChild(star);

      stars.push(star);
      lifts.push(liftSpan);
      glyphs.push(glyphSpan);

      // Event listeners
      star.addEventListener('pointerenter', () => setHover(i));
      star.addEventListener('click', () => commitRating(i + 1));
    }

    row.addEventListener('pointerleave', () => setHover(null));

    root.appendChild(row);
    container.appendChild(root);

    function updateDisplay() {
      const previewing = hoverIndex !== null && !isSettled;
      const shown = previewing ? hoverIndex + 1 : currentValue;

      for (let i = 0; i < count; i++) {
        const lifted = previewing && i <= hoverIndex;
        lifts[i].style.transform = lifted
          ? `translateY(${-lift}px) scale(${i === hoverIndex ? magnify : 1})`
          : 'translateY(0px) scale(1)';
        glyphs[i].dataset.lit = i < shown ? 'true' : 'false';
        stars[i].setAttribute('aria-checked', currentValue === i + 1 ? 'true' : 'false');
      }

      if (previewing) {
        tip.textContent = labels[hoverIndex] || String(hoverIndex + 1);
        const slot = row.clientWidth / count || size + 8;
        tip.style.transform = `translate(calc(${slot * (hoverIndex + 0.5)}px - 50%), 0)`;
        tip.dataset.show = 'true';
      } else {
        tip.dataset.show = 'false';
      }

      if (currentValue > 0 && !previewing) {
        feedbackText.textContent = `You rated POWERNEX 26: ${currentValue}/5 - ${labels[currentValue - 1]}!`;
        feedbackText.classList.add('success');
      }
    }

    function setHover(idx) {
      if (idx === hoverIndex) return;
      hoverIndex = idx;
      if (idx !== null) isSettled = false;
      updateDisplay();
    }

    function commitRating(val) {
      if (currentValue === val) {
        currentValue = 0;
        localStorage.removeItem('powernex26_symposium_rating');
        feedbackText.textContent = 'Select rating to commit feedback';
        feedbackText.classList.remove('success');
      } else {
        currentValue = val;
        localStorage.setItem('powernex26_symposium_rating', String(val));
        feedbackText.textContent = `Thank you! Committed: ${currentValue}/5 - ${labels[currentValue - 1]}!`;
        feedbackText.classList.add('success');

        // Pop Scale Animation on committed glyph
        const glyph = glyphs[val - 1];
        if (glyph && typeof glyph.animate === 'function') {
          glyph.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.35)', offset: 0.35 },
            { transform: 'scale(1)' }
          ], { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
        }
      }

      isSettled = true;
      updateDisplay();
    }

    updateDisplay();
  })();


  // ==========================================================================
  // INTERACTIVE CIRCUIT BREAKER CONSOLE LOGIC
  // ==========================================================================
  const tripBtn = document.getElementById('breaker-trip-btn');
  const meterV = document.getElementById('meter-voltage');
  const meterI = document.getElementById('meter-current');
  const meterF = document.getElementById('meter-freq');
  const statusBadge = document.getElementById('grid-status-badge');
  const ledDot = document.getElementById('breaker-led');
  const statusText = document.getElementById('breaker-status-text');
  const btnLabel = document.getElementById('breaker-btn-label');

  let isTripped = false;

  if (tripBtn) {
    tripBtn.addEventListener('click', () => {
      isTripped = !isTripped;

      if (isTripped) {
        // Breaker Tripped State
        meterV.textContent = '0.0 V';
        meterI.textContent = '0.0 A';
        meterF.textContent = '0.00 Hz';
        meterV.classList.add('zero');
        meterI.classList.add('zero');
        meterF.classList.add('zero');

        statusBadge.classList.add('tripped');
        ledDot.className = 'breaker-led-dot red';
        statusText.textContent = 'BREAKER TRIPPED';

        tripBtn.classList.add('reset-state');
        btnLabel.textContent = 'RESET & RE-ENERGIZE';

        // Trigger violent electrical sparks on trip
        const rect = tripBtn.getBoundingClientRect();
        if (typeof triggerMajorStrike === 'function') {
          triggerMajorStrike(rect.left + rect.width / 2, rect.top);
        }
      } else {
        // Restored State
        meterV.textContent = '415.2 V';
        meterI.textContent = '18.4 A';
        meterF.textContent = '50.02 Hz';
        meterV.classList.remove('zero');
        meterI.classList.remove('zero');
        meterF.classList.remove('zero');

        statusBadge.classList.remove('tripped');
        ledDot.className = 'breaker-led-dot green';
        statusText.textContent = 'FEEDER ONLINE';

        tripBtn.classList.remove('reset-state');
        btnLabel.textContent = 'TRIP CIRCUIT BREAKER';
      }

      if (window.lucide) window.lucide.createIcons();
    });
  }


  // ==========================================================================
  // HYPER-REALISTIC MULTI-FRAME LIGHTNING PHYSICS ENGINE
  // Stepped Leader -> Return Stroke -> Multi-Dart Flickers -> Thermal Afterglow
  // Optimized for 60/120fps mobile performance with zero scroll lag
  // ==========================================================================
  (function initRealisticLightningPhysics() {
    const canvas = document.getElementById('lightning-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const activeBolts = [];
    let skyFlash = { alpha: 0, x: width / 2, y: 0, radius: width * 0.8 };
    let isLoopRunning = false;

    // Fractal lightning path generator with natural plasma jitter
    function generateBoltPath(sx, sy, ex, ey, roughness = 32, depth = 0, maxDepth = 6) {
      if (depth >= maxDepth) {
        return [{ x: sx, y: sy }, { x: ex, y: ey }];
      }

      const midX = (sx + ex) / 2;
      const midY = (sy + ey) / 2;
      const dx = ex - sx;
      const dy = ey - sy;
      const dist = Math.hypot(dx, dy);

      const nx = -dy / (dist || 1);
      const ny = dx / (dist || 1);
      const offset = (Math.random() - 0.5) * roughness;

      const subMidX = midX + nx * offset;
      const subMidY = midY + ny * offset;

      const left = generateBoltPath(sx, sy, subMidX, subMidY, roughness * 0.62, depth + 1, maxDepth);
      const right = generateBoltPath(subMidX, subMidY, ex, ey, roughness * 0.62, depth + 1, maxDepth);

      return left.slice(0, -1).concat(right);
    }

    class RealisticBolt {
      constructor(sx, sy, ex, ey, isBranch = false, branchDelay = 0) {
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
        this.isBranch = isBranch;
        this.branchDelay = branchDelay;

        this.age = 0;
        this.segments = generateBoltPath(sx, sy, ex, ey, isBranch ? 22 : 42, 0, isBranch ? 5 : (isMobile ? 5 : 6));
        this.totalSegments = this.segments.length;
        
        this.steppedSpeed = isBranch ? 4 : 5;
        this.visibleCount = isBranch ? 0 : 2;
        this.hasStruck = false;

        this.returnStrokeAge = 0;
        this.flickerPattern = [1.0, 0.45, 0.95, 0.3, 0.75, 0.2, 0.5, 0.35, 0.25, 0.15, 0.08, 0.03, 0];
        this.flickerIdx = 0;
        this.done = false;

        this.branches = [];
        if (!isBranch && !isMobile) {
          const branchCount = 2 + Math.floor(Math.random() * 2);
          for (let b = 0; b < branchCount; b++) {
            const segIdx = Math.floor(this.totalSegments * (0.25 + (b / branchCount) * 0.5));
            if (segIdx < this.totalSegments) {
              const node = this.segments[segIdx];
              const angle = Math.atan2(ey - sy, ex - sx) + (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.4);
              const branchLen = Math.hypot(ex - sx, ey - sy) * (0.22 + Math.random() * 0.25);
              const bx = node.x + Math.cos(angle) * branchLen;
              const by = node.y + Math.sin(angle) * branchLen;
              const delay = Math.floor(segIdx / this.steppedSpeed);
              this.branches.push(new RealisticBolt(node.x, node.y, bx, by, true, delay));
            }
          }
        }
      }

      update() {
        this.age++;

        if (this.branchDelay > 0) {
          this.branchDelay--;
          return;
        }

        if (this.visibleCount < this.totalSegments) {
          this.visibleCount += this.steppedSpeed;
          if (this.visibleCount >= this.totalSegments) {
            this.visibleCount = this.totalSegments;
            this.hasStruck = true;
            if (!this.isBranch) {
              skyFlash = {
                alpha: 0.22,
                x: this.sx + (this.ex - this.sx) * 0.4,
                y: Math.max(0, this.sy),
                radius: Math.max(width, height) * 0.85
              };
            }
          }
        } else {
          this.flickerIdx++;
          if (this.flickerIdx >= this.flickerPattern.length) {
            this.done = true;
          }
        }

        for (let i = 0; i < this.branches.length; i++) {
          this.branches[i].update();
        }
      }

      draw(ctx) {
        if (this.branchDelay > 0 || this.visibleCount < 2) return;

        let brightness = 1.0;
        if (!this.hasStruck) {
          brightness = 0.55 + Math.random() * 0.35;
        } else {
          brightness = this.flickerPattern[Math.min(this.flickerIdx, this.flickerPattern.length - 1)] || 0;
        }

        if (brightness <= 0.01) return;

        ctx.save();
        const jitter = this.hasStruck && this.flickerIdx < 6 ? (Math.random() - 0.5) * 1.5 : 0;
        const count = Math.min(this.visibleCount, this.totalSegments);

        // On mobile, skip heavy shadowBlur for 60/120fps silky smoothness
        const useShadow = !isMobile;

        // PASS 1: Broad Corona Glow
        ctx.globalAlpha = Math.min(1.0, brightness * 0.9);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = (this.isBranch ? 3.0 : 6.0) * brightness;
        if (useShadow) {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = (this.isBranch ? 14 : 28) * brightness;
        }
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x + jitter, this.segments[0].y + jitter);
        for (let i = 1; i < count; i++) {
          ctx.lineTo(this.segments[i].x + jitter, this.segments[i].y + jitter);
        }
        ctx.stroke();

        // PASS 2: Mid Ionization Channel
        ctx.globalAlpha = Math.min(1.0, brightness * 0.95);
        ctx.strokeStyle = '#a5f3fc';
        ctx.lineWidth = (this.isBranch ? 1.8 : 3.4) * brightness;
        if (useShadow) {
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = (this.isBranch ? 8 : 16) * brightness;
        }

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x + jitter, this.segments[0].y + jitter);
        for (let i = 1; i < count; i++) {
          ctx.lineTo(this.segments[i].x + jitter, this.segments[i].y + jitter);
        }
        ctx.stroke();

        // PASS 3: White Core Filament
        ctx.globalAlpha = Math.min(1.0, brightness);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = (this.isBranch ? 1.0 : 1.8) * brightness;
        if (useShadow) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6;
        }

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x + jitter, this.segments[0].y + jitter);
        for (let i = 1; i < count; i++) {
          ctx.lineTo(this.segments[i].x + jitter, this.segments[i].y + jitter);
        }
        ctx.stroke();

        ctx.restore();

        for (let i = 0; i < this.branches.length; i++) {
          this.branches[i].draw(ctx);
        }
      }

      isDead() {
        if (!this.done) return false;
        return this.branches.every(b => b.isDead());
      }
    }

    function ensureLoopRunning() {
      if (!isLoopRunning) {
        isLoopRunning = true;
        requestAnimationFrame(loop);
      }
    }

    // Trigger realistic lightning bolt
    function triggerRealisticStrike(targetX, targetY) {
      if (typeof targetX === 'number' && typeof targetY === 'number') {
        const sx = targetX + (Math.random() - 0.5) * 240;
        const sy = Math.max(-20, targetY - 380 - Math.random() * 200);
        activeBolts.push(new RealisticBolt(sx, sy, targetX, targetY));
        ensureLoopRunning();
        return;
      }

      const style = Math.random();
      let sx, sy, ex, ey;

      if (style < 0.65) {
        sx = width * (0.12 + Math.random() * 0.76);
        sy = -30;
        ex = sx + (Math.random() - 0.5) * (width * 0.4);
        ey = height * (0.38 + Math.random() * 0.52);
      } else {
        const fromLeft = Math.random() > 0.5;
        sx = fromLeft ? -30 : width + 30;
        sy = height * (0.08 + Math.random() * 0.45);
        ex = width * (0.2 + Math.random() * 0.6);
        ey = sy + (Math.random() - 0.5) * 320;
      }

      activeBolts.push(new RealisticBolt(sx, sy, ex, ey));
      ensureLoopRunning();
    }

    // Interactive strike on mouse click ONLY (prevents mobile touch scroll lag)
    window.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && !e.target.closest('a') && !e.target.closest('button') && !e.target.closest('input')) {
        triggerRealisticStrike(e.clientX, e.clientY);
      }
    }, { passive: true });

    // Expose breaker trigger
    window.triggerMajorStrike = (x, y) => {
      triggerRealisticStrike(x, y);
      setTimeout(() => triggerRealisticStrike(x + 20, y + 10), 160);
    };

    // Idle-aware animation loop: stops when resting, saves 100% idle CPU/GPU
    function loop() {
      if (activeBolts.length === 0 && skyFlash.alpha <= 0.005) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isLoopRunning = false;
        return;
      }

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Atmospheric thunder flash radial glow
      if (skyFlash.alpha > 0.005) {
        ctx.save();
        const grad = ctx.createRadialGradient(
          skyFlash.x, skyFlash.y, 0,
          skyFlash.x, skyFlash.y, skyFlash.radius
        );
        grad.addColorStop(0, `rgba(0, 240, 255, ${skyFlash.alpha * 0.75})`);
        grad.addColorStop(0.4, `rgba(37, 99, 235, ${skyFlash.alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        skyFlash.alpha *= 0.82;
      }

      // Update and draw lightning bolts
      ctx.globalCompositeOperation = 'lighter';

      for (let i = activeBolts.length - 1; i >= 0; i--) {
        const bolt = activeBolts[i];
        bolt.update();
        bolt.draw(ctx);
        if (bolt.isDead()) {
          activeBolts.splice(i, 1);
        }
      }

      ctx.restore();
      requestAnimationFrame(loop);
    }

    // Initial welcoming double lightning strike on page load
    setTimeout(() => {
      triggerRealisticStrike();
      setTimeout(triggerRealisticStrike, 190);
    }, 600);

    // Natural atmospheric strike schedule (low overhead)
    setInterval(() => {
      if (document.hidden) return;
      if (Math.random() < (isMobile ? 0.35 : 0.65)) {
        triggerRealisticStrike();
      }
    }, isMobile ? 7000 : 3800);
  })();

  // ==========================================================================
  // EVENTS TRACK TABS CONTROLLER (TECHNICAL & NON-TECHNICAL TABS)
  // ==========================================================================
  const trackTabBtns = document.querySelectorAll('.event-track-tab-btn');
  const trackPanels = document.querySelectorAll('.events-tab-panel');

  function switchEventTrack(trackName) {
    trackTabBtns.forEach(b => {
      const isMatch = b.getAttribute('data-track') === trackName;
      b.classList.toggle('active', isMatch);
      b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    if (trackName === 'all') {
      trackPanels.forEach(p => p.classList.add('active'));
    } else {
      trackPanels.forEach(p => {
        if (p.id === `panel-${trackName}`) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  trackTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.getAttribute('data-track');
      switchEventTrack(track);
    });
  });

  // Automatically activate corresponding tab if user clicks navbar #technical or #non-technical
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash === '#technical') switchEventTrack('technical');
    if (hash === '#non-technical') switchEventTrack('non-technical');
  });

  if (window.location.hash === '#non-technical') {
    switchEventTrack('non-technical');
  }


  
  // ==========================================================================
  // SECTION FADE-IN & FADE-OUT EVERY TIME (Requirement 7)
  // ==========================================================================
  const fadeSections = document.querySelectorAll('.section-fade-in, section[id]');
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeSections.forEach(sec => {
      sec.classList.add('section-fade-in');
      fadeObserver.observe(sec);
    });
  } else {
    fadeSections.forEach(sec => sec.classList.add('is-visible'));
  }

  // ==========================================================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showShareToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      if (window.lucide) { window.lucide.createIcons(); }
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }
  }

  // ==========================================================================
  // OFFICIAL SHARE & COPY LINK HANDLER (https://powernex26.vercel.app)
  // ==========================================================================
  const OFFICIAL_SHARE_URL = 'https://powernex26.vercel.app';
  const copyBtn = document.getElementById('copy-site-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(OFFICIAL_SHARE_URL).then(() => {
          showShareToast('Copied: ' + OFFICIAL_SHARE_URL);
        }).catch(() => {
          prompt('Copy official symposium link:', OFFICIAL_SHARE_URL);
        });
      } else {
        prompt('Copy official symposium link:', OFFICIAL_SHARE_URL);
      }
    });
  }

  const shareBtn = document.getElementById('site-share-btn');
  const shareContainer = document.getElementById('hero-share-container');
  if (shareBtn && shareContainer) {
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // If on mobile browser with native Web Share support
      if (navigator.share && window.innerWidth <= 768) {
        navigator.share({
          title: 'POWERNEX 26',
          text: 'Join POWERNEX 26 - National Level Technical Symposium at University College of Engineering Ariyalur! Think Electric. Think Future. Be the Change!',
          url: OFFICIAL_SHARE_URL
        }).catch(() => {});
      } else {
        shareContainer.classList.toggle('is-open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!shareContainer.contains(e.target)) {
        shareContainer.classList.remove('is-open');
      }
    });
  }

  const mobileDrawerShareBtn = document.getElementById('mobile-share-link-trigger');
  if (mobileDrawerShareBtn) {
    mobileDrawerShareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({
          title: 'POWERNEX 26',
          text: 'Join POWERNEX 26 - National Level Technical Symposium at University College of Engineering Ariyalur! Think Electric. Think Future. Be the Change!',
          url: OFFICIAL_SHARE_URL
        }).catch(() => {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(OFFICIAL_SHARE_URL).then(() => {
          showShareToast('Copied: ' + OFFICIAL_SHARE_URL);
        });
      } else {
        prompt('Copy official symposium link:', OFFICIAL_SHARE_URL);
      }
    });
  }

  // Mobile Tap-To-Flip Card Support (Clean Tap vs Scroll Detection)
  document.querySelectorAll('.flip-card').forEach(card => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    card.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (e.changedTouches && e.changedTouches[0]) {
        const t = e.changedTouches[0];
        const dist = Math.hypot(t.clientX - touchStartX, t.clientY - touchStartY);
        const elapsed = Date.now() - touchStartTime;

        // Clean deliberate tap (not a drag or scroll gesture)
        if (dist < 12 && elapsed < 500) {
          card.classList.toggle('is-flipped');
        }
      }
    });

    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        card.classList.toggle('is-flipped');
      }
    });
  });




  const REG_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf4ZvPh7lYtd8h5oPpaSLUJMSXtntyTyIukRaRylSjwKcnkEQ/viewform?pli=1";

  // ==========================================================================
  // 1. SCROLLSPY & NAVBAR SCROLL STATE
  // ==========================================================================
  const navbar = document.getElementById('power-nav');
  const navLinks = document.querySelectorAll('.nav-link-btn');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  let isScrollTicking = false;

  function updateScrollState() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 300);
    }

    let currentSectionId = '';
    const triggerPoint = window.innerHeight * 0.35;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
        currentSectionId = sections[i].getAttribute('id');
        break;
      }
    }

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSectionId);
      });
    }
  }

  window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
      requestAnimationFrame(() => {
        updateScrollState();
        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  }, { passive: true });
  updateScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 2. DAISYUI THEME CONTROLLER (AMOLED / SYNTHWAVE)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('synthwave-theme');
      } else {
        document.body.classList.remove('synthwave-theme');
      }
    });
  }

  // ==========================================================================
  // 3. TYPEWRITER EFFECT (OFFICIAL EEE SLOGANS)
  // ==========================================================================
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const phrases = [
      "THINK ELECTRIC. THINK FUTURE. BE THE CHANGE!",
      "POWERING INNOVATION FOR A BETTER TOMORROW",
      "08 OCTOBER 2026 • CAMPUS AUDITORIUM, UCE ARIYALUR",
      "RS. 150 PER PARTICIPANT • ALL 6 EVENTS + HOT LUNCH",
      "CASH PRIZES + OVERALL CHAMPIONSHIP TROPHY"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
      }

      let typeSpeed = isDeleting ? 25 : 60;

      if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // ==========================================================================
  // 4. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileCloseBtn = document.getElementById('mobile-drawer-close');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ==========================================================================
  // 5. LIVE COUNTDOWN TIMER (08 OCTOBER 2026 08:30 IST)
  // Updates CSS variables --value for DaisyUI Countdown Component
  // ==========================================================================
  const targetDate = new Date("2026-10-08T08:30:00+05:30").getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minEl = document.getElementById('cd-min');
  const secEl = document.getElementById('cd-sec');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) {{ daysEl.style.setProperty('--value', '0'); daysEl.textContent = '0'; }}
      if (hoursEl) {{ hoursEl.style.setProperty('--value', '0'); hoursEl.textContent = '0'; }}
      if (minEl) {{ minEl.style.setProperty('--value', '0'); minEl.textContent = '0'; }}
      if (secEl) {{ secEl.style.setProperty('--value', '0'); secEl.textContent = '0'; }}
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) {{ daysEl.style.setProperty('--value', String(days)); daysEl.textContent = String(days); }}
    if (hoursEl) {{ hoursEl.style.setProperty('--value', String(hours)); hoursEl.textContent = String(hours); }}
    if (minEl) {{ minEl.style.setProperty('--value', String(minutes)); minEl.textContent = String(minutes); }}
    if (secEl) {{ secEl.style.setProperty('--value', String(seconds)); secEl.textContent = String(seconds); }}
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 6. RULEBOOK FILTER TABS
  // ==========================================================================
  const ruleTabs = document.querySelectorAll('.rule-tab-btn');
  const ruleCards = document.querySelectorAll('.rulebook-card');

  ruleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ruleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-rule-filter');

      ruleCards.forEach(card => {
        const category = card.getAttribute('data-rule-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 7. FAQ ACCORDION & CATEGORY FILTERS
  // ==========================================================================
  const faqTabs = document.querySelectorAll('.faq-filter-btn');
  const faqCards = document.querySelectorAll('.faq-card-item');

  faqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      faqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-faq-filter');

      faqCards.forEach(card => {
        const category = card.getAttribute('data-faq-cat');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  faqCards.forEach(card => {
    const trigger = card.querySelector('.faq-trigger-btn');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        faqCards.forEach(c => c.classList.remove('open'));
        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });

  // ==========================================================================
  // 8. ADD TO GOOGLE CALENDAR
  // ==========================================================================
  const calendarBtn = document.getElementById('add-calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      const title = encodeURIComponent("POWERNEX 26 | EEE Technical Symposium | Anna University Ariyalur");
      const details = encodeURIComponent("POWERNEX 26 is a National Level Technical Symposium organized by the Department of Electrical and Electronics Engineering, University College of Engineering, Ariyalur (Anna University).\n\nTagline: Think Electric. Think Future. Be the Change!\nTime: 8:30 AM - 5:00 PM\nLocation: Campus Auditorium, University College of Engineering, Ariyalur.\nFee: Rs. 150 per participant.\nRegistration: " + REG_URL);
      const location = encodeURIComponent("Campus Auditorium, University College of Engineering, Ariyalur, Tamil Nadu");
      const startDate = "20261008T030000Z";
      const endDate = "20261008T113000Z";

      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${{title}}&dates=${{startDate}}/${{endDate}}&details=${{details}}&location=${{location}}`;
      window.open(calendarUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
});
