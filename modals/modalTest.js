let btn = document.querySelector("modalButton");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".closeModal");

btn.addEventListener("click", function() {
    modal.style.display = "flex";
})

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(tap) {
    if (tap.target == modal) {
        modal.style.display = "none";
    }
})