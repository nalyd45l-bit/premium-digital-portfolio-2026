import {useEffect,useRef} from 'react';
export default function GlassSculpture(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=ref.current;if(!root)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let disposed=false,loading=false,visible=false,cleanup=()=>{},setVisible=(_value:boolean)=>{};
  const load=()=>{
   if(disposed||loading||motion.matches||!visible)return;
   loading=true;
   import('three').then(T=>{
    if(disposed)return;
    let renderer:InstanceType<typeof T.WebGLRenderer>;
    try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{return}
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<650?1.2:1.6));renderer.setClearColor(0,0);root.appendChild(renderer.domElement);
    const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,100);camera.position.z=7;
    const group=new T.Group();scene.add(group);
    const geometry=new T.TorusGeometry(1.45,.16,24,80);
    const material=new T.MeshPhysicalMaterial({color:0x91adc4,metalness:.7,roughness:.15,transparent:true,opacity:.94,clearcoat:1});
    for(let i=0;i<3;i++){const ring=new T.Mesh(geometry,material);ring.rotation.set(i*.7,.5+i*.5,i*.3);group.add(ring)}
    scene.add(new T.HemisphereLight(0xffffff,0x365775,3));
    const light=new T.DirectionalLight(0xffffff,5);light.position.set(3,5,4);scene.add(light);
    let x=0,y=0,frame=0,contextLost=false;
    const render=()=>{group.rotation.y+=(x-group.rotation.y)*.025;group.rotation.x+=(y-group.rotation.x)*.025;group.rotation.z+=.001;renderer.render(scene,camera)};
    const animate=()=>{if(disposed||document.hidden||!visible||motion.matches||contextLost){frame=0;return}render();frame=requestAnimationFrame(animate)};
    const sync=()=>{if(disposed||document.hidden||!visible||motion.matches||contextLost){cancelAnimationFrame(frame);frame=0}else if(!frame){frame=requestAnimationFrame(animate)}};
    setVisible=()=>sync();
    const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;x=(e.clientX/innerWidth-.5)*.3;y=(e.clientY/innerHeight-.5)*.2};
    const resize=()=>{const w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(!motion.matches)renderer.render(scene,camera)};
    const sizes=new ResizeObserver(resize);sizes.observe(root);resize();
    const lost=(e:Event)=>{e.preventDefault();contextLost=true;sync()};
    const restored=()=>{contextLost=false;sync()};
    renderer.domElement.addEventListener('webglcontextlost',lost);renderer.domElement.addEventListener('webglcontextrestored',restored);
    window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);sync();
    cleanup=()=>{cancelAnimationFrame(frame);sizes.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync);renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('webglcontextrestored',restored);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
   }).catch(()=>{loading=false});
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)load();setVisible(visible)});
  observer.observe(root);
  const preference=()=>{load();setVisible(visible)};motion.addEventListener('change',preference);
  return()=>{disposed=true;observer.disconnect();motion.removeEventListener('change',preference);cleanup()};
 },[]);
 return <div className="sculpture" ref={ref} aria-hidden="true"/>;
}
