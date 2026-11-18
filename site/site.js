const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('open', expanded);
  if (expanded) navigation.querySelector('a')?.focus();
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) { menu.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); menu.focus();
  }
});
// Keep the visible menu state accurate and usable with a keyboard.
const closeMenu = () => {
  menu?.setAttribute('aria-expanded','false');
  navigation?.classList.remove('open');
};
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.querySelector('.header-talk')?.addEventListener('click', closeMenu);
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
const navLinks = [...document.querySelectorAll('#navigation [data-section]')];
const markSection = (section, current = 'location') => {
  navLinks.forEach(link => {
    const active = link.dataset.section === section;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', current);
    else link.removeAttribute('aria-current');
  });
};
if (location.pathname.replace(/\/$/, '') === '/work') markSection('work', 'page');
else if (location.pathname === '/') {
  const sections = ['services', 'process', 'about-us'].map(id => document.getElementById(id)).filter(Boolean);
  const updateSection = () => {
    const marker = document.querySelector('.header').getBoundingClientRect().bottom + 120;
    const current = sections.filter(section => section.getBoundingClientRect().top <= marker).at(-1);
    // Do not keep a section selected once its content has passed.
    markSection(current && current.getBoundingClientRect().bottom > marker ? current.id : '');
  };
  let sectionFramePending = false;
  window.addEventListener('scroll', () => {
    if (sectionFramePending) return;
    sectionFramePending = true;
    requestAnimationFrame(() => { updateSection(); sectionFramePending = false; });
  }, {passive:true});
  updateSection();
}
const priorities = {
 time: ['Less on your plate','A marketing partner who takes it from here.','From planning content to keeping your channels active, we handle the day to day. You stay involved in the decisions that matter, with a simple process for feedback and approvals.'],
 inquiries: ['A stronger presence','Help the right people find their way to you.','We look at who your customers are and where they look for a business like yours. Then we agree on the right mix of content, search visibility, and advertising to support that goal.'],
 plan: ['A clear direction','Know what comes next, and why.','Bring your questions, your ambitions, and the things you’ve already tried. We’ll help turn them into clear priorities and a marketing plan that works with the time and resources you have.']
};
document.querySelectorAll('[data-goal]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-goal]').forEach(other => { other.classList.toggle('active',other===button); other.setAttribute('aria-pressed',String(other===button)); });
  const key=button.dataset.goal;
  ['goal-kicker','goal-title','goal-description'].forEach((id,index)=> {document.getElementById(id).textContent=priorities[key][index];});
  document.getElementById('inquiry-goal').value=key;
}));
const form=document.getElementById('inquiry-form');
let requestId;
form?.addEventListener('input',()=>{requestId=undefined;});
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!form.reportValidity()) return;
  const status=document.getElementById('form-status');
  const submit=form.querySelector('[type=submit]');
  if(submit.disabled) return;
  if(!window.crypto?.randomUUID){status.textContent='Please email msonaglia@getalike.agency to send your inquiry.';return;}
  requestId ||= crypto.randomUUID();
  const values=Object.fromEntries(new FormData(form));
  submit.disabled=true; submit.textContent='Sending your inquiry…'; status.textContent='';
  try{
    const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,requestId})});
    const result=await response.json();
    if(!response.ok||result.ok!==true) throw new Error('Not accepted');
    status.textContent=values.nextStep==='call'?'Thank you. Your inquiry has been sent. We’ll reply by email to arrange an introductory call. A call time is not booked yet.':'Thank you. Your inquiry has been sent. We’ll reply to the email address you shared to discuss the next step.';
    form.reset(); requestId=undefined;
  }catch{
    status.textContent='Your inquiry could not be confirmed. Your details are still here. Please try again, or email msonaglia@getalike.agency.';
  }finally{submit.disabled=false; submit.innerHTML='Send my inquiry <span aria-hidden="true"><svg class="icon-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span>'; status.focus();}
});
