import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

import "./filme.css";

import api from "../../service/api";

function Filme() {

  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "12e934c2bf958467e1903fc2a5af0852",
          language: "pt-BR",
        }
      })
        
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })

        
        .catch(() => {
          console.log("fime não encontrado")
          navigate("/", { replace: true })
          return;
        })
    }

    loadFilme();


    return () => {
      console.log("componente foi desmontado")
    }

  }, [navigate, id])

  
  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmesSalvos = JSON.parse(minhaLista) || []; // ||significa ou 

   
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if (hasFilme) {
      toast.warn("Esse filme ja esta na sua lista!")
      return;
    }

    
    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")

  }

 
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-btn">
        <button onClick={salvarFilme} >Salvar</button>

        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}Trailer`}> Trailer</a>
        </button>

      </div>
    </div>
  )
}

export default Filme;