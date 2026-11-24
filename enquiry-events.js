// Aggregate counters only: no cookies, identifiers, URLs or form contents.
(()=>{'use strict';
 const local=['localhost','127.0.0.1','[::1]'].includes(location.hostname)&&location.port==='8766';
 const production=location.origin==='https://mehuljhaveri.pages.dev'||location.origin==='https://rushil9.github.io'&&location.pathname.startsWith('/mehul-jhaveri/');
 if(!local&&!production||navigator.globalPrivacyControl===true||navigator.doNotTrack==='1')return;
 const endpoint=local?'/__analytics/event':'https://mehul-jhaveri-analytics.rmj0026.workers.dev/collect';
 const allowed=new Set(['page_view:website','whatsapp:contact','whatsapp:floating','whatsapp:mobile','whatsapp:goals','email:contact','email:footer','email:mobile','email:goals','goal_checkout:goals','booking_request:booking','whatsapp:booking','email:booking','pdf_download:sip','pdf_download:goal','pdf_download:swp','pdf_download:fire']);
 function record(event,placement){if(!allowed.has(event+':'+placement))return;void fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,placement}),credentials:'omit',referrerPolicy:'no-referrer',keepalive:true}).catch(()=>{});}
 record('page_view','website');
 document.addEventListener('mfd:booking-prepared',()=>record('booking_request','booking'));
 document.addEventListener('mfd:pdf-download',e=>{if(['sip','goal','swp','fire'].includes(e.detail))record('pdf_download',e.detail);});
 document.addEventListener('click',e=>{const el=e.target.closest('a,button');if(!el||el.disabled)return;const id=el.id;
 if(id==='review-whatsapp'){if(document.querySelector('#review-form').checkValidity())record('whatsapp','contact');return;}
 const known={'booking-whatsapp':['whatsapp','booking'],'booking-email':['email','booking'],'quick-whatsapp':['whatsapp','mobile'],'quick-email':['email','mobile'],'dream-email':['email','goals'],'dream-whatsapp':['whatsapp','goals']};
 if(known[id]){if(id.startsWith('booking-')&&(!el.getAttribute('href')||document.querySelector('#booking-preview').hidden))return;if(id.startsWith('dream-')&&(!el.getAttribute('href')||document.querySelector('#dream-share').hidden))return;record(...known[id]);return;}
 // Classify by element location; never read or transmit an outbound URL or its message.
 if(el.matches('a.whatsapp-float'))record('whatsapp','floating');
 else if(el.matches('#contact a.whatsapp'))record('whatsapp','contact');
 else if(el.matches('#contact a[href^="mailto:"]'))record('email','contact');
 else if(el.matches('footer a[href^="mailto:"]'))record('email','footer');
 });
 document.addEventListener('submit',e=>{if(e.target.id==='review-form'&&e.target.checkValidity())record('email','contact');
 if(e.target.id==='dream-checkout-form')queueMicrotask(()=>{if(e.target.checkValidity()&&!document.querySelector('#dream-share').hidden)record('goal_checkout','goals');});});
})();
