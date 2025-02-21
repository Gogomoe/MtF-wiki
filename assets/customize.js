// #region anchor
(() => {
  window.addEventListener("hashchange", onHashChange, { capture: true });
  document.addEventListener("DOMContentLoaded", onHashChange);
  document.addEventListener("click", onLinkClick, { capture: true });

  function onHashChange() {
    if (!location.hash) return;
    const navbar = document.querySelector(".navbar__wrapper");
    const element = document.querySelector(decodeURIComponent(location.hash));
    const rect = element.getBoundingClientRect();
    const marginTop = Number.parseInt(getComputedStyle(element).marginTop, 10)
    scrollTo({
      top: rect.top + scrollY - marginTop - navbar.clientHeight,
      behavior: "smooth",
    });
  }

  function onLinkClick(event) {
    const target = event.target;
    if (target.tagName !== "A") return;
    if (!target.classList.contains("anchor")) return;
    event.preventDefault();
    event.stopPropagation();
    history.replaceState(undefined, document.title, target.href);
    onHashChange();
  }
})();
// #endregion

document.querySelectorAll("a[href]").forEach((link) => {
  if (!/^https?:$/.test(link.protocol)) return;
  if (link.hostname === location.hostname) return;
  link.target = "_blank";
});

document.querySelectorAll("a[data-email]").forEach((element) => {
  element.href = atob(element.dataset.email);
  delete element.dataset.email;
});

// #region weixin media platform qrcode

document.addEventListener(
  "click",
  (event) => {
    if (event.target.tagName !== "A") return;
    if (event.target.hostname !== "open.weixin.qq.com") return;
    event.preventDefault();
    event.stopPropagation();
    const qrcode = document.createElement("img");
    qrcode.src = event.target.href;
    qrcode.width = 430;
    qrcode.height = 430;
    swal(event.target.title, { content: qrcode });
  },
  { capture: true }
);

// #endregion

// #region hidden photo

document.addEventListener(
  "click",
  (event) => {
    if (!event.target.classList.contains("mask")) return;
    const photo = event.target.closest(".hidden-photo");
    if (!photo) return;
    photo.classList.add("show");
  },
  { capture: true }
);

// #endregion
