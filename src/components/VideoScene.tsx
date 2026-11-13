import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
type Props={name:'introduction'|'professional-growth';className?:string;label:string};
export function VideoScene({name,className='',label}:Props){
 const ref=useRef<HTMLVideoElement>(null); const [paused,setPaused]=useState(true);const [manual,setManual]=useState(false);
 useEffect(()=>{const video=ref.current;if(!video)return;const media=window.matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
 const sync=()=>{if(!visible||document.hidden||media.matches||manual){video.pause();return}video.play().catch(()=>setPaused(true));};
 const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync()},{threshold:.12});observer.observe(video);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);
 return()=>{observer.disconnect();video.pause();document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync)};
 },[manual]);
 return <div className={`video-scene ${className}`}><video ref={ref} loop muted playsInline preload={name==='introduction'?'metadata':'none'} poster={`/images/${name}-poster.jpg`} onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} aria-label={label}><source src={`/videos/${name}.mp4`} type="video/mp4"/></video><button className="video-control" type="button" aria-label={paused?'Воспроизвести видео':'Приостановить видео'} onClick={()=>{const v=ref.current;if(!v)return;if(v.paused){setManual(false);v.play().catch(()=>{});}else {setManual(true);v.pause()}}}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{paused?'Воспроизвести':'Пауза'}</span></button></div>;
}
