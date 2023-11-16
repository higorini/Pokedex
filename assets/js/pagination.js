const totalPokemons = 151;
const limit = 15;
let offset = 0;
let currentPage = 1;

function clearSessionStorage() {
  sessionStorage.clear();
}

clearSessionStorage();

function calcularNumeroDePaginas(limit, totalPokemons) {
  const quantidadeDePokemons = Math.ceil(totalPokemons / limit);
  return quantidadeDePokemons;
}

function criarPaginacao(totalPokemons) {
  const porPagina = 15;
  const numeroDePaginas = calcularNumeroDePaginas(limit, totalPokemons);
  const currentPageStorage = sessionStorage.getItem("currentPage");

  for (let i = 0; i < numeroDePaginas; i++) {
    const pageNumber = i + 1;
    const newButton = document.createElement("button");
    const newOffset = i * porPagina;

    function formatPageNumber(id) {
      return String(id).padStart(2, "0");
    }

    if (pageNumber === 1) {
      newButton.classList.add("active");
    }

    newButton.textContent = formatPageNumber(pageNumber);
    newButton.dataset.offset = newOffset;

    newButton.addEventListener("click", function () {
      const offset = this.dataset.offset;
      showLoading();
      loadPokemon(offset, limit);
      const buttons = pagination.querySelectorAll("button");
      buttons.forEach((button) => button.classList.remove("active"));
      this.classList.add("active");

      sessionStorage.setItem("currentPage", pageNumber);
    });

    pagination.appendChild(newButton);
  }

  if (currentPageStorage) {
    const buttons = pagination.querySelectorAll("button");
    buttons.forEach((button) => button.classList.remove("active"));
    const currentPageButton = pagination.querySelector(
      `button[data-offset="${(currentPageStorage - 1) * porPagina}"]`
    );
    currentPageButton.classList.add("active");
    loadPokemon((currentPageStorage - 1) * porPagina, limit);
  }
}

criarPaginacao(totalPokemons);
