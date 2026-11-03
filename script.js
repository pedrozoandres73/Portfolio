/* =========================================================
   Portfolio · Andrés Pedrozo
   ========================================================= */

/* ---------- CONFIGURACIÓN: completá tus datos reales acá ----------
   Dejá cada campo vacío ("") hasta tener el dato. No se inventa nada. */
const CONFIG = {
  email: "pedrozoandres73@gmail.com",
  linkedin: "https://www.linkedin.com/in/andr%C3%A9s-pedrozo",
  github: ""     // ej.: "https://github.com/tu-usuario"
};

document.documentElement.classList.add("js");

/* ---------- Enlaces de contacto ---------- */
(function setupLinks() {
  const set = (key, href, label) => {
    const a = document.querySelector(`[data-link="${key}"]`);
    if (!a || !href) return;
    a.href = href;
    if (label) a.textContent = label;
  };
  set("email", CONFIG.email && `mailto:${CONFIG.email}`, CONFIG.email);
  set("linkedin", CONFIG.linkedin);
  set("github", CONFIG.github, "GitHub");
})();

/* ---------- Menú móvil ---------- */
const btn = document.querySelector(".nav__btn");
const menu = document.getElementById("menu");
const closeMenu = () => {
  menu.classList.remove("is-open");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Abrir menú");
};
btn.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  btn.setAttribute("aria-expanded", String(open));
  btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
menu.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

/* ---------- Aparición al desplazarse ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Sección activa en el menú ---------- */
const links = [...menu.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Filtro de proyectos ---------- */
const filters = document.querySelectorAll(".filters .chip");
const projects = document.querySelectorAll(".project");
filters.forEach((chip) => {
  chip.addEventListener("click", () => {
    filters.forEach((c) => {
      const on = c === chip;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-pressed", String(on));
    });
    const f = chip.dataset.filter;
    projects.forEach((p) => { p.hidden = f !== "all" && p.dataset.cat !== f; });
  });
});

/* ---------- Volver arriba ---------- */
document.querySelector('a[href="#top"]').addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Año del footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
