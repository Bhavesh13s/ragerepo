'use strict';
// Page 2: The Profile. All texts live in TXT / BANK so they are easy to edit.
const TXT={
 bio:["I don't sleep. Sleep sleeps because of me.","CEO of 7 startups (0 revenue).","Dropped out of 3 schools for being too smart.","Exposing the Matrix since Tuesday.","Money is just a vibe I own."],
 stars:['★ 1','☆ 0','-5','-∞'],scroll:{25:'Giving up already?',50:'Halfway, like all your projects.',90:"Don't leave now."},
 att:['Attention: 3%. Typical.','Attention: 40%. Wandering.','Attention: 100%. For now.'],
 quotes:['Discipline is just stubbornness with a haircut.','Rise at 3 AM. Regret at 3:01.','Winners wait for no one. Especially you.'],
 notify:['Cobra followed 2 people. Not you.','Cobra is typing…','Message seen 3:00 AM.'],
 names:['Rahul_Sigma99','Priya_Hustle','GrindBot_42','Arjun.Alpha','Neha_Mindset','Vikram_Wolf','Sana_Grind','Kabir_3AM','Tara_Boss','Ishaan_Elite','Meera_Hustles','Dev_Brotherhood'],
 survey:['Describe your lack of discipline.','How long did you hesitate?','Rate your scrolling.','Why did you read the bio?','What did you expect?','How many times did you blink?','Who raised your standards so low?']
};
const BANK={
 simp:["Bro just woke up and chose greatness.","My life changed after I blinked near this post.","Legend. Mentor. Wi-Fi router. All in one.","I screenshot his posts and read them in the mirror.","He once looked at a sunrise and it started early.","Cold showers fear him.","Cobra doesn't check the time. Time checks Cobra.","Learned more from one caption than four years of school.","The grind has a face and it's this one.","I'd follow him into a lake. Wait, I did.","Every like here is a tiny act of loyalty.","Mentor of mentors. Founder of founders.","Cobra said hydrate. I hydrated. Life changed.","This man's alarm clock is scared of him.","Bookmarked, framed, emotionally laminated.","Peak mindset. Peak lighting. Peak mirror."],
 roast:["You've been on this page a while. Don't you have a life?","Your scroll speed says everything about your discipline.","Bro read the whole bio and still isn't a millionaire.","You liked it and then unliked it. Coward behaviour.","You hover over buttons like they owe you money.","You read comments instead of taking action. Iconic.","Your cursor has no direction in life.","You clicked Follow and got fired in two seconds. Efficient.","Still here? Your to-do list called. It's lonely.","You've refreshed this page in your head three times.","You scrolled up to check if you missed something. You did.","You're reading comments about comments. Reflect.","Your attention span just left. It said goodbye.","Staying this long is a commitment you won't keep elsewhere."],
 brand:["Brotherhood University has liked this","Cobra Energy Drink (sponsored): Fuel your grind.","Mirror Selfies Inc. has verified this post","Cold Lake Spa has reposted this","Wi-Fi Weekly: Cobra is our router of the year","Brotherhood Bank (not a bank) has liked this","Grindset Gear (sponsored): Sleep less, pay more.","3 AM Alarm Co. has endorsed this"],
 args:[["Ok but cold showers are overrated","Bro said overrated in THIS comment section??","I'm just saying lukewarm exists","Both of you are loud. Meanwhile the visitor here hasn't posted anything."],["First comment was mine","Nobody asked who was first","Cobra asked. Silently.","Funny, you two argue more than the visitor scrolls. Barely."],["Sunrise is just the sky clocking in","Sunset is the sky clocking out","Stop it, you're both wrong","Agreed. And whoever's reading this is slower than both of you."],["His chain is gold","It's gold-plated, learn the difference","Respect the plating","Plating is what the visitor has: surface level."]]
};
const PIN='Pinned by Cobra: Don\'t ask why your comment was deleted.';
const t0=Date.now(),secs=()=>(Date.now()-t0)/1000;
$('#av').innerHTML=face();

// Bio: types a line, every 10s deletes half and types the next.
(async function bio(){const b=$('#bio');let i=0,cur='';
 const type=async s=>{for(const c of s){cur+=c;b.textContent=cur;await wait(45)}};
 await type(TXT.bio[0]);
 while(true){await wait(10000);while(cur.length>cur.length/2&&cur.length>3&&cur.length>Math.floor(TXT.bio[i].length/2)){cur=cur.slice(0,-1);b.textContent=cur;await wait(25)}
  i=(i+1)%TXT.bio.length;cur='';b.textContent='';await type(TXT.bio[i])}})();

// Buttons
$('#follow').onclick=function(){this.textContent='Followed ✓';setTimeout(()=>{this.textContent='Follow';toast('You have been unfollowed for lacking discipline.')},2000)};
$('#connect').onclick=()=>toast('Cobra has declined your request.');
let likes=2041,liked=false;const lc=$('#lc');
$('#like').onclick=()=>{liked=!liked;likes++;lc.textContent=likes.toLocaleString();tone(520,.1)};
$('#dislike').onclick=()=>{likes+=10;lc.textContent=likes.toLocaleString();toast('Disliked. +10 likes. Obviously.')};
let rs=0;$('#rate').onclick=function(){this.textContent=TXT.stars[Math.min(rs,3)];rs++;$('#rl').textContent='Weak.'};
$$('.poll').forEach(b=>b.onclick=()=>$('#pr').textContent='Correct. Cobra noticed.');

// Scroll friction (mouse wheel only, always finishes) + depth taunts
let last=0,f=1;addEventListener('wheel',e=>{if(!RAGE)return;e.preventDefault();const n=Date.now();f=n-last<150?Math.max(.3,f-.08):1;last=n;scrollBy(0,e.deltaY*f)},{passive:false});
const shown={};addEventListener('scroll',()=>{const p=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;for(const k in TXT.scroll)if(p>=k&&!shown[k]){shown[k]=1;toast(TXT.scroll[k])}});

// Attention meter, wasted time, viewers, nag popups
every(()=>{const s=secs(),p=Math.max(3,100-s/2.4);$('#att').style.width=p+'%';$('#at').textContent=p>60?TXT.att[2]:p>20?TXT.att[1]:TXT.att[0];$('#wasted').textContent=s<60?Math.floor(s)+'s':Math.floor(s/60)+' min'},1000);
function modal(html,btn,onClose){if(!RAGE||$('.overlay.m'))return;const o=el('div','overlay m',`<div class="pop">${html}<button class="btn" id="mc">${btn}</button></div>`);document.body.append(o);onClose&&onClose(o,$('#mc',o))}
every(()=>modal(`<h3>${rand(TXT.quotes)}</h3><p class="sub">You may close this in <b id="cd">5</b>.</p>`,'Close',(o,b)=>{let c=5,moved=false;b.disabled=true;
 const id=setInterval(()=>{c--;$('#cd',o).textContent=c;if(c<=0){clearInterval(id);b.disabled=false;
  b.onclick=()=>{if(!moved){moved=true;b.style.position='fixed';b.style.left=Math.random()*60+10+'vw';b.style.top=Math.random()*60+20+'vh'}else o.remove()}}},1000)}),15000);
every(()=>modal('<h3>Are you still here?</h3>','Unfortunately',(o,b)=>b.onclick=()=>o.remove()),20000);
every(()=>toast(rand(TXT.notify)),13000);
let sc=0;$('#subbtn').onclick=()=>{if(++sc>=5)$('#sub').classList.add('small')};

// Trail, right-click, back trap
let lt=0;addEventListener('pointermove',e=>{if(!RAGE||Date.now()-lt<90)return;lt=Date.now();const s=el('span','trail','🕶️');s.style.left=e.clientX+8+'px';s.style.top=e.clientY+8+'px';document.body.append(s);requestAnimationFrame(()=>{s.style.opacity=0;s.style.transform='translateY(14px)'});setTimeout(()=>s.remove(),700)});
addEventListener('contextmenu',e=>{if(!RAGE)return;e.preventDefault();toast('Rent free in your head.')});
let backed=false;history.pushState({t:1},'');
addEventListener('popstate',()=>{if(backed||!RAGE)return;backed=true;history.pushState({t:1},'');modal('<h3>Are you sure? Cobra will remember this.</h3>','Stay',(o,b)=>b.onclick=()=>o.remove())});

// Comment engine
const list=$('#list');let lastText='',kindN=0;
function comment(name,text,cls){const c=el('article','cm '+(cls||''),`<div class="av">${name[0].toUpperCase()}</div><div style="flex:1"><b></b> <span class="ts">just now</span><p></p><div class="acts"><button class="lk">♡ Like</button><button class="rp">Reply</button></div><div class="slot"></div></div>`);
 $('b',c).textContent=name;$('p',c).textContent=text;
 $('.lk',c).onclick=function(){this.textContent='Liked by Cobra';setTimeout(()=>this.textContent='♡ Like',1000)};
 $('.rp',c).onclick=()=>{const s=$('.slot',c);s.innerHTML='<input placeholder="Write a reply…" aria-label="Reply">';$('input',s).focus();setTimeout(()=>s.innerHTML='',3000)};return c}
function pick(){const lvl=Math.min(BANK.roast.length,4+Math.floor(secs()/15)),pr=Math.min(.6,.15+secs()/300),r=Math.random();let t;
 do{t=r<pr?rand(BANK.roast.slice(0,lvl)):r<pr+.15?rand(BANK.brand):rand(BANK.simp)}while(t===lastText);lastText=t;return t}
function add(parent){const t=pick(),c=comment(rand(TXT.names),t,/University|Sponsored|sponsored|Inc\.|Co\./.test(t)?'brand':'');(parent||list).insertBefore(c,parent?null:list.children[1]||null);while(list.children.length>40)list.lastChild.remove()}
async function thread(){const th=rand(BANK.args),a=rand(TXT.names),b=rand(TXT.names.filter(n=>n!==a));
 for(let i=0;i<th.length;i++){const c=comment(i%2?b:a,th[i],i?'sub2':'');if(i)list.insertBefore(c,list.children[1+i]||null);else list.insertBefore(c,list.children[1]||null);await wait(1200)}}
list.append(comment('Cobra_Official',PIN,'pin'));
for(let i=0;i<4;i++)add();
(function spawn(){setTimeout(()=>{if(RAGE){Math.random()<.2?thread():add();if(Math.random()<.35&&list.children.length>4)list.insertBefore(list.children[2+Math.floor(Math.random()*(list.children.length-3))],list.children[1])}spawn()},3000+Math.random()*3000)})();
$('#more').onclick=()=>{for(let i=0;i<5;i++)list.append(comment(rand(TXT.names),pick()));toast('Only 5 more. 12,842 remain hidden.')};
$('#post').onclick=()=>{const v=$('#mine').value.trim();if(!v)return;$('#mine').value='';const c=comment('You',v);list.insertBefore(c,list.children[1]);
 setTimeout(()=>{$('p',c).textContent='Comment removed for lacking value.';$('.acts',c).remove()},2000)};

// Final boss: 47-question exit survey, progress occasionally goes backwards.
$('#exit').onclick=()=>{let q=0,prog=0;const o=el('div','overlay',`<div class="pop" id="sv"></div>`);document.body.append(o);
 const draw=()=>{const sv=$('#sv',o);if(q>=47){sv.innerHTML='<h2>Survey complete.</h2><p>Cobra is disappointed.</p><p class="tiny">(certificate, fake, for satire)</p><button class="btn" id="rr">Restart rage</button>';$('#rr',o).onclick=()=>{sessionStorage.clear();location.href='index.html'};return}
  const text=q===46?'Why are you weak?':TXT.survey[q%TXT.survey.length];
  sv.innerHTML=`<p class="sub">Question ${q+1}/47 (mandatory)</p><div class="bar"><i style="width:${prog}%"></i></div><h3>${text}</h3><input aria-label="Answer"><button class="btn" id="nx">Next</button>`;
  $('#nx',o).onclick=()=>{q++;prog=(q%9===0)?Math.max(0,prog-12):Math.min(100,q/47*100);draw()}};draw()};
