'use strict';
// Page 1: The Gate. Stages run in order; progress after stage 2 is kept in sessionStorage.
const TXT={
 dodge:['Start','Not yet','Try harder','Almost','Lol no','Too slow'],
 captcha:['Select all squares containing regret','Select all weak people','Select all traffic lights'],
 fail:["You failed. You're human, unfortunately.","Wrong. Your clicking lacks conviction."],
 load:['Escaping the Matrix...','Calculating your worthiness...','Asking Cobra for permission...'],
 quiz:[['Wrong','Picking that says a lot about your patience.'],['Wrong','Bold choice. Wrong, but bold.'],['Wrong','You hesitated. We noticed.'],['Wrong','Even your mouse looked embarrassed.'],['Wrong','Confidence: high. Accuracy: none.']]
};
const stage=$('#stage'),screen=h=>{stage.innerHTML=h};
const dist=(e,b)=>{const r=b.getBoundingClientRect();return Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))};
function dodge(b,box){const w=box.clientWidth-b.offsetWidth,h=box.clientHeight-b.offsetHeight;b.style.left=Math.random()*w+'px';b.style.top=Math.random()*h+'px'}

function startTrick(){return new Promise(res=>{
 screen(`<h1>COBRA SIGMA</h1><p class="sub">The Brotherhood Awaits</p><div id="arena"><button id="go" class="btn big" aria-label="Start">Start</button></div><button id="giveup" class="btn ghost">Give up</button>`);
 const go=$('#go'),box=$('#arena'),gu=$('#giveup');let n=0,open=false,moved=false;
 const near=e=>{if(!RAGE||open||dist(e,go)>120)return;n++;go.textContent=TXT.dodge[n%TXT.dodge.length];dodge(go,box);tone(300+n*30,.1);if(n>=10){open=true;go.textContent='Fine. Catch me.'}};
 addEventListener('pointermove',near);addEventListener('pointerdown',near);
 gu.addEventListener('pointerenter',()=>{if(RAGE&&!moved){moved=true;gu.style.position='relative';gu.style.left=(Math.random()*160-80)+'px'}});
 gu.onclick=()=>{open=true;go.textContent='Fine. Catch me.'};
 go.onclick=()=>{if(open||!RAGE){removeEventListener('pointermove',near);removeEventListener('pointerdown',near);res()}};
})}

function hold(){return new Promise(res=>{
 screen(`<h2>Hold to enter</h2><div class="ring" id="ring"><button id="h" class="btn">Hold</button></div><p id="msg" class="sub">Hold for 8 seconds.</p>`);
 let fails=0,on=false,t0=0,raf=0;const need=()=>(fails>=3||!RAGE)?1000:8000,fill=v=>$('#ring').style.setProperty('--p',v*360+'deg');
 const tick=()=>{if(!on)return;const p=(performance.now()-t0)/need();fill(Math.min(p,1));if(p>=1){on=false;res()}else raf=requestAnimationFrame(tick)};
 const lose=()=>{if(!on)return;on=false;cancelAnimationFrame(raf);fails++;fill(0);$('#msg').textContent='You blinked.'+(fails>=3?' (Next hold is short. Mercy.)':'')};
 const h=$('#h');h.addEventListener('pointerdown',e=>{e.preventDefault();on=true;t0=performance.now();tick()});
 ['pointerup','pointerleave','pointercancel'].forEach(t=>h.addEventListener(t,lose));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)lose()});
 h.addEventListener('keydown',e=>{if(e.key==='Enter'&&!on){fails=3;on=true;t0=performance.now();tick()}});h.addEventListener('keyup',lose);
})}

function cookies(){return new Promise(res=>{
 screen(`<h2>One moment…</h2>`);
 const o=el('div','overlay',`<div class="pop"><h2>We value your privacy 🍪</h2><p class="sub">Mostly because you have none.</p><button class="btn big" id="acc">Accept all</button><button class="link" id="man">Manage preferences</button><a href="#" id="rej" class="tiny">Reject</a></div>`);
 document.body.append(o);const done=()=>{$$('.overlay').forEach(x=>x.remove());res()};
 $('#acc').onclick=done;
 $('#rej').onclick=e=>{e.preventDefault();done()};
 $('#rej').addEventListener('pointerenter',e=>{if(!RAGE)return;const r=e.target;r.style.cssText=`position:fixed;left:${Math.random()*80+5}vw;top:${Math.random()*80+5}vh`});
 $('#man').onclick=()=>{for(let i=1;i<=4;i++){const p=el('div','overlay',`<div class="pop" style="transform:translate(${i*14}px,${i*14}px)"><h3>Preferences ${i}/4</h3><p class="sub">Toggle nothing. Nothing matters.</p><button class="btn">Dismiss (${i}/4)</button></div>`);
  $('button',p).onclick=()=>{p.remove();if(i===4)done()};document.body.append(p)}};
})}

function captcha(){return new Promise(res=>{
 let tries=0;const set=['🚦','🌳','🚗','🪞','😬','🧱'];
 const draw=()=>{screen(`<h2>Verify you are human</h2><p>${TXT.captcha[tries]}</p><div class="grid">${Array.from({length:9},()=>`<button aria-label="tile">${rand(set)}</button>`).join('')}</div><button class="btn" id="v">Verify</button><p id="m" class="red"></p><p class="tiny">(fake captcha, for satire)</p>`);
  $$('.grid button').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
  $('#v').onclick=()=>{if(tries>=2||!RAGE)return res();$('#m').textContent=TXT.fail[tries];tries++;setTimeout(draw,1400)}};draw();
})}

function loading(){return new Promise(res=>{
 screen(`<h2>Loading your destiny…</h2><div class="bar"><i id="b"></i></div><p id="lm" class="sub">${TXT.load[0]}</p>`);
 setTimeout(jumpscare,8000);const t0=performance.now();
 const id=setInterval(()=>{const t=(performance.now()-t0)/1000,L=RAGE?12:2;const p=t<L*.25?t/(L*.25)*99:t<L*.33?12:12+(t-L*.33)/(L*.67)*88;
  $('#b').style.width=Math.min(p,100)+'%';$('#lm').textContent=TXT.load[Math.floor(t/2)%3];if(t>=L){clearInterval(id);res()}},100);
})}

function queue(){return new Promise(res=>{
 let n=4382,bumped=false,sec=9,resets=0;
 screen(`<h2>You are number <span id="n">4,382</span> in line</h2><p class="sub">Your session expires in <b id="tm">00:09</b></p><p class="tiny">(fake queue, for satire)</p>`);
 const tm=setInterval(()=>{sec--;if(sec<0){if(resets<1){resets++;sec=9}else sec=0}$('#tm').textContent='00:0'+sec},1000);
 const id=setInterval(()=>{n-=Math.floor(60+Math.random()*140);if(!bumped&&n<2000){bumped=true;n+=85}if(n<=0||!RAGE){clearInterval(id);clearInterval(tm);res()}else $('#n').textContent=n.toLocaleString()},120);
})}

function quiz(){return new Promise(res=>{
 let i=0;const ask=()=>{if(i>=5){screen(`<h2>Fine. Enter, if you must.</h2>`);return setTimeout(()=>location.href='profile.html',1500)}
  screen(`<h2>Onboarding quiz ${i+1}/5</h2><p>Pick your mindset:</p><div class="row" style="justify-content:center">${['Grind','Hustle','Vibes'].map(x=>`<button class="btn q">${x}</button>`).join('')}</div><p id="r" class="red"></p><p class="tiny">(fake quiz, for satire)</p>`);
  $$('.q').forEach(b=>b.onclick=()=>{$('#r').textContent=TXT.quiz[i][0]+'. '+TXT.quiz[i][1];i++;setTimeout(ask,1500)})};ask();
})}

// Jumpscare: one zoom + one sound, once per session.
function jumpscare(){if(store.get('scared',0)||!RAGE)return;store.set('scared',1);
 const o=el('div','overlay scare'+(reduced?' soft':''),`<div class="face">${face()}</div>`);document.body.append(o);burst();
 setTimeout(()=>{o.textContent="Relax, brother. You're being profiled.";setTimeout(()=>o.remove(),2200)},1200)}
let idleT;const arm=()=>{clearTimeout(idleT);idleT=setTimeout(jumpscare,6000)};
['pointermove','keydown','pointerdown'].forEach(t=>addEventListener(t,arm));arm();

(async function main(){
 await startTrick();await hold();
 const steps=[cookies,captcha,loading,queue];let from=store.get('gate',0);
 for(let i=from;i<steps.length;i++){await steps[i]();store.set('gate',i+1)}
 quiz();
})();
