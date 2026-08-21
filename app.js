const header=document.querySelector('[data-header]');
const hero=document.querySelector('[data-hero]');
const video=document.querySelector('[data-flight]');
const locationFrame=document.querySelector('[data-location-frame]');
const replayButtons=document.querySelectorAll('[data-replay]');
const skipButton=document.querySelector('[data-skip]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

const onScroll=()=>header?.classList.toggle('scrolled',scrollY>34);
onScroll();addEventListener('scroll',onScroll,{passive:true});

let arrivalTimer;
let videoUrl='';
function showArrival(){clearTimeout(arrivalTimer);hero?.classList.add('arrived')}
function hideArrival(){if(!reduced)hero?.classList.remove('arrived')}
function scheduleArrival(){
  clearTimeout(arrivalTimer);
  if(reduced){showArrival();return;}
  if(!video||!Number.isFinite(video.duration)){arrivalTimer=setTimeout(showArrival,6400);return;}
  arrivalTimer=setTimeout(showArrival,Math.max(0,(video.duration-.2)*1000));
}

function b64ToBytes(value){
  const raw=atob(value.trim());
  const bytes=new Uint8Array(raw.length);
  for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
  return bytes;
}

async function loadEarthVideo(){
  const files=Array.from({length:6},(_,i)=>`assets/earth-video/part-${String(i).padStart(2,'0')}.b64`);
  const parts=[];
  for(const file of files){
    const response=await fetch(file,{cache:'force-cache'});
    if(!response.ok)throw new Error(`Earth video payload missing: ${file}`);
    parts.push(b64ToBytes(await response.text()));
  }
  const blob=new Blob(parts,{type:'video/mp4'});
  videoUrl=URL.createObjectURL(blob);
  [video,locationFrame].filter(Boolean).forEach(el=>{el.src=videoUrl;el.load();});

  if(locationFrame){
    locationFrame.addEventListener('loadedmetadata',()=>{
      if(Number.isFinite(locationFrame.duration)) locationFrame.currentTime=Math.max(0,locationFrame.duration-.04);
    },{once:true});
    locationFrame.addEventListener('seeked',()=>locationFrame.pause());
  }

  if(!video){showArrival();return;}
  video.addEventListener('loadedmetadata',scheduleArrival,{once:true});
  video.addEventListener('ended',showArrival);
  if(reduced){video.pause();showArrival();return;}
  await video.play().catch(showArrival);
}

skipButton?.addEventListener('click',()=>{
  if(video&&Number.isFinite(video.duration)){video.currentTime=Math.max(0,video.duration-.04);video.pause();}
  showArrival();
});

replayButtons.forEach(btn=>btn.addEventListener('click',()=>{
  if(!video||!videoUrl)return;
  hideArrival();
  video.currentTime=0;
  video.play().catch(showArrival);
  scheduleArrival();
  document.querySelector('#top')?.scrollIntoView({behavior:reduced?'auto':'smooth'});
}));

loadEarthVideo().catch(error=>{console.error(error);showArrival();});
