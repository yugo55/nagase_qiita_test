"use client";

import { useState } from "react";

type Props = {
  togglePopup: () => void;
  setApiKey: (key: string) => void;
};

export default function APIPopup({ togglePopup, setApiKey }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleComplete = () => {
    setApiKey(inputValue);
    togglePopup();
  };

  return (
    <div className="w-screen h-screen bg-gray-600 bg-opacity-30 fixed inset-0">
      <div className="fixed inset-0 m-auto w-64 h-64 bg-white p-5">
        <button onClick={togglePopup}>閉じる</button>
        <p className="mt-5">APIキーを入力</p>
        <input
          type="text"
          className="border-black border-b block my-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="ml-auto block" onClick={handleComplete}>
          完了
        </button>
      </div>
    </div>
  );
}
