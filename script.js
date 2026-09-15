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

// ================= EDITABLE CONTENT =================
// Portfolio, reviews and pricing below are intentionally structured for easy editing.
// Replace the visible PLACEHOLDER / YOUR ... values with your real content.
// Never publish fabricated testimonials, ratings or client work.

const projects = [
  {id:"project-1",isPlaceholder:true,category:"Business",name:"YOUR REAL PROJECT NAME",description:"PLACEHOLDER — Replace with your real project description.",image:"",technologies:["YOUR TECH","YOUR TECH"],url:"",featured:false},
  {id:"project-2",isPlaceholder:true,category:"Clinics",name:"YOUR CLINIC PROJECT",description:"PLACEHOLDER — Replace with your genuine clinic project description.",image:"",technologies:["YOUR TECH","YOUR TECH"],url:"",featured:false},
  {id:"project-3",isPlaceholder:true,category:"E-commerce",name:"YOUR E-COMMERCE PROJECT",description:"PLACEHOLDER — Replace with your real online-store project.",image:"",technologies:["YOUR TECH","YOUR TECH"],url:"",featured:false},
  {id:"project-4",isPlaceholder:true,category:"Portfolio",name:"YOUR PORTFOLIO PROJECT",description:"PLACEHOLDER — Replace with your real portfolio project.",image:"",technologies:["YOUR TECH","YOUR TECH"],url:"",featured:false},
  {id:"project-5",isPlaceholder:true,category:"Other",name:"YOUR OTHER PROJECT",description:"PLACEHOLDER — Replace with your real project.",image:"",technologies:["YOUR TECH","YOUR TECH"],url:"",featured:false},
  {id:"project-6",isPlaceholder:true,category:"Business",name:"YOUR BUSINESS PROJECT",description:"PLACEHOLDER — Replace with your real business project.",image:"",technologies:["YOUR TECH","YOUR TECH"],url:"",featured:false}
];

const filters=["All","Business","Clinics","E-commerce","Portfolio","Other"];
document.querySelector("#filters").innerHTML=filters.map((f,i)=>`<button class="filter ${i===0?"active":""}" data-filter="${f}">${f}</button>`).join("");

function renderProjects(filter="All"){
  document.querySelector("#portfolioGrid").innerHTML=projects.filter(p=>filter==="All"||p.category===filter).map(p=>{
    const label=p.isPlaceholder?"PLACEHOLDER — ADD REAL PROJECT":p.category;
    const tags=(p.technologies||[]).map(t=>`<span>${escapeHTML(t)}</span>`).join("");
    const link=p.url?`<a href="${escapeAttribute(p.url)}" target="_blank" rel="noopener">View Project →</a>`:`<span class="placeholder-link">Add project URL in script.js →</span>`;
    const image=p.image?` style="background-image:url('${escapeAttribute(p.image)}')"`:"";
    return `<article class="portfolio-card ${p.isPlaceholder?"is-placeholder":""}"><div class="portfolio-thumb"${image}><span class="demo-label">${label}</span></div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><div class="tags"><span>${escapeHTML(p.category)}</span>${tags}</div>${link}</article>`;
  }).join("");
}
renderProjects();
document.querySelector("#filters").addEventListener("click",e=>{
  if(!e.target.classList.contains("filter"))return;
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  e.target.classList.add("active"); renderProjects(e.target.dataset.filter);
});

const reviews=[
  {id:"review-1",isPlaceholder:true,clientName:"YOUR CLIENT NAME",businessName:"YOUR BUSINESS NAME",rating:0,reviewText:"PLACEHOLDER — Add a genuine client review here.",date:"YYYY-MM-DD",category:"YOUR CATEGORY",googleUrl:""},
  {id:"review-2",isPlaceholder:true,clientName:"YOUR CLIENT NAME",businessName:"YOUR BUSINESS NAME",rating:0,reviewText:"PLACEHOLDER — Add another genuine client review here.",date:"YYYY-MM-DD",category:"YOUR CATEGORY",googleUrl:""},
  {id:"review-3",isPlaceholder:true,clientName:"YOUR CLIENT NAME",businessName:"YOUR BUSINESS NAME",rating:0,reviewText:"PLACEHOLDER — Add another genuine client review here.",date:"YYYY-MM-DD",category:"YOUR CATEGORY",googleUrl:""}
];
let ri=0;
function renderReview(){
  const r=reviews[ri];
  const stars=Number(r.rating)>0?"★".repeat(Number(r.rating)):"☆☆☆☆☆";
  const source=r.googleUrl?`<a class="review-source" href="${escapeAttribute(r.googleUrl)}" target="_blank" rel="noopener">View Google review →</a>`:`<small class="placeholder-text">Add the real Google Business Profile link in script.js</small>`;
  document.querySelector("#reviewCard").innerHTML=`<div class="review-badge">${r.isPlaceholder?"PLACEHOLDER — REPLACE WITH REAL REVIEW":"VERIFIED CLIENT REVIEW"}</div><div class="stars">${stars}</div><h3>${escapeHTML(r.clientName)}</h3><p>${escapeHTML(r.reviewText)}</p><small>${escapeHTML(r.businessName)}${r.category?" • "+escapeHTML(r.category):""}</small>${source}`;
}
renderReview();
document.querySelector("#prevReview").onclick=()=>{ri=(ri-1+reviews.length)%reviews.length;renderReview()};
document.querySelector("#nextReview").onclick=()=>{ri=(ri+1)%reviews.length;renderReview()};

const pricingPlans=[
  {id:"starter",isPlaceholder:true,name:"STARTER WEBSITE",description:"PLACEHOLDER — Replace with your actual plan description.",price:"YOUR PRICE",currency:"",features:["YOUR PAGE COUNT","RESPONSIVE DESIGN","YOUR FEATURE","YOUR FEATURE","YOUR SUPPORT"],featured:false,cta:"Request Quote"},
  {id:"professional",isPlaceholder:true,name:"PROFESSIONAL WEBSITE",description:"PLACEHOLDER — Replace with your actual plan description.",price:"YOUR PRICE",currency:"",features:["YOUR PAGE COUNT","RESPONSIVE DESIGN","YOUR FEATURE","YOUR FEATURE","YOUR SEO SERVICE","YOUR SUPPORT"],featured:true,cta:"Request Quote"},
  {id:"premium",isPlaceholder:true,name:"PREMIUM WEBSITE",description:"PLACEHOLDER — Replace with your actual plan description.",price:"YOUR PRICE",currency:"",features:["YOUR CUSTOM FEATURES","RESPONSIVE DESIGN","YOUR ADVANCED FEATURE","YOUR SEO SERVICE","YOUR SUPPORT","YOUR MAINTENANCE OPTION"],featured:false,cta:"Request Quote"}
];
document.querySelector("#pricingGrid").innerHTML=pricingPlans.map(p=>`<article class="pricing-card ${p.featured?"featured":""} ${p.isPlaceholder?"is-placeholder":""}"><div class="plan-badge">${p.isPlaceholder?"EDITABLE PLAN — REPLACE DETAILS":p.featured?"POPULAR":""}</div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><div class="price">${escapeHTML(p.currency)}${escapeHTML(p.price)}</div><ul>${p.features.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul><a class="btn ${p.featured?"primary":"secondary"}" href="#contact">${escapeHTML(p.cta)}</a></article>`).join("");

function escapeHTML(value){return String(value??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}
function escapeAttribute(value){return escapeHTML(value).replace(/`/g,"&#096;");}

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

// ================= GOOGLE SHEETS BACKEND =================
// The Apps Script URL is public; Google authorization and any secrets remain server-side.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyIhFOHPR5w7PxCJn7eUH8OnUHbRUxuYEc-IHfmLr9XsXayOq9F9HEZtl73nK_TQtyjrA/exec";

async function submitToGoogleSheet(form,statusElement,successMessage){
  const button=form.querySelector('button[type="submit"]');
  const data=Object.fromEntries(new FormData(form).entries());

  if(data.website){ statusElement.textContent="Thanks! Your message has been received."; form.reset(); return; }
  delete data.website;

  button.disabled=true;
  statusElement.textContent="Sending your message…";

  try{
    const response=await fetch(GOOGLE_SCRIPT_URL,{
      method:"POST",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(data)
    });
    const result=await response.json();
    if(!result.success) throw new Error(result.message||"Submission failed.");
    statusElement.textContent=successMessage;
    form.reset();
  }catch(error){
    console.error("Google Sheets submission error:",error);
    statusElement.textContent="Sorry, your message could not be sent. Please try WhatsApp or email us directly.";
  }finally{
    button.disabled=false;
  }
}

document.querySelector("#contactForm").addEventListener("submit",async e=>{
  e.preventDefault();
  await submitToGoogleSheet(e.currentTarget,document.querySelector("#formStatus"),"Thanks! Your project request was sent successfully. We’ll get back to you soon.");
});

document.querySelector("#feedbackForm").addEventListener("submit",async e=>{
  e.preventDefault();
  await submitToGoogleSheet(e.currentTarget,document.querySelector("#feedbackStatus"),"Thank you! Your feedback was submitted successfully.");
});
