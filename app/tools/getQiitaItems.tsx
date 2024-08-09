import axios from "axios";
import { ParsedQiitaItem } from "@/app/types";

export const getQiitaItems = async (page: number, searchText: string = "", apiKey: string = ""): Promise<ParsedQiitaItem[]> => {
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};

  const apiUrl = searchText
    ? `https://qiita.com/api/v2/items?query=title:${encodeURIComponent(searchText)}&page=${page}&per_page=20`
    : `https://qiita.com/api/v2/items?page=${page}&per_page=20`;

  const res = await axios.get(apiUrl, { headers });

  return res.data.map((item: any) => ({
    ...item,
  }));
};
