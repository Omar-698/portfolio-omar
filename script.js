/* ============================================================
   script.js — Portfolio Omar Bouchouka
   ============================================================ */

// ─── TYPING EFFECT ──────────────────────────────────────────
const typingTexts = [
    "Candidat alternance ingénieur informatique 2026",
    "Développement logiciel & systèmes",
    "BUT GEII → Ingénieur CPE Lyon"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing");

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
        typingEl.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2200);
            return;
        }
    } else {
        typingEl.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 30 : 45);
}

window.addEventListener("load", () => setTimeout(typeEffect, 600));


// ─── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    revealOnScroll();
    animateLangBars();
});


// ─── BURGER MENU ────────────────────────────────────────────
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu on link click (mobile)
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
});


// ─── REVEAL ON SCROLL ───────────────────────────────────────
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add("active");
        }
    });
}
revealOnScroll(); // run once on load


// ─── LANGUAGE BARS ANIMATION ────────────────────────────────
let langAnimated = false;

function animateLangBars() {
    if (langAnimated) return;
    const bars = document.querySelectorAll(".lang-fill");
    if (!bars.length) return;

    const section = document.querySelector(".about-card--langues");
    if (!section) return;

    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 60) {
        langAnimated = true;
        bars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            setTimeout(() => {
                bar.style.width = width + "%";
            }, 150);
        });
    }
}


// ─── CUSTOM CURSOR ──────────────────────────────────────────
const cursorDot  = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (cursorDot && cursorRing) {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        cursorDot.style.left = dotX + "px";
        cursorDot.style.top  = dotY + "px";
    });

    // Smooth ring follow
    function animateRing() {
        ringX += (dotX - ringX) * 0.18;
        ringY += (dotY - ringY) * 0.18;
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top  = ringY + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    const interactives = document.querySelectorAll(
        "a, button, .skill-card, .project-card, .document-card, .contact-card, .btn, .doc-btn, .burger"
    );

    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => cursorRing.classList.add("is-hovered"));
        el.addEventListener("mouseleave", () => cursorRing.classList.remove("is-hovered"));
    });

    // Hide on leave, show on enter
    document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity  = "0";
        cursorRing.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity  = "1";
        cursorRing.style.opacity = "1";
    });
}


// ─── 3D TILT EFFECT ─────────────────────────────────────────
// Correctly applies tilt WITHOUT fighting CSS hover transforms
document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = rect.width  / 2;
        const cy = rect.height / 2;

        const rotX = -((y - cy) / cy) * 6;
        const rotY =  ((x - cx) / cx) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});


// ─── PARTICLES CANVAS ────────────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    const PARTICLE_COUNT = 55;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x:    Math.random() * W,
            y:    Math.random() * H,
            r:    Math.random() * 1.4 + 0.3,
            vx:   (Math.random() - 0.5) * 0.25,
            vy:   (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.35 + 0.05,
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            // Update
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            // Draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 191, 255, ${p.alpha})`;
            ctx.fill();
        });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    const lineAlpha = (1 - dist / 110) * 0.08;
                    ctx.strokeStyle = `rgba(0, 191, 255, ${lineAlpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
})();


// ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────────
(function activeNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const links    = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {
        let current = "";
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.45) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active-nav");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
})();
