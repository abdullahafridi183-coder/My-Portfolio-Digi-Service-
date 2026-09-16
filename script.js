/* =========================================================
   DIGI SERVICE - script.js
   Editable website content + Google Sheets form backend
   ========================================================= */

/* =========================================================
   GOOGLE APPS SCRIPT WEB APP
   ========================================================= */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyvoLBKiUjS96wtQ7117qjFTtC6bMfycdT3juq4ZyOYezFXaQhxpMvur1YXfut_Vg-BKQ/exec";


/* =========================================================
   SERVICES
   ========================================================= */
const services = [
  ["✦", "Business Websites", "Professional websites for companies and local businesses."],
  ["✚", "Clinic & Medical Websites", "Modern websites for clinics, doctors and healthcare professionals."],
  ["◈", "Portfolio Websites", "Professional personal portfolios for freelancers and professionals."],
  ["↗", "Landing Pages", "High-converting landing pages for products, services and campaigns."],
  ["▦", "E-Commerce Websites", "Online stores with product catalogs and modern shopping experiences."],
  ["◌", "Website Redesign", "Transform outdated websites into modern, responsive websites."],
  ["⌁", "Responsive Web Design", "Websites optimized for mobile, tablet and desktop."],
  ["⚙", "Website Maintenance", "Ongoing updates, improvements and technical support."]
];

const serviceGrid = document.querySelector("#serviceGrid");
if (serviceGrid) {
  serviceGrid.innerHTML = services.map(s => `
    <article class="service-card">
      <div class="service-icon">${s[0]}</div>
      <h3>${escapeHTML(s[1])}</h3>
      <p>${escapeHTML(s[2])}</p>
      <a href="#contact">Get Started →</a>
    </article>
  `).join("");
}


/* =========================================================
   EDITABLE PORTFOLIO
   Replace the YOUR... values with your REAL projects.
   Keep isPlaceholder:true until the real content is added.
   ========================================================= */
const projects = [
  {
    id: "project-1",
    isPlaceholder: true,
    category: "Business",
    name: "YOUR REAL PROJECT NAME",
    description: "PLACEHOLDER — Replace with your real project description.",
    image: "",
    technologies: ["YOUR TECH", "YOUR TECH"],
    url: "",
    featured: false
  },
  {
    id: "project-2",
    isPlaceholder: true,
    category: "Clinics",
    name: "YOUR CLINIC PROJECT",
    description: "PLACEHOLDER — Replace with your genuine clinic project description.",
    image: "",
    technologies: ["YOUR TECH", "YOUR TECH"],
    url: "",
    featured: false
  },
  {
    id: "project-3",
    isPlaceholder: true,
    category: "E-commerce",
    name: "YOUR E-COMMERCE PROJECT",
    description: "PLACEHOLDER — Replace with your real online-store project.",
    image: "",
    technologies: ["YOUR TECH", "YOUR TECH"],
    url: "",
    featured: false
  },
  {
    id: "project-4",
    isPlaceholder: true,
    category: "Portfolio",
    name: "YOUR PORTFOLIO PROJECT",
    description: "PLACEHOLDER — Replace with your real portfolio project.",
    image: "",
    technologies: ["YOUR TECH", "YOUR TECH"],
    url: "",
    featured: false
  },
  {
    id: "project-5",
    isPlaceholder: true,
    category: "Other",
    name: "YOUR OTHER PROJECT",
    description: "PLACEHOLDER — Replace with your real project.",
    image: "",
    technologies: ["YOUR TECH", "YOUR TECH"],
    url: "",
    featured: false
  },
  {
    id: "project-6",
    isPlaceholder: true,
    category: "Business",
    name: "YOUR BUSINESS PROJECT",
    description: "PLACEHOLDER — Replace with your real business project.",
    image: "",
    technologies: ["YOUR TECH", "YOUR TECH"],
    url: "",
    featured: false
  }
];

const filters = ["All", "Business", "Clinics", "E-commerce", "Portfolio", "Other"];
const filterContainer = document.querySelector("#filters");

if (filterContainer) {
  filterContainer.innerHTML = filters.map((f, i) => `
    <button class="filter ${i === 0 ? "active" : ""}" data-filter="${escapeAttribute(f)}">
      ${escapeHTML(f)}
    </button>
  `).join("");
}

function renderProjects(filter = "All") {
  const portfolioGrid = document.querySelector("#portfolioGrid");
  if (!portfolioGrid) return;

  const filtered = projects.filter(p => filter === "All" || p.category === filter);

  portfolioGrid.innerHTML = filtered.map(p => {
    const label = p.isPlaceholder
      ? "PLACEHOLDER — ADD REAL PROJECT"
      : p.category;

    const tags = (p.technologies || [])
      .map(t => `<span>${escapeHTML(t)}</span>`)
      .join("");

    const image = p.image
      ? ` style="background-image:url('${escapeAttribute(p.image)}')"`
      : "";

    const link = p.url
      ? `<a href="${escapeAttribute(p.url)}" target="_blank" rel="noopener noreferrer">View Project →</a>`
      : `<span class="placeholder-link">Add project URL in script.js →</span>`;

    return `
      <article class="portfolio-card ${p.isPlaceholder ? "is-placeholder" : ""}">
        <div class="portfolio-thumb"${image}>
          <span class="demo-label">${label}</span>
        </div>
        <h3>${escapeHTML(p.name)}</h3>
        <p>${escapeHTML(p.description)}</p>
        <div class="tags">
          <span>${escapeHTML(p.category)}</span>${tags}
        </div>
        ${link}
      </article>
    `;
  }).join("");
}

renderProjects();

if (filterContainer) {
  filterContainer.addEventListener("click", event => {
    const button = event.target.closest(".filter");
    if (!button) return;

    document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
}


/* =========================================================
   EDITABLE CLIENT REVIEWS
   Only publish genuine client reviews.
   ========================================================= */
const reviews = [
  {
    id: "review-1",
    isPlaceholder: true,
    clientName: "YOUR CLIENT NAME",
    businessName: "YOUR BUSINESS NAME",
    rating: 0,
    reviewText: "PLACEHOLDER — Add a genuine client review here.",
    date: "YYYY-MM-DD",
    category: "YOUR CATEGORY",
    googleUrl: ""
  },
  {
    id: "review-2",
    isPlaceholder: true,
    clientName: "YOUR CLIENT NAME",
    businessName: "YOUR BUSINESS NAME",
    rating: 0,
    reviewText: "PLACEHOLDER — Add another genuine client review here.",
    date: "YYYY-MM-DD",
    category: "YOUR CATEGORY",
    googleUrl: ""
  },
  {
    id: "review-3",
    isPlaceholder: true,
    clientName: "YOUR CLIENT NAME",
    businessName: "YOUR BUSINESS NAME",
    rating: 0,
    reviewText: "PLACEHOLDER — Add another genuine client review here.",
    date: "YYYY-MM-DD",
    category: "YOUR CATEGORY",
    googleUrl: ""
  }
];

let reviewIndex = 0;

function renderReview() {
  const card = document.querySelector("#reviewCard");
  if (!card || !reviews.length) return;

  const r = reviews[reviewIndex];
  const rating = Math.max(0, Math.min(5, Number(r.rating) || 0));
  const stars = rating ? "★".repeat(rating) : "☆☆☆☆☆";

  const source = r.googleUrl
    ? `<a class="review-source" href="${escapeAttribute(r.googleUrl)}" target="_blank" rel="noopener noreferrer">View Google review →</a>`
    : `<small class="placeholder-text">Add the real Google Business Profile link in script.js</small>`;

  card.innerHTML = `
    <div class="review-badge">
      ${r.isPlaceholder ? "PLACEHOLDER — REPLACE WITH REAL REVIEW" : "CLIENT REVIEW"}
    </div>
    <div class="stars" aria-label="${rating} out of 5 stars">${stars}</div>
    <h3>${escapeHTML(r.clientName)}</h3>
    <p>${escapeHTML(r.reviewText)}</p>
    <small>${escapeHTML(r.businessName)}${r.category ? " • " + escapeHTML(r.category) : ""}</small>
    ${source}
  `;
}

renderReview();

document.querySelector("#prevReview")?.addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  renderReview();
});

document.querySelector("#nextReview")?.addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  renderReview();
});


/* =========================================================
   EDITABLE PRICING
   ========================================================= */
const pricingPlans = [
  {
    id: "starter",
    isPlaceholder: true,
    name: "STARTER WEBSITE",
    description: "PLACEHOLDER — Replace with your actual plan description.",
    price: "YOUR PRICE",
    currency: "",
    features: ["YOUR PAGE COUNT", "RESPONSIVE DESIGN", "YOUR FEATURE", "YOUR FEATURE", "YOUR SUPPORT"],
    featured: false,
    cta: "Request Quote"
  },
  {
    id: "professional",
    isPlaceholder: true,
    name: "PROFESSIONAL WEBSITE",
    description: "PLACEHOLDER — Replace with your actual plan description.",
    price: "YOUR PRICE",
    currency: "",
    features: ["YOUR PAGE COUNT", "RESPONSIVE DESIGN", "YOUR FEATURE", "YOUR FEATURE", "YOUR SEO SERVICE", "YOUR SUPPORT"],
    featured: true,
    cta: "Request Quote"
  },
  {
    id: "premium",
    isPlaceholder: true,
    name: "PREMIUM WEBSITE",
    description: "PLACEHOLDER — Replace with your actual plan description.",
    price: "YOUR PRICE",
    currency: "",
    features: ["YOUR CUSTOM FEATURES", "RESPONSIVE DESIGN", "YOUR ADVANCED FEATURE", "YOUR SEO SERVICE", "YOUR SUPPORT", "YOUR MAINTENANCE OPTION"],
    featured: false,
    cta: "Request Quote"
  }
];

const pricingGrid = document.querySelector("#pricingGrid");
if (pricingGrid) {
  pricingGrid.innerHTML = pricingPlans.map(p => `
    <article class="pricing-card ${p.featured ? "featured" : ""} ${p.isPlaceholder ? "is-placeholder" : ""}">
      <div class="plan-badge">${p.isPlaceholder ? "EDITABLE PLAN — REPLACE DETAILS" : (p.featured ? "POPULAR" : "")}</div>
      <h3>${escapeHTML(p.name)}</h3>
      <p>${escapeHTML(p.description)}</p>
      <div class="price">${escapeHTML(p.currency)}${escapeHTML(p.price)}</div>
      <ul>${p.features.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
      <a class="btn ${p.featured ? "primary" : "secondary"}" href="#contact">${escapeHTML(p.cta)}</a>
    </article>
  `).join("");
}


/* =========================================================
   FAQ
   ========================================================= */
const faqs = [
  ["How long does it take to build a website?", "Timing depends on the size and features. A simple business website can usually be planned and developed much faster than a complex e-commerce or custom platform."],
  ["Do you build websites for small businesses?", "Yes. Digi Service is designed to help small businesses, professionals, clinics and entrepreneurs establish a strong online presence."],
  ["Will my website work on mobile phones?", "Yes. Responsive design is a core part of every website, with layouts designed for phones, tablets and desktops."],
  ["Can you redesign my existing website?", "Yes. Existing websites can be redesigned with a modern UI, improved responsiveness, clearer calls-to-action and better performance."],
  ["Can I connect WhatsApp to my website?", "Yes. WhatsApp buttons can open a direct conversation with a pre-filled project message."],
  ["Do you provide website maintenance?", "Yes. Maintenance can include content updates, improvements, fixes and technical support."],
  ["Can I request custom features?", "Absolutely. Custom functionality can be discussed during the project consultation."],
  ["How do I get started?", "Send a project request using the contact form or message Digi Service directly on WhatsApp."]
];

const faqList = document.querySelector("#faqList");
if (faqList) {
  faqList.innerHTML = faqs.map(f => `
    <div class="faq-item">
      <button class="faq-q" type="button">${escapeHTML(f[0])}<span>+</span></button>
      <div class="faq-a">${escapeHTML(f[1])}</div>
    </div>
  `).join("");

  faqList.addEventListener("click", e => {
    const q = e.target.closest(".faq-q");
    if (!q) return;
    const item = q.parentElement;
    item.classList.toggle("open");
    const icon = q.querySelector("span");
    if (icon) icon.textContent = item.classList.contains("open") ? "−" : "+";
  });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */
const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}


/* =========================================================
   GOOGLE SHEETS FORM SUBMISSION
   =========================================================
   Contact and feedback forms both POST JSON to the Apps Script
   Web App. No Google password, API key or secret is stored here.

   We intentionally use mode:"no-cors" because Google Apps Script
   Web Apps do not reliably expose their response to a browser on
   another domain. A resolved fetch means the browser successfully
   handed the request to the endpoint; server-side validation and
   Sheet/email processing happen inside Apps Script.
   ========================================================= */

function setFormStatus(element, message, type = "success") {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("success", "error", "loading");
  element.classList.add(type);
}

function validateSubmission(data, isFeedback = false) {
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  if (!name) return "Please enter your name.";
  if (!email) return "Please enter your email address.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (!message) return isFeedback ? "Please write your feedback." : "Please enter your project message.";

  if (isFeedback && !String(data.rating || "").trim()) {
    return "Please choose a rating.";
  }

  return "";
}

async function submitFormToGoogle(form, statusElement, successMessage) {
  if (!form || !statusElement) return;

  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());
  const isFeedback = data.formType === "feedback";

  // Honeypot anti-spam field. Real users should never fill this field.
  if (data.website) {
    form.reset();
    setFormStatus(statusElement, "Thanks! Your message has been received.", "success");
    return;
  }
  delete data.website;

  const validationError = validateSubmission(data, isFeedback);
  if (validationError) {
    setFormStatus(statusElement, validationError, "error");
    return;
  }

  if (button) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = "Sending…";
  }

  setFormStatus(statusElement, "Sending your message…", "loading");

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    form.reset();
    setFormStatus(statusElement, successMessage, "success");
  } catch (error) {
    console.error("Digi Service form submission error:", error);
    setFormStatus(
      statusElement,
      "Sorry, your message could not be sent. Please try WhatsApp or email us directly.",
      "error"
    );
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = button.dataset.originalText || "Send";
    }
  }
}


/* =========================================================
   CONTACT FORM
   ========================================================= */
const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    // Normalize the HTML field "type" to "service" for Google Sheets.
    const data = Object.fromEntries(new FormData(contactForm).entries());
    data.formType = "contact";
    data.service = data.type || "";
    delete data.type;

    // Put the normalized data into the form temporarily through a hidden
    // field so the common submit function can send it.
    let serviceField = contactForm.querySelector('input[data-generated="service"]');
    if (!serviceField) {
      serviceField = document.createElement("input");
      serviceField.type = "hidden";
      serviceField.name = "service";
      serviceField.dataset.generated = "service";
      contactForm.appendChild(serviceField);
    }

    let formTypeField = contactForm.querySelector('input[data-generated="formType"]');
    if (!formTypeField) {
      formTypeField = document.createElement("input");
      formTypeField.type = "hidden";
      formTypeField.name = "formType";
      formTypeField.dataset.generated = "formType";
      contactForm.appendChild(formTypeField);
    }

    serviceField.value = data.service;
    formTypeField.value = "contact";

    await submitFormToGoogle(
      contactForm,
      contactStatus,
      "Thanks! Your project request was sent successfully. We’ll get back to you soon."
    );

    serviceField.remove();
    formTypeField.remove();
  });
}


/* =========================================================
   FEEDBACK FORM
   ========================================================= */
const feedbackForm = document.querySelector("#feedbackForm");
const feedbackStatus = document.querySelector("#feedbackStatus");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", async event => {
    event.preventDefault();

    let formTypeField = feedbackForm.querySelector('input[data-generated="formType"]');
    if (!formTypeField) {
      formTypeField = document.createElement("input");
      formTypeField.type = "hidden";
      formTypeField.name = "formType";
      formTypeField.dataset.generated = "formType";
      feedbackForm.appendChild(formTypeField);
    }

    formTypeField.value = "feedback";

    await submitFormToGoogle(
      feedbackForm,
      feedbackStatus,
      "Thank you! Your feedback was submitted successfully."
    );

    formTypeField.remove();
  });
}


/* =========================================================
   HELPERS
   ========================================================= */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value).replace(/`/g, "&#096;");
}
