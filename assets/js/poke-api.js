const pokeApi = {};

async function convertPokeApiToModel(pokeDetail) {
  const pokemon = new Pokemon();

  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  res = await fetch(pokeDetail["species"]["url"]);
  pokemon.description = await res.json();
  console.log(pokemon.description);
  pokemon.description =
    pokemon.description["flavor_text_entries"][6]["flavor_text"];
  console.log(pokemon.description);
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.hp = pokeDetail["stats"][0]["base_stat"];
  pokemon.attack = pokeDetail["stats"][1]["base_stat"];
  pokemon.defense = pokeDetail["stats"][2]["base_stat"];
  pokemon.spAttack = pokeDetail["stats"][3]["base_stat"];
  pokemon.spDefense = pokeDetail["stats"][4]["base_stat"];
  pokemon.speed = pokeDetail["stats"][5]["base_stat"];
  pokemon.total =
    pokemon.hp +
    pokemon.attack +
    pokemon.defense +
    pokemon.spAttack +
    pokemon.spDefense +
    pokemon.speed;
  res = await fetch(pokeDetail["species"]["url"]);
  pokemon.species = await res.json();
  pokemon.species = pokemon.species["genera"][7]["genus"];
  pokemon.abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToModel);
};

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((uniquePokemons) => uniquePokemons)
    .catch((error) => console.error(error));
};

pokeApi.getPokemon = (id) => {
  console.log(id);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  return fetch(url)
    .then((response) => response.json())
    .then((pokemonData) => convertPokeApiToModel(pokemonData))
    .then((uniquePokemon) => uniquePokemon)
    .catch((error) => console.error("Error:", error));
};
