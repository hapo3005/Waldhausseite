const header=document.querySelector('[data-header]');
const hero=document.querySelector('[data-hero]');
const video=document.querySelector('[data-flight]');
const replayButtons=document.querySelectorAll('[data-replay]');
const skipButton=document.querySelector('[data-skip]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

const onScroll=()=>header?.classList.toggle('scrolled',scrollY>34);
onScroll();addEventListener('scroll',onScroll,{passive:true});

let arrivalTimer;
function showArrival(){clearTimeout(arrivalTimer);hero?.classList.add('arrived')}
function hideArrival(){if(!reduced)hero?.classList.remove('arrived')}
function scheduleArrival(){
  clearTimeout(arrivalTimer);
  if(reduced){showArrival();return;}
  if(!video||!Number.isFinite(video.duration)){arrivalTimer=setTimeout(showArrival,6500);return;}
  arrivalTimer=setTimeout(showArrival,Math.max(0,(video.duration-.25)*1000));
}

if(video){
  video.addEventListener('loadedmetadata',scheduleArrival,{once:true});
  video.addEventListener('ended',showArrival);
  video.play().catch(showArrival);
}else showArrival();

skipButton?.addEventListener('click',()=>{
  if(video&&Number.isFinite(video.duration)){video.currentTime=Math.max(0,video.duration-.05);video.pause();}
  showArrival();
});

replayButtons.forEach(btn=>btn.addEventListener('click',()=>{
  if(!video)return;
  hideArrival();
  video.currentTime=0;
  video.play().catch(showArrival);
  scheduleArrival();
  document.querySelector('#top')?.scrollIntoView({behavior:reduced?'auto':'smooth'});
}));

const locationFrame=document.querySelector('[data-location-frame]');
if(locationFrame){
  locationFrame.addEventListener('loadedmetadata',()=>{
    if(Number.isFinite(locationFrame.duration)) locationFrame.currentTime=Math.max(0,locationFrame.duration-.08);
  },{once:true});
  locationFrame.addEventListener('seeked',()=>locationFrame.pause());
}
