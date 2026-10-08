import { getStore } from "@netlify/blobs";
export default async ()=>{
  try{
    const b=await getStore("church-site").get("bulletins/current.pdf",{type:"arrayBuffer"});
    if(!b)return new Response("Not found",{status:404});
    return new Response(b,{headers:{"content-type":"application/pdf","cache-control":"no-store"}});
  }catch(e){return new Response("Not found",{status:404})}
};
