const churchArmsFallback=[{id:"cmf",name:"CMF",role:"Church Arm",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"CMF Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"cmf@example.com"},{id:"mothers",name:"MOTHERS",role:"Church Arm",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"Mothers' Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"mothers@example.com"},{id:"ayf",name:"AYF",role:"Church Arm",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"AYF Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"ayf@example.com"},{id:"acm",name:"ACM",role:"Church Arm",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"ACM Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"acm@example.com"}];const churchUnitsFallback=[{id:"choir",name:"Choir",role:"Church Unit",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"Choir Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"choir@example.com"},{id:"praise",name:"Praise Team",role:"Church Unit",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"Praise Team Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"praise@example.com"},{id:"worship",name:"Worship Team",role:"Church Unit",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"Worship Team Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"worship@example.com"},{id:"stewards",name:"Guild of Stewards",role:"Church Unit",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"Guild Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"stewards@example.com"},{id:"media",name:"Media Team",role:"Church Unit",history:"Temporary placeholder history — replace from Admin.",image:"/assets/church-building.jpg",leader:"Media Team Leader",leaderImage:"/assets/church-building.jpg",phone:"08000000000",email:"media@example.com"}];const clergyFallback=[{id:"bishop",name:"Bishop — Placeholder",position:"Bishop",image:"/assets/church-building.jpg",phone:"08000000000",email:"bishop@example.com"},{id:"archdeacon",name:"Archdeacon — Placeholder",position:"Archdeacon",image:"/assets/church-building.jpg",phone:"08000000000",email:"archdeacon@example.com"},{id:"priest",name:"Church Priest — Placeholder",position:"Church Priest",image:"/assets/church-building.jpg",phone:"08000000000",email:"priest@example.com"}];function renderPeople(id,list){const el=document.getElementById(id);if(!el)return;el.innerHTML=list.map(x=>`<article class="person-card"><img class="person-photo" src="${escAttr(x.image||'/assets/church-building.jpg')}" alt="${escAttr(x.name)}"><div class="person-body"><div class="role">${esc(x.role||'Church Unit')}</div><h3>${esc(x.name)}</h3><p class="history">${esc(x.history||'')}</p><div class="leader"><img src="${escAttr(x.leaderImage||'/assets/church-building.jpg')}" alt="${escAttr(x.leader||'Unit Leader')}"><div><strong>${esc(x.leader||'Unit Leader')}</strong><span>Unit Leader</span><a href="tel:${escAttr(x.phone||'')}">${esc(x.phone||'')}</a><a href="mailto:${escAttr(x.email||'')}">${esc(x.email||'')}</a></div></div></div></article>`).join('')}function renderClergy(id,list){const el=document.getElementById(id);if(!el)return;el.innerHTML=list.map(x=>`<article class="clergy-card"><img src="${escAttr(x.image||'/assets/church-building.jpg')}" alt="${escAttr(x.name)}"><div class="clergy-body"><div class="position">${esc(x.position||'Clergy')}</div><h3>${esc(x.name)}</h3><div class="clergy-contact"><a href="tel:${escAttr(x.phone||'')}">☎ ${esc(x.phone||'')}</a><a href="mailto:${escAttr(x.email||'')}">✉ ${esc(x.email||'')}</a></div></div></article>`).join('')}function escAttr(v){return String(v??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
const fallback = {
  bulletin:{title:"This week's bulletin",date:"30/08/2026",topic:"OTHER SIDE FORGOTTEN BREAD",season:"TRINITY XIII",office:"MATTINS",colour:"GREEN",time:"7:30AM",pdf:"/assets/current-bulletin.pdf"},
  services:{first:"6:30am",second:"9:00am",acm:"3:00pm",efac:"5:00pm"},
  contact:{phone:"07065920955 · 08104205183",social:"@Christ Anglican Church Calabar"},
  announcements:[
    ["Welcome","We welcome all our members and visitors to church this morning in Jesus Name."],
    ["AYF Rentals","Contact AYF for rental services for various occasions: 08060087655 or 08188682639."],
    ["Diocesan Investment Levy","Men – ₦2,000 · Women – ₦1,000 · Youths – ₦500 · Children – ₦100."]
  ],
  activities:[
    ["Monday","Shower Of Change","6am – 7am"],["Monday","Women Prayer Meeting","5pm – 6pm"],["Monday","AYF Fellowship","5pm – 7pm"],
    ["Tuesday","Calm the storm with Jesus","12noon – 1pm"],["Tuesday","Choir Practice","5pm – 7pm"],["Tuesday","Prayer Band","5pm – 7pm"],
    ["Wednesday","Hour of Divine Encounter","9am – 12noon"],["Wednesday","Revival Service","5pm – 7pm"],["Wednesday","Praise Wednesday","Every last Wednesday"],
    ["Thursday","Band Rehearsal","4pm – 5pm"],["Thursday","Choir Rehearsal","5pm – 6pm"],["Thursday","CMF (Last Thursday)","5pm – 6pm"],
    ["Friday","Bible Study (Treasure Search)","5pm – 7pm"],
    ["Saturday","Go to them (Every 2nd Saturday)","7am – 8am"],["Saturday","Baptism (Every 3rd Saturday)","9am"],["Saturday","Guild of Stewards meeting","10am"],["Saturday","Praise Band Rehearsal","1pm"],["Saturday","Choir Rehearsal","4pm"],["Saturday","Boys and Girls Brigade","4pm"],
    ["Sunday","1st Service","6:30am"],["Sunday","2nd Service","9am"],["Sunday","ACM","3pm"],["Sunday","EFAC","5pm"]
  ]
};

async function loadData(){
  try{
    const r=await fetch("/api/site-data",{cache:"no-store"});
    if(r.ok) return await r.json();
  }catch(e){}
  return fallback;
}
function render(d){
  const b=d.bulletin||fallback.bulletin;
  document.title=(d.churchName||"Christ Church Anglican Communion")+" | Calabar";
  document.getElementById("bulletinTitle").textContent=b.title||"This week's bulletin";
  document.getElementById("bulletinDate").textContent=b.date||"";
  document.getElementById("bulletinTopic").textContent=b.topic||"";
  document.getElementById("bulletinSeason").textContent=b.season||"";
  document.getElementById("bulletinOffice").textContent=b.office||"";
  document.getElementById("bulletinColour").textContent=b.colour||"";
  document.getElementById("bulletinTime").textContent=b.time||"";
  const pdf=b.pdf||"/assets/current-bulletin.pdf";
  document.getElementById("pdfViewer").src=pdf;
  document.getElementById("openBulletin").href=pdf;
  document.getElementById("downloadBulletin").href=pdf;
  const s=d.services||fallback.services;
  document.getElementById("firstService").textContent=s.first;document.getElementById("secondService").textContent=s.second;
  document.getElementById("acmService").textContent=s.acm;document.getElementById("efacService").textContent=s.efac;
  const c=d.contact||fallback.contact;
  document.getElementById("contactPhone").textContent=c.phone;document.getElementById("socialHandle").textContent=c.social;
  const al=document.getElementById("announcementList"); al.innerHTML="";
  (d.announcements||[]).forEach(a=>{const x=document.createElement("article");x.className="announcement";x.innerHTML=`<h3>${esc(a[0])}</h3><p>${esc(a[1])}</p>`;al.appendChild(x)});
  const act=document.getElementById("activityList"); act.innerHTML='<div class="activity-row head"><span>Day</span><span>Activity</span><span>Time</span></div>';
  (d.activities||[]).forEach(a=>{const x=document.createElement("div");x.className="activity-row";x.innerHTML=`<span>${esc(a[0])}</span><span>${esc(a[1])}</span><span>${esc(a[2])}</span>`;act.appendChild(x)});
  renderPeople("churchArmGrid",d.churchArms||churchArmsFallback);renderPeople("churchUnitGrid",d.churchUnits||churchUnitsFallback);renderClergy("clergyGrid",d.clergy||clergyFallback);document.getElementById("year").textContent=new Date().getFullYear();
}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
loadData().then(render);
document.querySelector(".menu-btn")?.addEventListener("click",()=>{const n=document.querySelector("nav");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.right="4%";n.style.top="68px";n.style.flexDirection="column";n.style.background="#fff";n.style.padding="16px";n.style.border="1px solid #e7e3dc";n.style.borderRadius="10px"});
