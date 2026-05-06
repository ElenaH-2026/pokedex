const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const MAX_AMOUNT = 1025;
const LOADING_AMOUNT = 20;
const pokemonDataArray = [];

async function init() {
    await getPokemonIdNameType(start=1);
    await renderPokemonCards(pokemonDataArray);
    await renderLoadMoreButton();
}

async function getPokemonIdNameType(start) {
    for (let id = start; (id < (start + LOADING_AMOUNT)) && (id <= MAX_AMOUNT); id++) {
        const response = await fetch(`${BASE_URL}/${id}`);
        const responseToJson = await response.json();       
        const types = [];

        for (let indexType = 0; indexType < responseToJson.types.length; indexType++) {
            types.push(responseToJson.types[indexType].type.name);
        }
        pokemonDataArray.push ({
            pokeID : id,
            name : responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1),
            types : types
        });
    };
}

async function renderPokemonCards(currentArray) {
    for (let index = 0; index < currentArray.length; index++) {
        const pokeID = currentArray[index].pokeID;
        const name = currentArray[index].name;
        const types = currentArray[index].types;
        const type1 = types[0];
        let type2 = (types.length == 2) ? types[1] : type1;
        
        document.getElementById('#PokemonList').innerHTML += 
            await templatePokemonCard (pokeID, name, type1, type2)

        for (let indexType = 0; indexType < types.length; indexType++) {
            document.getElementById(`#Types${pokeID}`).innerHTML += 
            templatePokemonTypes(types[indexType]);
        };
    };
}

function renderLoadMoreButton() {
    document.getElementById('#LoadMoreButton').innerHTML = templateLoadMoreButton();
}

function removeLoadMoreButton() {
    document.getElementById('#LoadMoreButton').innerHTML = "";
}

async function loadMorePokemon() {
    const missingAmount = MAX_AMOUNT - pokemonDataArray.length;
    await removeLoadMoreButton();
    
    if (LOADING_AMOUNT < missingAmount) {
        await getPokemonIdNameType(pokemonDataArray.length+1);
        await renderPokemonCards(pokemonDataArray.slice(-LOADING_AMOUNT));
        await renderLoadMoreButton();
    } else {
        await getPokemonIdNameType(pokemonDataArray.length+1);
        await renderPokemonCards(pokemonDataArray.slice(-missingAmount));
    }
    
}