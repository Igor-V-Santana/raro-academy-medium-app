import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import { geraArtigos } from "../../stories/helpers/gerador-artigos";
import apiClient from '../../services/api-client';

export const ArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);

  useEffect(() => {
    artigos()
  }, []);

  async function artigos() {
    const responsee = await apiClient.get(
      `/artigos`
    )
    setArticles(responsee.data)
  }

  return (
    <div className="my-30">
      <ArticleList
        articles={articles}
      />
    </div>
  );
};