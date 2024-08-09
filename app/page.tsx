import dayjs from "dayjs";
import Home from "@/app/components/Home";
import { getQiitaItems } from "@/app/tools/getQiitaItems";

const Page = async () => {
  const page = 1;
  const qiitaItems = await getQiitaItems(page);
  const generatedAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

  return <Home qiitaItems={qiitaItems} generatedAt={generatedAt} initialPage={page} />;
};

export default Page;
