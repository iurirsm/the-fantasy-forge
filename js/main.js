// Instagram embed script
(function(d, s, id) {
  if (d.getElementById(id)) return;
  const js = d.createElement(s); js.id = id;
  js.src = "https://embedsocial.com/cdn/ht.js";
  d.head.appendChild(js);
})(document, "script", "EmbedSocialHashtagScript");

// Navigation & scroll indicator
const navOrb = document.getElementById('navOrb');
const navMenu = document.getElementById('navMenu');
const navButtons = navMenu.querySelectorAll('button');
const scrollIndicator = document.getElementById('scrollIndicator');

navOrb.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navOrb.classList.toggle('menu-open');
});
document.addEventListener('click', e => {
  if (!navMenu.contains(e.target) && !navOrb.contains(e.target)) {
    navMenu.classList.remove('open');
    navOrb.classList.remove('menu-open');
  }
});
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tgt = document.getElementById(btn.dataset.target);
    if (tgt) {
      tgt.scrollIntoView({ behavior: 'smooth' });
      navMenu.classList.remove('open');
      navOrb.classList.remove('menu-open');
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  scrollIndicator.style.width = (scrollTop / docHeight * 100) + '%';

  // Active section
  let current = '';
  document.querySelectorAll('.section').forEach(sec => {
    if (scrollTop >= sec.offsetTop - 200) current = sec.id;
  });
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === current));

  // Gear rotation
  document.querySelectorAll('.gear, .gear-reverse').forEach((g, i) => {
    const speed = (i + 1) * 0.5;
    g.style.transform = `rotate(${scrollTop * speed}deg)`;
  });
});

// Particles.js init
particlesJS('particles-js', {
  particles: {
    number: { value:60, density:{ enable:true, value_area:800 } },
    color:{ value:"#ea580c" },
    shape:{ type:"circle" },
    opacity:{ value:0.3, random:true, anim:{ enable:true, speed:1, opacity_min:0.1 } },
    size:{ value:3, random:true, anim:{ enable:true, speed:2, size_min:0.1 } },
    line_linked:{ enable:false },
    move:{ enable:true, speed:1, direction:"top", random:true, straight:false, out_mode:"out" }
  },
  interactivity:{
    detect_on:"canvas",
    events:{ onhover:{ enable:true, mode:"repulse" }, onclick:{ enable:true, mode:"push" }, resize:true },
    modes:{ repulse:{ distance:100, duration:0.4 }, push:{ particles_nb:4 } }
  },
  retina_detect:true
});

// Sparkles on cards
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random()*100+'%';
  sparkle.style.top  = Math.random()*100+'%';
  sparkle.style.animationDelay = Math.random()*2+'s';
  const cards = document.querySelectorAll('.forge-card');
  if (!cards.length) return;
  const card = cards[Math.floor(Math.random()*cards.length)];
  card.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2000);
}
setInterval(createSparkle, 3000);

// Cursor trail on magic-hover
document.addEventListener('mousemove', e => {
  if (!e.target.classList.contains('magic-hover')) return;
  const trail = document.createElement('div');
  trail.className = 'sparkle';
  trail.style.position = 'fixed';
  trail.style.left = e.clientX+'px';
  trail.style.top  = e.clientY+'px';
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 500);
});

// Form feedback
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '⚡ Forging in Progress... ⚡';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '⚡ Begin the Forging Process ⚡';
      btn.disabled = false;
    }, 3000);
  });
}

// Entrance animations & steam particles
const obs = new IntersectionObserver((ents) => {
  ents.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold:0.1, rootMargin:'0px 0px -100px 0px' });

document.querySelectorAll('.forge-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'opacity .8s ease, transform .8s ease';
  obs.observe(card);
});

document.querySelectorAll('.steam').forEach(el => {
  setInterval(() => {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = p.style.height = '2px';
    p.style.background = 'rgba(230,221,212,0.5)';
    p.style.borderRadius = '50%';
    p.style.left = Math.random()*100+'%';
    p.style.bottom = '0';
    p.style.animation = 'float 3s ease-out forwards';
    el.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }, 2000);
});
