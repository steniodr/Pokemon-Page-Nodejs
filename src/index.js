const express = require('express');
const app = express();
const got = require('got');
const path = require('path');

//Configuration to use
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs');
app.use(express.static('../public'));
app.use(express.urlencoded ({ extended: false }))
app.use(express.json())

let pokemonsList = [];
let initialPokemons = [];

(async () =>{
    let rawData,
        pokemon,
        abilities,
        types,
        stats;

    let initialPokemonsNames = ['Bulbasaur', 'Charmander', 'Squirtle'];
    
    function capitalize(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    for(let i = 1; i <= 60; i++){
        rawData = await got(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemon = JSON.parse(rawData.body);
        abilities = pokemon.abilities.map(a => a.ability.name);
        types = pokemon.types.map(t => t.type.name);
        stats = {
            "hp": pokemon.stats[0].base_stat,
            "attack": pokemon.stats[1].base_stat,
            "defense": pokemon.stats[2].base_stat,
            "special-attack": pokemon.stats[3].base_stat,
            "special-defense": pokemon.stats[4].base_stat,
            "speed": pokemon.stats[5].base_stat,
            "base_experience": pokemon.base_experience
        }
        
        pokemonsList.push({
            "id": pokemon.id,
            "name": capitalize(pokemon.name),
            "img": pokemon.sprites.front_default,
            "abilities": abilities,
            "types": types,
            "height": pokemon.height,
            "weight": pokemon.weight,
            "stats": stats
        });

        if (initialPokemonsNames.includes(capitalize(pokemon.name))) {
            initialPokemons.push({
                "id": pokemon.id,
                "name": capitalize(pokemon.name),
                "img": pokemon.sprites.front_default,
                "abilities": abilities,
                "types": types,
                "height": pokemon.height,
                "weight": pokemon.weight,
                "stats": stats
            });
        }
    }
})();

//Routes
var title;
app.get('/', (req, res) => {
    title = 'Pokedex!';
    res.render('home', {title: title, initialPokemons: initialPokemons})
});

app.get('/card', (req, res) => {
    title = 'Card Test';
    res.render('card', {title: title, pokemons: pokemonsList, initialPokemons: initialPokemons})
})

// Server Running
app.listen(8080, ()=>{console.log('Server running in port 8080.')})