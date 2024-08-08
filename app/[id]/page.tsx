// app/[id]/page.tsx
import { notFound } from 'next/navigation';
import axios from 'axios';
import { ParsedQiitaItem, QiitaItemResponse } from "@/app/types";
import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';
import 'highlight.js/styles/github.css';

type Props = {
  params: {
    id: string;
  };
};

const getQiitaItem = async (id: string): Promise<ParsedQiitaItem | null> => {
  try {
    const apiUrl = `https://qiita.com/api/v2/items/${id}`;
    const res = await axios.get<QiitaItemResponse>(apiUrl);

    const jsdom = new JSDOM(res.data.rendered_body);
    const { document } = jsdom.window;
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });

    return {
      ...res.data,
      rendered_body: document.body.innerHTML,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const QiitaItemPage = async ({ params }: Props) => {
  const { id } = params;
  const qiitaItem = await getQiitaItem(id);

  if (!qiitaItem) {
    notFound();
  }

  return (
    <div>
      <h1 className='font-semibold text-2xl mb-6'>{qiitaItem.title}</h1>
      <div
        className='break-all mb-6'
        dangerouslySetInnerHTML={{ __html: qiitaItem.rendered_body }}
      />
      <a href={qiitaItem.url} target="_blank" rel="noreferrer">元のQiitaページを見る</a>
    </div>
  );
};

export default QiitaItemPage;
