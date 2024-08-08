import axios from "axios";
import { ParsedQiitaItem } from "@/app/types";

export const getQiitaItems = async (page: number): Promise<ParsedQiitaItem[]> => {
  const apiUrl = `https://qiita.com/api/v2/items?page=${page}&per_page=20`;
  const res = await axios.get(apiUrl);
  return res.data.map((item: any) => ({
    ...item,
  }));
};
