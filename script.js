/* ===========================
   SEATAP KOPITIAM
   script.js
   =========================== */

// ============ PRELOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
    // Stagger hero fade-ups
    setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 180);
      });
    }, 200);
  }, 2000);
});

// ============ CURSOR — Diamond ============
const csr = document.getElementById('csr');
const csr2 = document.getElementById('csr2');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  csr.style.left = mx + 'px';
  csr.style.top = my + 'px';
});

(function animateCsr2() {
  fx += (mx - fx) * 0.15;
  fy += (my - fy) * 0.15;
  csr2.style.left = fx + 'px';
  csr2.style.top = fy + 'px';
  requestAnimationFrame(animateCsr2);
})();

document.querySelectorAll('a, button, .mc, .sc, .gi, .nav-links a').forEach(el => {
  el.addEventListener('mouseenter', () => csr.classList.add('hover'));
  el.addEventListener('mouseleave', () => csr.classList.remove('hover'));
});

// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ============ HAMBURGER / MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mob-menu');
let isOpen = false;

hamburger.addEventListener('click', () => {
  isOpen = !isOpen;
  mobMenu.classList.toggle('open', isOpen);
  const sp = hamburger.querySelectorAll('span');
  if (isOpen) {
    sp[0].style.transform = 'translateY(7px) rotate(45deg)';
    sp[1].style.opacity = '0';
    sp[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    sp.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMob() {
  isOpen = false;
  mobMenu.classList.remove('open');
  const sp = hamburger.querySelectorAll('span');
  sp.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ============ SCROLL REVEAL ============
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

[
  '.about-wrap', '.about-imgs', '.about-text',
  '.menu-top', '.menu-grid', '.mc',
  '.spaces-header', '.spaces-cards', '.sc',
  '.gallery-header', '.gallery-grid', '.gi',
  '.promo-inner', '.promo-text',
  '.cg-brand', '.cg-info', '.cg-action',
  '.reveal'
].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('scroll-reveal');
    el.style.transitionDelay = (i * 0.07) + 's';
    observer.observe(el);
  });
});

// ============ COUNTER ANIMATION ============
function countUp(el) {
  const target = parseInt(el.dataset.target);
  const dur = 2000;
  const step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur).toLocaleString();
    if (cur >= target) clearInterval(t);
  }, 16);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.astat-n').forEach(countUp);
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObs.observe(statsEl);

// ============ GALLERY LIGHTBOX ============
document.querySelectorAll('.gi').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gi-label')?.textContent || '';
    openLightbox(img.src, label);
  });
});

function openLightbox(src, caption) {
  const style = document.createElement('style');
  style.textContent = '@keyframes lbIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}';
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(61,36,18,0.96);z-index:9000;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;animation:lbIn 0.3s ease;
  `;
  const imgEl = document.createElement('img');
  imgEl.src = src;
  imgEl.style.cssText = 'max-width:88vw;max-height:82vh;object-fit:contain;border:2px solid rgba(212,164,53,0.3);';

  const cap = document.createElement('p');
  cap.textContent = caption;
  cap.style.cssText = 'font-family:"Libre Baskerville",serif;font-style:italic;font-size:14px;color:rgba(253,246,236,0.6);margin-top:16px;letter-spacing:2px;';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    position:fixed;top:28px;right:36px;background:none;border:1px solid rgba(212,164,53,0.4);
    color:#D4A435;width:44px;height:44px;font-size:16px;cursor:pointer;font-family:sans-serif;
  `;

  overlay.append(imgEl, cap, closeBtn);
  document.body.appendChild(overlay);

  const remove = () => {
    overlay.style.transition = 'opacity 0.25s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 250);
  };
  overlay.addEventListener('click', e => { if (e.target === overlay) remove(); });
  closeBtn.addEventListener('click', remove);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') remove(); }, { once: true });
}

// ============ BRANCH DATA ============
const branches = [
  {
    name: 'Cibubur',
    phone: '6281195315600', // +62 811-953-156
    msg: 'Halo SEATAP Kopitiam Cibubur! Saya ingin reservasi/bertanya tentang...'
  },
  {
    name: 'Cipayung',
    phone: '628119957589', // 0811-995-7589
    msg: 'Halo SEATAP Kopitiam Cipayung! Saya ingin reservasi/bertanya tentang...'
  },
  {
    name: 'Taman Mini',
    phone: '6281195315600', // same until real number provided
    msg: 'Halo SEATAP Tea & Sky Taman Mini! Saya ingin reservasi/bertanya tentang...'
  }
];

function openWA() { openWAChooser(); }

function openWABranch(idx) {
  const b = branches[idx];
  const url = `https://wa.me/${b.phone}?text=${encodeURIComponent(b.msg)}`;
  window.open(url, '_blank');
  closeWAModal();
}

function openWAChooser() {
  document.getElementById('wa-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeWAModal() {
  document.getElementById('wa-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('wa-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('wa-modal')) closeWAModal();
});

// ============ BRANCH TABS ============
const btabs = document.querySelectorAll('.btab');
const bpanels = document.querySelectorAll('.bpanel');

btabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.branch;
    btabs.forEach(t => t.classList.remove('active'));
    bpanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('branch-' + idx).classList.add('active');
  });
});

function scrollToBranch(idx) {
  btabs.forEach(t => t.classList.remove('active'));
  bpanels.forEach(p => p.classList.remove('active'));
  btabs[idx].classList.add('active');
  document.getElementById('branch-' + idx).classList.add('active');
  document.getElementById('cabang').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============ WA FAB SHOW/HIDE ============
const waFab = document.getElementById('wa-fab');
window.addEventListener('scroll', () => {
  waFab.style.opacity = window.scrollY > 300 ? '1' : '0';
  waFab.style.transform = window.scrollY > 300 ? 'scale(1)' : 'scale(0.8)';
});
waFab.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';

// ============ HERO PARALLAX ============
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) heroImg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.12}px)`;
});

// ============ MENU CARD STAGGER ============
const mcCards = document.querySelectorAll('.mc');
const mcObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    mcCards.forEach((c, i) => setTimeout(() => {
      c.style.opacity = '1'; c.style.transform = 'none';
    }, i * 90));
    mcObs.disconnect();
  }
}, { threshold: 0.05 });
mcCards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(24px)'; c.style.transition = 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.4s'; });
if (mcCards[0]) mcObs.observe(mcCards[0]);

console.log('%c🍵 SEATAP KOPITIAM', 'color:#C4611A;font-size:20px;font-weight:bold;');
console.log('%cJl. Lap. Tembak No. 10A, Cibubur · 12.00–23.00 WIB', 'color:#7A5535;font-size:12px;');
