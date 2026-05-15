const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const MAX_AMOUNT = 1025;
let loadingAmount = 20;
const pokemonIdArray = [];
const pokemonDataFetched = {};
const pokemonImageCache = {};

async function init() {
    await getPokemonsIdNameType(start=1, loadingAmount);
    await renderPokemonCards(pokemonIdArray);
    await renderLoadMoreButton(loadingAmount);
}

async function getPokemonsIdNameType(start, end) {
    for (let pokeID = start; (pokeID < (start + end)) && (pokeID <= MAX_AMOUNT); pokeID++) {
        await getOnePokemonIdNameType(pokeID);
    };
}

async function getOnePokemonIdNameType(pokeID) {
    const response = await fetch(`${BASE_URL}/${pokeID}`);
    const responseToJson = await response.json();       
    const types = [];

    for (let indexType = 0; indexType < responseToJson.types.length; indexType++) {
        types.push(responseToJson.types[indexType].type.name);
    }
    pokemonIdArray.push(pokeID);
    pokemonDataFetched[pokeID] = {
        name : responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1),
        types : types
    };
}

async function renderPokemonCards(currentArray) {
    for (let index = 0; index < currentArray.length; index++) {
        const pokeID = currentArray[index];
        await renderOnePokemonCard(pokeID);
    };
}

async function renderOnePokemonCard(pokeID) {
    const name = pokemonDataFetched[pokeID].name;
    const types = pokemonDataFetched[pokeID].types;
    const type1 = types[0];
    let type2 = (types.length == 2) ? types[1] : type1;
    const pokeImage = await pushPokemonImageToCache(pokeID, name, type1, type2);
    
    document.getElementById('#PokemonList').innerHTML += await templatePokemonCard (pokeID, name);
    document.getElementById(`#Image${pokeID}`).appendChild(pokeImage);
    await renderPokemonTypes(pokeID, types, '#Types');
}

function renderPokemonTypes(pokeID, types, typesID) {
    for (let indexType = 0; indexType < types.length; indexType++) {
        document.getElementById(`${typesID}${pokeID}`).innerHTML += templatePokemonTypes(types[indexType]);
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
    await removeLoadMoreButton();
    const missingAmount = MAX_AMOUNT - pokemonIdArray.length;
    const loading = (loadingAmount < missingAmount) ? loadingAmount : missingAmount;
    await checkForLoadingGap(loading);
    await checkForLoadMoreButton();
}

async function checkForLoadingGap(loading) {
    await pokemonIdArray.sort((a, b) => a-b);
    if (pokemonIdArray[pokemonIdArray.length-1] == pokemonIdArray.length) {
        await getPokemonsIdNameType(pokemonIdArray.length+1, loading);
        await renderPokemonCards(pokemonIdArray.slice(-loading));
        return;
    };
    for (let index = 1; index < pokemonIdArray.length; index++) {
        const gap = pokemonIdArray[index] - pokemonIdArray[index-1];
        if (gap == 1) {
            continue;
        };
        if (gap > 1 && gap > loading) {
            await getPokemonsIdNameType(pokemonIdArray[index-1]+1, loading);
            await renderPokemonCards(pokemonIdArray.slice(-loading));
            return;
        };
        if (gap > 1 && gap < loading) {
            const missingLoading = loading - gap;
            await getPokemonsIdNameType(pokemonIdArray[index-1] + 1, gap-1);
            await renderPokemonCards(pokemonIdArray.slice(-(gap-1)));
            checkForLoadingGap(missingLoading);
            return;
        };
    };
}

function checkForLoadMoreButton() {
    (pokemonIdArray.length < MAX_AMOUNT) ? renderLoadMoreButton(loadingAmount) : renderMessageMaxAmount();
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
    checkForLoadMoreButton();
}

function pressKeyEnter(event) {
    let key = event.key;
    if (key == "Enter") {
        changeLoadingAmount();
    };
}

function showDialog(pokeID) {
    document.getElementById('#Dialog').showModal();
    renderPokemonOverlay(pokeID, '#TypesOverlay');
}

async function renderPokemonOverlay(pokeID) {
    const name = pokemonDataFetched[pokeID].name;
    const types = pokemonDataFetched[pokeID].types;
    const type1 = types[0];
    let type2 = (types.length == 2) ? types[1] : type1;

    document.getElementById('#PokemonOverlay').innerHTML = await templatePokemonOverlay(pokeID, name, type1, type2);
    await renderPokemonTypes(pokeID, types, '#TypesOverlay');
}

async function renderPreviousPokemonOverlay(pokeID) {
    if (pokeID == 1) {
        if (!pokemonIdArray.includes(MAX_AMOUNT)) {
            await getOnePokemonIdNameType(MAX_AMOUNT);
            await renderOnePokemonCard(MAX_AMOUNT);
        };
        await renderPokemonOverlay(MAX_AMOUNT);
        return;
    };
    const previousPokeID = pokeID - 1;
    if (!pokemonIdArray.includes(previousPokeID)) {
        await getOnePokemonIdNameType(previousPokeID);
        await renderOnePokemonCard(previousPokeID);
    };
    await renderPokemonOverlay(previousPokeID);
}

async function renderNextPokemonOverlay(pokeID) {
    if (pokeID == MAX_AMOUNT) {
        await renderPokemonOverlay(1);
        return;
    };
    const nextPokeID = pokeID + 1;
    if (!pokemonIdArray.includes(nextPokeID)) {
        await getOnePokemonIdNameType(nextPokeID);
        await renderOnePokemonCard(nextPokeID);
    };
    await renderPokemonOverlay(nextPokeID);
}

function closeDialog() {
    document.getElementById('#Dialog').close();
}