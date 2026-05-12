const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const MAX_AMOUNT = 1025;
let loadingAmount = 20;
const pokemonDataArray = [];
const pokemonImageCache = {};

async function init() {
    await getPokemonIdNameType(start=1);
    await renderPokemonCards(pokemonDataArray);
    await renderLoadMoreButton(loadingAmount);
}

async function getPokemonIdNameType(start) {
    for (let id = start; (id < (start + loadingAmount)) && (id <= MAX_AMOUNT); id++) {
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
        const pokeImage = await pushPokemonImageToCache(pokeID, name, type1, type2);
        
        document.getElementById('#PokemonList').innerHTML += await templatePokemonCard (pokeID, name, type1, type2);
        document.getElementById(`#Image${pokeID}`).appendChild(pokeImage);

        for (let indexType = 0; indexType < types.length; indexType++) {
            document.getElementById(`#Types${pokeID}`).innerHTML += templatePokemonTypes(types[indexType]);
        };
    };
}

function pushPokemonImageToCache(pokeID, name, type1, type2) {
    return new Promise((resolve, reject) => {
        if (pokemonImageCache[pokeID]) {
            resolve(pokemonImageCache[pokeID]);
            return;
        }

        const img = new Image();
        img.role = `button`;
        img.style = `background: linear-gradient(to right top, var(--${type1}) 0 40%, var(--${type2}) 60% 100%)`;
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`;
        img.alt = `${name}`;
        img.onload = () => {
            pokemonImageCache[pokeID] = img;
            resolve(img);
        };

        img.onerror = reject;
    });
}

async function loadMorePokemon() {
    const missingAmount = MAX_AMOUNT - pokemonDataArray.length;
    await removeLoadMoreButton();
    
    if (loadingAmount < missingAmount) {
        await getPokemonIdNameType(pokemonDataArray.length+1);
        await renderPokemonCards(pokemonDataArray.slice(-loadingAmount));
        await renderLoadMoreButton(loadingAmount);
    } else {
        await getPokemonIdNameType(pokemonDataArray.length+1);
        await renderPokemonCards(pokemonDataArray.slice(-missingAmount));
        await renderMessageMaxAmount();
    };
}

function renderLoadMoreButton(loadingAmount) {
    document.getElementById('#LoadMoreButton').innerHTML = 
        templateLoadMoreButton(loadingAmount);
}

function removeLoadMoreButton() {
    document.getElementById('#LoadMoreButton').innerHTML = "";
}

function renderMessageMaxAmount() {
    document.getElementById('#LoadMoreButton').innerHTML = 
        `You have already loaded all ${MAX_AMOUNT} Pokémon.`;
}

function changeLoadingAmount() {
    loadingAmount = parseInt(document.getElementById('#LoadingAmount').value);
    (pokemonDataArray.length < MAX_AMOUNT) ? renderLoadMoreButton(loadingAmount) : renderMessageMaxAmount();
}

function pressKeyEnter(event) {
    let key = event.key;
    if (key == "Enter") {
        changeLoadingAmount();
    };
}

function showDialog(pokeID, name, type1, type2) {
    document.getElementById('#Dialog').showModal();
    renderPokemonOverlay(pokeID, name, type1, type2);
}

function renderPokemonOverlay(pokeID, name, type1, type2) {
    
    document.getElementById('#PokemonOverlay').innerHTML = templatePokemonOverlay(pokeID, name, type1, type2);
    document.getElementById(`#TypesOverlay${pokeID}`).innerHTML = templatePokemonTypes(type1);
    if (type1 != type2) {
        document.getElementById(`#TypesOverlay${pokeID}`).innerHTML += templatePokemonTypes(type2);
    }
}

function renderPreviousPokemonOverlay(pokeID, name, type1, type2) {
    renderPokemonOverlay(pokeID-1, name, type1, type2);
}

function renderNextPokemonOverlay(pokeID, name, type1, type2) {
    renderPokemonOverlay(pokeID+1, name, type1, type2);
}

function closeDialog() {
    document.getElementById('#Dialog').close();
}