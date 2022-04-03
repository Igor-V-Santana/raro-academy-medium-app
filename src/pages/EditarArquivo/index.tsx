import { ArticleForm } from "../../components/ArticleForm";
import apiClient from '../../services/api-client'
import { useState, useEffect } from "react";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import { useParams } from "react-router-dom";
import axios from "axios";

export const EditarArquivoPage = () => {

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

  // async function editarArtigo() {
  //   const token = localStorage.getItem("access_token");
  //   const r = await axios.get<ArticleThumbnailProps>(
  //     `http://3.221.159.196:3307/artigos/24`,
  //     {
  //       headers: {
  //         Authorization : `bearer ${token}`
  //       },
  //        data: {
  //         "titulo": "aaaa",
  //         "imagem": "",
  //         "resumo": "",
  //         "conteudo": ""
  //       }
  //     }
  //   );
  //   console.log(r.data)
  // }

  // useEffect(() => {
  //   editarArtigo()
  // },[])


  const handleSubmit = async (artigo: ArticleThumbnailProps) => {
    const token = localStorage.getItem("access_token");
    if (artigo.id) {
      console.log('=====> devo atualizar o artigo');
      
      const abcde = await axios.patch(
        `http://3.221.159.196:3307/artigos/${id}`, {
          headers: {
            Authorization: `bearer ${token}`
          }, data: {
            titulo: artigo.titulo,
            imagem: artigo.imagem,
            resumo: artigo.resumo,
            conteudo: artigo.conteudo,
          }
        })
    } else {
      console.log('=====> devo criar um novo artigo');
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <>
      <div className="items-center justify-center m-10">
        <ArticleForm article={artigo} onSubmit={ handleSubmit }/>
      </div>
    </>
  );
};