/**
 * POWERNEX 2026 | Interactive High-Voltage Canvas
 * Topographic grid, charge particles, and reactive electric lightning sparks
 */

(function () {
  const canvas = document.getElementById('electric-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;
  let mouse = { x: -1000, y: -1000, isOver: false };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class ChargeParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.3 ? '#00f0ff' : '#f59e0b';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // React to mouse cursor repulsion/attraction
      if (mouse.isOver) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * 1.5;
          this.y += Math.sin(angle) * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new ChargeParticle());
    }
  }

  function drawLightning(x1, y1, x2, y2, color, alpha) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);

    // Add jagged midpoint for electric arc effect
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 6;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 6;

    ctx.lineTo(midX, midY);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect particles with electric arcs
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          const lineColor = particles[i].color === particles[j].color ? particles[i].color : 'rgba(0, 240, 255, 0.4)';
          drawLightning(particles[i].x, particles[i].y, particles[j].x, particles[j].y, lineColor, alpha * 0.35);
        }
      }

      // Connect to mouse if nearby
      if (mouse.isOver) {
        const mdx = mouse.x - particles[i].x;
        const mdy = mouse.y - particles[i].y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
          const alpha = 1 - mDist / 160;
          drawLightning(particles[i].x, particles[i].y, mouse.x, mouse.y, '#00f0ff', alpha * 0.6);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isOver = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isOver = false;
  });

  resize();
  initParticles();
  animate();
})();
