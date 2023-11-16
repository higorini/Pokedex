const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close");

infoButton.addEventListener("click", () => {
  modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});
