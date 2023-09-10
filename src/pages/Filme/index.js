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

  // pegando o filme que foi clicado.
  useEffect(() => {
    async function loadFilme() {
      //A função await é usada para esperar até que a chamada à API seja concluída antes de continuar a execução do código.
      //api.get(...): Isso representa uma chamada HTTP GET para o endpoint 
      //movie/${id} da API. O objeto de configuração passado como segundo argumento contém os parâmetros da requisição, como a chave da API e o idioma desejado.
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "12e934c2bf958467e1903fc2a5af0852",
          language: "pt-BR",
        }
      })
        // se for verdadeiro abri o filme 
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })

        // se for falso da um aviso 
        .catch(() => {
          console.log("fime não encontrado")
          navigate("/", { replace: true })
          return;
        })
    }

    loadFilme(); //Aqui, a função loadFilme é chamada para efetivamente fazer a chamada à API quando o componente é montado.


    return () => {
      console.log("componente foi desmontado")
    }

  }, [navigate, id])

  // salvando em localstorge
  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmesSalvos = JSON.parse(minhaLista) || []; // ||significa ou 

    // verificando se o filme ja esta salvo 
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if (hasFilme) {
      toast.warn("Esse filme ja esta na sua lista!")
      return;
    }

    // se não tiver salvo, salvar ele na lista. primeiro verifica se esta lista, se não tiver salvar.
    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")

  }

  // loading mesma coisa que o home.
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  // todas as informações são pegas na propria api
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