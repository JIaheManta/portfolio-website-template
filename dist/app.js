const projects = [
  {slug:'project-one',title:'项目一',en:'Project One',year:'2026',role:'填写你的职责',tone:'tone-a'},
  {slug:'project-two',title:'项目二',en:'Project Two',year:'2026',role:'填写你的职责',tone:'tone-b'},
  {slug:'project-three',title:'项目三',en:'Project Three',year:'2026',role:'填写你的职责',tone:'tone-c'},
  {slug:'project-four',title:'项目四',en:'Project Four',year:'2026',role:'填写你的职责',tone:'tone-d'}
];

const app = document.querySelector('#app');
const esc = value => String(value).replace(/[&<>\"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));

function nav(compact=false){
  return `<header class="site-nav ${compact?'site-nav--detail':''}">
    <a class="logo" href="./" data-route aria-label="Portfolio 首页">PORTFOLIO</a>
    ${compact?'':`<p class="intro">在这里填写你的职业定位与作品集简介。<br><span>Add your short portfolio introduction here.</span></p>`}
    <nav aria-label="主导航"><a href="./#projects" data-home>PROJECTS</a><a href="?page=gallery" data-route>GALLERY</a><a href="?page=about" data-route>ABOUT</a></nav>
  </header>`;
}

function visual(project,large=false){
  return `<div class="template-visual ${project.tone} ${large?'template-visual--large':''}" aria-label="替换为项目图片"><span>16 : 9</span><b>YOUR<br>IMAGE</b></div>`;
}

function card(project,index,clone=false){
  return `<a class="project-card" href="?project=${project.slug}" data-route ${clone?'aria-hidden="true" tabindex="-1"':''}>
    ${visual(project)}<span class="card-shade"></span><span class="card-index">${String(index+1).padStart(2,'0')}</span>
    <span class="card-title"><strong>${esc(project.title)}</strong><small>${esc(project.en)}</small></span>
  </a>`;
}

function journeyCard(project,index){
  return `<div class="journey-row ${index%2?'journey-row--right':'journey-row--left'}"><a class="journey-card" href="?project=${project.slug}" data-route>${visual(project,true)}</a></div>`;
}

function renderHome(){
  document.title='Portfolio Template'; document.body.className='home-page';
  app.innerHTML=`${nav()}<main>
    <section class="hero" aria-label="作品集首页主视觉">
      <div class="hero-stage" aria-hidden="true">
        <strong class="template-wordmark hero-piece" style="--depth:.12;--delay:-1.8s;--duration:5.8s">YOUR NAME</strong>
        <a class="hero-piece paper paper-yellow" style="--depth:.5;--delay:-.8s;--duration:4.7s" href="?page=gallery" data-route>ART?</a>
        <a class="hero-piece paper paper-cyan" style="--depth:.38;--delay:-2.1s;--duration:6.2s" href="#projects" data-home>PROJECT</a>
        <a class="hero-piece paper paper-plum" style="--depth:.31;--delay:-3.4s;--duration:5.3s" href="?page=about" data-route>ABOUT</a>
        <span class="hero-piece star star-green" style="--depth:.44">✦</span><span class="hero-piece star star-silver" style="--depth:.7">✦</span>
        <i class="hero-piece dot red dot-a"></i><i class="hero-piece dot blue dot-c"></i><i class="hero-piece dot yellow dot-e"></i>
      </div><a class="down" href="#projects">↓</a>
    </section>
    <section id="projects" class="projects"><div class="rail-heading"><span>SELECTED WORKS</span><span>2026</span></div>
      <div class="project-marquee"><div class="project-track"><div class="project-group">${projects.map(card).join('')}</div><div class="project-group" aria-hidden="true">${projects.map((p,i)=>card(p,i,true)).join('')}</div></div></div><p class="rail-help">AUTO SCROLL →</p>
    </section>
    <section class="project-journey"><div class="journey-intro"><h2>PROJECTS</h2><p>SCROLL TO FOLLOW THE LINE</p></div>
      <svg class="journey-line" viewBox="0 0 1000 3000" preserveAspectRatio="none" aria-hidden="true"><path class="journey-line-base" d="M500 120 C835 350 835 770 505 890 S160 1390 500 1540 S845 2030 505 2240 S155 2760 500 2940"/><path class="journey-line-progress" d="M500 120 C835 350 835 770 505 890 S160 1390 500 1540 S845 2030 505 2240 S155 2760 500 2940"/></svg>
      <div class="journey-list">${projects.map(journeyCard).join('')}</div>
    </section>
  </main>`;
  setupHero(); setupJourney();
}

function renderProject(project){
  const index=projects.indexOf(project),previous=projects[(index-1+projects.length)%projects.length],next=projects[(index+1)%projects.length];
  document.title=`${project.en} — Portfolio Template`; document.body.className='detail-page';
  app.innerHTML=`${nav(true)}<main class="project-detail"><aside class="detail-cover">${visual(project,true)}<span>${String(index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</span></aside>
    <article class="detail-content"><header class="detail-title"><p>${project.year}</p><h1>${project.title}</h1><h2>${project.en}</h2></header>
      <section class="detail-text"><p>在这里填写项目背景、设计目标与最终成果。</p><p>Add the project context, design goals and outcome here.</p></section>
      <dl><div><dt>DATE</dt><dd>${project.year}</dd></div><div><dt>ROLE</dt><dd>${project.role}</dd></div></dl>
      <div class="detail-gallery single">${visual(project,true)}</div>
      <footer class="project-pager"><a href="?project=${previous.slug}" data-route><span>PREVIOUS</span>${previous.en}</a><a href="?project=${next.slug}" data-route><span>NEXT</span>${next.en}</a></footer>
    </article></main>`;
}

function renderGallery(){
  document.title='Gallery — Portfolio Template'; document.body.className='paintings-page';
  app.innerHTML=`${nav(true)}<main class="template-gallery"><header><strong>GALLERY</strong><span>PLACEHOLDERS</span></header><div class="template-gallery-grid">${Array.from({length:12},(_,i)=>`<div class="template-gallery-item tone-${['a','b','c','d'][i%4]}"><span>${String(i+1).padStart(2,'0')}</span><b>YOUR WORK</b></div>`).join('')}</div></main>`;
}

function renderAbout(){
  document.title='About — Portfolio Template'; document.body.className='about-page';
  app.innerHTML=`${nav(true)}<main class="template-about"><section><p class="template-eyebrow">ABOUT / 关于</p><h1>你好，我是<br>你的名字。</h1><h2>Hello, I’m<br>Your Name.</h2></section><section class="template-about-copy"><p>在这里填写你的教育背景、专业方向、设计方法与求职目标。</p><p>Add your education, creative practice, design approach and career goals here.</p><a href="mailto:hello@example.com">hello@example.com ↗</a></section></main>`;
}

function setupHero(){
  const hero=document.querySelector('.hero'); if(!hero)return;
  const move=e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);hero.style.setProperty('--mx',x);hero.style.setProperty('--my',y)};
  addEventListener('pointermove',move,{passive:true});
}

function setupJourney(){
  const section=document.querySelector('.project-journey'),path=document.querySelector('.journey-line-progress'); if(!section||!path)return;
  const length=path.getTotalLength(); path.style.strokeDasharray=length; path.style.strokeDashoffset=length;
  const update=()=>{const rect=section.getBoundingClientRect(),progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(rect.height+innerHeight*.35)));path.style.strokeDashoffset=length*(1-progress)};
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.18});
  document.querySelectorAll('.journey-card').forEach(card=>observer.observe(card));
  addEventListener('scroll',update,{passive:true}); update();
}

function route(){
  const params=new URLSearchParams(location.search),slug=params.get('project');
  if(slug){const project=projects.find(item=>item.slug===slug);if(project)return renderProject(project)}
  if(params.get('page')==='gallery')return renderGallery();
  if(params.get('page')==='about')return renderAbout();
  renderHome();
  if(location.hash==='#projects')requestAnimationFrame(()=>document.querySelector('#projects')?.scrollIntoView());
}

document.addEventListener('click',event=>{const link=event.target.closest('a[data-route]');if(!link||link.target==='_blank'||event.metaKey||event.ctrlKey)return;event.preventDefault();history.pushState({},'',link.getAttribute('href'));scrollTo(0,0);route()});
document.addEventListener('click',event=>{const link=event.target.closest('a[data-home]');if(!link)return;event.preventDefault();if(!document.body.classList.contains('home-page')){history.pushState({},'','./#projects');route();return}document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'})});
addEventListener('popstate',route); route();
