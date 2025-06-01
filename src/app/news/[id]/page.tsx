import { getNoticeDetail } from "@/api-domain/news";
import { NewsDetailLayout } from "../component/detail/NewsDetailLayout";

interface Props {
    params: { id: string };
  }

  export default async function NewsDetailPage({ params }: Props) {
  const data = await getNoticeDetail(Number(params.id));
    return <NewsDetailLayout   {...data.body} content={data.body.content}     />;
  }