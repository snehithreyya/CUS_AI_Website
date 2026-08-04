/* ============================================================
   CUS Solution — Interactions + AI Assistant widget (client stub)
   The assistant is grounded in CUS content below. In production
   this is replaced by a RAG service call (see project plan §6).
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
//  AI Career Assistant  — grounded knowledge base (RAG stub)
// ============================================================
const CUS_KB = [
  {
    keys: ['what', 'do', 'cus', 'company', 'about', 'who'],
    a: "CUS Solution is a US-based technology consulting and staffing company. We deliver software development, cloud solutions, engineering, data, and business consulting projects, and we build in-house technology products while connecting skilled professionals with industry opportunities."
  },
  {
    keys: ['service', 'services', 'offer', 'capabilities', 'practice'],
    a: "Our core practice areas are Technology Consulting, Software Development, Cloud Solutions, and Engineering Services (mechanical, industrial, and supply chain). We also run specialized capabilities in Cybersecurity, Data & AI, and Cloud & DevOps."
  },
  {
    keys: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'kubernetes'],
    a: "Our Cloud & DevOps practice covers cloud migration, cloud-native engineering, and reliable delivery pipelines across AWS, Azure, and GCP — with Kubernetes, Docker, Terraform, and CI/CD automation."
  },
  {
    keys: ['data', 'ai', 'analytics', 'machine', 'learning', 'ml'],
    a: "Our Data & AI practice operationalizes analytics and machine learning — data engineering, business intelligence, predictive analytics, and ML — for measurable efficiency across business and engineering systems."
  },
  {
    keys: ['security', 'cyber', 'cybersecurity'],
    a: "Our Cybersecurity practice provides advanced threat mitigation, cloud security, identity & access management, and risk assessment & compliance for regulated enterprise environments."
  },
  {
    keys: ['career', 'careers', 'job', 'jobs', 'hiring', 'apply', 'work', 'student', 'graduate'],
    a: "We connect skilled professionals with industry opportunities. Explore openings on our Careers page, and if you're a student or recent graduate, check our Students & Graduates pathways. Want me to note your interest so the team can follow up?"
  },
  {
    keys: ['hire', 'talent', 'staff', 'staffing', 'resource', 'consultant'],
    a: "We provide precision-vetted talent ready for immediate integration into critical workstreams. Tell me the roles or skills you need and your timeline, and I can help start a hiring conversation with our team."
  },
  {
    keys: ['industry', 'industries', 'sector', 'sectors'],
    a: "We work across Information Technology, Healthcare, Finance & Banking, Insurance, Manufacturing, Retail, Supply Chain & Logistics, Telecommunications, Engineering, Pharmaceuticals, and Biotechnology."
  },
  {
    keys: ['client', 'clients', 'confidential', 'names'],
    a: "Many of our client relationships are governed by confidentiality agreements, so we don't publicly disclose client names. We deliver enterprise software, cloud migration, BI & analytics, data engineering, cybersecurity, and QA automation for these engagements."
  },
  {
    keys: ['contact', 'reach', 'email', 'phone', 'call', 'talk', 'appointment', 'consultation', 'book', 'meeting'],
    a: "You can reach the team at info@cussolution.com or +1 (307) 313-5867, or use the Contact page. Would you like me to help you book a consultation? I can capture your name, email, and what you need."
  },
  {
    keys: ['innovation', 'in-house', 'product', 'saas', 'proprietary'],
    a: "Beyond client work, CUS Solution builds proprietary technology — enterprise web apps, cloud-native apps, SaaS platforms, AI-powered applications, automation tools, and internal management systems."
  }
];

const CHAT = {
  el: {},
  booted: false,
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
      this.bot("Hi! I'm the CUS Solution assistant. I can answer questions about our services, industries, careers, and help you get in touch. What can I help you with?");
    }
    if (open) setTimeout(() => this.el.input.focus(), 250);
  },
  add(text, who) {
    const m = document.createElement('div');
    m.className = 'msg ' + who;
    m.textContent = text;
    this.el.body.appendChild(m);
    this.el.body.scrollTop = this.el.body.scrollHeight;
    return m;
  },
  bot(text) { this.add(text, 'bot'); },
  answer(q) {
    const ql = q.toLowerCase();
    let best = null, bestScore = 0;
    for (const item of CUS_KB) {
      const score = item.keys.reduce((s, k) => s + (ql.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (best && bestScore > 0) return best.a;
    return "Great question. I keep answers grounded in CUS Solution's services, so I can't speak to that specifically — but our team can. You can reach them at info@cussolution.com or +1 (307) 313-5867. Would you like help with our services, industries, careers, or hiring talent?";
  },
  submit() {
    const q = this.el.input.value.trim();
    if (!q) return;
    this.add(q, 'user');
    this.el.input.value = '';
    const typing = this.add('', 'bot');
    typing.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
    setTimeout(() => { typing.remove(); this.bot(this.answer(q)); }, 650 + Math.random() * 500);
  }
};
document.addEventListener('DOMContentLoaded', () => CHAT.init());
