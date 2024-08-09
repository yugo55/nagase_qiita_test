// app/tools/getQiitaItems.tsx

import axios from "axios";
import { ParsedQiitaItem } from "@/app/types";

export const getQiitaItems = async (page: number, searchText: string = ""): Promise<ParsedQiitaItem[]> => {
  if (searchText) {
    const apiUrl = `https://qiita.com/api/v2/items?query=body:${encodeURIComponent(searchText)}&page=${page}&per_page=20`
    const res = await axios.get(apiUrl);
    return res.data.map((item: any) => ({
      ...item,
    }));
  } else {
    const apiUrl = `https://qiita.com/api/v2/items?page=${page}&per_page=20`;
    const res = await axios.get(apiUrl);
    return res.data.map((item: any) => ({
      ...item,
    }));
  }
};
