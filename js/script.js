/* =====================================================
   CONFIGURAÇÃO — EDITE AQUI
   ===================================================== */
const CONFIG = {
  // Caminho da sua foto (ex.: "foto.jpg"). Se não existir, aparece um espaço reservado "MH".
  photo: "img/rosto.jpg",

  // Áreas de interesse (baseadas na sua apresentação).
  interests: [
    "Programação",
    "Desenvolvimento de sistemas",
    "Criação de soluções digitais",
    "Aprendizado contínuo de novas tecnologias"
  ],

  // Tecnologias que você domina. Troque os itens abaixo pelos seus.
  // Itens com { placeholder: true } aparecem tracejados; apague-os quando adicionar os reais.
  skills: [
    { name: "IA", placeholder: true },
    { name: "HTML", placeholder: true },
    { name: "CSS", placeholder: true },
    { name: "Banco de Dados", placeholder: true }
  ],

  // PROJETOS — para adicionar outro, copie um bloco { ... } e cole na lista.
  // vercel: link do site publicado | github: link do repositório | image: caminho da prévia (opcional)
  projects: [
    {
      name: "Projeto 1",
      description: "Trabalho feito na escola, sobre uma loja de skin, com form interativo.",
      tech: ["HTML", "CSS", "JS"],
      image: "img/foto.jpg",
      vercel: "#https://skin-cyan.vercel.app/",
      github: "#https://github.com/31381-hue/SKIN"
    },
    {
      name: "Projeto 2",
      description: "Projeto para testar Lógica de progamação.",
      tech: ["HTML", "CSS", "JS"],
      image: "img/foto1.jpg",
      vercel: "#https://github.com/31381-hue/IA-frase",
      github: "#https://ia-frase.vercel.app/"
    },
    {
      name: "Projeto 3",
      description: "projeto feito em escola.",
      tech: ["IA"],
      image: "img/foto3.jpg",
      vercel: "#https://caos-dlx.vercel.app/",
      github: "#https://github.com/31381-hue/caos-dlx"
    }
  ]
};

/* =====================================================
   CÓDIGO
   ===================================================== */
const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const validLink = (u) => u && u !== "#";

// --- Nome letra por letra
(function splitName() {
  const el = $("#heroTitle");
  const text = el.textContent.trim();
  el.textContent = "";
  let i = 0;
  text.split(" ").forEach((w) => {
    const word = document.createElement("span");
    word.className = "word";
    word.setAttribute("aria-hidden", "true");
    [...w].forEach((ch) => {
      const s = document.createElement("span");
      s.className = "letter";
      s.style.setProperty("--i", i++);
      s.textContent = ch;
      word.appendChild(s);
    });
    el.appendChild(word);
  });
})();

// --- Foto
(function photo() {
  const img = $("#photoImg"), frame = $("#photoFrame");
  img.addEventListener("error", () => frame.classList.add("no-img"));
  img.src = CONFIG.photo;
})();

// --- Interesses e habilidades
$("#focusList").innerHTML = CONFIG.interests.map((t) => `<div class="focus-item"><i></i><span>${esc(t)}</span></div>`).join("");
$("#skillChips").innerHTML = CONFIG.skills.map((s) => `<span class="chip${s.placeholder ? " placeholder" : ""}">${esc(s.name)}</span>`).join("");

// --- Projetos
const ghIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>';
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

$("#projectsGrid").innerHTML = CONFIG.projects.map((p, i) => {
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="Prévia do projeto ${esc(p.name)}" loading="lazy" width="640" height="400" />`
    : `<span class="ph">Prévia do projeto</span>`;
  const live = validLink(p.vercel), repo = validLink(p.github);
  return `
  <article class="card fall" style="--d:${i * 0.12}s">
    <div class="card-media">${media}</div>
    <div class="card-body">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.description)}</p>
      <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      <div class="card-actions">
        <a class="btn btn-primary" href="${live ? esc(p.vercel) : "#"}" target="_blank" rel="noopener noreferrer" ${live ? "" : 'aria-disabled="true" tabindex="-1"'}>Visualizar projeto ${arrow}</a>
        <a class="btn btn-ghost" href="${repo ? esc(p.github) : "#"}" target="_blank" rel="noopener noreferrer" ${repo ? "" : 'aria-disabled="true" tabindex="-1"'}>${ghIcon} GitHub</a>
      </div>
    </div>
  </article>`;
}).join("");

// --- Animação de queda no scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".fall").forEach((el) => io.observe(el));

// --- Navbar: estado de scroll, link ativo e menu mobile
const navbar = $("#navbar"), toggle = $("#menuToggle"), links = $("#navLinks");
const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
}));

const navAnchors = [...links.querySelectorAll("a")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach((s) => spy.observe(s));

// --- Luz que segue o mouse (suavizada)
(function cursorLight() {
  const el = $("#cursorLight");
  if (matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = null;
  const loop = () => {
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    el.style.setProperty("--mx", x + "px"); el.style.setProperty("--my", y + "px");
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : null;
  };
  window.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY; el.classList.add("on");
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener("mouseleave", () => el.classList.remove("on"));
})();

$("#year").textContent = new Date().getFullYear();
