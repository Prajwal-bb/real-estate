// ===============================
// Dream Homes Realty Website JS
// ===============================

// ------- Smooth Section Scroll --------
document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const targetId = this.dataset.scroll;
        const targetSection = document.querySelector(targetId);
        if(targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 68,
                behavior: 'smooth'
            });
        }
    });
});
// --------- Fixed Navbar Active Link & Mobile Nav Toggle ----------
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});
// Active nav link on scroll
window.addEventListener('scroll', () => {
    const offsets = [
        { id:'#home', top: 0 },
        { id:'#projects', top: document.getElementById('projects').offsetTop-72 },
        { id:'#testimonials', top: document.getElementById('testimonials').offsetTop-72 },
        { id:'#subscribe', top: document.getElementById('subscribe').offsetTop-72 },
        { id:'#about', top: document.getElementById('about').offsetTop-72 }
    ];
    let idx=0;
    const scroll = window.scrollY;
    for(let i=0; i<offsets.length; i++) {
        if(scroll >= offsets[i].top) idx=i;
    }
    document.querySelectorAll('.nav-links a').forEach((l,i)=>{
        if(i===idx) l.classList.add('active'); else l.classList.remove('active');
    });
});
// --------- Projects Filter -----------
const filterSelect = document.getElementById('filter-select');
const filterPrice = document.getElementById('filter-price');

function filterProjects() {
    const typeVal = filterSelect.value;
    const priceVal = filterPrice.value;
    document.querySelectorAll('.property-card').forEach(card => {
        const type = card.dataset.type;
        const priceText = card.querySelector('.price')?.textContent || '';
        let priceNumber = 0;
        if(priceText.includes('Crore')) priceNumber = parseFloat(priceText.replace(/[^\d.]/g,'')) * 100;
        else priceNumber = parseFloat(priceText.replace(/[^\d.]/g,''));  // Lakhs
        let priceMatch = false;
        if(priceVal === 'all') priceMatch = true;
        else if(priceVal === 'lt50' && priceNumber < 50) priceMatch = true;
        else if(priceVal === '50to80' && priceNumber >= 50 && priceNumber <= 80) priceMatch = true;
        else if(priceVal === '80to1cr' && priceNumber > 80 && priceNumber <= 100) priceMatch = true;
        else if(priceVal === 'gt1cr' && priceNumber > 100) priceMatch = true;
        const typeMatch = (typeVal === 'all' || type.includes(typeVal));
        if(typeMatch && priceMatch) card.style.display = 'flex';
        else card.style.display = 'none';
    });
}

filterSelect.addEventListener('change', filterProjects);
filterPrice.addEventListener('change', filterProjects);
// ------- Testimonials Slider ----------
const testimonialCards = document.querySelectorAll('.testimonial-card');
let testimonialIdx = 0;
function showTestimonial(idx){
    testimonialCards.forEach((card,i)=>{
        card.classList.toggle('active',i===idx);
    });
}
setInterval(()=>{
    testimonialIdx = (testimonialIdx+1)%testimonialCards.length;
    showTestimonial(testimonialIdx);
},4000);
// ------- Subscription Form ----------
document.getElementById('subscribe-form').addEventListener('submit',function(e){
    e.preventDefault();
    const name = document.getElementById('subscriber-name').value.trim();
    const email = document.getElementById('subscriber-email').value.trim();
    let msg='';
    if(name&&email) {
        msg = `Thank you, ${name}! You've been subscribed.`;
        this.reset();
    } else {
        msg = 'Please enter a valid name and email.';
    }
    document.getElementById('subscribe-success').textContent = msg;
    setTimeout(()=>{
        document.getElementById('subscribe-success').textContent = '';
    },4500);
});
// ------- SUBSCRIPTION PLAN -- Payment Modal --------
const paymentModal = document.getElementById('payment-modal');
const paymentClose = document.getElementById('payment-modal-close');
const planBtns = document.querySelectorAll('.plan-subscribe-btn');
const planInfo = document.getElementById('selected-plan-info');
const paymentForm = document.getElementById('payment-form');
const paymentSuccess = document.getElementById('payment-success');
let paymentSelectedPlan = '';
if(planBtns && paymentModal) {
  planBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      paymentSelectedPlan = this.dataset.plan;
      planInfo.innerHTML = 'You selected: <b>'+ (paymentSelectedPlan[0].toUpperCase() + paymentSelectedPlan.slice(1)) + '</b>';
      paymentModal.classList.add('open');
    });
  });
  paymentClose.addEventListener('click',()=> paymentModal.classList.remove('open'));
  window.addEventListener('click',e=>{
    if(e.target===paymentModal) paymentModal.classList.remove('open');
  });
  paymentForm.addEventListener('submit',function(e){
    e.preventDefault();
    paymentSuccess.textContent = 'Payment successful! Subscribed to '+ (paymentSelectedPlan[0].toUpperCase() + paymentSelectedPlan.slice(1)) +' plan.';
    setTimeout(()=>{
      paymentModal.classList.remove('open');
      paymentSuccess.textContent='';
      paymentForm.reset();
    },2600);
  });
}
// ------- Theme Toggle (Light/Dark) ----------
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);
  if(btn){ btn.textContent = initial === 'dark' ? '☀️' : '🌙'; }
  function setTheme(next){
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if(btn){ btn.textContent = next === 'dark' ? '☀️' : '🌙'; }
  }
  if(btn){
    btn.addEventListener('click', ()=>{
      const current = root.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }
})();
// --------- Responsive Navbar Fix on Resize ---------
window.addEventListener('resize', () => {
    if(window.innerWidth > 700) {
        navLinks.classList.remove('open');
    }
});
