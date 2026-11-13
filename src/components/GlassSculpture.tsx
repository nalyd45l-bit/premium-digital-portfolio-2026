import {useEffect,useRef,useState} from 'react';
export default function GlassSculpture(){const ref=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);
 useEffect(()=>{const root=ref.current;if(!root)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setReady(true);io.disconnect()}},{rootMargin:'150px'});io.observe(root);return()=>io.disconnect()},[]);
 useEffect(()=>{const root=ref.current;if(!root||!ready||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let stop=false;let cleanup=()=>{};
 import('three').then(T=>{if(stop)return;let renderer:InstanceType<typeof T.WebGLRenderer>;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0,0);root.appendChild(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,100);camera.position.z=7;
 const group=new T.Group();scene.add(group);const geometry=new T.TorusGeometry(1.45,.14,24,100);const material=new T.MeshPhysicalMaterial({color:0xc7d4df,metalness:.55,roughness:.12,transparent:true,opacity:.8,clearcoat:1});
 for(let i=0;i<3;i++){const ring=new T.Mesh(geometry,material);ring.rotation.set(i*.7,.5+i*.5,i*.3);group.add(ring)}
 scene.add(new T.HemisphereLight(0xffffff,0x8395a9,3));const light=new T.DirectionalLight(0xffffff,5);light.position.set(3,5,4);scene.add(light);
 let x=0,y=0,visible=true,frame=0;const move=(e:PointerEvent)=>{x=(e.clientX/innerWidth-.5)*.3;y=(e.clientY/innerHeight-.5)*.2};const resize=()=>{renderer.setSize(root.clientWidth,root.clientHeight);camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix()};const obs=new ResizeObserver(resize);obs.observe(root);resize();
 const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting});io.observe(root);window.addEventListener('pointermove',move,{passive:true});
 const animate=()=>{frame=requestAnimationFrame(animate);if(!visible||document.hidden)return;group.rotation.y+=(x-group.rotation.y)*.025;group.rotation.x+=(y-group.rotation.x)*.025;group.rotation.z+=.001;renderer.render(scene,camera)};animate();
 cleanup=()=>{cancelAnimationFrame(frame);obs.disconnect();io.disconnect();window.removeEventListener('pointermove',move);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};});
 return()=>{stop=true;cleanup()};},[ready]);return <div className="sculpture" ref={ref} aria-hidden="true"/>;}
