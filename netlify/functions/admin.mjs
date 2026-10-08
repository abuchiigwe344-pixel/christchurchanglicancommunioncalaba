import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

const store=()=>getStore("church-site");
const json=(x,s=200)=>new Response(JSON.stringify(x),{status:s,headers:{"content-type":"application/json"}});
const unauthorized=()=>json({error:"Unauthorized"},401);
function makeToken(password){return crypto.createHmac("sha256",process.env.ADMIN_PASSWORD||"change-me").update(password).digest("hex")}
function valid(req){const h=req.headers.get("authorization")||"";return h==="Bearer "+makeToken(process.env.ADMIN_PASSWORD||"change-me")}
async function getData(){
  const d=await store().get("site-data",{type:"json"});
  return d||{churchName:"Christ Church Anglican Communion",bulletin:{},services:{},contact:{},announcements:[],activities:[],archive:[]};
}
async function saveImage(file,key){if(!file||typeof file==='string'||!file.size)return null;await store().set(key,Buffer.from(await file.arrayBuffer()),{metadata:{contentType:file.type||'image/jpeg'}});return '/.netlify/functions/church-image?key='+encodeURIComponent(key)}
export default async req=>{
  if(req.method!=="POST")return json({error:"POST only"},405);
  const ct=req.headers.get("content-type")||"";
  if(ct.includes("application/json")){
    const body=await req.json();
    if(body.action==="login"){
      if(body.password!==process.env.ADMIN_PASSWORD)return unauthorized();
      return json({token:makeToken(body.password)});
    }
    if(!valid(req))return unauthorized();
    const d=await getData();
    if(body.action==="save-contact")Object.assign(d,{churchName:body.churchName,contact:{phone:body.phone,social:body.social},address:body.address});
    if(body.action==="save-services")d.services=body.services;
    if(body.action==="save-announcements")d.announcements=body.announcements;
    if(body.action==="save-activities")d.activities=body.activities;
    await store().setJSON("site-data",d); return json({ok:true});
  }
  if(!valid(req))return unauthorized();
  const form=await req.formData(), action=form.get("action"), d=await getData();
  if(action==="save-bulletin"){
    const keys=["title","date","topic","season","office","colour","time"];d.bulletin=d.bulletin||{};
    for(const k of keys)d.bulletin[k]=form.get(k)||"";
    const file=form.get("pdf");
    if(file && typeof file!=="string" && file.size){
      const key="bulletins/current.pdf"; await store().set(key,Buffer.from(await file.arrayBuffer()),{metadata:{contentType:"application/pdf"}});
      d.bulletin.pdf="/.netlify/functions/bulletin-pdf";
    }
    await store().setJSON("site-data",d);return json({ok:true});
  }
  if(action==="add-archive"){
    const file=form.get("pdf"),label=form.get("label");
    if(!file || typeof file==="string" || !file.size)return json({error:"PDF required"},400);
    const id=Date.now()+"-"+file.name.replace(/[^a-z0-9._-]/gi,"-");
    await store().set("archive/"+id,Buffer.from(await file.arrayBuffer()),{metadata:{contentType:"application/pdf",label}});
    d.archive=d.archive||[];d.archive.unshift({label,url:"/.netlify/functions/archive-pdf?id="+encodeURIComponent(id)});
    await store().setJSON("site-data",d);return json({ok:true});
  }
  if(action==='save-person'){const type=form.get('type'),i=Number(form.get('index')),data=JSON.parse(form.get('data')||'{}'),d=await getData();const k=type==='arm'?'churchArms':'churchUnits';d[k]=d[k]||[];d[k][i]={...(d[k][i]||{}),...data};const im=await saveImage(form.get('image'),'images/'+type+'-'+i+'-main');const li=await saveImage(form.get('leaderImage'),'images/'+type+'-'+i+'-leader');if(im)d[k][i].image=im;if(li)d[k][i].leaderImage=li;await store().setJSON('site-data',d);return json({ok:true})}
  if(action==='save-clergy'){const i=Number(form.get('index')),data=JSON.parse(form.get('data')||'{}'),d=await getData();d.clergy=d.clergy||[];d.clergy[i]={...(d.clergy[i]||{}),...data};const im=await saveImage(form.get('image'),'images/clergy-'+i);if(im)d.clergy[i].image=im;await store().setJSON('site-data',d);return json({ok:true})}
  return json({error:"Unknown action"},400);
};
