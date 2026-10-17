'use strict';
// Shared: helpers, audio, safety (mute, Esc x3), footer, avatar art.
window.RAGE=true;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rand=a=>a[Math.floor(Math.random()*a.length)];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=JSON.parse(sessionStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const every=(fn,ms)=>setInterval(()=>{if(RAGE)fn()},ms);
let ctx,master,muted=false;
function tone(f,d,type,v){if(muted||!RAGE)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();if(!master){master=ctx.createGain();master.gain.value=.3;master.connect(ctx.destination)}
 const o=ctx.createOscillator(),g=ctx.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(v||.4,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+d);o.connect(g);g.connect(master);o.start();o.stop(ctx.currentTime+d)}catch(e){}}
const burst=()=>{tone(90,.9,'sawtooth',.9);tone(1200,.4,'square',.4)};
function toast(m){if(!RAGE)return;const t=el('div','toast',m);document.body.append(t);setTimeout(()=>t.remove(),2400)}
function calm(){if(!RAGE)return;RAGE=false;document.body.classList.add('calm');$$('.overlay,.toast,#sub,.trail').forEach(x=>x.remove());
 document.body.append(el('div','calmbar','Rage mode off. Enjoy the site. <a href="profile.html">Enter the profile page</a>'))}
let escs=[];addEventListener('keydown',e=>{if(e.key!=='Escape')return;const n=Date.now();escs=escs.filter(t=>n-t<1500);escs.push(n);if(escs.length>=3)calm()});
const face=()=>`<svg viewBox="0 0 200 200" role="img" aria-label="Cobra Sigma illustration"><rect width="200" height="200" fill="#0d0d10"/><ellipse cx="100" cy="105" rx="55" ry="68" fill="#c68b5b"/><path d="M45 95Q50 30 100 32Q150 30 155 95Q130 60 100 62Q70 60 45 95Z" fill="#1a1208"/><rect x="52" y="88" width="42" height="24" rx="8" fill="#000"/><rect x="106" y="88" width="42" height="24" rx="8" fill="#000"/><rect x="92" y="95" width="16" height="5" fill="#D4AF37"/><path d="M70 140Q100 168 132 138Q100 150 70 140Z" fill="#fff" stroke="#400" stroke-width="2"/><path d="M60 178Q100 205 140 178" fill="none" stroke="#D4AF37" stroke-width="6" stroke-dasharray="2 5"/></svg>`;
document.addEventListener('DOMContentLoaded',()=>{
 const m=el('button','mute','🔊 Sound on');m.setAttribute('aria-label','Toggle sound');m.onclick=()=>{muted=!muted;m.textContent=muted?'🔇 Muted':'🔊 Sound on'};document.body.append(m);
 document.body.append(el('footer','foot','<p>Satire. Cobra Sigma is fictional. No real person is depicted.</p><a href="#" id="exitRage">Exit rage mode</a>'));
 $('#exitRage').onclick=e=>{e.preventDefault();calm()};
});
