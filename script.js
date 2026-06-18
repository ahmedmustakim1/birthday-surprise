// ==========================
// 🔐 LOGIN
// ==========================
function checkLogin() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if (u === "sabiha" && p === "1234") {
    window.location.href = "main.html";
  } else {
    document.getElementById("error").innerText = "Try again 🧸";
  }
}

function goToMagic() {
  startFireworks();
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
  startFireworks();
}

// ==========================
// ⌨️ TYPING ANIMATION
// ==========================
const message = `Happy Birthday, Sabiha.

Dear Biral Toposhwi 🐱, Pocket Friendly little chaos.

May your day be filled with smiles, laughter, and beautiful surprises.
You deserve all the happiness in the world.`;

let i = 0;
function typeMessage() {
  if (i < message.length) {
    document.getElementById("wish").innerHTML += message.charAt(i);
    i++;
    setTimeout(typeMessage, 25);
  }
}

// ==========================
// 🎈 BALLOONS PHYSICS (simple drift)
// ==========================
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.className = "balloon";

  const colors = ["#F48FB1","#A2D2FF","#CDB4DB","#FFD166"];
  balloon.style.background = colors[Math.floor(Math.random()*colors.length)];

  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.animationDuration = (5 + Math.random() * 5) + "s";

  document.getElementById("balloon-container").appendChild(balloon);

  setTimeout(() => balloon.remove(), 10000);
}

setInterval(createBalloon, 400);

// ==========================
// 🐱 CAT (extra interaction vibe)
// ==========================
const cat = document.getElementById("cat");
cat.addEventListener("click", () => {
  cat.innerText = "😺";
  setTimeout(() => cat.innerText = "🐱", 1000);
});

// ==========================
// 🎆 REAL FIREWORKS (CANVAS)
// ==========================
let canvas, ctx;
let particles = [];

function startFireworks() {
  canvas = document.getElementById("fireworks");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 80; i++) {
    particles.push(createParticle());
  }

  animate();
}

function createParticle() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    alpha: 1
  };
}

function animate() {
  if (!ctx) return;

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.01;

    ctx.fillStyle = `rgba(255, 200, 80, ${p.alpha})`;
    ctx.fillRect(p.x, p.y, 3, 3);
  });

  particles = particles.filter(p => p.alpha > 0);

  requestAnimationFrame(animate);
}

// ==========================
// INIT ON LOAD
// ==========================
window.onload = () => {
  typeMessage();
};