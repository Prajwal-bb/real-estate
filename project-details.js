// -------------
// Project Details Dynamic Rendering
// -------------
const PROJECTS=[
    {
        id:'1', title:'Cozy 1BHK Apartment', img:'images/istockphoto-1436217023-1024x1024.jpg',
        location:'Downtown City', price:'₹40 Lakhs', desc:'Perfect starter home, centrally located with modern amenities.'
    },
    {
        id:'2', title:'Spacious 2BHK Suite', img:'images/istockphoto-517241705-1024x1024.jpg',
        location:'Riverside', price:'₹60 Lakhs', desc:'A riverside retreat, large balconies, and premium fittings.'
    },
    {
        id:'3', title:'Modern 3BHK Home', img:'images/istockphoto-577307444-1024x1024.jpg',
        location:'Greenview Colony', price:'₹80 Lakhs', desc:'Family home with garden views and smart home features.'
    },
    {
        id:'4', title:'Luxury Villa', img:'images/istockphoto-590039462-1024x1024.jpg',
        location:'Hilltop Estates', price:'₹2 Crore', desc:'Expansive villa with private pool and panoramic vistas.'
    },
    {
        id:'5', title:'Premium Luxury Apartments', img:'images/istockphoto-868302380-1024x1024.jpg',
        location:'City Center', price:'₹1.5 Crore', desc:'Sky-high living with concierge services and sky garden.'
    },
    {
        id:'6', title:'Lakeview 2BHK Apartment', img:'images/istockphoto-517241705-1024x1024.jpg',
        location:'Lakeside Heights', price:'₹55 Lakhs', desc:'Peaceful 2BHK with water views, close to recreation and green walks.'
    },
    {
        id:'7', title:'Elite 3BHK Luxury Home', img:'images/istockphoto-868302380-1024x1024.jpg',
        location:'Garden City', price:'₹1.2 Crore', desc:'Spacious luxury home with rooftop terrace and private parking.'
    },
    {
        id:'8', title:'Modern 4BHK Villa', img:'images/istockphoto-590039462-1024x1024.jpg',
        location:'Sun Valley', price:'₹2.7 Crore', desc:'Ultra-modern villa with garden, pool, and smart security features.'
    }
];
function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
}
function renderDetails() {
    const id = getQueryParam('id');
    const project = PROJECTS.find(p=>p.id===id);
    const el = document.getElementById('project-details-content');
    if(!project) {
        el.innerHTML = '<div class="error">Project not found. <a href="index.html#projects">Go back</a>.</div>';
        return;
    }
    el.innerHTML = `
      <div class="project-detail-card">
        <img src="${project.img}" alt="${project.title}" style="width:100%;max-width:430px;border-radius:18px;box-shadow:0 9px 44px rgba(21,88,160,0.10);margin-bottom:28px;">
        <h2 style="margin-bottom:9px;">${project.title}</h2>
        <div style="color:#2196f3;font-weight:600;margin-bottom:7px;"><i class="fa fa-map-marker-alt"></i> ${project.location}</div>
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:13px;">${project.price}</div>
        <p style="font-size:1.12rem;color:#444;line-height:1.7;margin-bottom:18px;">${project.desc}</p>
      </div>
    `;
}
document.addEventListener('DOMContentLoaded',renderDetails);
