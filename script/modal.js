const btnRegras = document.querySelector("[data-testid='regras-btn']");
const sobreposicao = document.getElementById("sobreposicao");
const modalRegras = document.getElementById("modal-regras");
const btnFechar = document.getElementById("fechar-modal");

btnRegras.addEventListener("click", () => {
    sobreposicao.classList.remove("oculto");
    modalRegras.classList.remove("oculto");
});

btnFechar.addEventListener("click", () => {
    sobreposicao.classList.add("oculto");
    modalRegras.classList.add("oculto");
});
