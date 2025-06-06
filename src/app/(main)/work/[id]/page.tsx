import { getContentDetail } from '@/api-domain/work';
import { notFound } from 'next/navigation';
import { WorkDetailLayout } from './WorkDetailLayout';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const data = await getContentDetail(id);

    if (!data) return notFound();

    const parsedData = {
      ...data,
      writers: data.writers.map(w => ({
        ...w,
        id: String(w.id),
      })),
      platformList: data.platformList?.map(p => ({
        ...p,
        id: String(p.id),
      })),
    };

    return (
      <>
        <WorkDetailLayout {...parsedData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching content detail:', error);
    notFound();
  }
}
