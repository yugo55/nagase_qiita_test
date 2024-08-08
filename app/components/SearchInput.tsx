"use client"

import { useState } from "react";
import APIPopup from "@/app/components/APIPopup";

export default function SearchInput() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  
  return (
    <div className="flex my-6">
      <input type="text" className="border-black border-b" />
      <button className="h-8 w-24 rounded-full bg-green-400 block mx-2.5">検索</button>
      <button className="h-8 w-24 rounded-full bg-green-400 block" onClick={togglePopup}>APIキー入力</button>
      {isPopupVisible && (<APIPopup togglePopup={togglePopup} setApiKey={setApiKey} />)}
    </div>
  );
}