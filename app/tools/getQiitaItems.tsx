import axios from "axios";
import { ParsedQiitaItem } from "@/app/types";

export const getQiitaItems = async (
  page: number,
  searchText: string = "",
  apiKey: string = "",
  searchDate: Date | null = null
): Promise<ParsedQiitaItem[]> => {
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};

  const formattedDate = searchDate ? `created:>=${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')}` : '';

  let queryParams = "";
  if (searchText) {
    queryParams += `title:${encodeURIComponent(searchText)}`;
  }
  if (formattedDate) {
    if (queryParams) queryParams += ' ';
    queryParams += formattedDate;
  }

  const apiUrl = queryParams
    ? `https://qiita.com/api/v2/items?query=${encodeURIComponent(queryParams)}&page=${page}&per_page=20`
    : `https://qiita.com/api/v2/items?page=${page}&per_page=20`;

  const res = await axios.get(apiUrl, { headers });

  return res.data.map((item: any) => ({
    ...item,
  }));
};
