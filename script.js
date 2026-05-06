const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const pokemonDataArray = [];
let currentPokemonDataArray = [];

async function init() {
    await getPokemonIdNameType(1);
    console.table(pokemonDataArray);
    await renderPokemonCards(pokemonDataArray);
}

async function getPokemonIdNameType(start) {
    for (let id = start; id < (start+20); id++) {
        const response = await fetch(`${BASE_URL}/${id}`);
        const responseToJson = await response.json();       
        const types = [];

        for (let indexType = 0; indexType < responseToJson.types.length; indexType++) {
            types.push(responseToJson.types[indexType].type.name);
        }

        pokemonDataArray.push (
            {
                pokeID : id,
                name : responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1),
                types : types
            }
        );
    }
}

async function renderPokemonCards() {
    currentPokemonDataArray = pokemonDataArray;
    for (let index = 0; index < currentPokemonDataArray.length; index++) {
        const pokeID = currentPokemonDataArray[index].pokeID;
        const name = currentPokemonDataArray[index].name;
        const types = currentPokemonDataArray[index].types;
        const type1 = types[0];
        let type2 = (types.length == 2) ? types[1] : type1;
        
        document.getElementById('#PokemonList').innerHTML += 
            await templatePokemonCard (pokeID, name, type1, type2)

        for (let indexType = 0; indexType < types.length; indexType++) {
            document.getElementById(`#Types${pokeID}`).innerHTML += 
            templatePokemonTypes(types[indexType]);
        };
    }
}

async function loadMorePokemon() {
    await getPokemonIdNameType(pokemonDataArray.length+1);
    console.table(pokemonDataArray);
    // await renderPokemonCards(pokemonDataArray);
}