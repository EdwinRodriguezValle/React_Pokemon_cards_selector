import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/logo.jpeg';
import './App.css';
import Button from "./components/button/Button";
import Pokemon from "./components/cartas/Cartas";

function App() {
    const [api, setApi] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [poke, setPoke] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setCargando(true);
            setError(false);

            try {
                const { data } = await axios.get(api);
                setPoke(data);
            } catch(e) {
                console.error(e);
                setError(true);
            }

           setCargando(false);
        }

        fetchData();
    }, [api]);

    return (
        <div className="contendor_poke_cartas">
            {poke &&
                <>
                    <img alt="logo" width="200px" src={logo} className="logo" />
                    <section className="barra_menu">
                        
                        <Button
                            disabled={!poke.previous}
                            clickHandler={() => setApi(poke.previous)}
                        >
                            Vorige
                        </Button>
                        <Button
                            disabled={!poke.next}
                            clickHandler={() => setApi(poke.next)}
                        >
                            Volgende
                        </Button>
                    </section>
                    {poke.results && poke.results.map((poke) => {
                        return <Pokemon key={poke.name} api={poke.url} />
                    })}
                </>
            }
            {cargando && <p>Cargando...</p>}
            {error && <p>No se puede acceder a los datos...</p>}
        </div>
    );
}

export default App;
