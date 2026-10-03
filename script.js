/* ===== Configuração: EDITE AQUI ===== */
const CONFIG = {
  whatsapp: "5500000000000", // DDI + DDD + número, só dígitos
  mensagemPadrao: "Olá! Gostaria de solicitar um orçamento com a ELEVUS."
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const waLink = (txt) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;

/* Links de WhatsApp */
function initWhatsApp() {
  $$("[data-wa]").forEach((a) => (a.href = waLink(CONFIG.mensagemPadrao)));
}

/* Header: efeito no scroll + menu mobile */
function initHeader() {
  const header = $(".header"), burger = $(".burger"), nav = $("#menu");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const toggle = (open) => {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    if (open) header.classList.add("is-scrolled");
  };
  burger.addEventListener("click", () => toggle(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => toggle(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
}

/* Animação de entrada + contadores */
function initReveal() {
  $$(".card, .diffs li, .steps li, .stats > div, .proj, details, .contacts li, .cta > *").forEach((el) => el.classList.add("rv"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      const n = $("strong[data-n]", e.target);
      if (n) countUp(n);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$(".rv").forEach((el) => io.observe(el));
}

function countUp(el) {
  const end = +el.dataset.n, suf = el.dataset.s || "";
  if (!end) { el.textContent = "0" + suf; return; }
  const t0 = performance.now(), dur = 1200;
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Projetos: filtro + detalhes */
function initProjects() {
  const chips = $$(".chip"), items = $$(".proj"), dlg = $("#dlg");
  chips.forEach((c) => c.addEventListener("click", () => {
    chips.forEach((x) => x.classList.toggle("is-on", x === c));
    items.forEach((p) => (p.hidden = c.dataset.f !== "todos" && p.dataset.cat !== c.dataset.f));
  }));
  items.forEach((p) => p.addEventListener("click", () => {
    $("#dlgT").textContent = p.dataset.t;
    $("#dlgD").textContent = p.dataset.d;
    dlg.showModal();
  }));
  $("#dlgX").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
}

/* Cards de serviço pré-selecionam o formulário */
function initServiceLinks() {
  $$("[data-servico]").forEach((a) => a.addEventListener("click", () => {
    $("select[name=servico]").value = a.dataset.servico;
  }));
}

/* Formulário: valida e abre WhatsApp com os dados */
function initForm() {
  const f = $("#form"), err = $("#err");
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    if (!d.nome.trim() || d.tel.replace(/\D/g, "").length < 10 || !d.servico) {
      err.textContent = "Preencha nome, telefone com DDD e tipo de serviço.";
      return;
    }
    err.textContent = "";
    const txt = `Olá! Sou ${d.nome}. Quero orçamento de: ${d.servico}.\nTelefone: ${d.tel}\n${d.msg || ""}`;
    window.open(waLink(txt), "_blank", "noopener");
    f.reset();
  });
}

$("#ano").textContent = new Date().getFullYear();
[initWhatsApp, initHeader, initReveal, initProjects, initServiceLinks, initForm].forEach((fn) => fn());
