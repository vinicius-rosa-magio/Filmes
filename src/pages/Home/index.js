import { useEffect, useState } from "react";
import api from "../../service/api";
import { Link } from "react-router-dom"

import "./home.css";



function Home() {

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    // useEfedect ele faz que sempre que o usuario entra no site ele recarregar e busca algo
    // nesse caso estamos fazendo uma requisição em uma api
    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "12e934c2bf958467e1903fc2a5af0852",
                    language: "pt-BR",
                    page: 1,
                }
            })
            // console.log(response.data.results.slice(0, 10)); // esse results slice ele só vai pegar 10 resultados. essa api tem 20

            setFilmes(response.data.results.slice(0, 20))
            setLoading(false);
        }

        loadFilmes();

    }, [])

    // esse loading é para mostra para o usuario que a pagina esta carregando quando a internet for lenta.
    // o loading começa com true depois que carregar a pagina ela buscar toda a api no useeffect é só da um setLoading (false)
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

                {/* nesse codigo, estamos dando um map, isso significa que ele vai pecorre toda a lista vai mapear.
                o key nos temos que sempre que dar, nesse caso todos os filmes tem um id, por isso key=filmes.id */}
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            {/* na img quando o caminho esta pela metade fazer esse http primeiro e depois busca a imagem com 
                            forme esta na api, nesse caso a img esta escripo poster)path */}
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