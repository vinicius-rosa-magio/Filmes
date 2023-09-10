
import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

function Favoritos() {

    const [filmes, setFilmes] = useState([])

   
    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])


    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((filme) => {
            return(filme.id !== id)
        })
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeFlix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!");
    }



    return (
        <div className="meus-filmes">
            <h1>Meus filmes</h1>
                {filmes.length === 0 && <span>Você não tem nem um filme salvo :(</span>}
            <ul>
                {filmes.map((filme) => { 
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`} >Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)} className="btn">Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;