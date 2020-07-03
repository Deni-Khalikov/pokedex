//https://pokeapi.co/api/v2/evolution-chain/1 id = 1
const globals = {
    currentId : null,
    currentName : null,
    count : 807,
    evoChain : []
}
const fetchPoke = pokeName => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            showInfo(data.sprites.front_default, data.weight, data.height, data.id, data.types, data.name)
            showRandomMoves(data.moves)
        })
}
const showInfo = (sprite, weight, height, id, types, name) => {
    globals.currentId = id;
    globals.currentName = name;
    let typeOne = document.getElementsByClassName("poke-type-one")[0];
    let typeTwo = document.getElementsByClassName("poke-type-two")[0];
    if(types.length !== 1){
        typeTwo.className = "poke-type-two " + types[1].type.name;
        typeTwo.title = types[1].type.name;
    } else typeTwo.className = "poke-type-two hide"
    typeOne.className = "poke-type-one " + types[0].type.name;
    typeOne.title = types[0].type.name;
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

const showRandomMoves = (moves) => {
    const rightScreen = document.getElementsByClassName("moves")[0];
    rightScreen.innerHTML = "";
    rightScreen.innerHTML += `<ol></ol>`
    for (let i = 0; i < 4; i++) {
        if(moves.length === 0) return;
        let move = moves.splice(Math.floor(Math.random() * moves.length))
        console.log(move[0].move.name)
        rightScreen.firstChild.innerHTML += `<li>${move[0].move.name}</li>`
    }
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
            showInfo(data.sprites.front_default, data.weight, data.height, data.id, data.types, data.name)
            showRandomMoves(data.moves)
            console.log(data)
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    let url = data.evolution_chain.url
                    evolutions(url, data.name)
                })
        })

}

const showRandomPokemon = () => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${Math.floor(Math.random() * globals.count/*id*/)}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    let url = data.evolution_chain.url
                    fetchPoke(data.name)
                    evolutions(url, data.name)
                })
}
const showPrevious = () => {
    console.log(globals.currentId)
    if(globals.currentId === 1) return;
    let id = --globals.currentId;
    fetchPoke(id)
}

const showNext = () => {
    if(globals.currentId === globals.count) return;
    let id = ++globals.currentId;
    fetchPoke(id)

}

const evolutions = (url, poke) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            globals.evoChain = [];
            globals.evoChain.push(data.chain.species.name)
            let chainBase = data.chain.evolves_to;
            if(chainBase.length === 0) {
                handleEvolutions()
                return;
            }
            if(chainBase.length === 1){
                globals.evoChain.push(chainBase[0].species.name)
                console.log(globals.evoChain)
            }
            if(chainBase[0].evolves_to.length === 1){
                globals.evoChain.push(chainBase[0].evolves_to[0].species.name)
                //console.log(globals.evoChain)
            }
            if(chainBase.length > 1){
                let firstEvoArr = []
                for (let i = 0; i < chainBase.length; i++) {
                    firstEvoArr.push(chainBase[i].species.name)
                }
                globals.evoChain.push(firstEvoArr)
                console.log(globals.evoChain)
            }
            if(chainBase[0].evolves_to.length > 1){
                let secondEvoArr = [];
                for (let i = 0; i < chainBase[0].evolves_to.length; i++) {
                    secondEvoArr.push(chainBase[0].evolves_to[i].species.name)
                }
                globals.evoChain.push(secondEvoArr)
                console.log(globals.evoChain)
            }
            handleEvolutions()
        })
}
const handleEvolutions = () => {
    const evoDiv = document.getElementsByClassName("evolutions")[0];
    evoDiv.innerHTML = ""
    console.log(globals.evoChain)
    fetch(`https://pokeapi.co/api/v2/pokemon/${globals.evoChain[0]}`)
        .then(res => res.json())
        .then(data => {
            evoDiv.innerHTML += `<img src="${data.sprites.front_default}"/>`
            if(globals.evoChain.length >= 1) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${globals.evoChain[1]}`)
                    .then(res => res.json())
                    .then(data => {
                        evoDiv.innerHTML += `<img src="${data.sprites.front_default}"/>`
                        if(globals.evoChain.length > 1) {
                            fetch(`https://pokeapi.co/api/v2/pokemon/${globals.evoChain[2]}`)
                                .then(res => res.json())
                                .then(data => {
                                    evoDiv.innerHTML += `<img src="${data.sprites.front_default}"/>`
                                })
                        }
                    })
            }
        })
}

document.getElementById("temp").addEventListener("click", getPokemon);
document.getElementById("search").addEventListener("click", showSearch);
document.getElementById("random").addEventListener("click", showRandomPokemon);
document.getElementById("previous").addEventListener("click", showPrevious);
document.getElementById("next").addEventListener("click", showNext);
/*
document.getElementById("next-evo-button").addEventListener("")
document.getElementById("prev-evo-button").addEventListener("")*/
