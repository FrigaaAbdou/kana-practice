const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo-om");

burger.addEventListener("click", ()=>{
  burger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", ()=>{
    burger.classList.remove("active");
    navLinks.classList.remove("open");
  })
);

logo.addEventListener("click", () => {
    window.location.href = "../index.html";
  });