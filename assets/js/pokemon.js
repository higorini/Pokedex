const pagination = document.getElementById("pagination");
const detailsSection = document.getElementById("detailsSection");

function convertPokemonDetail(pokemon) {
  function applyPokemonColors(types) {
    const root = document.documentElement;
    const primaryColor = `--${types[0]}-primary`;
    const secondaryColor = `--${types[1]}-primary`;

    root.style.setProperty("--primary-color", `var(${primaryColor})`);

    if (types[1]) {
      root.style.setProperty("--secondary-color", `var(${secondaryColor})`);
      return `linear-gradient(to right, var(${primaryColor}), var(${secondaryColor}))`;
    } else {
      root.style.removeProperty("--secondary-color");
      return `linear-gradient(to right, var(${primaryColor}), var(--${types[0]}-secondary)`;
    }
  }

  function formatPokemonId(id) {
    return String(id).padStart(3, "0");
  }

  const type = pokemon.types;
  const formattedId = formatPokemonId(pokemon.id);
  const capitalizedFirstLetter =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const capitalizedFirstType =
    type[0].charAt(0).toUpperCase() + type[0].slice(1);
  const capitalizedSecondType = type[1]
    ? type[1].charAt(0).toUpperCase() + type[1].slice(1)
    : "";
  const typeColor = type[1] ? type.join(" ") : type[0];
  const backgroundStyle = applyPokemonColors(type);
  detailsSection.style.background = backgroundStyle;

  return `
  <button class="back-icon" id="back-icon"><img src="./assets/images/icons/back.svg" src="back-button" /></button>
    <div class="pokemon-details">
      <div class="details-header ${typeColor}">
        <div class="info-header">
          <img src="${pokemon.image}" alt="${pokemon.name}">
          <div class="detail-types">
          <spam class="pokemon-id">#${formattedId}</spam>
          <h1>${capitalizedFirstLetter}</h1>
            <ol class="types">
              <li class="type ${type[0]}">
                <img src="./assets/images/types/${type[0]}.svg" />
                ${capitalizedFirstType}
            </li>
            ${
              type.length > 1
                ? `<li class="type ${type[1]}">
                    <img src="./assets/images/types/${type[1]}.svg" />
                    ${capitalizedSecondType}
                  </li>`
                : ""
            }
              </ol>
          </div>
        </div>
      </div>

      <div class="details-about">
        <p>${pokemon.description.replace(/\n/g, " ")}</p>

        <h2>Pokédex Data</h2>
      </div>
    </div>
  `;
}

function showDetails(id) {
  pokeApi.getPokemon(id).then((data) => {
    const randomTime = Math.random() * (2000 - 1000) + 1000;
    showLoading();
    hidePokedex();
    detailsSection.style.display = "block";
    pokemonList.innerHTML = "";
    pagination.innerHTML = "";
    detailsSection.innerHTML = convertPokemonDetail(data);
    setTimeout(hideLoading, randomTime);
    const backIcon = document.getElementById("back-icon");
    
    backIcon.addEventListener("click", function () {
      const randomTime = Math.random() * (2000 - 1000) + 1000;
      showLoading();
      detailsSection.style.display = "none";
      detailsSection.innerHTML = "";
      showPokedex();
      loadPokemon(offset, limit);
      criarPaginacao(totalPokemons);
      setTimeout(hideLoading, randomTime);
    });
  });
}