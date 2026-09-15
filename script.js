const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyIhFOHPR5w7PxCJn7eUH8OnUHbRUxuYEc-IHfmLr9XsXayOq9F9HEZtl73nK_TQtyjrA/exec";
const services=[
["✦","Business Websites","Professional websites for companies and local businesses."],
["✚","Clinic & Medical Websites","Modern websites for clinics, doctors and healthcare professionals."],
["◈","Portfolio Websites","Professional personal portfolios for freelancers and professionals."],
["↗","Landing Pages","High-converting landing pages for products, services and campaigns."],
["▦","E-Commerce Websites","Online stores with product catalogs and modern shopping experiences."],
["◌","Website Redesign","Transform outdated websites into modern, responsive websites."],
["⌁","Responsive Web Design","Websites optimized for mobile, tablet and desktop."],
["⚙","Website Maintenance","Ongoing updates, improvements and technical support."]
];
const serviceGrid=document.querySelector("#serviceGrid");
serviceGrid.innerHTML=services.map(s=>`<article class="service-card"><div class="service-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p><a href="#contact">Get Started →</a></article>`).join("");

const projects=[
["Business","Modern Business","Professional company website concept.","HTML • CSS • JavaScript"],
["Clinics","Healthcare Clinic","Clean clinic website concept.","HTML • CSS • JavaScript"],
["E-commerce","Online Store","Modern storefront concept.","HTML • CSS • JavaScript"],
["Portfolio","Creative Portfolio","Personal portfolio concept.","HTML • CSS • JavaScript"],
["Other","Restaurant","Restaurant website concept.","HTML • CSS • JavaScript"],
["Business","Real Estate","Property business website concept.","HTML • CSS • JavaScript"]
];
const filters=["All","Business","Clinics","E-commerce","Portfolio","Other"];
document.querySelector("#filters").innerHTML=filters.map((f,i)=>`<button class="filter ${i===0?"active":""}" data-filter="${f}">${f}</button>`).join("");
function renderProjects(filter="All"){
 document.querySelector("#portfolioGrid").innerHTML=projects.filter(p=>filter==="All"||p[0]===filter).map(p=>`<article class="portfolio-card"><div class="portfolio-thumb"><span class="demo-label">DEMO PROJECT • REPLACE WITH REAL WORK</span></div><h3>${p[1]}</h3><p>${p[2]}</p><div class="tags"><span>${p[0]}</span><span>${p[3]}</span></div><a href="#contact">Request Similar Website →</a></article>`).join("");
}
renderProjects();
document.querySelector("#filters").addEventListener("click",e=>{if(!e.target.classList.contains("filter"))return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");renderProjects(e.target.dataset.filter)});

const reviews=[{name:"Demo Review Placeholder",business:"Replace with a genuine Google Business review",rating:5,text:"This is a placeholder only. Add a genuine client review here and link it to the client's actual Google Business Profile."}];
let ri=0;
function renderReview(){const r=reviews[ri];document.querySelector("#reviewCard").innerHTML=`<div class="stars">${"★".repeat(r.rating)}</div><h3>${r.name}</h3><p>${r.text}</p><small>${r.business}</small>`}
renderReview();
document.querySelector("#prevReview").onclick=()=>{ri=(ri-1+reviews.length)%reviews.length;renderReview()};
document.querySelector("#nextReview").onclick=()=>{ri=(ri+1)%reviews.length;renderReview()};

const pricing=[
["Starter Website","Best for individuals & small businesses","Custom quote",["Up to 5 pages","Responsive design","Contact form","WhatsApp integration","SEO basics"]],
["Professional Website","For established businesses","Custom quote",["Up to 10 pages","Responsive design","Contact form","WhatsApp integration","SEO + speed basics","Social integration"],true],
["Premium Website","For advanced business needs","Custom quote",["Custom pages & features","Responsive design","Advanced forms","WhatsApp integration","SEO + optimization","Priority support","Maintenance option"]]
];
document.querySelector("#pricingGrid").innerHTML=pricing.map(p=>`<article class="pricing-card ${p[4]?"featured":""}"><h3>${p[0]}</h3><p>${p[1]}</p><div class="price">${p[2]}</div><ul>${p[3].map(x=>`<li>${x}</li>`).join("")}</ul><a class="btn ${p[4]?"primary":"secondary"}" href="#contact">Request Custom Quote</a></article>`).join("");

const faqs=[
["How long does it take to build a website?","Timing depends on the size and features. A simple business website can usually be planned and developed much faster than a complex e-commerce or custom platform."],
["Do you build websites for small businesses?","Yes. Digi Service is designed to help small businesses, professionals, clinics and entrepreneurs establish a strong online presence."],
["Will my website work on mobile phones?","Yes. Responsive design is a core part of every website, with layouts designed for phones, tablets and desktops."],
["Can you redesign my existing website?","Yes. Existing websites can be redesigned with a modern UI, improved responsiveness, clearer calls-to-action and better performance."],
["Can I connect WhatsApp to my website?","Yes. WhatsApp buttons can open a direct conversation with a pre-filled project message."],
["Do you provide website maintenance?","Yes. Maintenance can include content updates, improvements, fixes and technical support."],
["Can I request custom features?","Absolutely. Custom functionality can be discussed during the project consultation."],
["How do I get started?","Send a project request using the contact form or message Digi Service directly on WhatsApp."]
];
document.querySelector("#faqList").innerHTML=faqs.map((f,i)=>`<div class="faq-item"><button class="faq-q">${f[0]}<span>+</span></button><div class="faq-a">${f[1]}</div></div>`).join("");
document.querySelector("#faqList").addEventListener("click",e=>{const q=e.target.closest(".faq-q");if(!q)return;const item=q.parentElement;item.classList.toggle("open");q.querySelector("span").textContent=item.classList.contains("open")?"−":"+"});

const menu=document.querySelector(".menu-btn"), nav=document.querySelector(".nav-links");
menu.onclick=()=>{nav.classList.toggle("open");menu.setAttribute("aria-expanded",nav.classList.contains("open"))};
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

document.querySelector("#contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 const form=e.currentTarget, status=document.querySelector("#formStatus");
 const data=new FormData(form);
 const msg=`Hello Digi Service, I’m interested in a website.%0A%0AName: ${encodeURIComponent(data.get("name"))}%0ABusiness: ${encodeURIComponent(data.get("business"))}%0AEmail: ${encodeURIComponent(data.get("email"))}%0APhone: ${encodeURIComponent(data.get("phone"))}%0AWebsite: ${encodeURIComponent(data.get("type"))}%0ABudget: ${encodeURIComponent(data.get("budget"))}%0AMessage: ${encodeURIComponent(data.get("message"))}`;
 status.textContent="Thanks! Your request is ready to send. Opening WhatsApp…";
 window.open(`https://wa.me/923338383934?text=${msg}`,"_blank","noopener");
 form.reset();
});
