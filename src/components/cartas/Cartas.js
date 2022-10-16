import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cartas.css';

function Pokemon({ api }) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        console.log(api);
        async function fetchData() {
            try {
                const { data } = await axios.get(api);
                setPokemon(data);
            } catch(e) {
                console.error(e);
            }
        }

        fetchData();
    }, [api]);


    return (
        <section className="poke-card">
            {pokemon &&
                <>
                    <h2>{pokemon.name}</h2>
                    <img
                        alt="Afbeelding pokémon"
                        src={pokemon.sprites.front_default}
                    />
                    <p><strong>Moves: </strong>{pokemon.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemon.weight}</p>
                    <p><strong>Abilities: </strong></p>
                    <ul>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name}-${pokemon.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
        </section>
    );
}

export default Pokemon;