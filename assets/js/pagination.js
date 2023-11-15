const pagination = document.getElementById("pagination");
const totalPokemons = 151;
const limit = 15;
let offset = 0;
const currentPage = 1;

function calcularNumeroDePaginas(limit, totalPokemons) {
  const quantidadeDePokemons = Math.ceil(totalPokemons / limit);
  console.log(quantidadeDePokemons)
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
  
      newButton.textContent = `${pageNumber}`;
      newButton.dataset.offset = offset;
  
      newButton.addEventListener("click", function () {
        const newOffset = this.dataset.offset;
        showLoading();
        loadPokemon(newOffset, limit)
      });
  
      pagination.appendChild(newButton);
    }
  }

criarPaginacao(totalPokemons);
