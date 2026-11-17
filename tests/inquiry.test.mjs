import test from 'node:test';
import assert from 'node:assert/strict';
import {handleInquiry,INBOX} from '../lib/inquiry.mjs';
const body={name:'Website test',business:'Internal QA',email:'msonaglia@getalike.agency',goal:'plan',message:'Internal test',nextStep:'call',companyWebsite:'',requestId:'a6c5555d-5854-46e9-9199-1dc970f31e1c'};
const request=(changes={},headers={})=>new Request('https://preview.example/api/inquiry',{method:'POST',headers:{'content-type':'application/json',origin:'https://preview.example',...headers},body:JSON.stringify({...body,...changes})});
test('A valid inquiry delivers only to the business inbox with visitor reply address and idempotency',async()=>{
 let sent;
 const response=await handleInquiry(request({to:'other@example.com'}),async(message,options)=>{sent={message,options};return {data:{id:'accepted'}};});
 assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
 assert.deepEqual(sent.message.to,[INBOX]);assert.equal(sent.message.replyTo,body.email);
 assert.equal(sent.options.idempotencyKey,`getalike-inquiry/${body.requestId}`);
 assert.match(sent.message.text,/call requested/);
});
test('Invalid emails, injected headers, options and honeypot never send',async()=>{
 for(const changes of [{email:'bad'},{email:'a@example.com\r\nBcc: other@example.com'},{business:'Shop\r\nInjected'},{goal:'invented'},{nextStep:'booked'},{companyWebsite:'spam'},{message:'x'.repeat(2001)},{requestId:'bad'}]){
  const response=await handleInquiry(request(changes),()=>{throw new Error('Must not send');});assert.equal(response.status,400);
 }
});
test('Cross origin and oversized requests are rejected',async()=>{
 assert.equal((await handleInquiry(request({}, {origin:'https://other.example'}),null)).status,403);
 assert.equal((await handleInquiry(request({message:'x'.repeat(9000)}),null)).status,413);
});
test('Provider errors and missing configuration never show success',async()=>{
 assert.equal((await handleInquiry(request(),null)).status,503);
 assert.equal((await handleInquiry(request(),async()=>({error:{message:'failure'}}))).status,502);
 assert.equal((await handleInquiry(request(),async()=>({data:{}}))).status,502);
 assert.equal((await handleInquiry(request(),async()=>{throw new Error('network');})).status,502);
});
