let show = true;

const menuSection = document.querySelector(".my-navbar");
const menuToggle = document.querySelector(".my-navbar__toggle");

menuToggle.addEventListener("click", () => {
  document.body.style.overflow = show ? "hidden" : "initial";

  menuSection.classList.toggle("on", show);
  show = !show;
});
