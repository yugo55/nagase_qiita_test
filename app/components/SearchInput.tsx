"use client";

import { useState } from "react";
import APIPopup from "@/app/components/APIPopup";

type SearchInputProps = {
  setSearchText: (text: string) => void;
  setApiKey: (key: string) => void;
};

export default function SearchInput({ setSearchText, setApiKey }: SearchInputProps) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [searchText, setInputSearchText] = useState("");

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSearch = () => {
    if (!searchText) {
      alert("検索テキストを入力してください");
      return;
    }
    setSearchText(searchText);
  };

  return (
    <div className="flex my-6">
      <input
        type="text"
        className="border-black border-b"
        value={searchText}
        onChange={(e) => setInputSearchText(e.target.value)}
        placeholder="検索テキストを入力"
      />
      <button
        className="h-8 w-24 rounded-full bg-green-400 block mx-2.5"
        onClick={handleSearch}
      >
        検索
      </button>
      <button
        className="h-8 w-24 rounded-full bg-green-400 block"
        onClick={togglePopup}
      >
        APIキー入力
      </button>
      {isPopupVisible && (
        <APIPopup togglePopup={togglePopup} setApiKey={setApiKey} />
      )}
    </div>
  );
}
