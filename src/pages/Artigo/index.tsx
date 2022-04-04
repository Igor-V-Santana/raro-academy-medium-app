import faker from "@faker-js/faker";
import axios from "axios";
import { useState, useEffect } from "react";
import { ArticleView } from "../../components/ArticleView";
import { useParams } from "react-router-dom";

export const ArtigoPage = () => {
  const [article, setArticle] = useState<string>('');
  // const [autor] = useState({
  //   nome: faker.name.firstName(),
  //   avatar: faker.image.avatar(),
  // });
  const [dataPublicacao] = useState(new Date());

  useEffect(() => {
    async function loadArticle() {
      // este article.md precisa ser adicionado, temporariamente ao nosso código. Podemos copiar este conteúdo dentro da nossa pasta /public.
      // sugiro que você retire este documento de `src/stories/assets/markdown/article.md`
      const response = await fetch('/article.md');
      const article = await response.text();
      setArticle(article);
    }
    
    loadArticle();
    teste();
  }, []);

  const [nome, setNome] = useState([])
  const [conteudo, setConteudo] = useState('')
  const { id } = useParams();

  async function teste(){
    const response = await axios.get(`http://3.221.159.196:3307/artigos/${id}`);
    setNome(response.data);
    console.log(response.data);
  }

  return (
    <div className="m-10">
      <ArticleView
        article={article}
        // autor={autor}
        dataPublicacao={dataPublicacao}
        tempoLeitura={ '10min' }
        nome={nome}
      />
    </div>
  );
};