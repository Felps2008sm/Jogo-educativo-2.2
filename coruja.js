// =============================
// CORUJA COSMICA - Canvas Animation
// =============================

var canvas = document.getElementById("cosmicCanvas");
var ctx = canvas.getContext("2d");

var W, H, centerX, centerY, scale;
var time = 0;
var glowIntensity = 0;
var glowTarget = 0;
var particles = [];
var stars = [];
var touchRipples = [];

function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    centerX = W / 2;
    centerY = H / 2;
    scale = Math.min(W, H) / 600;
    initStars();
}

// =============================
// STARS
// =============================
function initStars() {
    stars = [];
    for (var i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.5 + 0.1,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function drawStars() {
    for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var alpha = 0.3 + 0.7 * Math.abs(Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + alpha + ")";
        ctx.fill();
    }
}

// =============================
// NEBULA BACKGROUND
// =============================
function drawNebula() {
    var grad = ctx.createRadialGradient(
        centerX, centerY - 50 * scale, 0,
        centerX, centerY - 50 * scale, 300 * scale
    );
    grad.addColorStop(0, "rgba(123, 47, 247, 0.08)");
    grad.addColorStop(0.5, "rgba(0, 198, 255, 0.04)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
}

// =============================
// OWL BODY (Fractal Neon Lines)
// =============================
function drawOwlBody() {
    ctx.save();
    ctx.translate(centerX, centerY);

    var baseGlow = 0.5 + glowIntensity * 0.5;

    ctx.strokeStyle = "rgba(123, 47, 247," + (0.6 * baseGlow) + ")";
    ctx.lineWidth = 2 * scale;
    ctx.shadowColor = "#7b2ff7";
    ctx.shadowBlur = 15 * scale * baseGlow;

    ctx.beginPath();
    for (var i = 0; i <= 360; i += 2) {
        var angle = (i * Math.PI) / 180;
        var r = 100 * scale;

        var bodyMod = 1 + 0.3 * Math.cos(angle * 2) - 0.15 * Math.cos(angle);
        var earL = Math.max(0, Math.cos(angle - 0.7) * Math.sin(angle - 0.7));
        var earR = Math.max(0, Math.cos(angle + 0.7) * Math.sin(angle + 0.7));
        var ears = (earL + earR) * 30 * scale;

        var breathe = Math.sin(time * 1.5) * 3 * scale;
        var fractal = Math.sin(angle * 8 + time * 2) * 3 * scale;

        var finalR = r * bodyMod + ears + breathe + fractal;

        var px = Math.cos(angle) * finalR;
        var py = Math.sin(angle) * finalR - 20 * scale;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    // Inner fractal lines
    ctx.strokeStyle = "rgba(0, 198, 255," + (0.3 * baseGlow) + ")";
    ctx.lineWidth = 1 * scale;
    ctx.shadowColor = "#00c6ff";
    ctx.shadowBlur = 10 * scale;

    for (var ring = 0; ring < 3; ring++) {
        ctx.beginPath();
        var ringScale = 0.7 - ring * 0.2;
        for (var i = 0; i <= 360; i += 3) {
            var angle = (i * Math.PI) / 180;
            var r = 100 * scale * ringScale;
            var mod = 1 + 0.2 * Math.cos(angle * (3 + ring) + time * (1 + ring * 0.5));
            var px = Math.cos(angle) * r * mod;
            var py = Math.sin(angle) * r * mod - 20 * scale;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Chest feather pattern
    ctx.strokeStyle = "rgba(0, 255, 136," + (0.2 + glowIntensity * 0.15) + ")";
    ctx.lineWidth = 1 * scale;
    ctx.shadowBlur = 5 * scale;
    ctx.shadowColor = "#00ff88";
    for (var row = 0; row < 5; row++) {
        for (var col = -1; col <= 1; col++) {
            var cx = col * 20 * scale;
            var cy = 20 * scale + row * 18 * scale;
            var sz = 8 * scale;
            ctx.beginPath();
            ctx.moveTo(cx - sz, cy - sz * 0.5);
            ctx.lineTo(cx, cy + sz * 0.5);
            ctx.lineTo(cx + sz, cy - sz * 0.5);
            ctx.stroke();
        }
    }

    ctx.restore();
}

// =============================
// OWL EYES
// =============================
function drawOwlEyes() {
    ctx.save();
    ctx.translate(centerX, centerY);

    var eyeY = -45 * scale;
    var eyeSpacing = 35 * scale;
    var eyeRadius = 22 * scale;
    var pupilRadius = 10 * scale;
    var baseGlow = 0.6 + glowIntensity * 0.4;

    for (var side = -1; side <= 1; side += 2) {
        var ex = side * eyeSpacing;

        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeRadius + 5 * scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(123, 47, 247," + (0.4 * baseGlow) + ")";
        ctx.lineWidth = 2 * scale;
        ctx.shadowColor = "#7b2ff7";
        ctx.shadowBlur = 20 * scale * baseGlow;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeRadius, 0, Math.PI * 2);
        var eyeGrad = ctx.createRadialGradient(ex, eyeY, 0, ex, eyeY, eyeRadius);
        eyeGrad.addColorStop(0, "rgba(255, 200, 0," + (0.9 * baseGlow) + ")");
        eyeGrad.addColorStop(0.6, "rgba(255, 120, 0," + (0.7 * baseGlow) + ")");
        eyeGrad.addColorStop(1, "rgba(123, 47, 247," + (0.3 * baseGlow) + ")");
        ctx.fillStyle = eyeGrad;
        ctx.shadowColor = glowIntensity > 0.5 ? "#ffcc00" : "#ff8800";
        ctx.shadowBlur = 25 * scale * baseGlow;
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 180, 0," + (0.3 * baseGlow) + ")";
        ctx.lineWidth = 0.5 * scale;
        ctx.shadowBlur = 0;
        for (var r = 0; r < 12; r++) {
            var ra = (r * Math.PI * 2) / 12 + time * 0.3;
            ctx.beginPath();
            ctx.moveTo(ex + Math.cos(ra) * pupilRadius * 1.2, eyeY + Math.sin(ra) * pupilRadius * 1.2);
            ctx.lineTo(ex + Math.cos(ra) * eyeRadius * 0.85, eyeY + Math.sin(ra) * eyeRadius * 0.85);
            ctx.stroke();
        }

        var pupilScale = 1 - glowIntensity * 0.3;
        ctx.beginPath();
        ctx.arc(ex, eyeY, pupilRadius * pupilScale, 0, Math.PI * 2);
        ctx.fillStyle = "#0a0a1a";
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ex - 4 * scale, eyeY - 4 * scale, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + (0.7 + glowIntensity * 0.3) + ")";
        ctx.fill();

        if (glowIntensity > 0.3) {
            ctx.beginPath();
            ctx.arc(ex, eyeY, eyeRadius + 10 * scale * glowIntensity, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255, 200, 0," + (glowIntensity * 0.4) + ")";
            ctx.lineWidth = 2 * scale * glowIntensity;
            ctx.shadowColor = "#ffcc00";
            ctx.shadowBlur = 30 * scale * glowIntensity;
            ctx.stroke();
        }
    }

    // Beak
    ctx.beginPath();
    ctx.moveTo(0, -20 * scale);
    ctx.lineTo(-8 * scale, -10 * scale);
    ctx.lineTo(8 * scale, -10 * scale);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 180, 0," + (0.6 + glowIntensity * 0.2) + ")";
    ctx.shadowColor = "#ff8800";
    ctx.shadowBlur = 8 * scale;
    ctx.fill();

    ctx.restore();
}

// =============================
// WING LINES
// =============================
function drawWings() {
    ctx.save();
    ctx.translate(centerX, centerY);

    var wingFlap = Math.sin(time * 2) * 10 * scale;
    var baseGlow = 0.5 + glowIntensity * 0.3;

    for (var side = -1; side <= 1; side += 2) {
        ctx.strokeStyle = "rgba(0, 198, 255," + (0.4 * baseGlow) + ")";
        ctx.lineWidth = 1.5 * scale;
        ctx.shadowColor = "#00c6ff";
        ctx.shadowBlur = 12 * scale;

        ctx.beginPath();
        var startX = side * 80 * scale;
        var startY = -10 * scale;
        ctx.moveTo(startX, startY);

        var wingLen = 80 * scale;
        var endX = startX + side * wingLen;
        var endY = startY + wingFlap + 30 * scale;
        var cpX = startX + side * wingLen * 0.6;
        var cpY = startY - 40 * scale + wingFlap;

        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.stroke();

        for (var f = 0; f < 5; f++) {
            var t = 0.3 + f * 0.15;
            var fx = startX * (1 - t) * (1 - t) + 2 * cpX * (1 - t) * t + endX * t * t;
            var fy = startY * (1 - t) * (1 - t) + 2 * cpY * (1 - t) * t + endY * t * t;

            ctx.beginPath();
            ctx.moveTo(fx, fy);
            ctx.lineTo(fx + side * 15 * scale, fy + 20 * scale + Math.sin(time * 3 + f) * 5 * scale);
            ctx.strokeStyle = "rgba(123, 47, 247," + (0.25 * baseGlow) + ")";
            ctx.stroke();
        }
    }

    ctx.restore();
}

// =============================
// PARTICLES
// =============================
function spawnParticles(x, y, count) {
    for (var i = 0; i < count; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 2 + 0.5;
        var colors = ["#7b2ff7", "#00c6ff", "#ffcc00", "#00ff88", "#ff44aa"];
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: Math.random() * 0.015 + 0.008,
            r: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.life -= p.decay;
        if (p.life <= 0) particles.splice(i, 1);
    }
}

function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.8;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

function spawnAmbientParticles() {
    if (particles.length > 150) return;
    var angle = Math.random() * Math.PI * 2;
    var dist = 120 * scale + Math.random() * 60 * scale;
    particles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist - 20 * scale,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.2,
        life: 1,
        decay: Math.random() * 0.008 + 0.003,
        r: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "#7b2ff740" : "#00c6ff40"
    });
}

// =============================
// TOUCH RIPPLES
// =============================
function addRipple(x, y) {
    touchRipples.push({ x: x, y: y, r: 0, maxR: 80 * scale, alpha: 1 });
}

function updateRipples() {
    for (var i = touchRipples.length - 1; i >= 0; i--) {
        var r = touchRipples[i];
        r.r += 2;
        r.alpha -= 0.02;
        if (r.alpha <= 0) touchRipples.splice(i, 1);
    }
}

function drawRipples() {
    for (var i = 0; i < touchRipples.length; i++) {
        var r = touchRipples[i];
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(123, 47, 247," + r.alpha * 0.5 + ")";
        ctx.lineWidth = 2 * scale;
        ctx.shadowColor = "#7b2ff7";
        ctx.shadowBlur = 10;
        ctx.stroke();
    }
    ctx.shadowBlur = 0;
}

// =============================
// FRACTAL RINGS
// =============================
function drawFractalRings() {
    ctx.save();
    ctx.translate(centerX, centerY - 20 * scale);

    for (var i = 0; i < 3; i++) {
        var r = (150 + i * 40) * scale;
        var rotation = time * (0.2 + i * 0.1) * (i % 2 === 0 ? 1 : -1);

        ctx.strokeStyle = "rgba(123, 47, 247," + (0.08 + glowIntensity * 0.05) + ")";
        ctx.lineWidth = 1 * scale;

        ctx.beginPath();
        for (var a = 0; a < 360; a += 5) {
            var angle = (a * Math.PI) / 180 + rotation;
            var mod = r + Math.sin(angle * 6 + time) * 10 * scale;
            var px = Math.cos(angle) * mod;
            var py = Math.sin(angle) * mod;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        for (var d = 0; d < 8; d++) {
            var da = (d * Math.PI * 2) / 8 + rotation;
            var dx = Math.cos(da) * r;
            var dy = Math.sin(da) * r;
            ctx.beginPath();
            ctx.arc(dx, dy, 2 * scale, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 198, 255," + (0.3 + glowIntensity * 0.2) + ")";
            ctx.fill();
        }
    }

    ctx.restore();
}

// =============================
// INPUT HANDLING
// =============================
function handleInteraction(x, y) {
    glowTarget = 1;
    setTimeout(function() { glowTarget = 0; }, 1500);
    spawnParticles(x, y, 20);
    addRipple(x, y);
}

canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    for (var i = 0; i < e.touches.length; i++) {
        handleInteraction(e.touches[i].clientX, e.touches[i].clientY);
    }
}, { passive: false });

canvas.addEventListener("click", function(e) {
    handleInteraction(e.clientX, e.clientY);
});

window.addEventListener("resize", resize);

// =============================
// MAIN LOOP
// =============================
function animate() {
    time += 0.016;
    glowIntensity += (glowTarget - glowIntensity) * 0.08;

    ctx.fillStyle = "rgba(5, 5, 16, 0.3)";
    ctx.fillRect(0, 0, W, H);

    drawStars();
    drawNebula();
    drawFractalRings();
    drawOwlBody();
    drawWings();
    drawOwlEyes();

    spawnAmbientParticles();
    updateParticles();
    drawParticles();

    updateRipples();
    drawRipples();

    requestAnimationFrame(animate);
}

// =============================
// INIT
// =============================
resize();
ctx.fillStyle = "#050510";
ctx.fillRect(0, 0, W, H);
animate();
