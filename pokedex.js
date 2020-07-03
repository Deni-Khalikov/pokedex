//https://pokeapi.co/api/v2/evolution-chain/1 id = 1
const globals = {
    currentId : null,
}
const fetchPoke = pokeName => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.sprites)
            showInfo(data.sprites.front_default, data.weight, data.height, data.id, data.types, data.name)
        })
}
const showInfo = (sprite, weight, height, id, types, name) => {
    globals.currentId = id;
    globals.currentId = name;
    let typeOne = document.getElementsByClassName("poke-type-one")[0];
    let typeTwo = document.getElementsByClassName("poke-type-two")[0];
    console.log(types)
    if(types.length !== 1){
        typeTwo.className = "poke-type-two " + types[1].type.name;
        typeTwo.title = types[1].type.name;
    } else typeTwo.className = "poke-type-two hide"
    typeOne.className = "poke-type-one " + types[0].type.name;
    typeOne.title = types[0].type.name;
    console.log(globals.currentId)
    document.getElementsByClassName("poke-id")[0].innerHTML = "ID: " + id;
    document.getElementsByClassName("poke-name")[0].innerHTML = name.replace(name[0], name[0].toUpperCase());
    document.getElementsByClassName("hide")[0].style.display = "block";
    document.getElementsByClassName("screen_image")[0].children[0].src = sprite;
    document.getElementsByClassName("screen_image")[0].children[1].src = sprite.replace("pokemon", "pokemon/back");
    document.getElementsByClassName("poke-weight")[0].innerHTML = weight + "lb";
    document.getElementsByClassName("poke-height")[0].innerHTML = height + "ft";
}

const showSearch = () => {
    document.getElementById("hidden").style.display = "block";
}

const getPokemon = () => {
    let input = document.getElementById("input");
    if(input.value.length === 0) return;
    let pokeName = input.value.toLowerCase();
    input.value = "";

    document.getElementById("hidden").style.display = "none";
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showInfo(data.sprites.front_default, data.weight, data.height, data.id, data.types, data.name)
        })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

const showRandomPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(response => response.json())
        .then(data => {
            let id = data.count;
            return id;
        })
        .then(id => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${Math.floor(Math.random() * id)}`)
                .then(response => response.json())
                .then(data => {
                    fetchPoke(data.name)
                })
        })
}
const showPrevious = () => {
    console.log("prev")
}

const showNext = () => {
    console.log("next")
}

const evolutions = () => {
    fetch(`https://pokeapi.co/api/v2/evolution-chain/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

document.getElementById("temp").addEventListener("click", getPokemon);
document.getElementById("search").addEventListener("click", showSearch);
document.getElementById("random").addEventListener("click", showRandomPokemon);
document.getElementById("previous").addEventListener("click", showPrevious);
document.getElementById("next").addEventListener("click", showNext);