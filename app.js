const header = document.querySelector('[data-header]');
const reveals = document.querySelectorAll('.reveal');
const flight = document.querySelector('[data-flight]');
const replay = document.querySelector('[data-replay]');

const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
reveals.forEach(el => io.observe(el));

replay?.addEventListener('click', () => {
  flight.classList.remove('play');
  flight.classList.add('replaying');
  void flight.offsetWidth;
  flight.classList.add('play');
  setTimeout(() => flight.classList.remove('replaying', 'play'), 18200);
});
