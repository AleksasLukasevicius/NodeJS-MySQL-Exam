document.getElementById("nav-hamburger").addEventListener("click", (e) => {
  document.querySelector("header nav").classList.toggle("visible");
  e.target.textContent =
    e.target.textContent === "reorder" ? "close" : "reorder";
});
