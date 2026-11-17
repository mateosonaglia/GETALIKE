import { Resend } from 'resend';
import { handleInquiry } from '../lib/inquiry.mjs';
export async function POST(request){
 const key=process.env.RESEND_API_KEY;
 const resend=key?new Resend(key):null;
 return handleInquiry(request,resend?(message,options)=>resend.emails.send(message,options):null);
}
