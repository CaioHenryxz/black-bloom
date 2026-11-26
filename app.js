const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');menu.textContent='☰';}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const works=[...document.querySelectorAll('.work')];
const filters=[...document.querySelectorAll('[data-filter]')];
function filterWorks(name){filters.forEach(b=>{const selected=b.dataset.filter===name;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});works.forEach(w=>w.hidden=name!=='todos'&&w.dataset.by!==name);const total=works.filter(w=>!w.hidden).length;document.querySelector('#portfolio-status').textContent=total+' trabalhos · '+(name==='teles'?'Victor Teles / Preto & cinza':name==='carol'?'Carol Garcia / Delicadas & fine line':'Dois artistas, diferentes possibilidades.');}
filters.forEach(b=>b.addEventListener('click',()=>filterWorks(b.dataset.filter)));
document.querySelectorAll('[data-portfolio]').forEach(a=>a.addEventListener('click',()=>filterWorks(a.dataset.portfolio)));
const lightbox=document.querySelector('#lightbox');
let currentWork=null,selectedReference=null;
function showWork(work){currentWork=work;const img=work.querySelector('img');document.querySelector('#lightbox-image').src=img.src;document.querySelector('#lightbox-image').alt=img.alt;document.querySelector('#lightbox-title').textContent=work.dataset.title;const visible=works.filter(w=>!w.hidden);document.querySelector('#lightbox-count').textContent=(visible.indexOf(work)+1)+' / '+visible.length;document.querySelector('#lightbox-cta').textContent=work.dataset.by==='carol'?'Quero conversar com a Carol ↗':'Quero conversar com o Teles ↗';}
works.forEach(w=>w.addEventListener('click',()=>{showWork(w);lightbox.showModal();}));
function advance(direction){const visible=works.filter(w=>!w.hidden);showWork(visible[(visible.indexOf(currentWork)+direction+visible.length)%visible.length]);}
document.querySelector('#previous-work').addEventListener('click',()=>advance(-1));
document.querySelector('#next-work').addEventListener('click',()=>advance(1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();advance(1);}if(e.key==='ArrowLeft'){e.preventDefault();advance(-1);}});
document.querySelector('.close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
function selectArtist(name){document.querySelector('input[name="artist"][value="'+name+'"]').checked=true;if(selectedReference&&selectedReference.artist!==name){selectedReference=null;document.querySelector('#reference-note').hidden=true;}}
document.querySelectorAll('[data-artist]').forEach(a=>a.addEventListener('click',()=>selectArtist(a.dataset.artist)));
document.querySelectorAll('input[name="artist"]').forEach(i=>i.addEventListener('change',()=>selectArtist(i.value)));
document.querySelector('#lightbox-cta').addEventListener('click',()=>{selectArtist(currentWork.dataset.by);selectedReference={artist:currentWork.dataset.by,title:currentWork.dataset.title};const note=document.querySelector('#reference-note');note.textContent='Trabalho que chamou sua atenção: '+selectedReference.title;note.hidden=false;lightbox.close();});
document.querySelector('#quote').addEventListener('submit',e=>{e.preventDefault();const chosen=document.querySelector('input[name="artist"]:checked');if(!chosen)return;const artist=chosen.value;const idea=document.querySelector('#idea');if(!idea.value.trim()){idea.setCustomValidity('Conte um pouco sobre sua ideia.');idea.reportValidity();return;}idea.setCustomValidity('');const lines=['Olá, '+(artist==='carol'?'Carol':'Teles')+'! Vim pelo site do Black Bloom e gostaria de conversar sobre uma tattoo.','Ideia: '+idea.value.trim(),'Local do corpo: '+(document.querySelector('#bodypart').value.trim()||'A definir'),'Tamanho aproximado: '+(document.querySelector('#size').value.trim()||'A definir')];if(selectedReference)lines.push('Gostei deste trabalho no portfólio: '+selectedReference.title);lines.push('Posso enviar minhas referências por aqui?');window.open('https://wa.me/'+(artist==='carol'?'5512982423034':'5512982941507')+'?text='+encodeURIComponent(lines.join('\n\n')),'_blank','noopener,noreferrer');});
document.querySelector('#idea').addEventListener('input',e=>e.target.setCustomValidity(''));
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{document.querySelector('.mobile-action').hidden=entries[0].isIntersecting;},{threshold:0}).observe(document.querySelector('#orcamento'));}
