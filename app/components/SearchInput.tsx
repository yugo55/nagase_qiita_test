"use client";

import { useState } from "react";
import APIPopup from "@/app/components/APIPopup";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale";

registerLocale("ja", ja);

type SearchInputProps = {
  setSearchText: (text: string) => void;
  setApiKey: (key: string) => void;
  setSearchDate: (date: Date | null) => void;
};

export default function SearchInput({
  setSearchText,
  setApiKey,
  setSearchDate,
}: SearchInputProps) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [searchText, setInputSearchText] = useState("");
  const [searchDate, setInputSearchDate] = useState<Date | null>(null);
  const maxDate = new Date();

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSearch = () => {
    setSearchText(searchText);
    setSearchDate(searchDate);
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
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={searchDate}
        onChange={(searchDate: Date | null) => setInputSearchDate(searchDate)}
        className="border-black border-b ml-2.5 w-28 h-8"
        placeholderText="日付を選択"
        maxDate={maxDate}
        locale="ja"
        dateFormatCalendar="yyyy年 MM月"
        isClearable
      />
      <span>以降に作成された記事</span>
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
