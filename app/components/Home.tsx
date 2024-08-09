'use client';

import { useState, useEffect } from "react";
import { ParsedQiitaItem } from "@/app/types";
import { getQiitaItems } from "@/app/tools/getQiitaItems";
import Link from 'next/link';
import SearchInput from './SearchInput';

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

  useEffect(() => {
    const fetchQiitaItems = async () => {
      setLoading(true);
      const newItems = await getQiitaItems(page, searchText);
      setItems(newItems);
      setLoading(false);
    };
    fetchQiitaItems();
  }, [page, searchText]);

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  return (
    <div>
      <SearchInput setSearchText={setSearchText} />
      <h1>更新日時: {generatedAt}</h1>
      <div>
        {items.map(({ id, title }) => (
          <div key={id} className="h-14 bg-white rounded-2xl p-6 box-content mb-5">
            <Link href={`../${id}`} passHref rel="noreferrer" className="flex items-center h-full ">
              <h2>{title}</h2>
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
