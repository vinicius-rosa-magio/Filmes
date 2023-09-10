import { useEffect, useState } from "react";
import api from "../../service/api";
import { Link } from "react-router-dom"
import "./home.css";

function Home() {

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "12e934c2bf958467e1903fc2a5af0852",
                    language: "pt-BR",
                    page: 1,
                }
            })
           

            setFilmes(response.data.results.slice(0, 20))
            setLoading(false);
        }

        loadFilmes();

    }, [])

   
    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">

                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            
                            <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>

                        </article>
                    )
                })}
            </div>
        </div>

    )
}

export default Home;