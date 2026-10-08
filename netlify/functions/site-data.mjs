import { getStore } from "@netlify/blobs";

const fallback = {
  churchName:"Christ Church Anglican Communion",
  bulletin:{title:"This week's bulletin",date:"30/08/2026",topic:"OTHER SIDE FORGOTTEN BREAD",season:"TRINITY XIII",office:"MATTINS",colour:"GREEN",time:"7:30AM",pdf:"/assets/current-bulletin.pdf"},
  services:{first:"6:30am",second:"9:00am",acm:"3:00pm",efac:"5:00pm"},
  contact:{phone:"07065920955 · 08104205183",social:"@Christ Anglican Church Calabar"},
  announcements:[["Welcome","We welcome all our members and visitors to church this morning in Jesus Name."]],
  activities:[],
  archive:[]
,
  churchArms:[{"id": "cmf", "name": "CMF", "role": "Church Arm", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "CMF Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "cmf@example.com"}, {"id": "mothers", "name": "MOTHERS", "role": "Church Arm", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "Mothers' Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "mothers@example.com"}, {"id": "ayf", "name": "AYF", "role": "Church Arm", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "AYF Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "ayf@example.com"}, {"id": "acm", "name": "ACM", "role": "Church Arm", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "ACM Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "acm@example.com"}],
  churchUnits:[{"id": "choir", "name": "Choir", "role": "Church Unit", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "Choir Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "choir@example.com"}, {"id": "praise", "name": "Praise Team", "role": "Church Unit", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "Praise Team Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "praise@example.com"}, {"id": "worship", "name": "Worship Team", "role": "Church Unit", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "Worship Team Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "worship@example.com"}, {"id": "stewards", "name": "Guild of Stewards", "role": "Church Unit", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "Guild Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "stewards@example.com"}, {"id": "media", "name": "Media Team", "role": "Church Unit", "history": "Temporary placeholder history — replace from Admin.", "image": "/assets/church-building.jpg", "leader": "Media Team Leader", "leaderImage": "/assets/church-building.jpg", "phone": "08000000000", "email": "media@example.com"}],
  clergy:[{"id": "bishop", "name": "Bishop — Placeholder", "position": "Bishop", "image": "/assets/church-building.jpg", "phone": "08000000000", "email": "bishop@example.com"}, {"id": "archdeacon", "name": "Archdeacon — Placeholder", "position": "Archdeacon", "image": "/assets/church-building.jpg", "phone": "08000000000", "email": "archdeacon@example.com"}, {"id": "priest", "name": "Church Priest — Placeholder", "position": "Church Priest", "image": "/assets/church-building.jpg", "phone": "08000000000", "email": "priest@example.com"}]
};
export default async () => {
  try{
    const store=getStore("church-site");
    const data=await store.get("site-data",{type:"json"});
    return new Response(JSON.stringify(data||fallback),{headers:{"content-type":"application/json","cache-control":"no-store"}});
  }catch(e){
    return new Response(JSON.stringify(fallback),{headers:{"content-type":"application/json"}});
  }
};
