import { getContentDetail } from '@/api-domain/work';
import { Footer } from '@/components/molecules/footer';
import { Header } from '@/components/molecules/header';
import { notFound } from 'next/navigation';
import { WorkDetailLayout } from './WorkDetailLayout';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;

  const data = await getContentDetail(id);
  console.log('🌐 data', data);

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
      <Header
        mode='light'
        pageType='sub'
      />
      <WorkDetailLayout {...parsedData} />
      <Footer />
    </>
  );
}
