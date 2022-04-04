import React from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ArticleView.css'

import { ArticleViewProps } from "./ArticleView.type";
import { formataData } from "../../helpers/date";

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  // autor,
  dataPublicacao,
  nome
}) => {
  const mdParser = new MarkdownIt();
  return (
    <>
      <header className="flex flex-row gap-3 items-center ml-20">
        <img src={ nome.autor?.avatar } className="rounded-full" style={{ width: '50px', height: '50px' }} />
        <div className="block">
          <div>{ nome.autor?.nome }</div>
          <div className="text-sm text-gray-500">
            { formataData(dataPublicacao) } · {/* { tempoLeitura } */} 7min de leitura
          </div>
        </div>
      </header>
      <MdEditor className="flex flex-row gap-3 items-center ml-20"
        style={{ height: '100%' }}
        renderHTML={text => mdParser.render(text)}
        readOnly
        view={{ md: false, menu: false, html: true }}
        value={ nome.conteudo }
      />
    </>
  );
};
