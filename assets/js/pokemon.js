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
      return `linear-gradient(to bottom right, var(${primaryColor}), var(${secondaryColor}))`;
    } else {
      root.style.removeProperty("--secondary-color");
      return `linear-gradient(to bottom right, var(${primaryColor}), var(--${types[0]}-secondary)`;
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
  <p></p>

  <h2>Pokédex Data</h2>
</div>
  `;
}

function showDetails(id) {
  pokeApi.getPokemon(id).then((data) => {
    showLoading();
    hidePokedex();
    detailsSection.style.display = "block";
    pokemonList.innerHTML = "";
    pagination.innerHTML = "";
    detailsSection.innerHTML = convertPokemonDetail(data);
    hideLoading();
  });
}
