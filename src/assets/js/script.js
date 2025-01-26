const menu = document.querySelector("#menu");
const sidebar = document.querySelector(".sidebar");

menu.onclick = function () {
  sidebar.classList.toggle("active");
};

