const pagination = document.getElementById("pagination");
const totalPokemons = 151;
const limit = 15;
let offset = 0;
const currentPage = 1;

function calcularNumeroDePaginas(limit, totalPokemons) {
  const quantidadeDePokemons = Math.ceil(totalPokemons / limit);
  console.log(quantidadeDePokemons);
  return quantidadeDePokemons;
}

function criarPaginacao(totalPokemons) {
  const pagination = document.getElementById("pagination");
  const porPagina = 15;
  const numeroDePaginas = calcularNumeroDePaginas(limit, totalPokemons);

  for (let i = 0; i < numeroDePaginas; i++) {
    const pageNumber = i + 1;
    const newButton = document.createElement("button");
    const offset = i * porPagina;

    function formatPageNumber(id) {
      return String(id).padStart(2, "0");
    }

    if (pageNumber === 1) {
      newButton.classList.add("active");
    }

    newButton.textContent = formatPageNumber(pageNumber);
    newButton.dataset.offset = offset;

    newButton.addEventListener("click", function () {
      const newOffset = this.dataset.offset;
      showLoading();
      loadPokemon(newOffset, limit);
      const buttons = pagination.querySelectorAll("button");
      buttons.forEach((button) => button.classList.remove("active"));
      this.classList.add("active");
    });

    pagination.appendChild(newButton);
  }
}

criarPaginacao(totalPokemons);
