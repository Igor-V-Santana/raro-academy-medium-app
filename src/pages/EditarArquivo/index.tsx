import { ArticleForm } from "../../components/ArticleForm";
import apiClient from '../../services/api-client'
import { useState, useEffect } from "react";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EditarArquivoPage = () => {

  const navigate = useNavigate();
  const [ artigo, setArtigo ] = useState<ArticleThumbnailProps>();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      buscarArtigo();
    }
  }, [id]);

  async function buscarArtigo() {
      const response = await apiClient.get<ArticleThumbnailProps>(
      `/artigos/${id}`
    );
    setArtigo(response.data);
  }

  const handleSubmit = async (artigo: ArticleThumbnailProps) => {
    if (artigo.id) {
      const response = await apiClient.patch(
        `/artigos/${artigo.id}`, {
          "titulo": artigo.titulo,
          "imagem": artigo.imagem,
          "resumo": artigo.resumo,
          "conteudo": artigo.conteudo,
        }
      )
      navigate(`/artigos`);

    } else {
      const response = await apiClient.post(
        `/artigos`, {
          "titulo": artigo.titulo,
          "imagem": artigo.imagem,
          "resumo": artigo.resumo,
          "conteudo": artigo.conteudo,
        }
      )
      navigate(`/artigos`);
    }
  }

  return (
    <>
      <div className="items-center justify-center m-10">
        <ArticleForm article={artigo} onSubmit={ handleSubmit }/>
      </div>
    </>
  );
};