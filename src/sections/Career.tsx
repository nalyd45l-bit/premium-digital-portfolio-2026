import {useEffect,useRef,useState,type SyntheticEvent} from 'react';
import {ArrowUpRight,Minus,Pause,Play,Plus} from 'lucide-react';
import {VideoScene} from '../components/VideoScene';
import {career,type CareerEntry} from '../content/career';
import {assetUrl} from '../lib/assetUrl';

const stages=[...career.slice(0,4).map(c=>[c]),career.filter(c=>c.parallel)];

export function Career(){
  const [active,setActive]=useState(0);
  const [autoPlay,setAutoPlay]=useState(()=>typeof window==='undefined'||!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [expanded,setExpanded]=useState<string|null>(null);
  const videoRef=useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{if(motion.matches)setAutoPlay(false)};
    motion.addEventListener('change',sync);
    return()=>motion.removeEventListener('change',sync);
  },[]);
  const selectStage=(index:number)=>{
    setActive(index);
    const video=videoRef.current;
    if(!video)return;
    const duration=Number.isFinite(video.duration)&&video.duration>0?video.duration:10;
    video.currentTime=Math.min(duration-.08,(duration/stages.length)*index+.04);
  };
  const syncStage=(event:SyntheticEvent<HTMLVideoElement>)=>{
    if(!autoPlay)return;
    const video=event.currentTarget;
    if(!Number.isFinite(video.duration)||video.duration<=0)return;
    const next=Math.min(stages.length-1,Math.floor((video.currentTime/video.duration)*stages.length));
    setActive(current=>current===next?current:next);
  };
  const open=(entry:CareerEntry)=>{
    setExpanded(entry.id);
    requestAnimationFrame(()=>document.getElementById(`career-${entry.id}`)?.scrollIntoView({behavior:'auto',block:'center'}));
  };
  const logo=(entry:CareerEntry,className?:string)=>entry.logo?<img className={className} src={assetUrl(entry.logo)} alt="" loading="lazy"/>:null;
  const item=(entry:CareerEntry,index:number)=><article className={`timeline-item glass ${expanded===entry.id?'is-open':''}`} id={`career-${entry.id}`} key={entry.id}>
    <button aria-expanded={expanded===entry.id} aria-controls={`detail-${entry.id}`} onClick={()=>setExpanded(expanded===entry.id?null:entry.id)}>
      <span className="timeline-index">{String(index+1).padStart(2,'0')}</span>
      <span className="timeline-name"><span className="timeline-brand">{logo(entry)}{entry.name}</span><small>{entry.period}</small></span>
      {expanded===entry.id?<Minus size={18}/>:<Plus size={18}/>} 
    </button>
    <div id={`detail-${entry.id}`} hidden={expanded!==entry.id} className="timeline-detail">
      <h3>{entry.role}</h3><ul>{entry.duties.map(d=><li key={d}>{d}</li>)}</ul>
      <div className="timeline-result"><span className="eyebrow">РЕЗУЛЬТАТ</span><p>{entry.result}</p></div>
      <div className="skill-tags">{entry.skills.map(s=><span key={s}>{s}</span>)}</div>
    </div>
  </article>;
  const entries=stages[active];

  return <section id="career" className="career-section">
    <div className="career-scroll-story"><div className="career-sticky-scene">
      <div className="career-video-shell"><VideoScene ref={videoRef} name="professional-growth" label="Стеклянная лестница — видео профессионального роста" playbackEnabled={autoPlay} onTimeUpdate={syncStage}/>
        <div className="career-scene-shade"/>
        <div className="career-scene-header"><span className="eyebrow">ПРОФЕССИОНАЛЬНЫЙ ПУТЬ</span><h2>Опыт по этапам.</h2></div>
      </div>
      <div className="career-stage-stack" aria-live="polite"><div key={entries.map(entry=>entry.id).join('-')} className={`career-stage-panel ${entries.length>1?'parallel-stage':''}`}>
        {entries.length>1&&<p className="parallel-stage-label">ПАРАЛЛЕЛЬНЫЕ НАПРАВЛЕНИЯ</p>}
        {entries.map(entry=><article className="step-glass-card glass" key={entry.id}>{logo(entry,'step-company-logo')}<span className="step-company-name">{entry.name}</span><span className="step-period">{entry.period}</span><h3>{entry.role}</h3><button className="text-link" onClick={()=>open(entry)}>Подробнее<ArrowUpRight size={15}/></button></article>)}
      </div></div>
      <div className="career-stage-controls"><nav className="career-step-navigation" aria-label="Этапы карьеры">{stages.map((group,i)=><button key={group[0].id} className={active===i?'selected':''} aria-label={`${group[0].start.slice(0,4)} — ${group.map(e=>e.name).join(' и ')}`} aria-current={active===i?'step':undefined} onClick={()=>selectStage(i)}><span>{group[0].start.slice(0,4)}</span><i/></button>)}</nav>
        <div className="career-playback-row"><button className="career-mode-toggle" type="button" aria-pressed={autoPlay} onClick={()=>setAutoPlay(value=>!value)}>{autoPlay?<Pause size={14}/>:<Play size={14}/>}<span>{autoPlay?'Автоматически':'Вручную'}</span></button><span className="career-scroll-caption">{String(active+1).padStart(2,'0')} / 05</span></div>
      </div>
    </div></div>
    <div className="career-details wrap" id="career-details">
      <div className="career-heading"><span className="eyebrow">ОПЫТ В ДЕТАЛЯХ</span><h2>Компании, задачи<br/>и результаты.</h2><p>Армада-Авто и LIFE PAY — параллельные направления работы с 2025 года.</p></div>
      <div className="timeline career-lens glass">{career.slice(0,4).map(item)}<div className="parallel-label"><span className="status-dot"/>ПАРАЛЛЕЛЬНЫЕ НАПРАВЛЕНИЯ</div><div className="parallel-careers">{career.filter(c=>c.parallel).map((c,i)=>item(c,i+4))}</div></div>
    </div>
  </section>;
}
