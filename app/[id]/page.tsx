import { notFound } from "next/navigation";
import axios from "axios";
import { ParsedQiitaItem, QiitaItemResponse } from "@/app/types";
import Link from "next/link";
import { formatDate } from "@/app/tools/formatDate";

type Props = {
  params: {
    id: string;
    searchText?: string;
  };
};

const getQiitaItem = async (id: string): Promise<ParsedQiitaItem | null> => {
  try {
    const apiUrl = `https://qiita.com/api/v2/items/${id}`;
    const res = await axios.get<QiitaItemResponse>(apiUrl);
    
    return {
      ...res.data,
      rendered_body: res.data.rendered_body,
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
      <div className="my-6">
        <Link href={"/"}>
          <button className="h-8 w-24 rounded-full bg-green-400">戻る</button>
        </Link>
      </div>
      <h1 className="font-semibold text-2xl">{qiitaItem.title}</h1>
      <p className="text-sm text-gray-500">{formatDate(qiitaItem.created_at)}</p>
      <ul className="flex flex-wrap gap-2 mt-2 mb-6">
        {qiitaItem.tags.map((tag) => (
          <li
            key={tag.name}
            className="text-xs bg-gray-400 rounded-full px-2 py-1"
          >
            {tag.name}
          </li>
        ))}
      </ul>
      <div
        className="break-all mb-6"
        dangerouslySetInnerHTML={{ __html: qiitaItem.rendered_body }}
      />
      <a href={qiitaItem.url} target="_blank" rel="noreferrer">
        元のQiitaページを見る
      </a>
    </div>
  );
};

export default QiitaItemPage;
