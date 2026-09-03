/* ============================================================
   CUS Solution — Interactions + AI Assistant widget
   The assistant answers from the grounded CUS knowledge base
   below. When a RAG backend is configured (ASSISTANT_CONFIG
   .ragEndpoint), the assistant queries it first and falls back
   to the local KB if it is unavailable (see project plan §6).
   ============================================================ */

// ---------- Mobile nav ----------
(function () {
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.add('hidden'))
    );
  }
})();

// ---------- Scroll reveal ----------
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(e => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
})();

// ---------- Footer year ----------
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ============================================================
//  AI Career Assistant
// ============================================================

// Reusable call-to-action buttons rendered under an answer.
const ACTION = {
  book:     { label: 'Book a consultation', href: 'booking.html' },
  contact:  { label: 'Contact the team',    href: 'contact.html', style: 'secondary' },
  careers:  { label: 'View careers',        href: 'careers.html' },
  students: { label: 'Students & new grads', href: 'students.html', style: 'secondary' },
  services: { label: 'Explore services',    href: 'services.html' },
  industries:{ label: 'Industries we serve', href: 'industries.html', style: 'secondary' },
  insights: { label: 'Read our insights',   href: 'insights.html', style: 'secondary' }
};

// Grounded knowledge base. Each entry: keyword triggers, an answer,
// and optional action buttons routing to the relevant page.
const CUS_KB = [
  {
    keys: ['cus solution', 'the company', 'about', 'who are', 'who is', 'overview', 'tell me about'],
    a: "CUS Solution is a US-based technology consulting and staffing company. We deliver software development, cloud solutions, engineering, data, and business consulting projects, build in-house technology products, and connect skilled professionals with industry opportunities.",
    actions: [ACTION.services]
  },
  {
    keys: ['service', 'services', 'offer', 'capabilities', 'practice'],
    a: "Our core practice areas are Technology Consulting, Software Development, Cloud Solutions, and Engineering Services (mechanical, industrial, and supply chain). We also run specialized capabilities in Cybersecurity, Data & AI, and Cloud & DevOps.",
    actions: [ACTION.services]
  },
  {
    keys: ['consulting', 'advisory', 'strategy', 'roadmap', 'transformation', 'modernization'],
    a: "Technology Consulting helps you set direction and de-risk delivery — digital strategy, architecture, modernization roadmaps, and hands-on delivery leadership that turns plans into shipped outcomes.",
    actions: [{ label: 'Technology Consulting', href: 'technology-consulting.html' }, ACTION.book]
  },
  {
    keys: ['software', 'development', 'app', 'application', 'web', 'build', 'engineer', 'developers'],
    a: "Software Development covers custom web and enterprise apps, cloud-native builds, SaaS platforms, AI-powered applications, and QA automation — delivered by product-minded engineering teams.",
    actions: [{ label: 'Software Development', href: 'software-development.html' }, ACTION.book]
  },
  {
    keys: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'kubernetes', 'migration', 'infrastructure'],
    a: "Our Cloud Solutions / DevOps practice covers cloud migration, cloud-native engineering, and reliable delivery pipelines across AWS, Azure, and GCP — with Kubernetes, Docker, Terraform, and CI/CD automation.",
    actions: [{ label: 'Cloud Solutions', href: 'cloud-solutions.html' }, ACTION.book]
  },
  {
    keys: ['engineering', 'mechanical', 'industrial', 'supply', 'chain', 'manufacturing', 'operations'],
    a: "Engineering Services spans mechanical, industrial, and supply-chain engineering — design, process optimization, and operations support that connect the physical and digital sides of your business.",
    actions: [{ label: 'Engineering Services', href: 'engineering-services.html' }, ACTION.book]
  },
  {
    keys: ['data', 'ai', 'analytics', 'machine', 'learning', 'ml', 'bi', 'intelligence'],
    a: "Our Data & AI practice operationalizes analytics and machine learning — data engineering, business intelligence, predictive analytics, and ML — for measurable efficiency across business and engineering systems.",
    actions: [ACTION.services]
  },
  {
    keys: ['security', 'cyber', 'cybersecurity', 'compliance', 'risk', 'identity'],
    a: "Our Cybersecurity practice provides advanced threat mitigation, cloud security, identity & access management, and risk assessment & compliance for regulated enterprise environments.",
    actions: [ACTION.services]
  },
  {
    keys: ['career', 'careers', 'job', 'jobs', 'hiring', 'apply', 'opening', 'openings', 'role', 'roles', 'position'],
    a: "We connect skilled professionals with industry opportunities across software, cloud & DevOps, data & AI, consulting, QA, and engineering tracks. Explore openings on our Careers page — and if you're a student or recent grad, we have dedicated early-career pathways.",
    actions: [ACTION.careers, ACTION.students]
  },
  {
    keys: ['student', 'students', 'graduate', 'grad', 'intern', 'internship', 'entry', 'junior', 'mentor'],
    a: "For students and new graduates we offer internships, a new-grad rotation, and apprentice-style upskilling — with a 1:1 mentor from day one and real client work. Here's how to get started:",
    actions: [ACTION.students, ACTION.careers]
  },
  {
    keys: ['hire', 'talent', 'staff', 'staffing', 'resource', 'consultant', 'contractor', 'augment', 'team'],
    a: "We provide precision-vetted talent ready for immediate integration into your critical workstreams. Tell us the roles, skills, and timeline you need and we'll start a hiring conversation — the fastest way is to book a short scoping call.",
    actions: [ACTION.book, ACTION.contact]
  },
  {
    keys: ['book', 'booking', 'schedule', 'consultation', 'appointment', 'meeting', 'call', 'demo', 'slot', 'time'],
    a: "Happy to help you book a consultation — it's a free, no-obligation 30-minute call, usually confirmed within one business day. Pick a time and we'll take it from there:",
    actions: [ACTION.book, ACTION.contact]
  },
  {
    keys: ['contact', 'reach', 'email', 'phone', 'talk', 'connect', 'inquiry', 'enquiry', 'get', 'touch'],
    a: "You can reach the team at info@cussolution.com or +1 (307) 313-5867, or use the Contact page. If you'd rather grab a time directly, you can book a consultation:",
    actions: [ACTION.contact, ACTION.book]
  },
  {
    keys: ['lead', 'quote', 'interested', 'proposal', 'estimate', 'start', 'project', 'engage', 'engagement'],
    a: "Great — let's get your project moving. Share your name, email, and a sentence on what you need and our team will follow up. The Contact form captures those details, or book a scoping call and we'll come prepared:",
    actions: [ACTION.contact, ACTION.book]
  },
  {
    keys: ['pricing', 'price', 'cost', 'rate', 'rates', 'budget', 'much'],
    a: "Pricing depends on scope, team size, and engagement model, so we tailor a quote after a short scoping conversation. The consultation is free — book a time and we'll walk through options and a ballpark:",
    actions: [ACTION.book, ACTION.contact]
  },
  {
    keys: ['industry', 'industries', 'sector', 'sectors', 'vertical', 'healthcare', 'finance', 'insurance', 'retail', 'pharma', 'biotech', 'telecom'],
    a: "We work across Information Technology, Healthcare, Finance & Banking, Insurance, Manufacturing, Retail, Supply Chain & Logistics, Telecommunications, Engineering, Pharmaceuticals, and Biotechnology.",
    actions: [ACTION.industries]
  },
  {
    keys: ['process', 'approach', 'how', 'work', 'methodology', 'model', 'deliver', 'delivery'],
    a: "We keep engagements simple: a short discovery to align on outcomes, a tailored plan with the right team, iterative delivery with clear checkpoints, and support as you scale. The best first step is a discovery call:",
    actions: [ACTION.book, ACTION.services]
  },
  {
    keys: ['where', 'location', 'located', 'based', 'us', 'usa', 'remote', 'onsite'],
    a: "CUS Solution is US-based and works with clients across the country, on-site and remotely. Reach us at info@cussolution.com or +1 (307) 313-5867.",
    actions: [ACTION.contact]
  },
  {
    keys: ['client', 'clients', 'confidential', 'names', 'reference', 'portfolio', 'case'],
    a: "Many client relationships are governed by confidentiality agreements, so we don't publicly disclose names. We deliver enterprise software, cloud migration, BI & analytics, data engineering, cybersecurity, and QA automation across these engagements.",
    actions: [ACTION.services]
  },
  {
    keys: ['innovation', 'in-house', 'product', 'saas', 'proprietary', 'platform'],
    a: "Beyond client work, CUS Solution builds proprietary technology — enterprise web apps, cloud-native apps, SaaS platforms, AI-powered applications, automation tools, and internal management systems.",
    actions: [ACTION.services]
  },
  {
    keys: ['insight', 'insights', 'blog', 'article', 'articles', 'read', 'resources', 'guide', 'guides', 'newsletter', 'post', 'posts'],
    a: "Our Insights blog shares practical guidance from our consultants and engineers — on cloud cost optimization, enterprise AI adoption, software modernization, and tech staffing. Browse the latest articles or subscribe to get new ones by email.",
    actions: [ACTION.insights, ACTION.book]
  }
];

// ------------------------------------------------------------
// RAG backend hook. Set ASSISTANT_CONFIG.ragEndpoint to a URL
// that accepts { query, history } and returns { answer, actions? }
// to route the assistant through a retrieval-augmented backend.
// While it is null, the assistant runs entirely on the local KB.
// ------------------------------------------------------------
const ASSISTANT_CONFIG = {
  ragEndpoint: null,   // e.g. 'https://api.cussolution.com/assistant'
  timeoutMs: 6000
};

async function queryRAG(q, history) {
  if (!ASSISTANT_CONFIG.ragEndpoint) return null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ASSISTANT_CONFIG.timeoutMs);
    const res = await fetch(ASSISTANT_CONFIG.ragEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, history: history }),
      signal: ctrl.signal
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data.answer === 'string' && data.answer.trim()) {
      return { text: data.answer, actions: Array.isArray(data.actions) ? data.actions : [] };
    }
    return null;
  } catch (_) {
    return null; // network/abort/parse — fall back to local KB
  }
}

const CHAT = {
  el: {},
  booted: false,
  history: [],
  init() {
    this.el.launcher = document.getElementById('chat-launcher');
    this.el.panel = document.getElementById('chat-panel');
    this.el.body = document.getElementById('chat-body');
    this.el.input = document.getElementById('chat-text');
    this.el.send = document.getElementById('chat-send');
    this.el.close = document.getElementById('chat-close');
    if (!this.el.launcher) return;

    this.el.launcher.addEventListener('click', () => this.toggle());
    this.el.close.addEventListener('click', () => this.toggle(false));
    this.el.send.addEventListener('click', () => this.submit());
    this.el.input.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.submit(); });
    document.querySelectorAll('.sugg').forEach(s =>
      s.addEventListener('click', () => { this.el.input.value = s.textContent; this.submit(); })
    );
  },
  toggle(force) {
    const open = force !== undefined ? force : !this.el.panel.classList.contains('open');
    this.el.panel.classList.toggle('open', open);
    if (open && !this.booted) {
      this.booted = true;
      this.bot("Hi! I'm the CUS Solution assistant. I can answer questions about our services, industries, and careers — and help you book a consultation or reach the team. What can I help you with?");
    }
    if (open) setTimeout(() => this.el.input.focus(), 250);
  },
  add(text, who, actions) {
    const m = document.createElement('div');
    m.className = 'msg ' + who;
    const t = document.createElement('span');
    t.textContent = text;
    m.appendChild(t);
    if (actions && actions.length) {
      const wrap = document.createElement('div');
      wrap.className = 'chat-actions';
      actions.forEach(act => {
        if (!act || !act.href || !act.label) return;
        const a = document.createElement('a');
        a.className = 'chat-action' + (act.style === 'secondary' ? ' secondary' : '');
        a.href = act.href;
        a.textContent = act.label;
        wrap.appendChild(a);
      });
      if (wrap.childNodes.length) m.appendChild(wrap);
    }
    this.el.body.appendChild(m);
    this.el.body.scrollTop = this.el.body.scrollHeight;
    return m;
  },
  bot(text, actions) { this.add(text, 'bot', actions); },
  matchKB(q) {
    const ql = q.toLowerCase();
    let best = null, bestScore = 0;
    for (const item of CUS_KB) {
      const score = item.keys.reduce((s, k) => s + (ql.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (best && bestScore > 0) return { text: best.a, actions: best.actions || [] };
    return {
      text: "Great question. I keep answers grounded in CUS Solution's work, so I can't speak to that specifically — but our team can. You can book a consultation or reach them at info@cussolution.com / +1 (307) 313-5867. Meanwhile, I can help with our services, industries, careers, or hiring talent.",
      actions: [ACTION.book, ACTION.contact]
    };
  },
  async respond(q) {
    // Try the RAG backend first when configured; fall back to the local KB.
    const rag = await queryRAG(q, this.history.slice(-6));
    return rag || this.matchKB(q);
  },
  submit() {
    const q = this.el.input.value.trim();
    if (!q) return;
    this.add(q, 'user');
    this.history.push({ role: 'user', text: q });
    this.el.input.value = '';
    const typing = this.add('', 'bot');
    typing.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
    const started = Date.now();
    this.respond(q).then(reply => {
      const wait = Math.max(0, 500 - (Date.now() - started));
      setTimeout(() => {
        typing.remove();
        this.bot(reply.text, reply.actions);
        this.history.push({ role: 'assistant', text: reply.text });
      }, wait);
    });
  }
};
document.addEventListener('DOMContentLoaded', () => CHAT.init());
