const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const reveals = document.querySelectorAll('.reveal');
const flight = document.querySelector('[data-flight]');
const replay = document.querySelector('[data-replay]');
const flightTime = document.querySelector('[data-flight-time]');

const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 34);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

let flightTimer;
let flightStartedAt = 0;
const FLIGHT_MS = 14000;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatFlightTime(ms) {
  const seconds = Math.min(14, Math.max(0, Math.floor(ms / 1000)));
  return `00:${String(seconds).padStart(2, '0')} / 00:14`;
}

function runFlight() {
  if (!flight || reducedMotion()) return;
  clearInterval(flightTimer);
  flight.classList.remove('is-playing');
  void flight.offsetWidth;
  flight.classList.add('is-playing');
  flightStartedAt = performance.now();
  if (flightTime) flightTime.textContent = '00:00 / 00:14';
  flightTimer = setInterval(() => {
    const elapsed = performance.now() - flightStartedAt;
    if (flightTime) flightTime.textContent = formatFlightTime(elapsed);
    if (elapsed >= FLIGHT_MS) {
      clearInterval(flightTimer);
      if (flightTime) flightTime.textContent = '00:14 / 00:14';
    }
  }, 250);
}

replay?.addEventListener('click', runFlight);

if (flight && 'IntersectionObserver' in window) {
  const flightObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runFlight();
        flightObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });
  flightObserver.observe(flight);
} else if (flight) {
  runFlight();
}
