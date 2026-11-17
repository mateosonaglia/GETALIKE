export const INBOX='msonaglia@getalike.agency';
const goals={time:'More time to focus on my business',inquiries:'More visibility and customer inquiries',plan:'A clearer marketing plan',unsure:'I would like your advice'};
export function validateInquiry(body){
  if(!body||typeof body!=='object'||Array.isArray(body)) throw new Error('Invalid inquiry');
  if(typeof body.companyWebsite!=='string'||body.companyWebsite.length!==0) throw new Error('Invalid inquiry');
  const clean=(field,max,min=1)=>{
    if(typeof body[field]!=='string') throw new Error('Missing field');
    const value=body[field].trim();
    if(value.length<min||value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))throw new Error('Invalid field');
    return value;
  };
  const name=clean('name',100),business=clean('business',160),email=clean('email',254),message=clean('message',2000,0);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(name+business))throw new Error('Invalid contact');
  if(!Object.hasOwn(goals,body.goal)||!['email','call'].includes(body.nextStep))throw new Error('Invalid option');
  if(typeof body.requestId!=='string'||! /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.requestId))throw new Error('Invalid request');
  return {name,business,email,message,goal:body.goal,nextStep:body.nextStep,requestId:body.requestId};
}
export function emailFor(inquiry){
 return {
  from:`GETALIKE website <${INBOX}>`,to:[INBOX],replyTo:inquiry.email,
  subject:`Website inquiry: ${inquiry.business}`,
  text:[
   'New GETALIKE website inquiry',
   `Name: ${inquiry.name}`,`Business: ${inquiry.business}`,`Email: ${inquiry.email}`,
   `Priority: ${goals[inquiry.goal]}`,`Preferred next step: ${inquiry.nextStep==='call'?'Introductory call requested. Arrange a time by email.':'Start over email.'}`,
   '',inquiry.message||'No additional message.','',`Reference: ${inquiry.requestId}`
  ].join('\n')
 };
}
export async function handleInquiry(request,send){
 const reply=(status,body)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 if(request.method!=='POST')return new Response(null,{status:405,headers:{Allow:'POST','Cache-Control':'no-store'}});
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)return reply(403,{ok:false});
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return reply(415,{ok:false});
 const declared=Number(request.headers.get('content-length'));
 if(Number.isFinite(declared)&&declared>8192)return reply(413,{ok:false});
 let inquiry;
 try{
  // Bound the bytes actually consumed, even if Content-Length is absent or inaccurate.
  const reader=request.body?.getReader();
  if(!reader)return reply(400,{ok:false});
  let bytes=0;const chunks=[];
  while(true){const {value,done}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>8192){await reader.cancel();return reply(413,{ok:false});}chunks.push(value);}
  const data=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.byteLength;}
  inquiry=validateInquiry(JSON.parse(new TextDecoder().decode(data)));
 }catch{return reply(400,{ok:false});}
 if(!send)return reply(503,{ok:false});
 try{
  const {data,error}=await send(emailFor(inquiry),{idempotencyKey:`getalike-inquiry/${inquiry.requestId}`});
  if(error||!data?.id){console.error('Inquiry email was not accepted by the provider.');return reply(502,{ok:false});}
  return reply(200,{ok:true});
 }catch{console.error('Inquiry email delivery request failed.');return reply(502,{ok:false});}
}
