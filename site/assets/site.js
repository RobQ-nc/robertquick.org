// Shared chrome JS — matrix rain (orange-tinted), live clock, telemetry ticker.

(function() {
  // Live clock
  const clock = document.getElementById('clock');
  if (clock) {
    function pad(n) { return n.toString().padStart(2, '0'); }
    function tick() {
      const d = new Date();
      clock.textContent = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }
    tick(); setInterval(tick, 1000);
  }

  // Telemetry ticker
  const tickerEl = document.getElementById('ticker');
  if (tickerEl) {
    const lines = [
      '// SIGNAL NOMINAL', '// ENTROPY 0.47 — DRIFTING', '// COHERENCE OK',
      '// MAP::TERRITORY DELTA RISING', '// 7/8 LOCK STABLE',
      '// CRITIQUE BANDWIDTH NARROW', '// HYPERREAL INDEX 0.91',
      '// PARADOX PRESSURE NOMINAL', '// SIMULATION DEPTH ∞',
      '// REFERENT NOT FOUND', '// ECHO INTEGRITY 0.84',
      '// SUBJECT/OBJECT GAP 7.8 NM',
    ];
    tickerEl.textContent = lines.concat(lines).join('   ·   ');
  }

  // Matrix rain (orange-tinted, very faint — content pages)
  const canvas = document.getElementById('rain');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, cols, drops;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF∂∫∑∏√∞≠≤≥∈∉⊂⊃';
    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.floor(W / 22);
      drops = Array.from({length: cols}, () => Math.random() * -80);
    }
    function draw() {
      ctx.fillStyle = 'rgba(2,6,10,0.07)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = '14px "Share Tech Mono", monospace';
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 22, y = drops[i] * 22;
        if (Math.random() < 0.02)       ctx.fillStyle = '#ffae5e';
        else if (Math.random() < 0.04)  ctx.fillStyle = 'rgba(88,225,255,0.7)';
        else                            ctx.fillStyle = 'rgba(255,140,26,0.45)';
        ctx.fillText(ch, x, y);
        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener('resize', init);
  }
})();
