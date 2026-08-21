const header=document.querySelector('[data-header]');
const hero=document.querySelector('[data-hero]');
const video=document.querySelector('[data-flight]');
const replayButtons=document.querySelectorAll('[data-replay]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

const onScroll=()=>header?.classList.toggle('scrolled',scrollY>34);
onScroll();addEventListener('scroll',onScroll,{passive:true});

let arrivalTimer;
function revealArrival(delay=3900){clearTimeout(arrivalTimer);if(reduced){hero?.classList.add('arrived');return;}hero?.classList.remove('arrived');arrivalTimer=setTimeout(()=>hero?.classList.add('arrived'),delay)}

if(video){
  video.addEventListener('loadedmetadata',()=>revealArrival(Math.min(4200,Math.max(2800,(video.duration-2.7)*1000))));
  video.addEventListener('ended',()=>hero?.classList.add('arrived'));
  video.play().catch(()=>hero?.classList.add('arrived'));
}else hero?.classList.add('arrived');

replayButtons.forEach(btn=>btn.addEventListener('click',()=>{
  if(!video)return;
  video.currentTime=0;video.play().catch(()=>{});revealArrival();
  document.querySelector('#top')?.scrollIntoView({behavior:reduced?'auto':'smooth'});
}));
