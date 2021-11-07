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
let maxValues = {
    "max-hp": 0,
    "max-attack": 0,
    "max-defense": 0,
    "max-special-attack": 0,
    "max-special-defense": 0,
    "max-speed": 0,
};

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

        if (stats['hp'] > maxValues['max-hp'])                          maxValues['max-hp'] = stats['hp'];
        if (stats['attack'] > maxValues['max-attack'])                  maxValues['max-attack'] = stats['attack'];
        if (stats['defense'] > maxValues['max-defense'])                maxValues['max-defense'] = stats['defense'];
        if (stats['special-attack'] > maxValues['max-special-attack'])  maxValues['max-special-attack'] = stats['special-attack'];
        if (stats['special-defense'] > maxValues['special-defense'])    maxValues['special-defense'] = stats['special-defense'];
        if (stats['speed'] > maxValues['max-speed'])                    maxValues['max-speed'] = stats['speed'];

        if (initialPokemonsNames.includes(pokemon.name)) initialPokemons.push(pokemon);
    }
})();

//Routes
var title;
app.get('/', (req, res) => {
    title = 'Pokedex!';
    res.render('home', {title: title})
});

app.get('/card', (req, res) => {
    title = 'Card Test';
    res.render('card', {title: title, pokemons: pokemonsList, initialPokemons: initialPokemons, maxValues: maxValues})
})

// Server Running
app.listen(8080, ()=>{console.log('Server running in port 8080.')})