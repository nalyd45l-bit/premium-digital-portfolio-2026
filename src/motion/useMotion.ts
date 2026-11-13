import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function useMotion(){useEffect(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{
 gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{gsap.fromTo(el,{y:26,opacity:1},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}})});
 gsap.to('.hero-video video',{scale:1.05,yPercent:2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
 gsap.fromTo('.career-progress-fill',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:'.growth-scene',start:'top 80%',end:'bottom 30%',scrub:.5}});
 gsap.fromTo('.growth-scene > .video-scene',{scale:1.06,opacity:.65},{scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:'.growth-scene',start:'top bottom',end:'top 30%',scrub:.8}});
 gsap.to('.reading-progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
 gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el=>{const number={value:0};gsap.to(number,{value:Number(el.dataset.count),duration:1.4,ease:'power2.out',onUpdate:()=>{el.textContent=String(Math.round(number.value)).padStart(2,'0')},scrollTrigger:{trigger:el,start:'top 95%',once:true}})});
 });return()=>ctx.revert()});return()=>mm.revert()},[])}
