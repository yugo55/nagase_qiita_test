"use client";

import { useState, useEffect } from "react";
import { ParsedQiitaItem } from "@/app/types";
import { getQiitaItems } from "@/app/tools/getQiitaItems";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { formatDate } from "@/app/tools/formatDate";

type HomeProps = {
  generatedAt: string;
  qiitaItems: ParsedQiitaItem[];
  initialPage: number;
};

const Home = ({ generatedAt, qiitaItems, initialPage }: HomeProps) => {
  const [items, setItems] = useState<ParsedQiitaItem[]>(qiitaItems);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [searchDate, setSearchDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchQiitaItems = async () => {
      setLoading(true);
      const newItems = await getQiitaItems(
        page,
        searchText,
        apiKey,
        searchDate
      );
      setItems(newItems);
      setLoading(false);
    };
    fetchQiitaItems();
  }, [page, searchText, searchDate]);

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  return (
    <div>
      <SearchInput
        setSearchText={setSearchText}
        setApiKey={setApiKey}
        setSearchDate={setSearchDate}
      />
      <h1>更新日時: {generatedAt}</h1>
      {searchText && (
        <p className="text-2xl my-5">
          {searchText}
          {searchDate && (
            <span>
              ({searchDate.getFullYear()}/{searchDate.getMonth() + 1}/
              {searchDate.getDate()}以降の記事)
            </span>
          )}
          の検索結果
        </p>
      )}
      <div>
        {items.map(({ id, title, tags, created_at }) => (
          <div key={id} className="bg-white rounded-2xl box-content mb-5">
            <Link
              href={`../${id}`}
              passHref
              rel="noreferrer"
              className="flex flex-col h-full p-6"
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-xs text-gray-500">{formatDate(created_at)}</p>
              <ul className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <li
                    key={tag.name}
                    className="text-xs bg-gray-200 rounded-full px-2 py-1"
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-6">
        <button onClick={handlePreviousPage} disabled={page === 1 || loading}>
          前のページ
        </button>
        <span>{page}</span>
        <button onClick={handleNextPage} disabled={loading}>
          次のページ
        </button>
      </div>
    </div>
  );
};

export default Home;
