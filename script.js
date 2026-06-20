// ==========================
// 🔐 LOGIN
// ==========================
function checkLogin() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if (u === "sabiha" && p === "23062005") {
    window.location.href = "main.html";
  } else {
    document.getElementById("error").innerText = "Try again 🧸";
  }
}

function goToMagic() {
  burstFireworks(1.2);
  setTimeout(() => {
    window.location.href = "ending.html";
  }, 2500);
}

function restart() {
  window.location.href = "index.html";
}

// ==========================
// 🕯️ CANDLE CLICK
// ==========================
function blowCandles() {
  burstFireworks(1.5);
}

// ==========================
// ⌨️ CINEMATIC TYPING
// ==========================
const message = `Happy Birthday, Sabiha.

Dear Biral Toposhwi 🐱, Pocket Friendly little chaos.

May your day be filled with smiles, laughter, and beautiful surprises.
You deserve all the happiness in the world.`;

let i = 0;

function typeMessage() {
  const el = document.getElementById("wish");
  if (!el) return;

  el.innerHTML = "";

  function type() {
    if (i < message.length) {
      el.innerHTML += message.charAt(i);
      i++;
      setTimeout(type, 22);
    }
  }

  type();
}

// ==========================
// 🎈 BALLOONS (soft physics drift)
// ==========================
function createBalloon() {
  const container = document.getElementById("balloon-container");
  if (!container) return;

  const b = document.createElement("div");
  b.className = "balloon";

  const colors = ["#F48FB1","#A2D2FF","#CDB4DB","#FFD166","#ffffff"];
  b.style.background = colors[Math.floor(Math.random()*colors.length)];

  b.style.left = Math.random() * 100 + "vw";
  b.style.animationDuration = (6 + Math.random() * 6) + "s";

  container.appendChild(b);

  setTimeout(() => b.remove(), 12000);
}

setInterval(createBalloon, 350);

// ==========================
// 🐱 CAT INTERACTION
// ==========================
window.addEventListener("load", () => {
  const cat = document.getElementById("cat");

  if (cat) {
    cat.addEventListener("click", () => {
      cat.innerText = "😺";
      setTimeout(() => cat.innerText = "🐱", 900);
    });
  }

  typeMessage();
});

// ==========================
// 🎆 CINEMATIC FIREWORK ENGINE (LEVEL 2)
// ==========================
let canvas, ctx;
let particles = [];
let glow = 0;

function burstFireworks(power = 1) {
  canvas = document.getElementById("fireworks");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  resizeCanvas();
  particles = [];

  const count = Math.floor(140 * power);

  for (let i = 0; i < count; i++) {
    particles.push(createParticle());
  }

  animate();

  // fade out cleanup
  setTimeout(() => {
    particles = [];
  }, 2500);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  if (canvas) resizeCanvas();
});

function createParticle() {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 7;

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    alpha: 1,
    decay: 0.012 + Math.random() * 0.01
  };
}

function animate() {
  if (!ctx) return;

  // soft fade (NO BLACK SCREEN)
  ctx.fillStyle = "rgba(11, 19, 43, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.decay;

    ctx.fillStyle = `rgba(255, 220, 120, ${p.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "gold";

    ctx.fillRect(p.x, p.y, 2.5, 2.5);
  });

  particles = particles.filter(p => p.alpha > 0);

  requestAnimationFrame(animate);
}
