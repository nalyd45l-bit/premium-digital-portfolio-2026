import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';
type Props={name:'introduction'|'professional-growth';className?:string;label:string;scrub?:boolean};
export function VideoScene({name,className='',label,scrub=false}:Props){
 const ref=useRef<HTMLVideoElement>(null);
 const intent=useRef<'auto'|'play'|'pause'>('auto');
 const syncPlayback=useRef<()=>void>(()=>{});
 const [paused,setPaused]=useState(true);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const video=ref.current;if(!video)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  let visible=false,disposed=false,loaded=false;
  const sync=()=>{
   if(scrub){video.pause();if(visible&&!loaded&&!motion.matches&&!connection?.saveData){loaded=true;video.load()}return}
   const stop=!visible||document.hidden||intent.current==='pause'||(intent.current==='auto'&&(motion.matches||connection?.saveData));
   if(stop){video.pause();return}
   video.muted=true;
   video.play().catch(()=>{if(!disposed)setPaused(true)});
  };
  syncPlayback.current=sync;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.12;sync()},{threshold:[0,.12]});
  observer.observe(video);
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener('change',sync);
  return()=>{disposed=true;observer.disconnect();video.pause();syncPlayback.current=()=>{};document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync)};
 },[scrub]);
 return <div className={`video-scene ${className}`}>
  <video ref={ref} loop muted playsInline preload={name==='introduction'?'metadata':'none'} poster={`/images/${name}-poster.jpg`} onPlay={()=>{setPaused(false);setFailed(false)}} onPause={()=>setPaused(true)} onError={()=>{setFailed(true);setPaused(true)}} aria-label={label}><source src={`/videos/${name}.mp4`} type="video/mp4"/></video>
  {failed&&<p className="video-notice" role="status">Видео не загрузилось. Показан постер.</p>}
  {!scrub&&<button className="video-control" type="button" aria-label={paused?'Воспроизвести видео':'Приостановить видео'} onClick={()=>{const video=ref.current;if(!video)return;intent.current=video.paused?'play':'pause';if(failed){setFailed(false);video.load()}syncPlayback.current()}}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{paused?'Воспроизвести':'Пауза'}</span></button>}
 </div>;
}
