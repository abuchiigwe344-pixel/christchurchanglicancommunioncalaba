import { getStore } from "@netlify/blobs";
export default async req=>{
  const id=new URL(req.url).searchParams.get("id");
  if(!id)return new Response("Missing id",{status:400});
  try{
    const b=await getStore("church-site").get("archive/"+id,{type:"arrayBuffer"});
    if(!b)return new Response("Not found",{status:404});
    return new Response(b,{headers:{"content-type":"application/pdf","cache-control":"public,max-age=31536000"}});
  }catch(e){return new Response("Not found",{status:404})}
};
