import { Button } from "../Button";
import { Input } from "../Input";
import { useState, useEffect } from "react";
import { ArticleThumbnailProps } from "../ArticleThumbnail/ArticleThumbnail.types";
import { RitchTextEditor } from "../RitchTextEditor";
import apiClient from "../../services/api-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ArticleFormProps = {
  article?: ArticleThumbnailProps;
  // adicionamos uma propriedade de onSubmit, a ser disparada quando o usuário enviar o form.
  onSubmit?: (article: ArticleThumbnailProps) => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit
}) => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [imagem, setImagem] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    if (article) {
      setTitulo(article.titulo);
      setResumo(article.resumo);
      setImagem(article.imagem);
      setConteudo(article.conteudo || '');
    }
  }, [article]);


  // criamos um novo evento para este componente: sempre que o usuário 
  // fizer o submit do form, vamos enviar para o componente pai o artigo
  // que deve ser submetido.
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const articleToSubmit = {
        ...article,
        titulo,
        resumo,
        imagem,
        conteudo,
      };
      onSubmit(articleToSubmit as ArticleThumbnailProps)
    } 
  }

  const transformaImagemEmBase64 = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImagem(event.target.result);
    };
  };

  const navigate = useNavigate();

  const deletarArtigo = async() =>{
    const id = article?.id
    const response = await apiClient.delete(`/artigos/${id}`);
    navigate('/artigos')
  }

  const backPage = () => {
    navigate('/artigos')
  }

  return (
    <div className="grid min-h-screen mx-10 ">
      <div>
        <h1 className="text-xl font-semibold">
          Hello there 👋,&nbsp;
          <span className="font-normal">please fill in your information to continue</span>
        </h1>
        {/* adicionamos aqui o evento de submit. */}
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Adicionamos o estado e o evento de alteração em todos os campos. */}
          <Input
            placeholder="Digite aqui o título"
            type="text"
            name="titulo"
            label="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Input
            placeholder="Breve rewsumo do artigo"
            type="textarea"
            name="resumo"
            label="Resumo"
            value={ resumo }
            onChange={(e) => setResumo(e.target.value)}
            required
          />

          <Input
            placeholder="Breve rewsumo do artigo"
            type="file"
            name="image"
            label="Banner"
            onChange={transformaImagemEmBase64}
            required
          />

          <RitchTextEditor
            label="Conteúdo"
            name="conteudo"
            value={ conteudo }
            onChange={ setConteudo }
          />

          <div className="flex flex-row items-center gap-10">
            <Button type="submit">Salvar</Button>
            <button onClick={backPage} className="btnBack">Voltar</button>
            <button onClick={deletarArtigo} className="btnDelete">Deletar</button>
          </div>
        </form>
      </div>
    </div>
  );
};