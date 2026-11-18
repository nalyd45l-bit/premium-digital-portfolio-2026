import {useEffect,useRef,useState} from 'react';
import {assetUrl} from '../lib/assetUrl';
type Props={name:'introduction'|'professional-growth';className?:string;label:string;scrub?:boolean};
export function VideoScene({name,className='',label,scrub=false}:Props){
 const ref=useRef<HTMLVideoElement>(null);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const video=ref.current;if(!video)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  let visible=false,loaded=false;
  const sync=()=>{
   if(scrub){video.pause();if(visible&&!loaded&&!motion.matches&&!connection?.saveData){loaded=true;video.load()}return}
   const stop=!visible||document.hidden||motion.matches||connection?.saveData;
   if(stop){video.pause();return}
   video.muted=true;
   video.play().catch(()=>{});
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.12;sync()},{threshold:[0,.12]});
  observer.observe(video);
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener('change',sync);
  return()=>{observer.disconnect();video.pause();document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync)};
 },[scrub]);
 return <div className={`video-scene ${className}`}>
  <video ref={ref} loop muted playsInline preload={name==='introduction'?'metadata':'none'} poster={assetUrl(`/images/${name}-poster.jpg`)} onPlay={()=>setFailed(false)} onError={()=>setFailed(true)} aria-label={label}><source src={assetUrl(`/videos/${name}.mp4`)} type="video/mp4"/></video>
  {failed&&<p className="video-notice" role="status">Видео не загрузилось. Показан постер.</p>}
 </div>;
}
