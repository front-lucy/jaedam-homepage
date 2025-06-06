// app/news/[id]/page.tsx
import { getNoticeDetail } from '@/api-domain/news';
import { notFound } from 'next/navigation';
import { NewsDetailLayout } from '../component/detail/NewsDetailLayout';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const res = await getNoticeDetail(Number(id));

  if (!res || !res.body) {
    notFound();
  }

  const data = res.body;

  return (
    <NewsDetailLayout
      id={data.id}
      title={data.title}
      category={data.category}
      content={data.content}
      noticedAt={data.noticedAt}
      fileList={data.fileList}
    />
  );
}
