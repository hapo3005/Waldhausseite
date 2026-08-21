const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
const video = document.querySelector('[data-flight]');
const replayButtons = document.querySelectorAll('[data-replay]');
const reveals = document.querySelectorAll('.reveal');

const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 36);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

replayButtons.forEach(button => button.addEventListener('click', () => {
  if (!video) return;
  video.currentTime = 0;
  video.play().catch(() => {});
  document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' });
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}
